import React,{Component} from "react";
import PropTypes from "prop-types";
import {  ViewPropTypes,View,Text,StatusBar,StyleSheet,Platform} from "react-native";
const StatusBarShape={
    barStyle:PropTypes.oneOf(['light-content','default']),
    hidden:PropTypes.bool,
    backgroundColor:PropTypes.string
}
const NAV_BAR_HEIGHT_IOS=44;
const NAV_BAR_HEIGHT_ANDROID=50;
const STATUS_BAR_HEIGHT=20;
export default class NavigationBar extends Component{
    //类型检查
    static propTypes={
        style:ViewPropTypes.style,
        title:PropTypes.string,
        titleView:PropTypes.element,
        titleLayoutStyle:ViewPropTypes.style,
        hide:PropTypes.bool,
        statusBar:PropTypes.shape(StatusBarShape),
        rightButton:PropTypes.element,
        leftButton:PropTypes.element
    }
    static defaultProps={
        statusBar:{
            barStyle:'light-content',
            hidden:false
        }
    }
    render(){
        let statusBar=!this.props.statusBar.hidden?
        <View style={styles.statusBar}>
            <StatusBar {...this.props.statusBar} />
        </View>:null;
        let titleView=this.props.titleView?this.props.titleView:
            <Text ellipsizeMode='head' numberOfLines={1} style={styles.title}>{this.props.title}</Text>
        let content=this.props.hide?null:
        <View style={styles.navBar}>
            {this.getButtonElement(this.props.leftButton)}
            <View style={[styles.NavBarTitleContainer,this.props.titleLayoutStyle]}>
                {titleView}
            </View>
            {this.getButtonElement(this.props.rightButton)}
        </View>
        return(
            <View style={[styles.container,this.props.style]}> 
                {statusBar}
                {content}
            </View>
        )
    }
    getButtonElement(data){
        return(
            <View style={styles.navBarButton}>
                {data?data:null}
            </View>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'blue'
    },
    navBarButton:{
        alignItems:'center'
    },
    navBar:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        height:Platform.OS==='ios'?NAV_BAR_HEIGHT_IOS:NAV_BAR_HEIGHT_ANDROID
    },
    NavBarTitleContainer:{
        position:'absolute',
        right:40,
        left:40,
        alignItems:'center',
        justifyContent:'center',
        bottom:0,
        top:0
    },
    title:{
        fontSize:20,
        color:'#fff'
    },
    statusBar:{
        height:Platform.OS==='ios'?STATUS_BAR_HEIGHT:0
    }
})