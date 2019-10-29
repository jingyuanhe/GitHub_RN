import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

const FavoritePage: () => React$Node = (props) => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>
        <Button 
          title='改变主题颜色'
          onPress={()=>{
          props.navigation.setParams({theme:{tintColor: 'blue'}})
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

export default FavoritePage;
