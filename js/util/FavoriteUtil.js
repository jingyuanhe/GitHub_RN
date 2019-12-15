import {FLAG_STORAGE} from "../expand/dao/DataStore";
export default class FavoriteUtil{
    static onFavorite(FavoriteDao,item,isFavorite,flag){
        const key=flag===FLAG_STORAGE.flag_trending?item.fullName:item.id.toString();
        if(isFavorite){
            FavoriteDao.saveFavoriteItem(key,JSON.stringify(item))
        }else{
            FavoriteDao.removeFavoriteItem(key)
        }
    }
}