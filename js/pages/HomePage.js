import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PopularPage from "./PopularPage";
import TrendingPage from "./TrendingPage";
import FavoritePage from "./FavoritePage";
import MyPage from "./MyPage";
import TrendingIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigatorUtil from '../navigator/NavigatorUtil'
import DyNamicTabNavigator from "../navigator/DyNamicTabNavigator";
const HomePage: () => React$Node = (props) => {
 
  NavigatorUtil.navigation=props.navigation;
  return (
    <DyNamicTabNavigator />
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#f5fcff',
      alignItems:'center'
  }
});

export default HomePage;
