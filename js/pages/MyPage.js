import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import actions from "../action/index";
import {connect} from "react-redux";
const MyPage: () => React$Node = (props) => {
  return (
    <View style={styles.container}>
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
      flex:1,
      justifyContent:'center',
      backgroundColor:'#f5fcff',
      alignItems:'center'
  }
});
const mapActionToProps=dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapActionToProps)(MyPage);
