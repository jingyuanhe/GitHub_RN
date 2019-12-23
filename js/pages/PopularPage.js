import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl
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
const favoriteDao=new FavoriteDao(FLAG_STORAGE.flag_popular)
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'
const THEME_COLOR='#678'
const pageSize=10;
import Toast, {DURATION} from 'react-native-easy-toast'
import FavoriteUtil from "../util/FavoriteUtil";
import EventBus from 'react-native-event-bus'
import NavigationUtil from '../util/NavigationUtil.js'
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
class PopularPage extends Component{
  constructor(props){
    super(props);
    const {onLoadLanguage}=this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_key)
  }
  _GetTabs(){
    const tabs={}
    const {keys}=this.props;
    keys.forEach((item,index)=>{
      if(item.checked){
        tabs[`tab${index}`]={
          screen:props=><PopularTabPage {...props} tabLabel={item.name}/>,
          navigationOptions:{
            title:item.name
          }
        }
      }
      
    })
    return tabs
  }
  render(){
    const {keys}=this.props;
    const TabNavigator=keys.length?createAppContainer(createMaterialTopTabNavigator(
      this._GetTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          scrollEnabled:true,
          upperCaseLabel:false,
          indicatorStyle:styles.indicatorStyle,
          labelStyle:styles.labelStyle
        }
      }
    )):null;
    const statusBar={
      backgroundColor:THEME_COLOR
    }
    const navigationBar=<NavigationBar title={'最热'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
    return (
      <View style={{flex:1,marginTop:0}}>
          {navigationBar}
          {TabNavigator?<TabNavigator></TabNavigator>:null}
      </View>
    );
  }
}
const mapPopularStateToProps=state=>({
  keys:state.language.keys
});
const mapPopularDispatchToProps=dispatch=>({
  onLoadLanguage:(flag)=>dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapPopularStateToProps,mapPopularDispatchToProps)(PopularPage)
class TopNavigator extends Component{
  constructor(props){
    super(props);
    const {tabLabel}=this.props;
    this.storeName=tabLabel;
    this.isFavoriteChanged=false;
  }
  _store(){
    const {popular}=this.props;
    let store=popular[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
        projectModels:[],
        hideLoadingMore:true
      }
    }
    return store
  }
  genFetchUrl(storeName){
    return URL+storeName+QUERY_STR;
  }
  loadData(loadMore,refreshFavorite){
    const {onLoadPopularData,onLoadMorePopular}=this.props;
    const url=this.genFetchUrl(this.storeName);
    if(loadMore){
      onLoadMorePopular(this.storeName,++this._store().pageIndex,pageSize,this._store().items,favoriteDao,callBack=>{this.refs.toast.show('已经加载到底部了。。。')})
    }else{
      onLoadPopularData(this.storeName,url,pageSize,favoriteDao);
    }
  }
  componentDidMount(){
    this.loadData();
    EventBus.getInstance().addListener(NavigationUtil.favorite_changed_popular,this.favoriteChangeListener = ()=>{
      this.isFavoriteChanged = true;
    });
    EventBus.getInstance().addListener(NavigationUtil.bottom_tab_select,this.bottomTabSelectListener = (data)=>{
      if(data.to === 0 && this.isFavoriteChanged){
        this.loadData(null,true);
      }
    });
  }
  componentWillUnmount(){
    EventBus.getInstance().removeListener(this.favoriteChangeListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }

  renderItem(data){
    const item=data.item;
    return <PopularItem projectModel={item} 
            onSelect={(callback)=>{
              NavigatorUtil.gotoPage({projectModel:item,flag:FLAG_STORAGE.flag_popular,callback},'DetailPage')
            }}
            onFavorite={(item,isFavoriter)=>{FavoriteUtil.onFavorite(favoriteDao,item,isFavoriter,FLAG_STORAGE.flag_popular)}}
    ></PopularItem>
  }
  genIndicator(){
    return this._store().hideLoadingMore?null:<View style={{alignItems:'center'}}>
      <ActivityIndicator style={{color:'red',margin:10}}></ActivityIndicator>
      <Text>正在加载更多</Text>
    </View>
  }
  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this._store().projectModels}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+item.item.id}
          refreshControl={
            <RefreshControl
              title='loading'
              refreshing={this._store().isLoading}
              onRefresh={()=>this.loadData()}
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
        </FlatList>
        <Toast ref={"toast"} position={'center'}/>
      </View>
    )
  }
}
const mapStateToProps=state=>({
  popular:state.popular
});
const mapDispatchToProps=dispatch=>({
  onLoadPopularData:(storeName,url,pageSize,favoriteDao)=>dispatch(actions.onLoadPopularData(storeName,url,pageSize,favoriteDao)),
  onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callBack)=>dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao,callBack)),

})
const PopularTabPage=connect(mapStateToProps,mapDispatchToProps)(TopNavigator)
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
  }
});

