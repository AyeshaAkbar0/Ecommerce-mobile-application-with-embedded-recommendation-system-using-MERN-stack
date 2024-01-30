import React from "react";
import { StyleSheet, View,Image,SafeAreaView, Dimensions} from "react-native"
const imag=require("../assets/images.png")
// import { NativeBaseProvider } from 'native-base';


var {width} = Dimensions.get("window")

const Header=()=>{
    return(
   
        
         <SafeAreaView style={styles.header}> 
            <Image source={imag
            } resizeMode="stretch"
            style={{height:80}}></Image>
         </SafeAreaView> 
       
     
    )
}
const styles= StyleSheet.create({
    header:{
        width:width,
        flexDirection:"row",
        alignContent:"center",
        justifyContent:"center",
        paddingTop:10,
        backgroundColor:"white"


      
    }
})
export default Header;

