import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import PopularPage from "./PopularPage";
import TrendingPage from "./TrendingPage";
import FavoritePage from "./FavoritePage";
import MyPage from "./MyPage";
import TrendingIcon from 'react-native-vector-icons/MaterialCommunityIcons'
const HomePage: () => React$Node = () => {
  function _tabNavigator(){
    return createBottomTabNavigator({
      PopularPage:{
        screen:PopularPage,
        navigationOptions:{
          tabBarLabel:'PopularPage'
        }
      },
      TrendingPage:{
        screen:TrendingPage,
        navigationOptions:{
          tabBarLabel:'TrendingPage',
          tabBarIcon:({focused, tintColor})=>(
            <TrendingIcon
              name={"trending-up"}
              size={27}
              style={{color:tintColor}}
            >

            </TrendingIcon>
          )
        }
      },
      FavoritePage:{
        screen:FavoritePage,
        navigationOptions:{
          tabBarLabel:'FavoritePage'
        }
      },
      MyPage:{
        screen:MyPage,
        navigationOptions:{
          tabBarLabel:'MyPage'
        }
      }
    },{
      initialRouteName: 'MyPage',
      activeColor: '#f0edf6',
      inactiveColor: '#3e2465',
      barStyle: { backgroundColor: '#694fad' },
    })
  }
  const Tab=createAppContainer(_tabNavigator());
  return (
    <Tab />
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

export default HomePage;
