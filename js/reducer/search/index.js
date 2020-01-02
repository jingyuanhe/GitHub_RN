import types from '../../action/types'
const defaultState={
    showText:'搜索',
    items:[],
    isLoading:false,
    projectModels:[],
    hideLoadingMore:true,
    showBottomButton:false
};
export default function onAction(state=defaultState,action){
    switch(action.type){
        case types.SEARCH_REFRESH:{
            return {
                ...state,
                isLoading:true,
                hideLoadingMore:true,
                showBottomButton:false
            }
        }
        case types.SEARCH_REFRESH_SUCCESS:
            return {
                ...state,
                items:action.items,//原始数据
                hideLoadingMore:false,
                pageIndex:action.pageIndex,
                projectModels:action.projectModels,//此次要展示的数据
                isLoading:false,
                showText:'搜索',
                showBottomButton:action.showBottomButton,
                inputKey:action.inputKey
            }
        case types.SEARCH_FAIL:{
            return {
                ...state,
                isLoading:false,
                showText:'搜索'
            }
        }
        case types.SEARCH_CANCEL:{
            return {
                ...state,
                isLoading:false,
                showText:'搜索'
            }
        }
        case types.SEARCH_LOAD_MORE_SUCCESS:{
            return{
                ...state,
                projectModels:action.projectModels,
                hideLoadingMore:false,
                pageIndex:action.pageIndex
            }
        }
        case types.SEARCH_LOAD_MORE_FAIL:{
            return{
                ...state,
                hideLoadingMore:true,
                pageIndex:action.pageIndex
            }
        }
        default:
            return state
    }
}