import Types from "../../action/types";
import ThemeFactory,{ThemeFlags} from "../../res/ThemeFactory";
let defaultState={
    theme:ThemeFactory.createTheme(ThemeFlags.Default),
    customThemeVisible:false
}
export default function onAction(state=defaultState,action){
    switch(action.type){
        case Types.THEME_CHANGE:
            return {
                ...state,
                theme:action.theme
            }
        case Types.SHOW_THEME_VIEW:
            return{
                ...state,
                customThemeVisible:action.customThemeVisible
            }
        default:
            return state    
    }
}