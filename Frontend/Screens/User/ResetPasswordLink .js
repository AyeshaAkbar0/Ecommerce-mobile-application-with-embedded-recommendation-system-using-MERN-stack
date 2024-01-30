// // // ResetPasswordLink.js
// import React, { useState } from "react";
// import { View, Text, StyleSheet,  TextInput , TouchableOpacity} from "react-native";
// import {Button} from "native-base";
// import axios from "axios";
// import {baseURL} from "../../assets/common/baseUrl";
// import Toast from "react-native-toast-message";
// import Icon from "react-native-vector-icons/Ionicons"

// const ResetPasswordLink = ({ route, navigation }) => {
//   const { email } = route.params;
//   const [resetCode, setResetCode] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showPassword2, setShowPassword2] = useState(false);

//   const handleResetPassword = async () => {
//     if (!resetCode || !password || !confirmPassword) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Please provide a valid reset code, password, and confirm password.',
//         visibilityTime: 3000, // Show for 3 seconds
//       });
//       return;
//     }

//     if (password !== confirmPassword) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Password and confirm password do not match.',
//         visibilityTime: 3000, // Show for 3 seconds
//       });
//       return;
//     }

//     try {
//       const response = await axios.post(`${baseURL}users/reset-password`, {
//         email: email,
//         resetCode: resetCode,
//         password: password,
//         confirmPassword: confirmPassword,
//       });

//       if (response.data.success) {
//         // Password reset was successful
//         Toast.show({
//           type: 'success',
//           text1: 'Success',
//           text2: 'Password reset successfully.',
//           visibilityTime: 3000, // Show for 3 seconds
//         });
//         navigation.navigate('Login'); // Navigate to login screen or any other screen you want
//       } else {
//         // Password reset failed, show error message
//         Toast.show({
//           type: 'error',
//           text1: 'Error',
//           text2: response.data.message || 'Failed to reset password.',
//           visibilityTime: 3000, // Show for 3 seconds
//         });
//       }
//     } catch (error) {
//       // Handle network or other errors
//       Toast.show({
//         type: 'error',
//         text1: 'Error',
//         text2: 'Failed to reset password.',
//         visibilityTime: 3000, // Show for 3 seconds
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
      
//       <View style={styles.inputContainer}>
//         <Text style={[styles.label,{marginTop:40, fontWeight:"bold", color:"black"}]}>Reset Code:</Text>
//         <TextInput
//           style={styles.input}
//           keyboardType="numeric"
//           placeholder="Enter your reset code"
//           value={resetCode}
//           onChangeText={(text) => setResetCode(text)}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={[styles.label,{ fontWeight:"bold", color:"black"}]}>Password:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter new password"
//           value={password}
//           onChangeText={(text) => setPassword(text)}
//           secureTextEntry={!showPassword}
//         />
//         <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => setShowPassword((prev) => !prev)}
//           >
//             <Icon
//               name={showPassword ? "eye-outline" : "eye-off-outline"}
//               size={24}
//               color="grey"
//             />
//           </TouchableOpacity>
//       </View>
//       <View style={styles.inputContainer}>
//         <Text style={[styles.label,{ fontWeight:"bold", color:"black"}]}>Confirm Password:</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm your new password"
//           value={confirmPassword}
//           onChangeText={(text) => setConfirmPassword(text)}
//           secureTextEntry={!showPassword2}
//         />
//          <TouchableOpacity
//             style={styles.eyeIcon}
//             onPress={() => setShowPassword2((prev) => !prev)}
//           >
//             <Icon
//               name={showPassword2 ? "eye-outline" : "eye-off-outline"}
//               size={24}
//               color="grey"
//             />
//           </TouchableOpacity>
//       </View>
//       <Button  style={styles.button} onPress={handleResetPassword} >Reset Password</Button>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   eyeIcon: {
//     // backgroundColor:"blue",
//      position: "absolute",
//      right: 10,
//      top: "30%", // Vertically center the icon in the input field
//      marginTop: 12, // Half of the icon size to center it properly
//      zIndex: 1,
//    },
//   container: {
//     flex: 1,
//     //justifyContent: "center",
//     alignItems: "center",
//     backgroundColor:"white",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   inputContainer: {
//    marginTop:5,
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     width: 300,
//     height: 40,
//     borderWidth: 1,
//     borderColor: "black",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//   },
//   button:{
//     marginTop:10,
//     backgroundColor:"#FF7235",
//     fontWeight:"bold",
//     fontSize:18,
//     color:"white",
//     width:"75%"
//   }
// });

// export default ResetPasswordLink;
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { baseURL } from "../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";

const ResetPasswordLink = ({ route, navigation }) => {
  const { email } = route.params;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const initialValues = {
    resetCode: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    resetCode: Yup.string().required("Reset code is required."),
    password: Yup.string().required("Password is required."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match.")
      .required("Confirm password is required."),
  });

  const handleResetPassword = async (values) => {
    if (values.password !== values.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password and confirm password do not match.',
        visibilityTime: 3000,
      });
      return;
    }

    try {
      const response = await axios.post(`${baseURL}users/reset-password`, {
        email: email,
        resetCode: values.resetCode,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (response.data.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Password reset successfully.',
          visibilityTime: 3000,
        });
        navigation.navigate('Login');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: response.data.message || 'Failed to reset password.',
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to reset password.',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleResetPassword}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { marginTop: 40, fontWeight: "bold", color: "black" }]}>
                Reset Code:
              </Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Enter your reset code"
                onChangeText={handleChange("resetCode")}
                onBlur={handleBlur("resetCode")}
                value={values.resetCode}
              />
              {touched.resetCode && errors.resetCode && (
                <Text style={styles.errorText}>{errors.resetCode}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { fontWeight: "bold", color: "black" }]}>Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter new password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword((prev) => !prev)}
              >
                <Icon
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { fontWeight: "bold", color: "black" }]}>Confirm Password:</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirm your new password"
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={!showPassword2}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword2((prev) => !prev)}
              >
                <Icon
                  name={showPassword2 ? "eye-outline" : "eye-off-outline"}
                  size={24}
                  color="grey"
                />
              </TouchableOpacity>
              {touched.confirmPassword && errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
              )}
            </View>
            <Button style={styles.button} onPress={handleSubmit}>
              Reset Password
            </Button>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#FF7235",
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
    width: "75%",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  // eyeIcon: {
  //   position: "absolute",
  //   right: 10,
  //   top: "30%",
  //   zIndex: 1,
  // },
    eyeIcon: {
    // backgroundColor:"blue",
     position: "absolute",
     right: 10,
     top: "30%", // Vertically center the icon in the input field
     marginTop: 12, // Half of the icon size to center it properly
     zIndex: 1,
   },
});

export default ResetPasswordLink;
