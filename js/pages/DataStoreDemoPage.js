import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';
import { AsyncStorage } from "react-native"
import DataStore from "../expand/dao/DataStore";
const getData=new DataStore();
const DataStoreDemoPage: () => React$Node = () => {
    const [showValue,setText]=useState('');
    const [value,setValue]=useState('');
    
    function loadData(){
        let url=`https://api.github.com/search/repositories?q=${value}`;
        //alert(url)
        getData.fetchData(url)
        .then(data=>{
            setText(`首次获取数据时间${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`)
        })
    }
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>离线缓存框架</Text>
        <TextInput style={styles.input} onChangeText={text=>setValue(text)}></TextInput>
        <Text onPress={()=>loadData()}>
            获取
        </Text>
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

export default DataStoreDemoPage;
