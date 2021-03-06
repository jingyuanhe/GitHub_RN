import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import NavigatorUtil from '../navigator/NavigatorUtil'
import NavigationBar from "../common/NavigationBar";
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import {connect} from 'react-redux'
import actions from '../action/index'
import PopularItem from "../common/PopularItem";
import TrendingItem from "../common/TrendingItem";
import FavoriteDao from "../expand/dao/FavoriteDao";
import {FLAG_STORAGE} from "../expand/dao/DataStore";
const THEME_COLOR='#678'
import Toast, {DURATION} from 'react-native-easy-toast'
import FavoriteUtil from "../util/FavoriteUtil";
import EventBus from 'react-native-event-bus'
import NavigationUtil from '../util/NavigationUtil.js'
class FavoritePage extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const {theme}=this.props;
    const TabNavigator=createAppContainer(createMaterialTopTabNavigator(
      {
        'Popular':{
          screen:props=><FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} theme={theme}/>,
          navigationOptions:{
            title:'最热'
          }
        },
        'Trending':{
          screen:props=><FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} theme={theme}/>,
          navigationOptions:{
            title:'趋势'
          }
        }
      },{
        tabBarOptions:{
          tabStyle:styles.tabStyle,
          upperCaseLabel:false,
          indicatorStyle:styles.indicatorStyle,
          labelStyle:styles.labelStyle,
          style:{
            backgroundColor:theme.themeColor
          },
        }
      }
    ))
    const statusBar={
      backgroundColor:theme.themeColor
    }
    const navigationBar=<NavigationBar title={'收藏'} statusBar={statusBar} style={theme.styles.navBar}></NavigationBar>
    return (
      <View style={{flex:1,marginTop:0}}>
          {navigationBar}
          <TabNavigator></TabNavigator>
      </View>
    );
  }
}
const mapFavoriteStateToProps=state=>({
  theme:state.theme.theme
});
const mapFavoriteDispatchToProps=dispatch=>({
})
export default connect(mapFavoriteStateToProps,mapFavoriteDispatchToProps)(FavoritePage)
class FavoriteTab extends Component{
  constructor(props){
    super(props);
    const {flag}=this.props;
    this.storeName=flag;
    this.favoriteDao=new FavoriteDao(flag)
  }
  _store(){
    const {favorite}=this.props;
    let store=favorite[this.storeName];
    if(!store){
      store={
        items:[],
        isLoading:false,
        projectModels:[],
      }
    }
    return store
  }
  loadData(isShowLoading){
    const {onLoadFavoriteData}=this.props;
    onLoadFavoriteData(this.storeName,isShowLoading)
  }
  componentDidMount(){
    this.loadData();
    EventBus.getInstance().addListener(NavigationUtil.bottom_tab_select, this.listener = data => {
      if(data.to==2){
        this.loadData(false);
      }
    })
  }
  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }
  onFavorite(item,isFavoriter){
    FavoriteUtil.onFavorite(this.favoriteDao,item,isFavoriter,this.storeName);
    if(this.storeName===FLAG_STORAGE.flag_popular){
      EventBus.getInstance().fireEvent(NavigationUtil.favorite_changed_popular)
    }else{
      EventBus.getInstance().fireEvent(NavigationUtil.favorite_changed_trending)
    }
  }
  renderItem(data){
    const item=data.item;
    const {theme}=this.props;
    const Item=this.storeName===FLAG_STORAGE.flag_popular?PopularItem:TrendingItem
    return <Item projectModel={item} 
            theme={theme}
            onSelect={(callback)=>{
              NavigatorUtil.gotoPage({projectModel:item,flag:this.storeName,theme:theme,callback},'DetailPage')
            }}
            onFavorite={(item,isFavoriter)=>{this.onFavorite(item,isFavoriter)}}
    ></Item>
  }
  render(){
    return(
      <View style={styles.container}>
        <FlatList
          data={this._store().projectModels}
          renderItem={data=>this.renderItem(data)}
          keyExtractor={item=>""+(item.item.id||item.item.fullName)}
          refreshControl={
            <RefreshControl
              title='loading'
              refreshing={this._store().isLoading}
              onRefresh={()=>this.loadData(true)}
            >
            </RefreshControl>
          }
        >
        </FlatList>
        <Toast ref={"toast"} position={'center'}/>
      </View>
    )
  }
}
const mapStateToProps=state=>({
  favorite:state.favorite
});
const mapDispatchToProps=dispatch=>({
  onLoadFavoriteData:(storeName,isShowLoading)=>dispatch(actions.onLoadFavoriteData(storeName,isShowLoading)),
})
const FavoriteTabPage=connect(mapStateToProps,mapDispatchToProps)(FavoriteTab)
const styles = StyleSheet.create({
  container:{
      flex:1,
      justifyContent:'center',
      backgroundColor:'#f5fcff',
      // alignItems:'center'
  },
  tabStyle:{
    minWidth:40
  },
  button:{
    marginTop:30
  },
  indicatorStyle:{
    backgroundColor:'#fff'
  },
  labelStyle:{
    fontSize:13
  }
});


