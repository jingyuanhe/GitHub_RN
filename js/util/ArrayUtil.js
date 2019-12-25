export default class ArrayUtil{
    static updataArray(array,item){
        for(let i=0,len=array.length;i<len;i++){
            let temp=array[i];
            if(temp===item){
                array.splice(i,1);
                return;
            }
        }
        array.push(item);
    }
    static remove(array,item,id){
        if(!array) return;
        for(let i=0;i<array.length;i++){
            const val=array[i];
            if(item===val||val&&val[id]&&val[id]===item[id]){
                array.splice(i,1)
            }
        }
        return array;
    }
}