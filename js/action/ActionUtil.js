export function handleData(actionType,dispatch,storeName,data,pageSize){
    let fixItems=[];
    if(data){
        if(Array.isArray(data)){
            fixItems=data;
        }else if(Array.isArray(data.data.items)){
            fixItems=data.data.items
        }
    }
    dispatch({
        type:actionType,
        items:fixItems,
        projectModes:pageSize>fixItems.length?fixItems:fixItems.slice(0,pageSize),
        storeName,
        pageIndex:1
    })
}