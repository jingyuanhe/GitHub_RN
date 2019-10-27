import React,{useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
const WelcomePage: () => React$Node = () => {
    useEffect(()=>{
        
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
