// import jwt_decode from 'jwt-decode'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// //import {AsyncStorage} from 'react-native';
// import  Toast  from 'react-native-toast-message'
// import baseUrl from '../../assets/common/baseUrl'


// export const SET_CURRENT_USER = "SET_CURRENT_USER"

// export const loginUser=(user, dispatch)=>{
//     fetch(`${baseUrl}users/login`,{
//         method:"POST",
//         body:JSON.stringify(user),
//         headers:{
//             Accept:"application/json",
//             "Content-Type":"application/json"
//         }

//     }).then((res)=>{res.json()})
//     .then((data)=>{
//         if(data){
//             const token = data.token;
//             AsyncStorage.setItem("jwt", token)
//             const decoded= jwt_decode(token)
//             dispatch(setCurrentUser(decoded, user))// TODO
//         }
//         else{
//             logoutUser(dispatch)

//         }
//     }).catch((err)=>{
//         Toast.show({
//             topOffset:60,
//             type:'error',
//             text1:'Please provide correct credentials ',
//             text2:""
//         })
//         logoutUser(dispatch)
//     })
// }

// export const getUserProfile=(id)=>{
//     fetch(`${baseUrl}users/${id}`,{
//         method:'GET',
//         body:JSON.stringify(user),
//         headers:{
//             Accept:'application/json',
//             "Content-Type":'application/json'
//         },
//     }).then((res)=>{
//         res.json()
//     }).then((data)=>{console.log(data)})
// }
// export const logoutUser=(dispatch)=>{
//     AsyncStorage.removeItem("jwt");
//     dispatch(setCurrentUser({}))

// }
// export const setCurrentUser=(decoded, user)=>{
//     return{
//         type:SET_CURRENT_USER,
//         payload:decoded,
//         userProfile: user

// }}





import jwt_decode from 'jwt-decode';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import {baseURL} from '../../assets/common/baseUrl';
import axios from 'axios';

import { clearfromCart } from '../../Redux/Actions/cartActions';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
import { fetchCartItems } from '../../Redux/Actions/cartActions';

export const loginUser = (user, dispatch) => {
  axios.post(`${baseURL}users/login`, user
    
    // body: JSON.stringify(user),
    // headers: {
    //   Accept: 'application/json',
    //   'Content-Type': 'application/json',
    // },
  )
  // axios.post(`http://172.21.16.1:3000/api/v1/users/login`, user)
  // axios.post(`http://10.141.164.123:3000/api/v1/users/login`, user)
   .then((response) => {
    const data = response.data;

      if (data) {
        console.log('I am datata',data);
        const token = data.token;
        AsyncStorage.setItem('jwt', token)
          .then(() => {
            const decoded = jwt_decode(token);
            //addnew
            const userId=decoded.userId
            dispatch(setCurrentUser(decoded, user,userId));
            //add new line
            fetchCartItems(userId)(dispatch);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((err) => {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please provide correct credentials',
        text2: '',
      });
      logoutUser(dispatch);
    });
};


// export const loginUser = (user, dispatch) => {
//   axios.post(`http://10.141.164.123:3000/api/v1/users/login`, user)
//     .then((response) => {
//       const data = response.data;
//       if (data) {
//         const token = data.token;
//         AsyncStorage.setItem("jwt", token)
//         const decoded = jwt_decode(token)
//         dispatch(setCurrentUser(decoded, user)) // TODO
//       } else {
//         logoutUser(dispatch);
//       }
//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the request
//       console.error("Error occurred:", error);
//     });
// }





 /*const loginUser = (user, dispatch) => {
  axios.post(`http://10.141.164.123:3000/api/v1/users/login`, user)
    .then((response) => {
      const data = response.data;
      if (data) {
        const token = data.token;
        AsyncStorage.setItem("jwt", token)
        const decoded = jwt_decode(token)
        dispatch(setCurrentUser(decoded, user)) // TODO
      } else {
        logoutUser(dispatch);
      }
    })
    .catch((error) => {
      if (error.response && error.response.data && error.response.data.message) {
        // The request was made, the server responded with a status code outside of 2xx,
        // and the error response contains a 'message' property
        Alert.alert('Error', error.response.data.message);
      } else {
        // Some other error occurred (e.g., network error)
        Alert.alert('Error', 'An error occurred. Please try again later.');
      }
      console.error("Error occurred:", error);
    });
}*/


export const getUserProfile = (id) => {
  fetch(`${baseURL}users/${id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const logoutUser = (dispatch) => {
  // Clear cart items from AsyncStorage
   
  AsyncStorage.removeItem('jwt')
    .then(() => {
      dispatch(setCurrentUser({}));
      clearfromCart()(dispatch);
    })
    .catch((err) => {
      console.error(err);
    });
};

export const setCurrentUser = (decoded, user) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
    userProfile: user,
  };
};
// module.exports = {
//   loginUser,
//   // Other exported functions, if any
// };