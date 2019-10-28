import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
const PopularPage: () => React$Node = () => {
  const TabNavigator=createAppContainer(createMaterialTopTabNavigator({
    TabNavigator1:{
      screen:TopNavigator,
      navigationOptions:{
        title:'Tab1'
      }
    },
    TabNavigator2:{
      screen:TopNavigator,
      navigationOptions:{
        title:'Tab2'
      }
    }
  }))
  return (
    <View style={{flex:1,marginTop:30}}>
        <TabNavigator></TabNavigator>
    </View>
  );
};
function TopNavigator(props){
  const {tabLabel}=props;
  return(
    <View style={styles.container}>
      <Text style={styles.welcome}>{tabLabel}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#f5fcff',
      alignItems:'center'
  }
});

export default PopularPage;
