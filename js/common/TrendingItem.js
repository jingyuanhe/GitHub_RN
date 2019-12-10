import React from 'react';
import {TouchableOpacity,View,Text,Image,StyleSheet  } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HTMLView from 'react-native-htmlview';
const TrendingItem:() => React$Node = (props) =>{
    const {item}=props;
    if(!item) return null;
    let favoriterButton=<TouchableOpacity onPress={()=>{}} style={{padding:4}}>
        <FontAwesome name={'star-o'} size={26} style={{color:'red'}}>

        </FontAwesome>
    </TouchableOpacity>
    const description=`<p>${item.description}</p>`
    return(
        <TouchableOpacity
            onPress={props.onSelect}
        >
            <View style={styles.cell_container}>
                <Text style={styles.title}>{item.fullName}</Text>
                <HTMLView
                    value={description}
                    onLinkLongPress={(url)=>{}}
                    stylesheet={{
                        p:styles.description,
                        a:styles.description
                    }}
                />
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.description}>{item.meta}</Text>
                <View>
                    <View style={styles.row}>
                        <View style={styles.row}>
                            <Text>BUilt by:</Text>
                            {
                                item.contributors.map((result,i,arr)=>{
                                    return <Image style={{width:22,height:22}} source={{uri:arr[i]}} key={i}></Image>
                                })   
                            }                        
                            
                        </View>
                        {favoriterButton}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles=StyleSheet.create({
    row:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
    },
    cell_container:{
        backgroundColor:'#fff',
        padding:10,
        marginLeft:5,
        marginRight:5,
        marginVertical:3,
        borderColor:'#ddd',
        borderRadius:2,
        borderWidth:.5,
        shadowColor:'gray',
        shadowOffset:{width:.5,height:.5},
        shadowOpacity:.4,
        shadowRadius:1,
        elevation:2
    },
    title:{
        fontSize:16,
        marginBottom:2,
        color:'#212121'
    },
    description:{
        fontSize:14,
        marginBottom:2,
        color:'#757575'
    }
})
export default TrendingItem