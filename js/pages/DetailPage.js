import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {WebView} from 'react-native-webview'
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationBar from "../common/NavigationBar";
const THEME_COLOR='#678';
import ViewUtil from '../util/viewUtil'
const TRENDING_URL='https://github.com/'
import NavigatorUtil from '../navigator/NavigatorUtil'
export default class DetailPage extends Component{
  constructor(props){
    super(props);
    this.params=this.props.navigation.state.params;
    const {projectModel}=this.params;
    this.url=projectModel.html_url||TRENDING_URL+projectModel.fullName;
    this.title=projectModel.fullName||projectModel.full_name;
    this.state={
      url:this.url,
      title:this.title,
      canGoBack:false
    }
  }
  onBack(){
    if(this.state.canGoBack){
      this.webView.goBack()
    }else{
      NavigatorUtil.goBack(this.props.navigation);
    }
  }
  renderRightButton(){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={()=>{}}
          >
            <AntDesign
              name={'staro'}
              size={20}
              style={{color:'white',marginRight:10}}
            >
            </AntDesign>
          </TouchableOpacity>
          {ViewUtil.getShareButton(()=>{})}
        </View>
      )
  }
  onNavigationStateChange(navState){
    this.setState({
      url:navState.url,
      canGoBack:navState.canGoBack
    })
  }
  render(){
    const titleLayoutStyle=this.state.title.length>20?{paddingRight:30}:null
    const navigationBar=<NavigationBar title={this.state.title} style={{backgroundColor:THEME_COLOR}} leftButton={ViewUtil.getLeftBackButton(()=>{this.onBack()})} rightButton={this.renderRightButton()} titleLayoutStyle={titleLayoutStyle}></NavigationBar>
    return (
      <View style={styles.container}>
          {navigationBar}
          <WebView
            ref={webView=>this.webView=webView}
            startInLoadingState={true}
            onNavigationStateChange={e=>this.onNavigationStateChange(e)}
            source={{uri:this.state.url}}
          >

          </WebView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
      flex:1
  }
});

