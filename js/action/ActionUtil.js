import ProjectModes from '../model/ProjectModel'
import favoriteDao from '../expand/dao/FavoriteDao'
import Utils from '../util/Utils'
export function handleData(actionType,dispatch,storeName,data,pageSize,favoriteDao){
    let fixItems=[];
    if(data){
        if(Array.isArray(data)){
            fixItems=data;
        }else if(Array.isArray(data.data.items)){
            fixItems=data.data.items
        }
    }
    let showItems=pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize);
    _projectModels(showItems,favoriteDao,projectModels=>{
        dispatch({
            type:actionType,
            items:fixItems,
            projectModes:projectModels,
            storeName,
            pageIndex:1
        })
    })
    
}
export async function _projectModels(showItems,favoriteDao,callback){
    let keys=[];
    try{
       keys=favoriteDao.getFavoriteKeys();
    }
    catch(e){
        console.log(e)
    }
    let projectModels=[];
    for(let i=0,len=showItems.length;i<len;i++){
        projectModels.push(new ProjectModes(showItems[i],Utils.checkFavorite(showItems[i],keys)))
    }
    if(callback==='function'){
        callback(projectModels)
    }
}