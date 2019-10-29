import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil'
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
const PopularPage: () => React$Node = () => {
  const TabNames=['Android','ios','React','Vue','React Native'];
  function _GetTabs(){
    const tabs={}
    TabNames.forEach((item,index)=>{
      tabs[`tab${index}`]={
        screen:props=><TopNavigator {...props} tabLabel={item}/>,
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
  return (
    <View style={{flex:1,marginTop:0}}>
        <TabNavigator></TabNavigator>
    </View>
  );
};
function TopNavigator(props){
  const {tabLabel}=props;
  return(
    <View style={styles.container}>
      <Text style={styles.welcome}>{tabLabel}</Text>
      <Text onPress={()=>{NavigatorUtil.gotoPage({},'DetailPage')}}>跳转到详情</Text>
    </View>
  )
}
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
  indicatorStyle:{
    backgroundColor:'#fff'
  },
  labelStyle:{
    fontSize:13
  }
});

export default PopularPage;
