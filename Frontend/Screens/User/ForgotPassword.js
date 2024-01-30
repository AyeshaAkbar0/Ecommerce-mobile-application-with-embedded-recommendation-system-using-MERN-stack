import React, { useState } from "react";
import { View, Text, StyleSheet,  TextInput, TouchableOpacity } from "react-native";
import {Button } from 'native-base';
import axios from "axios";
import {baseURL} from "../../assets/common/baseUrl";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from "react-native-toast-message";
import ResetPasswordLink from "./ResetPasswordLink ";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const navigationn = useNavigation();

  const handleBackIconPress = () => {
    navigationn.goBack(); // Navigate back to the previous screen (UserProfile)
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please provide a valid email.',
        visibilityTime: 3000, // Show for 3 seconds
      });
      return;
    }

    try {
      const response = await axios.post(`${baseURL}users/forgot-password`, {
        email: email,
      });
      
      if (response.data.success) {
        // Password reset request was successful
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset code sent successfully.',
          visibilityTime: 3000, // Show for 3 seconds
        });
        navigation.navigate('Reset Password', { email: email });
      } else {
        // Password reset request failed, show error message
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'Failed to send password reset email.',
          visibilityTime: 3000, // Show for 3 seconds
        });
      }
    } catch (error) {
      // Handle network or other errors
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to send password reset email.',
        visibilityTime: 3000, // Show for 3 seconds
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
       <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
        <Icon  color="black" name="arrow-back" size={30} />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password</Text>
      </View>
     
        {/* <Text style={styles.label}>Email:</Text> */}
        <TextInput
          style={styles.input}
          placeholder=" Enter your email"
          placeholderTextColor={"#494F55"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
     
      <Button style={styles.button} onPress={handleForgotPassword} >Send reset code</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"white",
   // justifyContent: "center",
    //alignItems: "center",
  },
  backIcon: {
    position: 'absolute',
    color:"black",
    top: 22,
    left: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color:'black',
    marginTop:20,
    left:70,
  },
  inputContainer: {
    marginBottom: 20,
    marginTop:10,
    left:10,
  },
  label: {
    fontSize: 16,
   // marginLeft:-300,
   marginRight:10,
    marginTop:50,

    marginBottom: 5,
    fontWeight:"bold"
    ,
    color:"black"
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
   // paddingHorizontal: 10,
    marginBottom:20,
    marginLeft:30,
    marginTop:20,
  },
  button:{
    backgroundColor:"#FF7235"
    ,
    width:"80%",
    marginLeft:30,
    fontWeight:"bold",
    fontSize:18
  }
});

export default ForgotPassword;
