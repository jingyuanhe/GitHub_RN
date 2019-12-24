import React from 'react'
import {TouchableOpacity,StyleSheet,View,Text} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons'
export default class viewUtil{
    static getSettingItem(callback,text,color,Icons,icon,expandableIcon){
        return(
            <TouchableOpacity
                onPress={callback} 
                style={styles.setting_item_container}           
            >
                <View style={{ flexDirection:'row',alignItems:'center'}}>
                    {Icons&&icon?
                    <Icons
                        name={icon}
                        size={16}
                        style={{color:color,marginRight:10}}
                    />:<View style={{width:16,height:16,opacity:1,marginRight:10}}></View>}
                    <Text>{text}</Text>
                </View>
                <Ionicons
                      name={expandableIcon?expandableIcon:'ios-arrow-forward'}
                      size={16}
                      style={{marginRight:10,color:color||'black',alignSelf:'center'}}
                >

                </Ionicons>
            </TouchableOpacity>
        )
    }
    static getMenuItem(callback,menu,color,expandableIcon){
        return viewUtil.getSettingItem(callback,menu.name,color,menu.Icons,menu.icon,expandableIcon)
    }
    static getLeftBackButton(callBack){
        return <TouchableOpacity
                style={{padding:8,paddingLeft:12}}
                onPress={callBack}
                >
                    <AntDesign
                        name={'left'}
                        size={26}
                        style={{color:'#fff'}}
                    >
                    </AntDesign>
               </TouchableOpacity>
    }
    static getRightButton(title, callBack) {
        return <TouchableOpacity
            style={{alignItems: 'center',}}
            onPress={callBack}>
            <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>{title}</Text>
        </TouchableOpacity>
    }
    static getShareButton(callBack){
        return <TouchableOpacity
                    underlayColor='transparent'
                    onPress={callBack}
                >
                <Ionicons
                    name={'md-share'}
                    size={20}
                    style={{opacity:0.9,marginRight:10,color:'white'}}
                >


                </Ionicons>
        </TouchableOpacity>
    }
}
const styles=StyleSheet.create({
    setting_item_container:{
        backgroundColor:'#fff',
        padding:10,
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    }
})