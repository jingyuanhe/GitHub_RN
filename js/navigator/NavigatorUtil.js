export default class NavigarorUtil{
    //重置到首页
    static resetToHomePage(params){
        const {navigation}=params;
        navigation.navigate("Main");
    }
    //返回上一页
    static goBack(navigation){
        navigation.goBack();
    }
}