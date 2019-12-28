import React,{ Component } from "react";
import {View,Modal,ScrollView, StyleSheet,Platform,TouchableOpacity,Text} from "react-native";
import ThemeDao from "../expand/dao/ThemeDao";
import GlobalStyles from "../res/GlobalStyles";
import ThemeFactory,{ThemeFlags} from "../res/ThemeFactory";
import actions from "../action";
import { connect } from 'react-redux';
class CustomTheme extends Component{
    constructor(props){
        super(props);
        this.ThemeDao=new ThemeDao()
    }
    onSelectTheme(themeKey){
        this.props.onClose();
        this.ThemeDao.save(ThemeFlags[themeKey]);
        const {onThemeChange}=this.props;
        onThemeChange(ThemeFactory.createTheme(ThemeFlags[themeKey]))
    }
    getThemeItem(themeKey){
        return <TouchableOpacity
            style={{flex:1}}
            underlayColor='white'
            onPress={()=>this.onSelectTheme(themeKey)}
        >
            <View style={[{backgroundColor:ThemeFlags[themeKey]},styles.themeColor]}>
                <Text style={styles.themeText}>{themeKey}</Text>
            </View>
        </TouchableOpacity>
    }
    renderThemeItems(){
        const views=[];
        for(let i=0,keys=Object.keys(ThemeFlags);i<keys.length;i+=3){
            const key1=keys[i],key2=keys[i+1],key3=keys[i+2];
            views.push(
                <View key={i} style={{flexDirection:'row'}}>
                    {this.getThemeItem(key1)}
                    {this.getThemeItem(key2)}
                    {this.getThemeItem(key3)}
                </View>
            )
        }
        return views
    }
    renderContnetView(){
        return <Modal
            animationType='slide'
            transparent={true}
            visible={this.props.visible}
            onRequestClose={()=>this.props.onClose()}
        >
            <View style={StyleSheet.modalContainer}>
                <ScrollView>
                    {this.renderThemeItems()}
                </ScrollView>
            </View>
        </Modal>
    }

    render(){
        let view=this.props.visible?<View style={GlobalStyles.root_container}>
            {this.renderContnetView()}
        </View>:null;
        return view;
    }
}
const mapStateToProps=state=>({});
const mapDispatchToProps=dispatch=>({
    onThemeChange:(theme)=>dispatch(actions.onThemeChange(theme))
})
export default connect(mapStateToProps,mapDispatchToProps)(CustomTheme)
const styles=StyleSheet.create({
    modalContainer:{
        flex:1,
        margin:10,
        marginTop:Platform.OS==='ios'?20:10,
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'gray',
        shadowOffset:{width:2,height:2},
        shadowOpacity:.5,
        shadowRadius:2,
        padding:2
    },
    themeColor:{
        flex:1,
        height:120,
        padding:3,
        margin:3,
        borderRadius:2,
        justifyContent:'center',
        alignItems:'center'
    },
    themeText:{
        color:'white',
        fontSize:16
    }
})