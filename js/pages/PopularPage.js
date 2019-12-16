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
export default class PopularPage extends Component{
  constructor(props){
    super(props);
    this.tabNames=['Android','ios','React','Vue','React Native'];
  }
  _GetTabs(){
    const tabs={}
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        screen:props=><PopularTabPage {...props} tabLabel={item}/>,
        navigationOptions:{
          title:item
        }
      }
    })
    return tabs
  }
  render(){
    const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
      this._GetTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          scrollEnabled:true,
          upperCaseLabel:false,
          indicatorStyle:styles.indicatorStyle,
          labelStyle:styles.labelStyle
        }
      }
    ))
    const statusBar={
      backgroundColor:THEME_COLOR
    }
    const navigationBar=<NavigationBar title={'最热'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
    return (
      <View style={{flex:1,marginTop:0}}>
          {navigationBar}
          <TabNavigator></TabNavigator>
      </View>
    );
  }
}
class TopNavigator extends Component{
  constructor(props){
    super(props);
    const {tabLabel}=this.props;
    this.storeName=tabLabel;
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
  loadData(loadMore){
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
  }
  renderItem(data){
    const item=data.item;
    return <PopularItem projectModel={item} 
            onSelect={()=>{
              NavigatorUtil.gotoPage({projectModel:item.item},'DetailPage')
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
  onLoadMorePopular:(storeName,pageIndex,pageSize,items,favoriteDao,callBack)=>dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,favoriteDao,callBack))
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

