//working
/*import React, {useEffect,useContext, useState} from "react";
import { View, Text, StyleSheet ,Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Authactions";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const Login =(props)=>{
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('')
    useEffect(()=>{
        if(context.stateUser.isAuthenticated)
        {
            props.navigation.navigate("User Profile")
        }
    },[context.stateUser.isAuthenticated])

    const handleSubmit =()=>{
        const user= {
            email, password
        }
        if(email==="" || password==="")
        {
            setErr("Please Fill in your credentials")
        }
        else{
            loginUser(user,context.dispatch)
        }
      
        
    }

    return(
       <FormContainer title={"Login"}>
        <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />

        
        <Input 
                placeholder={"Enter Password"}
                id={"password"}
                name={"password"}
                secureTextEntry={true}
                velue={password}
                onChangeText={(text)=>{
                    setPassword(text)
                }}
                />
        <View style={styles.ButtonWidth}>
            {err? <Error  message={err}></Error> : null}
            <EasyButton 
            primary
            large
            onPress={()=>{handleSubmit()}}>
                <Text style={{color:"white"}}>Login</Text>
            </EasyButton>

        </View>
        <View style={[{marginTop:40}, styles.ButtonWidth]}>
            <Text style={styles.text}>
                Don't have account yet?

            </Text>
            <EasyButton 
            secondary
            large
            onPress={()=>{props.navigation.navigate("Register")}}
            >
                  <Text style={{color:"white"}}>Register</Text>
            </EasyButton>

        </View>

       </FormContainer>
    )
}
const styles= StyleSheet.create({
    ButtonWidth:{
        width:'80%',
        alignItems:'center',
    },
    text:{
        marginBottom:20,
        alignSelf:'center',
    }
})
export default Login;*/




//Mine

import React, {useEffect,useContext, useState} from "react";
import { View, Text, StyleSheet ,Button, TouchableOpacity } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Icon from "react-native-vector-icons/Ionicons"

//Context
import AuthGlobal from "../../Context/store/AuthGlobal";
import { loginUser } from "../../Context/actions/Authactions";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

const Login =(props)=>{

    const [showPassword, setShowPassword] = useState(false);
    const context = useContext(AuthGlobal)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('')
    useEffect(()=>{
        if(context.stateUser.isAuthenticated)
        {
            props.navigation.navigate("User Profile")
        }
    },[context.stateUser.isAuthenticated])

    const handleSubmit =()=>{
        const user= {
            email, password
        }
        if(email==="" || password==="")
        {
            setErr("Please Fill in your credentials")
        }
        else{
            loginUser(user,context.dispatch)
        }
      
        
    }

    const handleForgotPassword = () => {
        props.navigation.navigate("ForgotPassword");
      };

    return(
        <View style={{backgroundColor:"white", flex:1,}}>
       <FormContainer
       
       //title={"Login"}
       >
        <Input
        placeholder={"Enter Email"}
        placeholderTextColor={"#494F55"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />

        
        <Input 
                placeholder={"Enter Password"}
                placeholderTextColor={"#494F55"}
                id={"password"}
                name={"password"}
                secureTextEntry={!showPassword}
                velue={password}
                onChangeText={(text)=>{
                    setPassword(text)
                }}
                />
                {/* Eye icon for password visibility */}
                <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Icon
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
      
      
            {err? <Error  message={err}></Error> : null}
            <TouchableOpacity
             onPress={()=>{handleForgotPassword()}}>
                <Text style={{color:"#6DB5CA", fontWeight:"bold"}}>Forgot Password?</Text>
            </TouchableOpacity>
        
             <View style={styles.login}>
            <EasyButton 

            primary
            //large
            onPress={()=>{handleSubmit()}}>
                <Text style={{color:"white", fontWeight:"bold", fontSize:16}}>Login</Text>
            </EasyButton>
            </View>
         
            
        

      
       
            <Text style={styles.text}>
                Don't have account yet?

            </Text>
            <View style={styles.register}>
            <EasyButton 
            secondary
           // large
            onPress={()=>{props.navigation.navigate("Register")}}
            >
                  <Text style={{color:"white", fontWeight:"bold",fontSize:16}}>Register</Text>
            </EasyButton>
        

        </View>

       </FormContainer>
       </View>
    )
}
const styles= StyleSheet.create({
    container:{
        backgroundColor:"white",

    },
    ButtonWidth:{
        width:'90%',
        alignItems:'center',
        
    },
    text:{
        color:"black",
        marginTop:240,
        marginBottom:10,
        alignSelf:'center',
    },
    eyeIcon: {
       // backgroundColor:"blue",
        position: "absolute",
        right: 50,
        top: "15%", // Vertically center the icon in the input field
        marginTop: 12, // Half of the icon size to center it properly
        zIndex: 1,
      },
      login:{
        width:"80%",
        
        
        //borderRadius:10,
        //backgroundColor:"green",
        marginTop:10,
      },
      register:{
        width:"80%",
      // backgroundColor:"#6DB5CA",
      }
})
export default Login;

