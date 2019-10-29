import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

const MyPage: () => React$Node = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>MyPage</Text>
        <Button 
          title='改变主题颜色'
          onPress={()=>{
          props.navigation.setParams({theme:{tintColor: 'green'}})
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

export default MyPage;
