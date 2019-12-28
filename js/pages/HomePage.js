import React, { Component } from 'react';
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
import CustomTheme from "./CustomTheme";
import actions from '../action';
class HomePage extends Component{
  onBackPress=()=>{
    const {dispatch, nav} = this.props;
    //if (nav.index === 0) {
    if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
        return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
  componentDidMount(){
    BackHandler.addEventListener("hardwareBackPress",this.onBackPress);
  }
  componentWillUnmount(){
    BackHandler.removeEventListener("hardwareBackPress",this.onBackPress);
  }
  renderCustomThemeView(){
    const {customThemeVisible,onShowCustomThemeView}=this.props;
    return <CustomTheme
      visible={customThemeVisible}
      {...this.props}
      onClose={()=>onShowCustomThemeView(false)}
    >

    </CustomTheme>
  }
  render(){
    NavigatorUtil.navigation=this.props.navigation;
    return (
      <View style={{flex:1}}>
        <DyNamicTabNavigator />
        {this.renderCustomThemeView()}
      </View>
      
    );
  }
}

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
  customThemeVisible:state.theme.customThemeVisible
});
const mapDispatchToProps=dispatch=>({
  onShowCustomThemeView:show=>dispatch(actions.onShowCustomThemeView(show))
})
export default connect(mapStateToProps,mapDispatchToProps)(HomePage);
