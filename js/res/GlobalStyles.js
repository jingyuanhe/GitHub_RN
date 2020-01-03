const BACKGROUND_COLOR='#f3f3f4'
import {Dimensions } from "react-native";
const {width,height}=Dimensions.get('window');
export default {
    line:{
        height:.5,
        opacity:.5,
        backgroundColor:'darkgray'
    },
    root_container:{
        flex:1,
        backgroundColor:BACKGROUND_COLOR
    },
    backgroundColor:BACKGROUND_COLOR,
    nav_bar_height_ios:44,
    nav_bar_height_android:50,
    window_height:height
}