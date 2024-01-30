import React ,{useContext}from "react";
import AuthGlobal from "../Context/store/AuthGlobal";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/User/Login";
import Register from "../Screens/User/Register";
import UserProfile from "../Screens/User/UserProfile";
import EditProfile from "../Screens/User/EditProfile"
import Verification from '../Screens/User/Verification'
import EditDetails from '../Screens/User/EditDetails'
import ChangePassword from '../Screens/User/ChangePassword'
import ForgotPassword from "../Screens/User/ForgotPassword";
import ResetPasswordLink from "../Screens/User/ResetPasswordLink ";
import SubmitReviewScreen from "../Screens/User/SubmitReviewScreen";

const Stack = createStackNavigator();

function MyStack(){

        const context = useContext(AuthGlobal);
    return(
          <Stack.Navigator
          initialRouteName="Login"
          
          >

{context.stateUser.isAuthenticated &&(
        <>
          <Stack.Screen
          name="User Profile"
          component={UserProfile}
          options={ {
                  headerShown:false} }>

          </Stack.Screen>

          
           
          
            <Stack.Screen
            name="Edit Profile"
            component={EditProfile}
            options={ {
                    headerShown:false} }>
                        </Stack.Screen>
          

       
          <Stack.Screen name="SubmitReviewScreen" component={SubmitReviewScreen} 
          options={ {
                headerShown:false,
        
} }
          />
          
            
           

<Stack.Screen
            name="Edit Details"
            component={EditDetails}
            options={ {
                    headerShown:false} }></Stack.Screen>
                    <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={ {
                    headerShown:false} }></Stack.Screen>
                    </>

                    )}
                        
                      
                        <Stack.Screen
                        name="Login"
                        component={Login}
                        options={ {
                                headerShown:false} }>
            
                        </Stack.Screen>
                          <Stack.Screen
                          name="ForgotPassword"
                          component={ForgotPassword}
                          options={ {
                              headerShown:false} }>
                        </Stack.Screen>
                        <Stack.Screen
            name="Verification"
            component={Verification}
            options={ {
                    headerShown:false} }></Stack.Screen>
                     <Stack.Screen
            name="Register"
            component={Register}
            options={ {
                    headerShown:false} }>

            </Stack.Screen>
          
      
                     
               
                          <Stack.Screen name="Reset Password" component={ResetPasswordLink} />
                        
          </Stack.Navigator>
    )
}
export default function UserNavigator(){
    return <MyStack/>
}