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
}