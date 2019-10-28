import React,{useEffect,useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil'
const WelcomePage: () => React$Node = (props) => {
    let [timer,setTimer]=useState(null);
    useEffect(()=>{

        timer=setTimeout(()=>{
            NavigatorUtil.resetToHomePage(props);
        },200)
        return function cleanup(){
            timer&&clearTimeout(timer);
        }
    })
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>WelcomePage</Text>
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

export default WelcomePage;
