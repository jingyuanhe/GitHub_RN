import React,{Component} from 'react'
import NavigatorUtil from '../../navigator/NavigatorUtil'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from "../../res/GlobalStyles";
const THEME_COLOR='#678'
export default class AboutCommon extends Component{
    constructor(props,updataState){
        this.props=props;
        this.updataState=this.updataState;
        this.backPress=NavigatorUtil.gotoPage(this.props.navigetion);
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
    render(contentView,params){
        return (
            <ParallaxScrollView
              backgroundColor={THEME_COLOR}
              contentBackgroundColor={GlobalStyles.BACKGROUND_COLOR}
              parallaxHeaderHeight={300}
              renderScrollComponent={() => <AnimatedCustomScrollView />}
              renderForeground={() => (
               <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>Hello World!</Text>
                </View>
              )}>
              <View style={{ height: 500 }}>
                <Text>Scroll me</Text>
              </View>
            </ParallaxScrollView>
          );
    }
}