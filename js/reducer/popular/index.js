import types from '../../action/types'
const defaultState={};
export default function onAction(state=defaultState,action){
    switch(action.type){
        case types.POPULAR_REFRESH_SUCCESS:
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    items:action.items,//原始数据
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex,
                    projectModels:action.projectModels,//此次要展示的数据
                    isLoading:false
                }
            }
        case types.POPULAR_REFRESH_FAIL:{
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false
                }
            }
        }
        case types.POPULAR_REFRESH:{
            return {
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    isLoading:false,
                    hideLoadingMore:true
                }
            }
        }
        case types.POPULAR_LOAD_MORE_SUCCESS:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    projectModels:action.projectModels,
                    hideLoadingMore:false,
                    pageIndex:action.pageIndex
                }
            }
        }
        case types.POPULAR_LOAD_MORE_FAIL:{
            return{
                ...state,
                [action.storeName]:{
                    ...state[action.storeName],
                    hideLoadingMore:true,
                    pageIndex:action.pageIndex
                }
            }
        }
        default:
            return state
    }
}