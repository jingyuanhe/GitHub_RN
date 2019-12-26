import React,{ Component } from "react";
import { View,StyleSheet,ScrollView,Alert,TouchableHighlight,Text } from "react-native";
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
import SortableListView from 'react-native-sortable-listview'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const THEME_COLOR='#678';
class SortKeyPage extends Component{
    constructor(props){
        super(props);
        this.params=this.props.navigation.state.params;
        this.languageDao=new LanguageDao(this.params.flag);
        this.state={
            checkedArray:SortKeyPage._keys(this.props)
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        const checkedArray=SortKeyPage._keys(nextProps,null,prevState);
        if(prevState.keys!==checkedArray){
            return{
                keys:checkedArray
            }
        }
        return null;
    }
    componentDidMount(){
        if(SortKeyPage._keys(this.props).length==0){
            let {onLoadLanguage}=this.props;
            onLoadLanguage(this.params.flag)
        }
    }
    onSave(hasChecked){
       if(!hasChecked){
           if(ArrayUtil.isEqual(SortKeyPage._keys(this.props),this.state.checkedArray)){
               NavigatorUtil.goBack(this.props.navigation);
               return;
           }
       }
       this.languageDao.saveData(this.getSortResult());
       const {onLoadLanguage}=this.props;
       onLoadLanguage(this.params.flag);
       NavigatorUtil.goBack(this.props.navigation);
    }
    getSortResult(){
        const flag=SortKeyPage._flag(this.props);
        let sortResultArray=ArrayUtil.clone(this.props.language[flag]);
        const originalCheckedArray=SortKeyPage._keys(this.props);
        for(let i=0;i<originalCheckedArray.length;i++){
            let item=originalCheckedArray[i];
            let index=this.props.language[flag].indexOf(item);
            sortResultArray.splice(index,1,this.state.checkedArray[i]);
        }
        return sortResultArray;
    }
   
    onBack(){
        if(!ArrayUtil.isEqual(SortKeyPage._keys(this.props),this.state.checkedArray)){
            Alert.alert('提示','要保存修改吗',[
                {
                    text:'否',
                    onPress:()=>{NavigatorUtil.goBack(this.props.navigation)}
                },
                {
                    text:'是',
                    onPress:()=>{this.onSave(true)}
                }
            ])
        }else{
            NavigatorUtil.goBack(this.props.navigation)
        }
    }
    render(){
        let title=this.params.flag===FLAG_LANGUAGE.flag_language?'语言排序':'标签排序';
        let navigationBar=<NavigationBar 
            style={{backgroundColor:THEME_COLOR}} 
            title={title}
            leftButton={viewUtil.getLeftBackButton(()=>this.onBack())} 
            rightButton={viewUtil.getRightButton('保存',()=>this.onSave(true))}
        >
        </NavigationBar>;
        return(
            <View style={styles.container}>
                {navigationBar}
                <SortableListView
                    data={this.state.checkedArray}
                    order={Object.keys(this.state.checkedArray)}
                    onRowMoved={e => {
                        this.state.checkedArray.splice(e.to, 0, this.state.checkedArray.splice(e.from, 1)[0])
                        this.forceUpdate()
                    }}
                    renderRow={row => <SortCell data={row} {...this.params}/>}
                />
            </View>
        )
    }
    static _keys(props,state){
        if(state && state.checkedArray && state.checkedArray.length){
            return state.checkedArray
        }
        const flag=SortKeyPage._flag(props);
        let dataArray=props.language[flag]||[];
        let keys=[];
        for(let i=0;i<dataArray.length;i++){
            if(dataArray[i].checked)
            keys.push(dataArray[i])
        }
        return keys;
    }
    static _flag(props){
        const {flag}=props.navigation.state.params;
        return flag===FLAG_LANGUAGE.flag_key?'keys':'languages'
    }
}
const mapStateToProps=state=>({
    language:state.language
  });
const mapDispatchToProps=dispatch=>({
    onLoadLanguage:(flag)=>dispatch(actions.onLoadLanguage(flag))
})
class SortCell extends Component{
    render(){
        return <TouchableHighlight
            underlayColor={'#eee'}
            style={this.props.data.checked?styles.item:styles.heidden}
            {...this.props.sortHandlers}
        >
            <View style={{marginLeft:10,flexDirection:'row'}}>
                <MaterialCommunityIcons
                    name={'sort'}
                    size={16}
                    style={{marginRight:10,color:THEME_COLOR}}
                >
                </MaterialCommunityIcons>
                <Text>{this.props.data.name}</Text>
            </View>
        </TouchableHighlight>
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SortKeyPage)
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    line:{
        height:.3,
        backgroundColor:'#ddd',
        flex:1
    },
    heidden:{
        height:0
    },
    item:{
        backgroundColor:'#f8f8f8',
        borderBottomWidth:1,
        height:50,
        borderColor: '#eee',
        justifyContent:'center'
    }
    
  });
  