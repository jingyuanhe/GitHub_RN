import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  DeviceEventEmitter
} from 'react-native';
import { connect } from 'react-redux';
import actions from "../action/index";
import { useState, useEffect } from 'react';
import NavigationBar from "../common/NavigationBar";
import TrendingDiaLog,{TimeSpans} from '../common/TrendingDiaLog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigatorUtil from '../navigator/NavigatorUtil'
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TrendingItem from "../common/TrendingItem";
import Toast, {DURATION} from 'react-native-easy-toast'
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteUtil from "../util/FavoriteUtil";
const favoriteDao=new FavoriteDao(FLAG_STORAGE.flag_trending)
const EVENT_TYPE_TIME_SPAN_CHANGE='EVENT_TYPE_TIME_SPAN_CHANGE'
const THEME_COLOR='#678';
const pageSize=10;
const statusBar={
  backgroundColor:THEME_COLOR
}
import EventBus from 'react-native-event-bus'
import NavigationUtil from '../util/NavigationUtil.js'
const URL='https://github.com/trending/';
const QUERY_STR='&sort=stars'
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
class TrendingPage extends Component{
  constructor(props){
    super(props);
    this.state={
      TimeSpan:TimeSpans[0]
    };
    const {tabLabel}=this.props;
    this.storeName=tabLabel;
    const {onLoadLanguage}=this.props;
    onLoadLanguage(FLAG_LANGUAGE.flag_language)
    //this.tabNames=['All','C','C++','PHP','Javascript'];
  }
  _getTabs(){
    const tabs={}
    const {languages}=this.props;
    languages.forEach((item,index)=>{
      if(item.checked){
        tabs[`tab${index}`]={
          screen:props=><TrendingTabPage {...props} tabLabel={item.name} timeSpan={this.state.TimeSpan}/>,
          navigationOptions:{
            title:item.name
          }
        }
      }
      
    })
    return tabs
  }
  renderTitleView(){
    return(
      <View>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={()=>this.dialog.show()}
        >
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'#fff'}}>
              趋势 {this.state.TimeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{color:'white'}}
            >
            </MaterialIcons>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  onSelectTimeSpan(tab){
    this.dialog.dismiss();
    this.setState({
      TimeSpan:tab
    });
    DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE, tab)
  }
  renderTrendingDialog(){
    return <TrendingDiaLog ref={dialog=>this.dialog=dialog}
              onSelect={tab=>this.onSelectTimeSpan(tab)}
    ></TrendingDiaLog>
  }
  _tabNav(){
    const {languages}=this.props;
    if(!this.tabNav){
      this.tabNav=languages.length?createAppContainer(createMaterialTopTabNavigator(
        this._getTabs(),{
          tabBarOptions:{
            tabStyle:styles.tabStyle,
            scrollEnabled:true,
            upperCaseLabel:false,
            indicatorStyle:styles.indicatorStyle,
            labelStyle:styles.labelStyle
          }
        }
      )):null
    };
    return this.tabNav;
  }
  render(){
    const navigationBar=<NavigationBar titleView={this.renderTitleView()} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
    const TabNavigator=this._tabNav();
    return (
      <View style={{flex:1,marginTop:0}}>
          {navigationBar}
          {TabNavigator?<TabNavigator></TabNavigator>:null}
          {this.renderTrendingDialog()}
      </View>
    );
  }
};
const mapTrendingStateToProps=state=>({
  languages:state.language.languages
});
const mapTrendingDispatchToProps=dispatch=>({
  onLoadLanguage:(flag)=>dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapTrendingStateToProps,mapTrendingDispatchToProps)(TrendingPage)
class TrendingTab extends Component{
  constructor(props){
    super(props);
    const {tabLabel,timeSpan}=this.props;
    this.storeName=tabLabel;
    this.timeSpan=timeSpan;
    this.isFavoriteChanged =false;
  }
  componentDidMount(){
    this.loadData();
    this.timeSpanChangeListener = DeviceEventEmitter.addListener(EVENT_TYPE_TIME_SPAN_CHANGE, (timeSpan) => {  //将监听事件绑定到当前this上的目的是在组件卸载时能撤销事件
      this.timeSpan = timeSpan;
      this.loadData();
  })
  EventBus.getInstance().addListener(NavigationUtil.favorite_changed_trending,this.favoriteChangeListener = ()=>{
    this.isFavoriteChanged = true;
  });
  EventBus.getInstance().addListener(NavigationUtil.bottom_tab_select,this.bottomTabSelectListener = (data)=>{
    if(data.to ===1 && this.isFavoriteChanged){
      this.loadData(null,true);
    }
  });
  }
  componentWillUnmount() {
    if (this.timeSpanChangeListener) {
        this.timeSpanChangeListener.remove();
    }
    EventBus.getInstance().removeListener(this.favoriteChangeListener);
    EventBus.getInstance().removeListener(this.bottomTabSelectListener);
  }
  loadData(loadMore){
    const {onLoadTrendingData,onLoadMoreTrending}=this.props;
    const url=this.genFetchUrl(this.storeName);
    if(loadMore){
      onLoadMoreTrending(this.storeName,++this._store().pageIndex,pageSize,this._store().items,favoriteDao,callBack=>{this.refs.toast.show('已经加载到底部了。。。')})
    }else{
      onLoadTrendingData(this.storeName,url,pageSize,favoriteDao);
    }
  }
  genFetchUrl(key){
    if(key==='All'){
      return URL+'?'+this.timeSpan.searchText
    }
    return URL+key+'?'+this.timeSpan.searchText
  }
  _store(){
    const {trending}=this.props;
    let store=trending[this.storeName];
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
  renderItem(data){
    const item=data.item;
    return <TrendingItem projectModel={item} 
    onSelect={(callback)=>{
      NavigatorUtil.gotoPage({projectModel:item,flag:FLAG_STORAGE.flag_trending,callback},'DetailPage')
    }}
    onFavorite={(item,isFavoriter)=>{FavoriteUtil.onFavorite(favoriteDao,item,isFavoriter,FLAG_STORAGE.flag_trending)}}
    ></TrendingItem>
  }
  genIndicator(){
    return this._store().hideLoadingMore?null:<View style={{alignItems:'center'}}>
      <ActivityIndicator style={{color:'red',margin:10}}></ActivityIndicator>
      <Text>正在加载更多</Text>
    </View>
  }
  render(){
    let store=this._store();
    return(
      <View style={styles.container}>
        <FlatList
          data={store.projectModels}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+(item.item.fullName)}
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
};
const mapStateToProps=state=>({
  trending:state.trending
});
const mapActionToProps=dispatch=>({
  onLoadTrendingData:(storeName,url,pageSize,favoriteDao)=>dispatch(actions.onLoadTrendingData(storeName,url,pageSize,favoriteDao)),
  onLoadMoreTrending:(storeName,pageIndex,pageSize,items,favoriteDao,callBack)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,favoriteDao,callBack))
})
const TrendingTabPage= connect(mapStateToProps,mapActionToProps)(TrendingTab);
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
