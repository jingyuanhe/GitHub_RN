import Types from '../types'
import ThemeDao from "../../expand/dao/ThemeDao";
import types from '../types';
export function onThemeChange(theme){
    return {type:Types.THEME_CHANGE,theme:theme}
}
export function onThemeInit(){
    return dispatch=>{
        new ThemeDao().getTheme().then(result=>{
            dispatch(onThemeChange(result))
        })
    }
}
export function onShowCustomThemeView(show){
    return {type:types.SHOW_THEME_VIEW,customThemeVisible:show}
}