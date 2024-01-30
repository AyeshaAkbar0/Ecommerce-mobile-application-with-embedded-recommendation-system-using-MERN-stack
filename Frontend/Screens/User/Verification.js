import { View, Text,StyleSheet, KeyboardAvoidingView, Dimensions,
    Touchable, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import { TextInput } from 'react-native-gesture-handler'
import {baseURL} from '../../assets/common/baseUrl'
import axios from 'axios'

const inputs= Array(4).fill('')
let newInputIndex=0;
const isObjValid=(obj)=>{
   return Object.values(obj).every(val=>val.trim())
}

const Verification=( { navigation,route} ) =>
{
const {userId}= route.params;
const input =useRef();
const[OTP,setOTP]=useState({0: '', 1: '', 2: '' ,3: ''})
const[nextInputIndex,setNextInputIndex]= useState(0)
handleChangeText=(text,index)=>{
   const newOTP ={...OTP};
   newOTP[index]=text;
   setOTP(newOTP);
   const lastInputIndex= inputs.length - 1;
   if(!text) newInputIndex= index=== 0? 0 : index-1;

   else newInputIndex= index=== lastInputIndex ? lastInputIndex : index+1;
   setNextInputIndex(newInputIndex);
}
useEffect(()=>{
   input.current.focus()

},[newInputIndex])
const submitOTP = async()=>{
   Keyboard.dismiss()
   if(isObjValid(OTP)){
       let otp=''
       Object.values(OTP).forEach(v=>{
           otp+=v
       })
       try {
           // Make API call to verify OTP endpoint
           const response = await axios.post(`${baseURL}users/verify/`, { userId, otp });
     
           // Handle the response and perform any necessary actions
           console.log(response.data);
     
           // Example: navigate to the home screen if OTP verification is successful
           navigation.navigate('Login');
         } catch (error) {
           // Handle error if the API call fails
           console.error(error);
         }
      
   }


}
 return (
   <KeyboardAvoidingView style= {styles.container}>
       <Text style ={styles.heading}>
       Please Verify your email, OTP has been sent to your email.
       </Text>
       <View style={styles.otpContainer}>
           {inputs.map((inp,index)=>{
               return(
               <View   key={index.toString()} style={styles.inputContainer}>
                <TextInput  
                value={OTP[index]}
                onChangeText={(text)=>handleChangeText(text,index)}
                placeholder="0"
                 style={styles.input}
               keyboardType='numeric' maxLength={1}
               ref={newInputIndex===index ?input:null}
               
               />
               </View>
               )
           })}
       </View>
      
        <Button style={styles.button} onPress={submitOTP}>Verify</Button>
      
   </KeyboardAvoidingView>
  
 )
}
const {width}=Dimensions.get('window')
const inputWidth=Math.round(width/6)
const styles= StyleSheet.create({
   container:{
       flex:1,
       justifyContent:'center',
       backgroundColor:'white',
       
   },
   heading:{
      // color:'#8469cf',
      color: 'black',
       textAlign:'center',
       marginBottom:15
   },
   inputContainer:{
       width:inputWidth,
       height:inputWidth,
       borderWidth:1,
       borderColor:'black',
       justifyContent:'center',
       alignItems:'center'
},
button:{
    backgroundColor:"#FF7235"
    , 
    width:"40%",
    alignSelf:"center",
    marginTop:20,

  },
input:{
   fontSize:25,
   paddingHorizontal:15
},
otpContainer:{
   flexDirection:'row',
   justifyContent: 'space-between',
   paddingHorizontal:inputWidth/2
},
submitIcon:{
   alignSelf:'center',
   padding:15,
   backgroundColor:'black',
   borderRadius: 50,
   marginTop:15,
}


})
export default Verification;