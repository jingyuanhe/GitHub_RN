import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil'
import DyNamicTabNavigator from "../navigator/DyNamicTabNavigator";
import {BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
const HomePage: () => React$Node = (props) => {
  useEffect(() => {
    onBackPress = () => {
      const {dispatch, nav} = props;
      //if (nav.index === 0) {
      if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
          return false;
      }
      dispatch(NavigationActions.back());
      return true;
  };

    BackHandler.addEventListener("hardwareBackPress",onBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress",onBackPress);
    };
  });
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

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(HomePage);
