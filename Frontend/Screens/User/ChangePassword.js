// ChangePasswordScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import  Toast from "react-native-toast-message"
//import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { baseURL } from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/Ionicons"



const validationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current Password is required'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm New Password is required'),
});


const ChangePassword = ({route, navigation}) => {
    const { userProfile } = route.params;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [shownewPassword, setShowNewPassword]=useState(false);
  const [showsecnewPassword, setShowSecNewPassword]=useState(false);

  const handleBackIconPress = () => {
    navigation.goBack(); // Navigate back to the previous screen (UserProfile)
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Make a POST request to the backend API
        const res = await AsyncStorage.getItem("jwt");
        const response = await axios.post(`${baseURL}users/change`, {
          userId: userProfile.id,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${res}` },}
        );
        if (response && response.data && response.data.message === 'Password updated successfully') {
          console.log(response);
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Password Changed',
            text2: 'Your password has been updated successfully!',
          });
          navigation.goBack();
        } else {
          // Handle other response messages and show appropriate toast messages
          if (response && response.data && response.data.error === 'Invalid current password') {
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: 'Invalid Current Password',
              text2: 'Please enter the correct current password',
            });
          } else if (response && response.data && response.data.error === 'Password does not match with confirm password') {
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: 'Password Mismatch',
              text2: 'New password and confirm password do not match',
            });
          } else {
            console.error('Invalid response from the server');
          }
        }
      

        }

        // Handle the response and show a toast message to the user
         catch (error) {
          console.error(error);
        console.error(error.response);
        if (error.response && error.response.status === 401) {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Invalid Current Password',
            text2: 'Please enter the correct current password',
          });
        } else {
          Toast.show({
            topOffset: 60,
            type: 'error',
            text1: 'Server Error',
            text2: 'An unexpected error occurred. Please try again later.',
          });
        }
      }
    
    },
  });

  return (
    <View style={styles.container}>
      <View  style={{borderColor:'blue'}}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
        <Icon  color="black" name="arrow-back" size={30} />
      </TouchableOpacity>

      <Text style={styles.heading}>            Change Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.editLabel}>Current Password:</Text>
        <View style={styles.editInputContainer}>
        <TextInput
          style={styles.editInput}
          secureTextEntry={!showPassword}
          value={formik.values.currentPassword}
          onChangeText={formik.handleChange('currentPassword')}
          onBlur={formik.handleBlur('currentPassword')}
        />
               <TouchableOpacity
            style={styles.eyeIcon1}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Icon
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
          </View>
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
          <Text style={styles.errorText}>{formik.errors.currentPassword}</Text>
        ) : null}
   
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.editLabel}>New Password:</Text>
        <View style={styles.editInputContainer}>
        <TextInput
          style={styles.editInput}
          secureTextEntry={!shownewPassword}
          value={formik.values.newPassword}
          onChangeText={formik.handleChange('newPassword')}
          onBlur={formik.handleBlur('newPassword')}
        />
        <TouchableOpacity
            style={styles.eyeIcon1}
            onPress={() => setShowNewPassword((prev) => !prev)}
          >
            <Icon
              name={shownewPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
          </View>
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <Text style={styles.errorText}>{formik.errors.newPassword}</Text>
        ) : null}


      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.editLabel}>Confirm New Password:</Text>
        <View style={styles.editInputContainer}>
        <TextInput
          style={styles.editInput}
          secureTextEntry={!showsecnewPassword}
          value={formik.values.confirmNewPassword}
          onChangeText={formik.handleChange('confirmNewPassword')}
          onBlur={formik.handleBlur('confirmNewPassword')}
        />
          <TouchableOpacity
            style={styles.eyeIcon1}
            onPress={() => setShowSecNewPassword((prev) => !prev)}
          >
            <Icon
              name={showsecnewPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="grey"
            />
          </TouchableOpacity>
          </View>
        {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
          <Text style={styles.errorText}>{formik.errors.confirmNewPassword}</Text>
        ) : null}
      
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={formik.handleSubmit}>
          <Text style={styles.updateButtonText}>Update Password</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  editInputContainer: {
    flexDirection: 'row', // Align input and eye icon horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'space-between', // Distribute items evenly along the row
    // borderColor: '#ccc',
    // borderWidth: 1,
    // borderRadius: 5,
    // paddingHorizontal: 10,
    // backgroundColor: 'rgba(255, 220, 178, 0.4)',
  },
  eyeIcon: {
    // position: "absolute",
    // right: 20,
    // top: "60", // Vertically center the icon in the input field
    // marginTop: -12, // Half of the icon size to center it properly
    // zIndex: 1,
  },
  eyeIcon1: {
    position: "absolute",
    right: 20,
    top: "55%", // Vertically center the icon in the input field
    marginTop: -12, // Half of the icon size to center it properly
    zIndex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  heading: {
    alignItems:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  updateButton: {
    backgroundColor: '#DC7215',
   // borderColor:'#c4e1e9',
   borderRadius:4,
  // borderWidth:3,
    paddingVertical: 10,
    paddingHorizontal: 20,

    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:16,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    },
    editInput: {
      width:"100%",
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 220, 178, 0.4)', // Light orange shade
    },
    backIcon: {
      position: 'absolute',
      top:3,
      left: -10,
    },

});

export default ChangePassword;
