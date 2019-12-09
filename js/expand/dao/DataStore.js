import { AsyncStorage } from "react-native"
import Trending from 'GitHubTrending'
export const FLAG_STORAGE={flag_popular:'popular',flag_trending:'trending'}
export default class DataStore{
    static checkTimesTampValid(timestamp){
        const currentDate=new Date();
        const targetDate=new Date();
        targetDate.setTime(timestamp);
        if(currentDate.getMonth()!==targetDate.getMonth()) return false;
        if(currentDate.getDate()!==targetDate.getDate()) return false;
        if(currentDate.getMonth()-targetDate.getMonth()>4) return false;
        return true;
    }
    fetchData(url,flag){
        return new Promise((resolve,reject)=>{
            if(flag!==FLAG_STORAGE.flag_trending){
                this.fetchLocalData(url).then((wrapData)=>{
                    if(wrapData&&DataStore.checkTimesTampValid(wrapData.timestamp)){
                        resolve(wrapData)
                    }else{
                        this.fetchNetData(url).then((data)=>{
                            resolve(this._wrapData(data))
                        }).catch((err)=>{
                            reject(err);
                        })
                    }
                }).catch((err)=>{
                    this.fetchNetData(url).then((data)=>{
                        resolve(this._wrapData(data))
                    }).catch((err)=>{
                        reject(err);
                    })
                })
            }else{
                new Trending().fetchTrending(url)
                .then(items=>{
                    if(!items){
                        throw new Error('data is null')
                    }
                    this.saveData(items,url);
                    resolve(items);
                })
                .catch(err=>{
                    reject(err);
                })
            }
           
        })
    }
    saveData(url,data,callback){
        if(!url||!data) return;
        AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback);
    }
    _wrapData(data){
        return {data:data,timestamp:new Date().getTime()}
    }
    fetchLocalData(url){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(url,(error,result)=>{
                if(!error){
                    try{
                        resolve(JSON.parse(result))
                    }
                    catch(e){
                        reject(e);
                        console.error(e)
                    }
                }else{
                    reject(error);
                    console.error(error)
                }
            })
        })
    }
    fetchNetData(url){
        return new Promise((resolve,reject)=>{
            fetch(url)
            .then((response)=>{
                if(response.ok){
                    return response.json();
                }
                throw new Error('Network response was not ok.')
            })
            .then((responseData)=>{
                this.saveData(url,responseData);
                resolve(responseData)
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }
}