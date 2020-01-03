import types from "../types";
import DataStore,{FLAG_STORAGE} from "../../expand/dao/DataStore";
import {handleData,_projectModels,doCallBack} from "../ActionUtil";
import ArrayUtil from '../../util/ArrayUtil'
import Utils from '../../util/Utils'
const API_URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const CANCEL_TOKENS=[];
export function onSearch(inputKey,pageSize,token,favoriteDao,popularKeys,callBack){
    return dispatch=>{
        dispatch({type:types.SEARCH_REFRESH})
        fetch(getFetchUrl(inputKey)).then(response=>{
            return hasCancel(token)?null:response.json()
        }).then(responseData=>{
            if(hasCancel(token,true)){
                return 
            }
            if(!responseData||!responseData.items||responseData.items.length===0){
                dispatch({type:types.SEARCH_FAIL,message:`没找到关于${inputKey}的项目`});
                doCallBack(callBack,`没找到关于${inputKey}的项目`);
                return
            }
            let items=responseData.items;
            console.log(!Utils.checkKeyIsExist(popularKeys,inputKey))

            handleData(types.SEARCH_REFRESH_SUCCESS,dispatch,"",{data: items},pageSize,favoriteDao,{
                showButtomButton:!Utils.checkKeyIsExist(popularKeys,inputKey),
                inputKey
            })
        }).catch(err=>{
            console.log(err);
            dispatch({type:types.SEARCH_FAIL,error:err})
        })
    }
}
export function onSearchCancel(token){
    return dispatch=>{
        CANCEL_TOKENS.push(token);
        dispatch({type:types.SEARCH_CANCEL})
    }
}
function getFetchUrl(key){
    return API_URL +key +QUERY_STR;
}
function hasCancel(token,isRemove){
    if(CANCEL_TOKENS.includes(token)){
        isRemove&&ArrayUtil.remove(CANCEL_TOKENS,token);
        return true;
    }
    return false;
}
function checkKeyIsExist(keys,key){
    for(let i=0;i<keys.length;i++){
        if(key.toLowerCase()===keys[i].name.toLowerCase()){
            return true
        }
    }
    return false;
}
export function onLoadMoreSearch(pageIndex,pageSize,dataArray=[],favoriteDao,callBack){
    return dispatch=>{
        setTimeout(function(){
            if((pageIndex-1)*pageSize>=dataArray.length){
                if(typeof callBack=='function'){
                    callBack('no more')
                }
                dispatch({
                    type:types.SEARCH_LOAD_MORE_FAIL,
                    error:'no more',
                    pageIndex:--pageIndex
                })
            }else{
                let max=pageIndex*pageSize>dataArray.length?dataArray.length:pageIndex*pageSize;
                _projectModels(dataArray.slice(0,max),favoriteDao,data=>{
                    dispatch({
                        type:types.SEARCH_LOAD_MORE_SUCCESS,
                        pageIndex,
                        projectModels:data
                    })
                })
                
            }
        },500)
    }
}