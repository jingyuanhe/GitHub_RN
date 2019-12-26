import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  Linking
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
import NavigatorUtil from '../navigator/NavigatorUtil'
import { FLAG_LANGUAGE } from '../expand/dao/LanguageDao';
class MyPage extends Component{
  onClick(menu){
    let RouterName,params={};
    switch(menu){
      case MORE_MENU.Tutorial:
        RouterName='WebViewPage';
        params.title='教程';
        params.url='https://coding.m.imooc.com/classindex.html?cid=89';
        break;
      case MORE_MENU.About:
        RouterName='AboutPage';
        break;
      case MORE_MENU.About_Author:
        RouterName='AboutMePage';
        break;
      case MORE_MENU.Sort_Key:
        RouterName='SortKeyPage';
        params.flag=FLAG_LANGUAGE.flag_key;
        break;
      case MORE_MENU.Sort_Language:
        RouterName='SortKeyPage';
        params.flag=FLAG_LANGUAGE.flag_language;
        break;  
      case MORE_MENU.Custom_Language:
      case MORE_MENU.Custom_Key:
      case MORE_MENU.Remove_Key:
        RouterName='CustomKeyPage';
        params.isRemoveKey=menu===MORE_MENU.Remove_Key;
        params.flag=menu!==MORE_MENU.Custom_Language?FLAG_LANGUAGE.flag_key:FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.Feedback:
        let url='mailto:389026847@qq.com';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
        break;  
    }
    if(RouterName){
      NavigatorUtil.gotoPage(params,RouterName)
    }
  }
  getItem(menu){
    return viewUtil.getMenuItem(()=>this.onClick(menu),menu,THEME_COLOR)
  }
  render(){
    const statusBar={
      backgroundColor:THEME_COLOR
    }
    const navigationBar=<NavigationBar title={'我的'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
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
          {this.getItem(MORE_MENU.Sort_Key)}
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
