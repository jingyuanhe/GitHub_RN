import React from 'react'
import {Platform,View,Image,Dimensions,Text,StyleSheet} from 'react-native'
import NavigatorUtil from '../../navigator/NavigatorUtil'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from "../../res/GlobalStyles";
import viewUtil from '../../util/viewUtil'

const THEME_COLOR='#678'
const window = Dimensions.get('window');
const AVATAR_SIZE=90;
const PARALLAX_HEADER_HEIGHT=270;
const STICKY_HEADER_HEIGHT=Platform.OS==='ios'?GlobalStyles.nav_bar_height_ios+20:GlobalStyles.nav_bar_height_android;
export const FLAG_ABOUT={flag_about_me:'about_me',flag_about:'about'}
export default class AboutCommon{
    constructor(props,updataState){
        this.props=props;
        this.updataState=updataState;
        //this.backPress=NavigatorUtil.gotoPage(this.props.navigetion);
    }
    componentDidMount(){
        fetch('https://www.devio.org/io/GitHubPopular/json/github_app_config.json')
        .then(response=>{
            if(response.ok){
                return response.json();
            }
            throw new Error('Network Error')
        })
        .then(config=>{
            if(config){
                this.updataState({
                    data:config
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })

    }
    onShare(){

    }
    getParallaxRenderConfig(params){
        let config={};
        let avatar=typeof(params.avatar)==='string'?{uri:params.avatar}:params.avatar;
        config.renderBackground=()=>(
            <View key="background">
            <Image source={{uri:params.backgroundImg,
                            width: window.width,
                            height: PARALLAX_HEADER_HEIGHT}}/>
            <View style={{position: 'absolute',
                          top: 0,
                          width: window.width,
                          backgroundColor: 'rgba(0,0,0,.4)',
                          height: PARALLAX_HEADER_HEIGHT}}/>
          </View>
        )
        config.renderForeground=()=>(
            <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } 
                source={avatar}/>
                <Text style={ styles.sectionSpeakerText }>
                  {params.name}
                </Text>
                <Text style={ styles.sectionTitleText }>
                 {params.description}
                </Text>
              </View>
        )
        config.renderStickyHeader=()=>(
            <View key="sticky-header" style={styles.stickySection}>
                <Text style={styles.stickySectionText}>{params.name}</Text>
            </View>
        )
        config.renderFixedHeader=() => (
            <View key="fixed-header" style={styles.fixedSection}>
              {viewUtil.getLeftBackButton(()=>NavigatorUtil.goBack(this.props.navigation))}
              {viewUtil.getShareButton(()=>this.onShare())}
            </View>
          )
        return config;
    }
    render(contentView,params){
        const renderCinfig=this.getParallaxRenderConfig(params);
        return (
            <ParallaxScrollView
              backgroundColor={THEME_COLOR}
              contentBackgroundColor={GlobalStyles.backgroundColor}
              parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
              stickyHeaderHeight={STICKY_HEADER_HEIGHT}
              backgroundScrollSpeed={10}
              {...renderCinfig}
              >
                {contentView}
            </ParallaxScrollView>
          );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black'
    },
    background: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: window.width,
      height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
      height: STICKY_HEADER_HEIGHT,
      width: 300,
      justifyContent: 'center',
      alignItems:'center',
      flexDirection:'row'
    },
    stickySectionText: {
      color: 'white',
      fontSize: 20,
      left:0,
      right:0,
      position:'absolute',
      paddingLeft:50,
      //margin: 10,
      textAlign:'center'
    },
    fixedSection: {
      position: 'absolute',
      left:0,
      right:0,
      top:0,
      bottom:0,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
      paddingRight:8,
      paddingTop:(Platform.OS==='ios')?20:0
    },
    fixedSectionText: {
      color: '#999',
      fontSize: 20
    },
    parallaxHeader: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'column',
      paddingTop: 100
    },
    avatar: {
      marginBottom: 10,
      borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
      color: 'white',
      fontSize: 24,
      paddingVertical: 5,
      marginBottom:10
    },
    sectionTitleText: {
      color: 'white',
      fontSize: 16,
      marginLeft:10,
      marginRight:10
    }
  });