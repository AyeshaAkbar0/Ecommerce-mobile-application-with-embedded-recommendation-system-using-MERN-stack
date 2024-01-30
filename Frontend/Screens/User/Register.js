// import React, {useState} from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import FormContainer from "../../Shared/Form/FormContainer";
// import Input from "../../Shared/Form/Input";
// import Error from "../../Shared/Error";
// import  Toast from "react-native-toast-message";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import axios from "axios";
// import baseUrl from '../../assets/common/baseUrl'
// import EasyButton from "../../Shared/StyledComponents/EasyButton";
// const Register =(props)=>{
//     const [email, setEmail] = useState('')
//     const [phone, setPhone] = useState('')
//     const [password, setPassword]= useState('')
//     const [name, setName]= useState('')
//     const [error, setError]= useState('')

//     const Register=()=>{
//         if(email==="" || password==="" || name==="" || phone==="")
//         {
//             setError("Please Enter all credentials")
//         }
//         let user ={
//             email: email,
//             name:name,
//             phone:phone,
//             password:password,
//             isAdmin:false
//         }
//         axios.post(`http://172.23.112.1:3000/api/v1/users/register`, user).then(
//             (res)=>{
//                 console.log(res.data)
//                 if(res.status ==200)
//                 {   
//                     Toast.show({
//                         topOffset:60,
//                         type:'success',
//                         text1:'Registration Succeeded',
//                         text2:'Please login to your account'
//                     })
//                     setTimeout(()=>{
//                         props.navigation.navigate("Login")
//                     },500)
//                 }
//             }
//         ).catch((err)=>{
//            Toast.show({
//             topOffset:60,
//             type:'error',
//             text1:'Something went wrong',
//             text2:'Please try again'
//            });
//         });
//         console.log(user.name)
//     }

//     return(
//         <KeyboardAwareScrollView
//         viewIsInsideTabBar={true}
//         extraHeight={200}
//         enableOnAndroid={true}
//         >
//             <FormContainer title={'Register'}>
//                 <Input 
//                 placeholder={"Enter Email"}
//                 id={"email"}
//                 name={"email"}
//                 onChangeText={(text)=>{
//                     setEmail(text.toLowerCase())
//                 }}
//                 />
//                  <Input 
//                 placeholder={"Enter Name"}
//                 id={"name"}
//                 name={"name"}
//                 onChangeText={(text)=>{
//                     setName(text)
//                 }}
//                 />
//                  <Input 
//                 placeholder={"Enter Phone Number"}
//                 id={"phone"}
//                 name={"phone"}
//                 keyboardType={'numeric'}
//                 onChangeText={(text)=>{
//                     setPhone(text)
//                 }}
//                 />
//                 <Input 
//                 placeholder={"Enter Password"}
//                 id={"password"}
//                 name={"password"}
//                 secureTextEntry={true}
//                 onChangeText={(text)=>{
//                     setPassword(text)
//                 }}
//                 />
//                 <View  style={styles.buttonGroup}>
//                     {error? <Error message = {error}></Error>: null}
//                 </View>
//                 <View>
//                     <EasyButton primary
//                     large
//                      onPress={()=>{Register()}}>
//                     <Text style={{color:"white"}}>Register</Text>

//                     </EasyButton>
//                 </View>
//                 <View>
//                     <EasyButton  
//                     large
//                     secondary
//                     onPress={()=>{
//                         props.navigation.navigate("Login")
//                     }}>

//                 <Text style={{color:"white"}}>Back to Login</Text>
//                     </EasyButton>
//                 </View>

//             </FormContainer>

//         </KeyboardAwareScrollView>
//     )
// }

// const styles= StyleSheet.create({
//     buttonGroup:{
//         width:'80%',
//         margin:10,
//         alignItems:'center'

//     }
// })
// export default Register;










///new Esha cod 
import React, {useState} from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, Dimensions } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import  Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import { Formik } from 'formik';
import * as Yup from 'yup';
import {baseURL} from '../../assets/common/baseUrl'
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from 'react-native-vector-icons/Ionicons'

var height= Dimensions.get('window');

//import Verification from "./Verification";

const Register = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
    const initialValues = {
      email: "",
      // phone: "",
      password: "",
      name: "",
    };
  
     const validationSchema = Yup.object().shape({
      email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email format"
      ),
      //phone: Yup.number().required('Phone number is required'),
      //password: Yup.string().required("Password is required"),
      password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        'Password must contain uppercase and lowercase letter, digit, and special character'
      ),
      name: Yup.string()
      .matches(/^[A-Za-z ]*$/, 'Invalid name format')
      .required('Name is required'),
    });
    const handleRegister = (values) => {
        const user = {
          email: values.email.toLowerCase(),
          name: values.name,
          phone: values.phone,
          password: values.password,
          isAdmin: false,
        };
      
        axios
          .post(`${baseURL}users/register`, user)
          .then((res) => {
            if (res.status === 200) {
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: 'OTP is sent to your email',
                text2: 'Enter your OTP to verify your email',
              });
              setTimeout(() => {
                const { owner } = res.data.verificationToken;
                props.navigation.navigate('Verification', { userId: owner });
              }, 500);
            }
          })
          .catch((err) => {
            if (err.response && err.response.status === 400 && err.response.data === 'Email is already registered') {
              Toast.show({
                topOffset: 60,
                type: 'error',
                text1: 'Email already registered',
                text2: 'Please use a different email',
              });
            } else {
              Toast.show({
                topOffset: 60,
                type: 'error',
                text1: 'Something went wrong',
                text2: 'Please try again',
              });
            }
          });
      };
      
    


      return (
        <View style={{backgroundColor:"white", height:"100%"}}>
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          extraHeight={200}
          enableOnAndroid={true}
        >
          <FormContainer 
          //title={"Register"}
          >
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => handleRegister(values)}
            >
              {({ handleChange, touched, handleBlur, handleSubmit, values, errors }) => (
                <>
                  <Input
                    placeholder={"Enter Email"}
                    placeholderTextColor={"#494F55"}
                    id={"email"}
                    name={"email"}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    />
                    {errors.email && touched.email && <Error message={errors.email} />}
      
                    <Input
                      placeholder={"Enter Name"}
                      placeholderTextColor={"#494F55"}
                      id={"name"}
                      name={"name"}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                    {errors.name && touched.name && <Error message={errors.name} />}
      
                    {/* <Input
                      placeholder={"Enter Phone Number"}
                      id={"phone"}
                      name={"phone"}
                      keyboardType={'numeric'}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && <Error message={errors.phone} />} */}
      <View  style={{width:"100%", marginLeft:60,}}>  
                    <Input
                      placeholder={"Enter Password"}
                      placeholderTextColor={"#494F55"}
                      id={"password"}
                      name={"password"}
                      
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}

                     secureTextEntry={!showPassword2}
        />
        <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword2((prev) => !prev)}
          >
            <Icon2
              name={showPassword2 ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          </View>
                    {errors.password && touched.password && <Error message={errors.password} />}
      
                    <View style={styles.buttonGroup}>
                 
                        <EasyButton primary 
                        //large 
                        onPress={handleSubmit}>
                          <Text style={{ color: "white", fontWeight:"bold", fontSize:16 }}>Register</Text>
                        </EasyButton>
                        </View>
                <View>
                  <TouchableOpacity
                   onPress={() => {
                    props.navigation.navigate("Login");
                  }}
                  >
                    <Text style={{color:"#6DB5CA", fontWeight:"bold"}}>Already have an account?</Text>
                  </TouchableOpacity>
                  
                 
                </View>
             
            </>
          )}
        </Formik>
      </FormContainer>
    </KeyboardAwareScrollView>
    </View>
  );
}
    
    const styles = StyleSheet.create({
      eyeIcon: {
        // backgroundColor:"blue",
         position: "absolute",
         right: 80,
         top: "15%", // Vertically center the icon in the input field
         marginTop: 12, // Half of the icon size to center it properly
         zIndex: 1,
       },
      buttonGroup: {
        width: '80%',
        margin: 20,
       // alignItems: 'center',
      },
    });
    
    export default Register;
    