import React,{ Component } from "react";
import { View,StyleSheet,ScrollView } from "react-native";
import LanguageDao from "../expand/dao/LanguageDao";
import { connect } from 'react-redux';
import actions from "../action/index";
import NavigationBar from "../common/NavigationBar";
import viewUtil from "../util/viewUtil";
import { FLAG_LANGUAGE } from "../expand/dao/LanguageDao";
import CheckBox from 'react-native-check-box'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigatorUtil from '../navigator/NavigatorUtil'
import ArrayUtil from '../util/ArrayUtil'
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
    static getDerivedStateFromProps(nextProps, prevState){
        if(prevState.key!==CustomKeyPage._keys(nextProps,null,prevState)){
            return{
                keys:CustomKeyPage._keys(nextProps,null,prevState)
            }
        }
        return null;
    }
    onSave(){

    }
    onClick(data,index){
        data.checked=!data.checked;
        ArrayUtil.updataArray(this.changeValues,data);
        this.state.keys[index]=data;
        this.setState({
            keys:this.state.keys
        })
    }
    _checkedImage(checkd){
        return <Ionicons
            size={20}
            style={{color:THEME_COLOR}}
            name={checkd?'ios-checkbox':'md-square-outline'}
        >
        </Ionicons>
    }
    renderCheckBox(data,index){
        return <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>this.onClick(data,index)}
            isChecked={data.checked}
            leftText={data.name}
            checkedImage={this._checkedImage(true)}
            unCheckedImage={this._checkedImage(false)}
        />
    }
    renderView(){
        let dataArray=this.state.keys;
        if(!dataArray||dataArray.length===0) return;
        let len=dataArray.length;
        let views=[];
        for(let i=0;i<len;i+=2){
            views.push(
                <View key={i}>
                    <View style={styles.item}>
                        {this.renderCheckBox(dataArray[i],i)}
                        {i+1<len&&this.renderCheckBox(dataArray[i+1],i+1)}
                    </View>
                    <View style={styles.line}></View>
                </View>
            )
        }
        console.log(views)
        return views
    }
    onBack(){
        NavigatorUtil.goBack(this.props.navigation);
    }
    render(){
        let title=this.isRemoveKey?'移除标签':'自定义标签';
        title=this.params.flag===FLAG_LANGUAGE.flag_language?'自定义语言':title;
        let rightButtonTitle=this.isRemoveKey?'移除':'保存';
        let navigationBar=<NavigationBar 
            style={{backgroundColor:THEME_COLOR}} 
            title={title}
            leftButton={viewUtil.getLeftBackButton(()=>this.onBack())} 
            rightButton={viewUtil.getRightButton(rightButtonTitle,()=>this.onSave())}
        >

        </NavigationBar>;
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
const styles = StyleSheet.create({
    container:{
        flex:1,
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
  