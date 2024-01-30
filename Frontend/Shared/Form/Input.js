import React from "react";
import { StyleSheet , TextInput} from "react-native";

const Input= (props)=>{
    return (
        <TextInput
          style={styles.Input}
          placeholder={props.placeholder}
          name={props.name}
          id={props.id}
          value={props.value}
          autoCorrect={props.autoCorrect}
          onChangeText={props.onChangeText}
          onFocus={props.onFocus}
          secureTextEntry={props.secureTextEntry}
          keyboardType={props.keyboardType}
          placeholderTextColor={props.placeholderTextColor}
        ></TextInput>
      );
    
}
const styles= StyleSheet.create({
    Input:{
      //backgroundColor:"green",
        margin:10,
        borderColor:'white',
        width:'80%',
        height:50,
        borderRadius:10,
        padding:10,
        borderWidth:2,
        borderColor:'#B8D8E0',
        
    }
})
export default Input;