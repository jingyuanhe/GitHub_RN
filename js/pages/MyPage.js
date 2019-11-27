import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import actions from "../action/index";
import {connect} from "react-redux";
import NavigationBar from "../common/NavigationBar";
import AntDesign from "react-native-vector-icons/AntDesign";
const THEME_COLOR='#678'
const MyPage: () => React$Node = (props) => {
  function getRightButton(){
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
  function getLeftButton(){
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
  const statusBar={
    backgroundColor:THEME_COLOR
  }
  const navigationBar=<NavigationBar title={'我的'} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}} rightButton={getRightButton()} leftButton={getLeftButton()}></NavigationBar>
  return (
    
    <View style={styles.container}>
      {navigationBar}
        <Text style={styles.welcome}>MyPage</Text>
        <Button 
          title='改变主题颜色'
          onPress={()=>{
            props.onThemeChange('#0f0')
        }}></Button>
        <Text onPress={()=>{NavigatorUtil.gotoPage({},'DetailPage')}}>跳转到详情</Text>
      <Button
        title='跳转到fetch'
        onPress={()=>{NavigatorUtil.gotoPage({},'FetchDemoPage')}}
      />
       <Button
        title='跳转到AsyncStorage'
        onPress={()=>{NavigatorUtil.gotoPage({},'AsyncStorageDemoPage')}}
      />
      <Button
        title='跳转到DataStoreDemoPage'
        onPress={()=>{NavigatorUtil.gotoPage({},'DataStoreDemoPage')}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1
  }
});
const mapActionToProps=dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapActionToProps)(MyPage);
