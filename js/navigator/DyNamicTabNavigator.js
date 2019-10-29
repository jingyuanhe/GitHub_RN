import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator,BottomTabBar } from 'react-navigation-tabs';
import PopularPage from "../pages/PopularPage";
import TrendingPage from "../pages/TrendingPage";
import FavoritePage from "../pages/FavoritePage";
import MyPage from "../pages/MyPage";
import TrendingIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigatorUtil from '../navigator/NavigatorUtil'
const DyNamicTabNavigator: () => React$Node = (props) => {
    const tabs={
        PopularPage:{
            screen:PopularPage,
            navigationOptions:{
              tabBarLabel:'最热',
              tabBarIcon:({focused,tintColor})=>(
                <MaterialIcons
                  name={"whatshot"}
                  size={27}
                  style={{color:tintColor}}
                >
                </MaterialIcons>
              )
            }
          },
          TrendingPage:{
            screen:TrendingPage,
            navigationOptions:{
              tabBarLabel:'趋势',
              tabBarIcon:({focused, tintColor})=>(
                <TrendingIcon
                  name={"trending-up"}
                  size={27}
                  style={{color:tintColor}}
                >
    
                </TrendingIcon>
              )
            }
          },
          FavoritePage:{
            screen:FavoritePage,
            navigationOptions:{
              tabBarLabel:'最爱',
              tabBarIcon:({focused,tintColor})=>(
                <MaterialIcons
                  name={"favorite"}
                  size={27}
                  style={{color:tintColor}}
                >
    
                </MaterialIcons>
              )
            }
          },
          MyPage:{
            screen:MyPage,
            navigationOptions:{
              tabBarLabel:'我的',
              tabBarIcon:({focused,tintColor})=>(
                <AntDesign
                  name={"user"}
                  size={27}
                  style={{color:tintColor}}
                >
    
                </AntDesign>
              )
            }
          }
    }
    function _tabNavigator(){
        const {PopularPage,TrendingPage,FavoritePage,MyPage}=tabs;
        const showTabs={PopularPage,TrendingPage,FavoritePage}
    return createBottomTabNavigator(showTabs,{
      initialRouteName: 'PopularPage',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#694fad' },
      tabBarComponent:props=>(<TabBarComponent {...props}></TabBarComponent>)
    })
  }
  NavigatorUtil.navigation=props.navigation;
  const Tab=createAppContainer(_tabNavigator());
  return (
    <Tab />
  );
};
const TabBarComponent = props => {
let theme={
    tintColor:props.activeTintColor
}
const {routes,index}=props.navigation.state;
if(routes[index].params){
    if(routes[index].params.theme){
        theme=routes[index].params.theme
    }
    
}
return <BottomTabBar {...props} activeTintColor={theme.tintColor||props.tintColor}/>};
const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#f5fcff',
      alignItems:'center'
  }
});

export default DyNamicTabNavigator;
