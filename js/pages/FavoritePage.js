import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const FavoritePage: () => React$Node = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>FavoritePage</Text>
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
