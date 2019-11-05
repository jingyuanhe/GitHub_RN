import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import { connect } from 'react-redux';
import actions from "../action/index";

const TrendingPage: () => React$Node = (props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage</Text>
        <Button 
          title='改变主题颜色'
          onPress={()=>{
            props.onThemeChange('#f00')
        }}></Button>
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
export default connect(null,mapActionToProps)(TrendingPage);
