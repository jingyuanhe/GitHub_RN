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
  onClcik(MENU){

  }
  render(){
    const statusBar={
      backgroundColor:THEME_COLOR
    }
    const navigationBar=<NavigationBar title={'我的'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}} rightButton={this.getRightButton()} leftButton={this.getLeftButton()}></NavigationBar>
    return (
      <View style={styles.container}>
        {navigationBar}
        <ScrollView>
          <TouchableOpacity
            onPress={()=>this.onClick(MORE_MENU.About)}
          >
            <View style={styles.about_left}>
              <Ionicons
                name={MORE_MENU.About.name}
                size={40}
                style={{marginRight:10,color:THEME_COLOR}}
              ></Ionicons>
              <Text>Github Popular</Text>
            </View>
          
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
      flex:1
  }
  about_left{
    flexD
  }
});
const mapActionToProps=dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapActionToProps)(MyPage);
