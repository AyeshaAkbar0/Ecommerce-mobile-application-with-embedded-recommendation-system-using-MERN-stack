// import React,{useReducer, useEffect, useState} from "react";
// import jwt_decode from "jwt-decode";
//  import AsyncStorage from "@react-native-async-storage/async-storage";
// //import {AsyncStorage} from 'react-native';
// import Auth_reducer from "../reducers/Auth_reducer";
// import { setCurrentUser } from "../actions/Authactions";
// import AuthGlobal from "./AuthGlobal";

// const Auth=props=>{
//     const [stateUser, dispatch]= useReducer(Auth_reducer,{
//         isAuthenticated:null,
//         user:{

//         }
//     })
//     const [showChild, setShowChild]=useState(false)
//     useEffect(
//         ()=>{
//             setShowChild(true);
//             if(AsyncStorage.jwt)
//             {
//                 const decoded= AsyncStorage.jwt? AsyncStorage.jwt:"";
//                 if(setShowChild)
//                 {
//                     dispatch(setCurrentUser(jwt_decode(decoded)))
//                 }
//             }
//             return ()=>{setShowChild(false)}
//         },[]
//     )
//     if(!showChild){
//         return null
//     }
//     else{
//         return(
//             <AuthGlobal.Provider
//             value={{stateUser,dispatch}}>
//                 {props.children}

//             </AuthGlobal.Provider>
//         )
//     }
// }

// export default Auth;


import React, { useReducer, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Auth_reducer from "../reducers/Auth_reducer";
import { setCurrentUser } from "../actions/Authactions";
import AuthGlobal from "./AuthGlobal";

const Auth = (props) => {
  const [stateUser, dispatch] = useReducer(Auth_reducer, {
    isAuthenticated: null,
    user: {},
  });
  const [showChild, setShowChild] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setShowChild(true);
      const token = await AsyncStorage.getItem("jwt");
      if (token) {
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
      }
    };

    checkAuth();

    return () => {
      setShowChild(false);
    };
  }, []);

  if (!showChild) {
    return null;
  } else {
    return (
      <AuthGlobal.Provider value={{ stateUser, dispatch }}>
        {props.children}
      </AuthGlobal.Provider>
    );
  }
};

export default Auth;
