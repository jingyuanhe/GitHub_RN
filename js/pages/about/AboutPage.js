import React, { Component } from 'react';
import {View,Linking} from 'react-native';
import {MORE_MENU} from '../../common/MoreMenu'
import GlobalStyles from "../../res/GlobalStyles";
import viewUtil from "../../util/viewUtil";
import NavigatorUtil from '../../navigator/NavigatorUtil'
import AboutCommon,{FLAG_ABOUT} from './AboutCommon'
import config from '../../res/data/config.json'
const THEME_COLOR='#678'
export default class AboutPage extends Component{
  constructor(props){
      super(props);
      this.params=this.props.navigation.state.params;
      this.aboutCommon=new AboutCommon({
          ...this.params,
          navigation:this.props.navigation,
          flagAbout:FLAG_ABOUT.flag_about
      },data=>this.setState({...data}));
      this.state={
        data:config
      }
  }
  onClick(menu){
    let RouterName,params={};
    switch(menu){
      case MORE_MENU.Tutorial:
        RouterName='WebViewPage';
        params.title='教程';
        params.url='https://coding.m.imooc.com/classindex.html?cid=89';
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
        case MORE_MENU.About_Author:
            RouterName='AboutMePage';
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
    const content=<View>
         {this.getItem(MORE_MENU.Tutorial)}
         <View style={GlobalStyles.line}></View>
         {this.getItem(MORE_MENU.About_Author)}
         <View style={GlobalStyles.line}></View>
         {this.getItem(MORE_MENU.Feedback)}
    </View>
    return this.aboutCommon.render(content,this.state.data.app)
  }
}