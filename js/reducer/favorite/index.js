import types from '../../action/types'
const defaultState={};
export default function onAction(state=defaultState,action){
    switch(action.type){
        case types.FAVORITE_LOAD_DATA:
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:true
                }
            }
        case types.FAVORITE_LOAD_SUCCESS:
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels:action.projectModels,//此次要展示的数据
                    isLoading:false
                }
            }
        case types.FAVORITE_LOAD_FAIL:{
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false
                    }
                }
            }
        default:
            return state        
    }
}