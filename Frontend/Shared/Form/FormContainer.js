import React from "react";
import { ScrollView , Dimensions, StyleSheet, Text} from "react-native";

var {width, height}= Dimensions.get('window')

const FormContainer=(props)=>{
    return(
        <ScrollView contentContainerStyle={styles.container}>
        {props.title ? <Text style={styles.title}>{props.title}</Text> : null}
        {props.children}
      </ScrollView>
  
    )
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
       marginTop:30,
      // marginBottom:400,
        width:width,
       // height:height,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:30,
        marginBottom:10,
       // color:'black'
    }
})

export default FormContainer;