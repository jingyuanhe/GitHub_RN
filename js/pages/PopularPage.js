import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  RefreshControl
} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil'
import NavigationBar from "../common/NavigationBar";
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {connect} from 'react-redux'
import actions from '../action/index'
import { useState, useEffect } from 'react';
import PopularItem from "../common/PopularItem";
const URL='https://api.github.com/search/repositories?q=';
const QUERY_STR='&sort=stars'
const THEME_COLOR='#678'
const pageSize=10;
const PopularPage: () => React$Node = () => {
  const TabNames=['Android','ios','React','Vue','React Native'];
  function _GetTabs(){
    const tabs={}
    TabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        screen:props=><PopularTabPage {...props} tabLabel={item}/>,
        navigationOptions:{
          title:item
        }
      }
    })
    return tabs
  }
  const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
    _GetTabs(),{
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
  const navigationBar=<NavigationBar title={'最热'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}>

  </NavigationBar>
  return (
    <View style={{flex:1,marginTop:0}}>
        {navigationBar}
        <TabNavigator></TabNavigator>
    </View>
  );
};

function TopNavigator(props){
  const {tabLabel,popular}=props;
  const storeName=tabLabel;
  function genFetchUrl(storeName){
    return URL+storeName+QUERY_STR;
  }
  function loadData(loadMore){
    const {onLoadPopularData,onLoadMorePopular}=props;
    if(loadMore){
      onLoadMorePopular(storeName)
    }else{
      onLoadPopularData(storeName,url);
    }
    const url=genFetchUrl(storeName);
   
  }
  useEffect(() => {
    loadData();
  },[]);
  let store=popular[storeName];
  if(!store){
    store={
      items:[],
      isLoading:false,
      projectModes:[],
      hideLoadingMore:true
    }
  }
  function renderItem(data){
    const item=data.item;
    return <PopularItem item={item} onSelect={()=>{}}></PopularItem>
  }
  return(
    <View style={styles.container}>
      <FlatList
        data={store.items}
        renderItem={data=>renderItem(data)}
        refreshControl={
          <RefreshControl
            title='loading'
            refreshing={store.isLoading}
            onRefresh={()=>loadData()}
          >

          </RefreshControl>
        }
      >

      </FlatList>
    </View>
  )
}
const mapStateToProps=state=>({
  popular:state.popular
});
const mapDispatchToProps=dispatch=>({
  onLoadPopularData:(storeName,url,pageSize)=>dispatch(actions.onLoadPopularData(storeName,url,pageSize)),
  onLoadMorePopular:(storeName,pageIndex,pageSize,items,callBack)=>dispatch(actions.onLoadMorePopular(storeName,pageIndex,pageSize,items,callBack))
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

export default PopularPage;
