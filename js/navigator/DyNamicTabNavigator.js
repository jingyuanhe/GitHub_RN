import React,{Component} from 'react';
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
import {connect} from "react-redux";
import EventBus from 'react-native-event-bus'
import NavigationUtil from '../util/NavigationUtil.js'
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
class TabBarComponent extends Component{
  
  render(){
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme.themeColor}/>
  }
}
class DyNamicTabNavigator extends Component{
    constructor(props){
      super(props);
    }
    _tabNavigator(){
      if(this.Tabs){
        return this.Tabs;
      }
      const {PopularPage,TrendingPage,FavoritePage,MyPage}=tabs;
      const showTabs={PopularPage,TrendingPage,FavoritePage,MyPage}
      const theme=this.props.theme;
      PopularPage.navigationOptions.tabBarLabel = '最热';//动态配置Tab属性
      return this.Tabs=createAppContainer(createBottomTabNavigator(showTabs,{
        tabBarComponent:props=>{
          return <TabBarComponent {...props} theme={theme}></TabBarComponent>
        },
      }))
    }
    render(){
      const Tab=this._tabNavigator();
      return <Tab 
          onNavigationStateChange={(prevState,nextState,action)=>{
            EventBus.getInstance().fireEvent(NavigationUtil.bottom_tab_select, {
              from:prevState.index,
              to:nextState.index
            })
          }}
        />
    }
}

const mapStateToProps=state=>({
  theme:state.theme.theme
})
const mapDispathchToProps=dispatch=>({

})
export default connect(mapStateToProps,mapDispathchToProps)(DyNamicTabNavigator);
