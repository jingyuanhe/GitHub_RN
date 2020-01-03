import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {connect} from 'react-redux'
import actions from '../action/index'
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
const pageSize=10;
import Toast, {DURATION} from 'react-native-easy-toast'
import NavigatorUtil from '../navigator/NavigatorUtil'
import LanguageDao, { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import GlobalStyles from '../res/GlobalStyles';
import PopularItem from "../common/PopularItem";
import viewUtil from '../util/viewUtil';
import { TextInput } from 'react-native-paper';
import Utils from '../util/Utils'
class SearchPage extends Component{
  constructor(props){
    super(props);
    this.params=this.props.navigation.state.params;
    this.favoriteDao=new FavoriteDao(FLAG_STORAGE.flag_popular);
    this.languageDao=new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.isKeyChange=false;
  }
  loadData(loadMore){
    const {onLoadMoreSearch,onSearch,search,keys}=this.props;
    if(loadMore){
      onLoadMoreSearch(++search.pageIndex,pageSize,search.items,this.favoriteDao,callBack=>{
        this.refs.toast.show('没有更多了');
      })
    }else{
      onSearch(this.inputKey,pageSize,this.searchToken=new Date().getTime(),this.favoriteDao,keys,message => {
        this.refs.toast.show(message);
    })
    }
  }
  onBackPress(){
    const {onSearchCancel,onLoadLanguage}=this.props;
    onSearchCancel();
    this.refs.input.blur();
    NavigatorUtil.goBack(this.props.navigation);
    if(this.isKeyChange){
      onLoadLanguage(FLAG_LANGUAGE.flag_key);
    }
    return true;
  }
  renderItem(data){
    const item=data.item;
    const {theme}=this.params;
    return <PopularItem projectModel={item}
            theme={theme} 
            onSelect={(callback)=>{
              NavigatorUtil.gotoPage({projectModel:item,flag:FLAG_STORAGE.flag_popular,callback,theme:theme},'DetailPage')
            }}
            onFavorite={(item,isFavoriter)=>{FavoriteUtil.onFavorite(favoriteDao,item,isFavoriter,FLAG_STORAGE.flag_popular)}}
    ></PopularItem>
  }
  saveKey(){
    const {keys}=this.props;
    let key=this.inputKey;
    if(Utils.checkKeyIsExist(keys,key)){
      this.refs.toast.show(key+'已经存在');
    }else{
      key={
        "name":key,
        "path":key,
        "checked":true
      }
      keys.unshift(key);
      this.languageDao.saveData(keys);
      this.refs.toast.show(key.name+'保存成功');
      this.isKeyChange=true;
    }
  }
  onRightButtonClick(){
    const {onSearchCancel,search}=this.props;
    if(search.showText==='搜索'){
      this.loadData();
    }else{
      onSearchCancel(this.searchToken)
    }
  }
  genIndicator(){
    const {search}=this.props;
    return search.hideLoadingMore?null:<View style={{alignItems:'center'}}>
      <ActivityIndicator style={{color:'red',margin:10}}></ActivityIndicator>
      <Text>正在加载更多</Text>
    </View>
  }
  renderNavBar() {
    const {theme} = this.params;
    const {showText, inputKey} = this.props.search;
    const placeholder = inputKey || "请输入";
    let backButton = viewUtil.getLeftBackButton(() => this.onBackPress());
    let inputView = <TextInput
        ref="input"
        placeholder={placeholder}
        onChangeText={text => this.inputKey = text}
        style={styles.textInput}
    >
    </TextInput>;
    let rightButton =
        <TouchableOpacity
            onPress={() => {
                this.refs.input.blur();//收起键盘
                this.onRightButtonClick();
            }}
        >
            <View style={{marginRight: 10}}>
                <Text style={styles.title}>{showText}</Text>
            </View>
        </TouchableOpacity>;
    return <View style={{
        backgroundColor: theme.themeColor,
        flexDirection: 'row',
        alignItems: 'center',
        height: (Platform.OS === 'ios') ? GlobalStyles.nav_bar_height_ios : GlobalStyles.nav_bar_height_android,
    }}>
        {backButton}
        {inputView}
        {rightButton}
    </View>
}
  render(){
    const {isLoading,showButtomButton,projectModels,hideLoadingMore}=this.props.search;
    const {theme}=this.params;
    let statusBar=null;
    if(Platform.OS==='ios'){
  
      statusBar=<View style={[styles.statusBar,{backgroundColor:theme.themeColor}]}></View>
    }
    let listView=!isLoading?<FlatList
    data={projectModels}
    contentInset={
      {
          bottom: 45
      }
    }
    renderItem={data=>this.renderItem(data)}
    keyExtractor={item=>""+item.item.id}
    refreshControl={
      <RefreshControl
        title='loading'
        refreshing={isLoading}
        onRefresh={()=>this.loadData()}
        tintColor={theme.themeColor}
        titleColor={theme.themeColor}
        colors={[theme.themeColor]}
      >
      </RefreshControl>
    }
    ListFooterComponent={()=>this.genIndicator()}
    onEndReached={()=>{
      setTimeout(()=>{
        if(!this.canLoadMore){
          this.canLoadMore=true;
          this.loadData(true)
        }
      },200)
    }}
    onEndReachedThreshold={0.2}
    onMomentumScrollBegin={()=>{
      this.canLoadMore=false;
    }}
  >
  </FlatList>:null;
  let bottomButton=showButtomButton?<TouchableOpacity
  style={[styles.buttomButton,{backgroundColor:theme.themeColor}]}
  onPress={()=>{this.saveKey()}}
>
  <View style={{justifyContent:'center'}}>
    <Text style={styles.title}>朕收下了</Text>
  </View>
</TouchableOpacity>:null;
  let indicatorView=isLoading?<ActivityIndicator
    size='large'
    animating={isLoading}
    style={styles.centering}
  />:null;
  let resultView=<View style={{flex:1}}>
    {indicatorView}
    {listView}
  </View>
  return(
    <View style={styles.container}> 
      {statusBar}
      {this.renderNavBar()}
      {resultView}
      {bottomButton}
      <Toast ref={"toast"} position={'center'}/>
    </View>
  )
  }
}
const mapPopularStateToProps=state=>({
  search:state.search,
  keys:state.language.keys
});
const mapPopularDispatchToProps=dispatch=>({
  onSearch: (inputKey, pageSize, token, favoriteDao, popularKeys, callBack) => dispatch(actions.onSearch(inputKey, pageSize, token, favoriteDao, popularKeys, callBack)),
  onSearchCancel: (token) => dispatch(actions.onSearchCancel(token)),
  onLoadMoreSearch: (pageIndex, pageSize, dataArray, favoriteDao, callBack) => dispatch(actions.onLoadMoreSearch(pageIndex, pageSize, dataArray, favoriteDao, callBack)),
  onLoadLanguage: (flag) => dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapPopularStateToProps,mapPopularDispatchToProps)(SearchPage)
const styles = StyleSheet.create({
  container:{
      flex:1,
  },
  tabStyle:{
    minWidth:40
  },
  button:{
    marginTop:30
  },
  indicatorStyle:{
    backgroundColor:'#fff'
  },
  labelStyle:{
    fontSize:13
  },
  statusBar:{
    height:20
  },
  buttomButton:{
    alignItems:'center',
    justifyContent:'center',
    left:10,
    right:10,
    position:'absolute',
    opacity:.9,
    height:45,
    borderRadius:3,
    top:GlobalStyles.window_height-45
  },
  centering:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  textInput:{
    flex: 1,
    height: (Platform.OS === 'ios') ? 26 : 36,
    borderWidth: (Platform.OS === 'ios') ? 1 : 0,
    borderColor: "white",
    alignSelf: 'center',
    paddingLeft: 5,
    marginRight: 10,
    marginLeft: 5,
    borderRadius: 3,
    opacity: 0.7,
    color: 'white'
  },
  title:{
    fontSize:18,
    color:'white',
    fontWeight:'500'
  }
});

