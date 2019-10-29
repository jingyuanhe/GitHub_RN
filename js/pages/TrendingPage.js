import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

const TrendingPage: () => React$Node = (props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>TrendingPage</Text>
        <Button 
          title='改变主题颜色'
          onPress={()=>{
          props.navigation.setParams({theme:{tintColor: 'red'}})
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

export default TrendingPage;
