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
import PopularItem from "../common/PopularItem";
const THEME_COLOR='#678';
const pageSize=10;
const statusBar={
  backgroundColor:THEME_COLOR
}
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'

class TrendingPage extends Component{
  constructor(props){
    super(props);
    this.state={
      TimeSpan:TimeSpans[0]
    };
    const {tabLabel}=this.props;
    this.storeName=tabLabel;
    this.tabNames=['All','C','C++','PHP','Javascript'];
  }
  _GetTabs(){
    const tabs={}
    this.tabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        screen:props=><TrendTabPage {...props} tabLabel={item}/>,
        navigationOptions:{
          title:item
        }
      }
    })
    return tabs
  }
  componentDidMount(){
    this.loadData();
  }
  loadData(loadMore){
    const {onLoadTrendingData,onLoadMoreTrending}=this.props;
    const url=this.genFetchUrl(this.storeName);
    if(loadMore){
      onLoadMoreTrending(this.storeName,++this._store().pageIndex,pageSize,this._store().items,callBack=>{alert('没有更多')})
    }else{
      onLoadTrendingData(this.storeName,url,pageSize);
    }
  }
  genFetchUrl(storeName){
    return URL+this.storeName+QUERY_STR;
  }
  renderItem(data){
    const item=data.item;
    return <PopularItem item={item} onSelect={()=>{}}></PopularItem>
  }
  genIndicator(){
    return this._store().hideLoadingMore?null:<View style={{alignItems:'center'}}>
      <ActivityIndicator style={{color:'red',margin:10}}></ActivityIndicator>
      <Text>正在加载更多</Text>
    </View>
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
    return store;
  }
  renderTrendingDialog(){
    return <TrendingDiaLog ref={dialog=>this.dialog=dialog}
              onSelect={tab=>this.onSelectTimeSpan(tab)}
    ></TrendingDiaLog>
  }
  render(){
    const navigationBar=<NavigationBar titleView={this.renderTitleView()} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
    return (
      <View style={styles.container}>
        {navigationBar}
      <FlatList
        data={this._store().projectModes}
        renderItem={data=>renderItem(data)}
        keyExtractor={item=>""+item.id}
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
        {this.renderTrendingDialog()} 
      </View>
    );
  }
};
const mapStateToProps=state=>({
  trending:state.trending
});
const mapActionToProps=dispatch=>({
  onLoadTrendingData:(storeName,url,pageSize)=>dispatch(actions.onLoadTrendingData(storeName,url,pageSize)),
  onLoadMoreTrending:(storeName,pageIndex,pageSize,items,callBack)=>dispatch(actions.onLoadMoreTrending(storeName,pageIndex,pageSize,items,callBack))
})
const TrendTabPage= connect(mapStateToProps,mapActionToProps)(TrendingPage);
export default TrendTabPage
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
