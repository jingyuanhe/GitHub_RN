import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { AsyncStorage } from "react-native"
const KEY='searchValue'
const AsyncStorageDemoPage: () => React$Node = () => {
    const [showValue,setText]=useState('');
    const [value,setValue]=useState('');
    async function doSave(){
      try{
        await AsyncStorage.setItem(KEY,value)
      }catch(err){
        alert(err)
      }
    }
    async function getData(){
      try{
        const saveValue=await AsyncStorage.getItem(KEY);
        setText(saveValue);
      }catch(err){
        alert(err)
      }
    }
    async function delData(){
      try{
        await AsyncStorage.removeItem(KEY);
        setText('')
      }catch(err){
        alert(err)
      }
    }
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>获取AsyncStorage</Text>
        <TextInput style={styles.input} onChangeText={text=>setValue(text)}></TextInput>
        <View style={styles.input_con}>
           <Text style={styles.text} onPress={()=>doSave()}>存储</Text>
           <Text style={styles.text} onPress={()=>getData()}>获取</Text>
           <Text style={styles.text} onPress={()=>delData()}>删除</Text>
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
      paddingTop:5,
      width:200,
      marginBottom:20
  },
  input_con:{
      flexDirection:'row',
      alignItems:'center'
  },
  text:{
    marginLeft:20
  }
});

export default AsyncStorageDemoPage;
