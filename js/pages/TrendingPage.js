import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl
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
const THEME_COLOR='#678';
const pageSize=10;
const statusBar={
  backgroundColor:THEME_COLOR
}
const URL='https://github.com/trending/';
const QUERY_STR='&sort=stars'

export default class TrendingPage extends Component{
  constructor(props){
    super(props);
    this.state={
      TimeSpan:TimeSpans[0]
    };
    const {tabLabel}=this.props;
    this.storeName=tabLabel;
    this.tabNames=['All','C','C++','PHP','Javascript'];
  }
  _getTabs(){
    const tabs={}
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        screen:props=><TrendingTabPage {...props} tabLabel={item}/>,
        navigationOptions:{
          title:item
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
    })
  }
  renderTrendingDialog(){
    return <TrendingDiaLog ref={dialog=>this.dialog=dialog}
              onSelect={tab=>this.onSelectTimeSpan(tab)}
    ></TrendingDiaLog>
  }
  render(){
    const navigationBar=<NavigationBar titleView={this.renderTitleView()} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
    const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
      this._getTabs(),{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          scrollEnabled:true,
          upperCaseLabel:false,
          indicatorStyle:styles.indicatorStyle,
          labelStyle:styles.labelStyle
        }
      }
    ))
    return (
      <View style={{flex:1,marginTop:0}}>
          {navigationBar}
          <TabNavigator></TabNavigator>
        
      </View>
    );
  }
};
class TrendingTab extends Component{
  constructor(props){
    super(props);
    const {tabLabel}=this.props;
    this.storeName=tabLabel;
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(loadMore){
    const {onLoadTrendingData,onLoadMoreTrending}=this.props;
    const url=this.genFetchUrl(this.storeName);
    if(loadMore){
      onLoadMoreTrending(this.storeName,++this._store().pageIndex,pageSize,this._store().items,callBack=>{this.refs.toast.show('已经加载到底部了。。。')})
    }else{
      onLoadTrendingData(this.storeName,url,pageSize);
    }
  }
  genFetchUrl(key){
    if(key==='All'){
      return URL+'?since=daily'
    }
    return URL+key+'?since=daily'
  }
  _store(){
    const {trending}=this.props;
    let store=trending[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
        projectModes:[],
        hideLoadingMore:true
      }
    }
    return store
  }
  renderItem(data){
    const item=data.item;
    return <TrendingItem item={item} onSelect={()=>{}}></TrendingItem>
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
          data={store.projectModes}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+(item.fullName)}
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
  onLoadTrendingData:(storeName,url,pageSize)=>dispatch(actions.onLoadTrendingData(storeName,url,pageSize)),
  onLoadMoreTrending:(storeName,pageIndex,pageSize,items,callBack)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,callBack))
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
