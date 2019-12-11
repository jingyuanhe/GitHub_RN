import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import NavigationBar from "../common/NavigationBar";
const THEME_COLOR='#678';
import ViewUtil from '../util/viewUtil'
const TRENDING_URL='https://github.com/'
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

  }
  renderRightButton(){
      return (
        <View style={{flexDirection:'row'}}>
          <TouchableOpacity
            onPress={()=>{}}
          >
            <AntDesign
              name={'star-o'}
              size={20}
              style={{color:'white',marginRight:10}}
            >
            </AntDesign>
          </TouchableOpacity>
          {ViewUtil.getShareButton(()=>{})}
        </View>
      )
  }
  render(){
    const navigationBar=<NavigationBar title={this.state.title} style={{backgroundColor:THEME_COLOR}} leftButton={ViewUtil.getLeftBackButton(()=>{this.onBack()})} rightButton={this.renderRightButton()}></NavigationBar>
    return (
      <View style={styles.container}>
          {navigationBar}
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

