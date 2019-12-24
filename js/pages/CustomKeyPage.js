import React,{ Component } from "react";
import { View,StyleSheet,ScrollView } from "react-native";
import LanguageDao from "../expand/dao/LanguageDao";
import { connect } from 'react-redux';
import actions from "../action/index";
import NavigationBar from "../common/NavigationBar";
import viewUtil from "../util/viewUtil";
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
const THEME_COLOR='#678';
class CustomKeyPage extends Component{
    constructor(props){
        super(props);
        this.params=this.props.navigation.state.params;
        this.changeValues=[];
        this.isRemoveKey=!!this.params.isRemoveKey;
        this.languageDao=new LanguageDao(this.params.flag);
        this.state={
            keys:[]
        }
    }
    componentDidMount(){
        if(CustomKeyPage._keys(this.props).length==0){
            let {onLoadLanguage}=this.props;
            onLoadLanguage(this.params.flag)
        }
        this.setState({
            keys:CustomKeyPage._keys(this.props)
        })
    }
    onSave(){

    }
    renderView(){
        let dataArray=this.state.keys;
        if(!dataArray||dataArray.length===0) return;
        let len=dataArray.length;
        let views=[];
        for(let i=0;i<len;i+2){
            views.push(
                <View key={i}>
                    <View style={styles.item}></View>
                    <View styles={styles.line}></View>
                </View>
            )
        }
    }
    render(){
        let title=this.isRemoveKey?'移除标签':'自定义标签';
        title=this.props.flag===FLAG_LANGUAGE.flag_key?'自定义语言':title;
        let rightButtonTitle=this.isRemoveKey?'移除':'保存';
        let navigationBar=<NavigationBar style={{backgroundColor:THEME_COLOR}} title={title} rightButton={viewUtil.getRightButton(rightButtonTitle,()=>this.onSave())}></NavigationBar>;
        return(
            <View style={styles.container}>
                {navigationBar}
                <ScrollView>
                    {this.renderView()}
                </ScrollView>
            </View>
        )
    }
    static _keys(props,original,state){
        const {flag,isRemoveKey}=props.navigation.state.params;
        let key=flag===FLAG_LANGUAGE.flag_key?'keys':'languages';
        if(isRemoveKey&&!original){

        }else{
            return props.language[key]
        }
    }
}
const mapStateToProps=state=>({
    language:state.language
  });
const mapDispatchToProps=dispatch=>({
    onLoadLanguage:(flag)=>dispatch(actions.onLoadLanguage(flag))
})
export default connect(mapStateToProps,mapDispatchToProps)(CustomKeyPage)
onst styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#f5fcff',
        alignItems:'center'
    },
    item:{
        flexDirection:'row'
    },
    line:{
        height:.3,
        backgroundColor:'#ddd',
        flex:1
    }
    
  });
  