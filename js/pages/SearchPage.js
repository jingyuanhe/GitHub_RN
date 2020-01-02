import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  [Platform
} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil'
import NavigationBar from "../common/NavigationBar";
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from "../common/PopularItem";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'
const pageSize=10;
import Toast, {DURATION} from 'react-native-easy-toast'
import FavoriteUtil from "../util/FavoriteUtil";
import EventBus from 'react-native-event-bus'
import NavigationUtil from '../util/NavigationUtil.js'
import LanguageDao, { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import { Platform } from 'react-native';
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
      onLoadMoreSearch(search.pageIndex,pageSize,search.items,this.favoriteDao,callBack=>{
        this.toast.show('没有更多了');
      })
    }else{
      onSearch(this.inputKey,pageSize,this.searchToken=new Date().getTime(),this.favoriteDao(),keys,message => {
        this.toast.show(message);
    })
    }
  }
  onBackPress(){
    const {onSearchCancel,onLoadLanguage}=this.props;
    onSearchCancel();
    this.$refs.input.blur();
    NavigationUtil.goBack(this.props.navigation);
    if(this.isKeyChange){
      onLoadLanguage(FLAG_LANGUAGE.flag_key);
    }
    return true;
  }
  render(){
    const {isLoading,showBottomButton,projectModels,hideLoadingMore}=this.props.search;
    const {theme}=this.params;
    let statusBar=null;
    if(Platform.OS==='ios'){
      statusBar=<View style={[styles.statusBar,{backgroundColor:theme.themeColor}]}></View>
    }
    let listView=!isLoading?<FlatList
    data={projectModels}
    contentInset={
      {
        bottom:45
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
      justifyContent:'center',
      backgroundColor:'#f5fcff',
      alignItems:'center'
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
  }
});

