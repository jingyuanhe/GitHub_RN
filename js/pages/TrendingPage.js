import React,{Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import actions from "../action/index";
import NavigationBar from "../common/NavigationBar";
import TrendingDiaLog,{TimeSpans} from '../common/TrendingDiaLog'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const THEME_COLOR='#678'
const statusBar={
  backgroundColor:THEME_COLOR
}
class TrendingPage extends Component{
  constructor(props){
    super(props);
    this.state={
      TimeSpan:TimeSpans[0]
    }
  }
  renderTitleView(){
    return(
      <View>
        <TouchableOpacity
          underlayColor='transparent'
          onPress={()=>this.dialog.show()}
        >
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize:18,color:'#fff'}}>
              趋势 {this.state.TimeSpan.showText}
            </Text>
            <MaterialIcons
              name={'arrow-drop-down'}
              size={22}
              style={{color:'white'}}
            >
            </MaterialIcons>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  onSelectTimeSpan(tab){
    this.dialog.dismiss();
    this.setState({
      TimeSpan:tab
    })
  }
  renderTrendingDialog(){
    return <TrendingDiaLog ref={dialog=>this.dialog=dialog}
              onSelect={tab=>this.onSelectTimeSpan(tab)}
    ></TrendingDiaLog>
  }
  render(){
    const navigationBar=<NavigationBar titleView={this.renderTitleView()} statusBar={statusBar} style={{backgroundColor:THEME_COLOR}}></NavigationBar>
    return (
      <View style={styles.container}>
        {navigationBar}
        {this.renderTrendingDialog()} 
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container:{
      backgroundColor:'#f5fcff'
  }
});
const mapActionToProps=dispatch=>({
  onThemeChange:theme=>dispatch(actions.onThemeChange(theme))
})
export default connect(null,mapActionToProps)(TrendingPage);
