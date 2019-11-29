import React,{Component} from 'react';
import {Modal,TouchableOpacity,StyleSheet,View,Text } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeSpan from "../model/TimeSpan";
export const TimeSpans=[new TimeSpan('今 天','since=dayly'),new TimeSpan('本 周','since=weekly'),new TimeSpan('本 月','since=monthly')]
export default class TrendingDiaLog extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:true
        }
    }
    show(){
        this.setState({
            visible:true
        })
    }
    dismiss(){
        this.setState({
            visible:false
        })
    }
    render(){
        const {onSelect,onClose}=this.props;
       
        return(
            <Modal
                transparent={true}
                visible={this.state.visible}
                onRequestClose={()=>onClose}
            >
                <TouchableOpacity
                    onPress={()=>this.dismiss()}
                    style={styles.container}
                >
                    <MaterialIcons
                        name={'arrow-drop-up'}
                        size={36}
                        style={styles.arrow}
                    >
                        <View style={styles.content}>
                            {TimeSpans.map((result,i,arr)=>{
                                return <TouchableOpacity
                                    onPress={()=>onSelect(arr[i])}
                                    underlayColor='transparent'
                                >
                                    <View style={styles.text_container}>
                                        {/* <Text style={styles.text}>{arr[i].showText}</Text>
                                        {
                                            i!==TimeSpans.length-1?<View style={styles.line}></View>:null
                                        } */}
                                    </View>
                                </TouchableOpacity>
                            })}
                        </View>
                    </MaterialIcons>
                </TouchableOpacity>
            </Modal>
        )
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'rgba(0,0,0,.6)',
        alignItems:'center'
    },
    arrow:{
        marginTop:40,
        color:'#fff',
        padding:0,
        margin:-15
    },
    content:{
        backgroundColor:'white',
        borderRadius:3,
        paddingTop:3,
        paddingBottom:3,
        marginRight:3
    },
    text_container:{
        flexDirection:'row',
        alignItems:'center'
    },
    text:{
        fontSize:16,
        color:'#000',
        fontWeight:'400',
        padding:8,
        paddingLeft:26,
        paddingRight:26
    },
    line:{
        height:.3,
        backgroundColor:'#ddd'
    }
})