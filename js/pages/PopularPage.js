import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const PopularPage: () => React$Node = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage</Text>
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

export default PopularPage;
