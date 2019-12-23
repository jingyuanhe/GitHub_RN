import types from "../../action/types";
import {FLAG_LANGUAGE} from "../../expand/dao/LanguageDao";
const defaultState={
    languages:[],
    keys:[]
}
export default function onAction(state=defaultState,action){
    switch(action.type){
        case types.LANGUAGE_LOAD_SUCCESS:
            if(FLAG_LANGUAGE.flag_key===action.flag){
                return{
                    ...state,
                    keys:action.languages
                }
            }else{
                return{
                    ...state,
                    languages:action.languages
                }
            }
            default:
                return state
    }
}