import {onThemeChange,onThemeInit,onShowCustomThemeView} from "./theme";
import { onLoadPopularData,onLoadMorePopular } from "./popular";
import {onLoadTrendingData,onLoadMoreTrending} from "./trending";
import {onSearch,onSearchCancel,onLoadMoreSearch} from './search'
import {onLoadFavoriteData} from './favorite'
import {onLoadLanguage} from "./language";
export default{
    onThemeChange,
    onLoadPopularData,
    onLoadMorePopular,
    onLoadMoreTrending,
    onLoadTrendingData,
    onLoadFavoriteData,
    onLoadLanguage,
    onThemeInit,
    onShowCustomThemeView,
    onSearch,
    onSearchCancel,
    onLoadMoreSearch
}