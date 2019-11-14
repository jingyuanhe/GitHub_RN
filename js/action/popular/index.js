import types from "../types";
import DataStore from "../../expand/dao/DataStore";
export function onLoadPopularData(storeName,url){
    return dispatch=>{
        dispatch({type:types.POPULAR_REFRESH,storeName})
        const dataStore=new DataStore();
        dataStore.fetchData(url)
        .then(data=>handleData(dispatch,storeName,data))
        .catch(err=>{
            console.log(err);
            dispatch({
                type:types.LOAD_POPULAR_FAIL,
                storeName,
                err
            })
        })
    }
}
function handleData(dispatch,storeName,data){
    dispatch({
        type:types.LOAD_POPULAR_SUCCESS,
        items:data&&data.data&&data.data.items,
        storeName
    })
}