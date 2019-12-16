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
import FavoriteDao from "../expand/dao/FavoriteDao";
const THEME_COLOR='#678';
import ViewUtil from '../util/viewUtil'
const TRENDING_URL='https://github.com/'
import NavigatorUtil from '../navigator/NavigatorUtil'
export default class DetailPage extends Component{
  constructor(props){
    super(props);
    this.params=this.props.navigation.state.params;
    const {projectModel,flag}=this.params;
    this.favoriteDao=new FavoriteDao(flag)
    this.url=projectModel.item.html_url||TRENDING_URL+projectModel.item.fullName;
    this.title=projectModel.item.fullName||projectModel.item.full_name;
    this.state={
      url:this.url,
      title:this.title,
      canGoBack:false,
      isFavorite:projectModel.isFavorite
    }
  }
  onBack(){
    if(this.state.canGoBack){
      this.webView.goBack()
    }else{
      NavigatorUtil.goBack(this.props.navigation);
    }
  }
  onButtonFavoriteClick(){
    const {projectModel,callback}=this.params;
    const isFavorite=projectModel.isFavorite=!projectModel.isFavorite;
    callback(isFavorite);
    this.setState({
      isFavorite:isFavorite
    })
    let key=projectModel.item.fullName?projectModel.item.fullName:projectModel.item.id.toString();
    if(projectModel.isFavorite){
      this.favoriteDao.saveFavoriteItem(key,JSON.stringify(projectModel));
    }else{
      this.favoriteDao.removeFavoriteItem(key)
    }
  }
  renderRightButton(){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={()=>{this.onButtonFavoriteClick()}}
          >
            <FontAwesome
               name={this.state.isFavorite?'star':'star-o'}
              size={20}
              style={{color:'white',marginRight:10}}
            >
            </FontAwesome>
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

