import types from "../types";
import FavoriteDao from '../../expand/dao/FavoriteDao'
import ProjectModel from '../../model/ProjectModel'
export function onLoadFavoriteData(flag,isShowLoading){
    return dispatch=>{
        if(isShowLoading){
            dispatch({type:types.FAVORITE_LOAD_DATA,storeName:flag})
        }
        new FavoriteDao(flag).getAllItems()
            .then(items=>{
                let resultData=[];
                for(let i=0,len=items.length;i<len;i++){
                    resultData.push(new ProjectModel(items[i],true))
                }
                dispatch({
                    type:types.FAVORITE_LOAD_SUCCESS,
                    projectModels:resultData,
                    storeName:flag
                })
            })
            .catch(err=>{
                console.log(err);
                dispatch({
                    type:types.FAVORITE_LOAD_FAIL,
                    storeName:flag
                })
            })
    }
}
