import types from "../types";
import DataStore from "../../expand/dao/DataStore";
export function onLoadPopularData(storeName,url,pageSize){
    return dispatch=>{
        dispatch({type:types.POPULAR_REFRESH,storeName})
        const dataStore=new DataStore();
        dataStore.fetchData(url)
        .then(data=>handleData(dispatch,storeName,data,pageSize))
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
            if((pageIndex-1)*pageSize>dataArray.length){
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
function handleData(dispatch,storeName,data,pageSize){
    let fixItems=[];
    if(data&&data.data&&data.data.items){
        fixItems=data.data.items
    }
    dispatch({
        type:types.POPULAR_REFRESH_SUCCESS,
        projectModes:pageSize>fixItems.length>fixItems:fixItems.slice(0,pageSize),
        storeName,
        pageIndex:1
    })
}