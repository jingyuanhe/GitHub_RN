import types from "../types";
import DataStore,{FLAG_STORAGE} from "../../expand/dao/DataStore";
import {handleData} from "../ActionUtil";
export function onLoadTrendingData(storeName,url,pageSize){
    return dispatch=>{
        dispatch({type:types.TRENDING_REFRESH,storeName})
        const dataStore=new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_trending)
        .then(data=>handleData(types.TRENDING_REFRESH_SUCCESS,dispatch,storeName,data,pageSize))
        .catch(err=>{
            console.log(err);
            dispatch({
                type:types.TRENDING_REFRESH_FAIL,
                storeName,
                err
            })
        })
    }
}
export function onLoadMoreTrending(storeName,pageIndex,pageSize,dataArray=[],callBack){
    return dispatch=>{
        setTimeout(function(){
            if((pageIndex-1)*pageSize>=dataArray.length){
                if(typeof callBack=='function'){
                    callBack('no more')
                }
                dispatch({
                    type:types.TRENDING_REFRESH_FAIL,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray
                })
            }else{
                let max=pageIndex*pageSize>dataArray.length?dataArray.length:pageIndex*pageSize;
                dispatch({
                    type:types.TRENDING_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes:dataArray.slice(0,max)
                })
            }
        },500)
    }
}
