import types from "../types";
import DataStore,{FLAG_STORAGE} from "../../expand/dao/DataStore";
import {handleData} from "../ActionUtil";
export function onLoadPopularData(storeName,url,pageSize,favoriteDao){
    return dispatch=>{
        dispatch({type:types.POPULAR_REFRESH,storeName})
        const dataStore=new DataStore();
        dataStore.fetchData(url,FLAG_STORAGE.flag_popular)
        .then(data=>handleData(types.POPULAR_REFRESH_SUCCESS,dispatch,storeName,data,pageSize,favoriteDao))
        .catch(err=>{
            console.log(err);
            dispatch({
                type:types.POPULAR_REFRESH_FAIL,
                storeName,
                err
            })
        })
    }
}
export function onLoadMorePopular(storeName,pageIndex,pageSize,dataArray=[],callBack){
    return dispatch=>{
        setTimeout(function(){
            if((pageIndex-1)*pageSize>=dataArray.length){
                if(typeof callBack=='function'){
                    callBack('no more')
                }
                dispatch({
                    type:types.POPULAR_LOAD_MORE_FAIL,
                    error:'no more',
                    storeName:storeName,
                    pageIndex:--pageIndex,
                    projectModes:dataArray
                })
            }else{
                let max=pageIndex*pageSize>dataArray.length?dataArray.length:pageIndex*pageSize;
                dispatch({
                    type:types.POPULAR_LOAD_MORE_SUCCESS,
                    storeName,
                    pageIndex,
                    projectModes:dataArray.slice(0,max)
                })
            }
        },500)
    }
}