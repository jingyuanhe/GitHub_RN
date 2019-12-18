import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {WebView} from 'react-native-webview'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import NavigationBar from "../common/NavigationBar";
const THEME_COLOR='#678';
import ViewUtil from '../util/viewUtil'
import NavigatorUtil from '../navigator/NavigatorUtil'
export default class WebViewPage extends Component{
  constructor(props){
    super(props);
    this.params=this.props.navigation.state.params;
    const {url,title}=this.params;
    this.state={
      url:url,
      title:title,
      canGoBack:false,
    }
  }
  onBack(){
    if(this.state.canGoBack){
      this.webView.goBack()
    }else{
      NavigatorUtil.goBack(this.props.navigation);
    }
  }
  onNavigationStateChange(navState){
    this.setState({
      url:navState.url,
      canGoBack:navState.canGoBack
    })
  }
  render(){
    const titleLayoutStyle=this.state.title.length>20?{paddingRight:30}:null
    const navigationBar=<NavigationBar title={this.state.title} style={{backgroundColor:THEME_COLOR}} leftButton={ViewUtil.getLeftBackButton(()=>{this.onBack()})}></NavigationBar>
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

