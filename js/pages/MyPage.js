import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import actions from "../action/index";
import {connect} from "react-redux";
import NavigationBar from "../common/NavigationBar";
import AntDesign from "react-native-vector-icons/AntDesign";
const THEME_COLOR='#678'
import {MORE_MENU} from '../common/MoreMenu'
import Ionicons from 'react-native-vector-icons/Ionicons'
import GlobalStyles from "../res/GlobalStyles";
import viewUtil from "../util/viewUtil";
class MyPage extends Component{
  getRightButton(){
    return(
      <TouchableOpacity onPress={()=>{}}>
        <View style={{padding:5,marginRight:8}}>
          <AntDesign
            name={'search1'}
            size={24}
            style={{color:'#fff'}}
          >

          </AntDesign>
        </View>
      </TouchableOpacity>
    )
  }
  getLeftButton(){
    return(
      <TouchableOpacity onPress={()=>{}}>
        <View style={{padding:5,marginLeft:12}}>
          <AntDesign
            name={'left'}
            size={24}
            style={{color:'#fff'}}
          >
          </AntDesign>
        </View>
      </TouchableOpacity>
      
    )
  }
  onClick(menu){

  }
  getItem(menu){
    return viewUtil.getMenuItem(()=>this.onClick(menu),menu,THEME_COLOR)
  }
  render(){
    const statusBar={
      backgroundColor:THEME_COLOR
    }
    const navigationBar=<NavigationBar title={'我的'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}} rightButton={this.getRightButton()} leftButton={this.getLeftButton()}></NavigationBar>
    return (
      <View style={GlobalStyles.root_container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity
            onPress={()=>this.onClick(MORE_MENU.About)}
            style={styles.item}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.About.icon}
                size={40}
                style={{marginRight:10,color:THEME_COLOR}}
              ></Ionicons>
              <Text>Github Popular</Text>
            </View>
            <Ionicons
                name={'ios-arrow-forward'}
                size={16}
                style={{marginRight:10,color:THEME_COLOR,alignSelf:'center'}}
              ></Ionicons>
          </TouchableOpacity>
          <View style={GlobalStyles.line}></View>
          {this.getItem(MORE_MENU.Tutorial)}
          <Text style={styles.groupTitle}>趋势管理</Text>
          {this.getItem(MORE_MENU.Custom_Language)}
          <View style={GlobalStyles.line}></View>
          {this.getItem(MORE_MENU.Sort_Language)}
          <Text style={styles.groupTitle}>最热管理</Text>
          {this.getItem(MORE_MENU.Custom_Key)}
          <View style={GlobalStyles.line}></View>
          {this.getItem(MORE_MENU.Remove_Key)}
          <Text style={styles.groupTitle}>设置</Text>
          {this.getItem(MORE_MENU.Custom_Theme)}
          <View style={GlobalStyles.line}></View>
          {this.getItem(MORE_MENU.About_Author)}
          <View style={GlobalStyles.line}></View>
          {this.getItem(MORE_MENU.Feedback)}
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  about_left:{
    flexDirection:'row',
    alignItems:'center'
  },
  item:{
    backgroundColor:'#fff',
    padding:10,
    height:90,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  groupTitle:{
    fontSize:12,
    marginRight:10,
    marginLeft:10,
    marginBottom:5,
    marginTop:5,
    color:'grey'
  }
});
const mapActionToProps=dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapActionToProps)(MyPage);
