import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

const AsyncStorageDemoPage: () => React$Node = () => {
    const [showValue,setText]=useState('');
    const [value,setValue]=useState('');
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>获取AsyncStorage</Text>
        <TextInput style={styles.input} onChangeText={text=>setValue(text)}></TextInput>
        <View style={styles.input_con}>
           <Text>存储</Text>
           <Text>获取</Text>
           <Text>删除</Text>
        </View>
        <View>
            <Text>{showValue}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#f5fcff',
      alignItems:'center'
  },
  input:{
      height:30,
      borderColor:'#000',
      borderWidth:1,
      marginLeft:30,
      lineHeight:30,
      paddingTop:5
  },
  input_con:{
      flexDirection:'row',
      alignItems:'center'
  }
});

export default AsyncStorageDemoPage;
