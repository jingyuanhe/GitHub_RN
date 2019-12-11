import {TouchableOpacity} from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from 'react-native-vector-icons/Ionicons'
export default class viewUtil{
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