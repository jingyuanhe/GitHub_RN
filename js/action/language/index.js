import types from "../types";
import LanguageDao from "../../expand/dao/LanguageDao";
export function onLoadLanguage(flagkey){
    return async dispatch=>{
        try{
           
            let languages=await new LanguageDao(flagkey).fetch();
            dispatch({
                type:types.LANGUAGE_LOAD_SUCCESS,
                languages:languages,
                flag:flagkey
            })
        }
        catch(err){
            console.log(err)
        }

    }
}