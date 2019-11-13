import React,{useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

const FetchDemoPage: () => React$Node = () => {
    const [showValue,setText]=useState('123');
    const [value,setValue]=useState('');
    function handleSearch(){
        let url=`https://api.github.com/search/repositories?q=${value}`
        fetch(url)
            .then(response=>{
                if(response.ok){
                    return response.text()
                }else{
                    throw new Error('response is not ok')
                }
            })
            .then(result=>{
                setText(result)
            })
            .catch(err=>{
                setText(err.toString())
            })
    }
    return (
    <View style={styles.container}>
        <Text style={styles.welcome}>获取Fetch</Text>
        <View style={styles.input_con}>
            <TextInput style={styles.input} onChangeText={text=>setValue(text)}></TextInput>
            <Button title="搜索" onPress={()=>{handleSearch()}}></Button>
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
      flex:1,
      marginLeft:30,
      lineHeight:30,
      paddingTop:5
  },
  input_con:{
      flexDirection:'row',
      alignItems:'center'
  }
});

export default FetchDemoPage;
