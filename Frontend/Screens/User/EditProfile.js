// // EDITPROFILE.js
// import React,{useContext, useState,useEffect} from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import AuthGlobal from "../../Context/store/AuthGlobal";
// import { logoutUser} from "../../Context/actions/Authactions"
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// var height=Dimensions.get("window");


// const EditProfile = ({route}) => {
   
//     const { userProfile} = route.params;
//     const navigation = useNavigation(); // Get the navigation object
//     const context = useContext(AuthGlobal);
  
//     const [profileData, setProfileData] = useState(userProfile);

//     useEffect(() => {
//       setProfileData(userProfile);
//     }, [userProfile]);
  
  

//     // Use the useEffect hook to update userProfile when the EditDetails screen is closed
   


//     // const handleLogout = () => {
//     //     console.log("Triggered");
//     //     AsyncStorage.removeItem("jwt");
//     //     logoutUser(context.dispatch);
//     //   };
//     const handleChangePassword = () => {
//       navigation.navigate('ChangePassword', { userProfile });
//     };
      
//     const handleBackIconPress = () => {
//       navigation.goBack(); // Navigate back to the previous screen (UserProfile)
//     };
//     const handleEditDetails = () => {
//       // Navigate to the EditDetails screen with the user profile as a parameter
//       navigation.navigate('Edit Details', { userProfile });
//     };

//   return (
//     <View style={styles.container}>
//       <View>
//               <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
//         <Icon  color="black" name="arrow-back" size={30} />
//       </TouchableOpacity>
//       <Text style={styles.heading}>Account Information</Text>
//       </View>
//       <TouchableOpacity style={styles.editDetailsButton} onPress={handleEditDetails}>
//         <Text style={styles.editDetailsButtonText}>Edit Details</Text>
//       </TouchableOpacity>
     
//       <View style={styles.userDetails}>
//         <Text style={styles.userDetailText}>Email: {userProfile ? userProfile.email : ''}</Text>
//         <Text style={styles.userDetailText}>Full Name : {userProfile ? userProfile.name : ''}</Text>
//         <Text style={styles.userDetailText}>Phone: {userProfile ? userProfile.phone : ''}</Text>
//     <Text style={styles.userDetailText}>Gender: {userProfile ? userProfile.gender : ''}</Text>
    
//     <Text style={styles.userDetailText}>City: {userProfile ? userProfile.city : ''}</Text>
//     <Text style={styles.userDetailText}>Shipping Address: {userProfile ? userProfile.shippingAddress : ''}</Text>
//     <Text style={styles.userDetailText}>Country: {userProfile ? userProfile.country : ''}</Text>
//         {/* Add address and other user details as needed */}
//       </View>

//       <TouchableOpacity style={styles.editDetailsButtont} onPress={handleChangePassword}>
//         <Text style={styles.editDetailsButtonText}>Change Password</Text>
//       </TouchableOpacity>

     
//       {/* <TouchableOpacity style={styles.logoutButton} 
//       onPress={() =>handleLogout()}
      
//       >
//         <Text style={styles.logoutButtonText}>Sign out</Text>
//       </TouchableOpacity> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//    flex: 1,
//    // alignItems: 'center',
//    //justifyContent: 'center',
//     backgroundColor: 'white',
//   },
//   heading: {
//   //     alignItems: 'center',
//   //  justifyContent: 'center',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 40,
//     marginTop:10,
//     color: '#333',
//     marginLeft:70,
//   },
//   backIcon: {
//     marginLeft:13,
 
//     position: 'absolute',
//     color:"black",
//     top: 12,
//    // left: -70,
//   },
//   userDetails: {
//   // alignItems: 'center',
//    // padding: 20,
//     borderRadius: 10,
//     backgroundColor: '#FFF',
//     width: '80%',
//     height:height,
//     shadowColor: '#91AEC4',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 4,
    
   
//   },
//   userDetailText: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: '#333',
//   },
//   editDetailsButton: {
//     backgroundColor: 'grey',
//     paddingVertical: 7,
//     paddingHorizontal: 10,
//     borderRadius: 15,
//     alighItems:'center',
//     left:270,
//     width:'30%',
//     marginTop: 10,
//     Right:10,
//   },
//   editDetailsButtont: {
//     backgroundColor: '#BD7422',
//     paddingVertical: 4,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//     marginTop: 10,
//     marginLeft:10,
//   },
//   editDetailsButtonText: {
//     color: '#FFF',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   // logoutButton: {
//   //   backgroundColor: '#FF0000',
//   //   paddingVertical: 10,
//   //   paddingHorizontal: 20,
//   //   borderRadius: 5,
//   //   marginTop: 20,
//   // },
//   // logoutButtonText: {
//   //   color: '#FFF',
//   //   fontWeight: 'bold',
//   //   fontSize: 16,
//   // },
// });
// export default EditProfile;














import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient'; // Import LinearGradient for gradient background
import { ScrollView } from 'native-base';
import { logoutUser } from "../../Context/actions/Authactions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthGlobal from "../../Context/store/AuthGlobal";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import * as actions from '../../Redux/Actions/userActions'
import { connect } from "react-redux";

import { setUserProfile } from '../../Redux/Actions/userActions';
const EditProfile = ({ route, AddUserProfile }) => {
  
  const { userProfile } = route.params;

  console.log("DATA IS ", userProfile)
  //AddUserProfile(userProfile)
  AddUserProfile(userProfile)
  const navigation = useNavigation();
  const context = useContext(AuthGlobal);
  const [profileData, setProfileData] = useState(userProfile);

  useEffect(() => {
    setProfileData(userProfile);

   // dispatch(setUserProfile(userProfile));
   AddUserProfile(userProfile)
  }, [userProfile]);

  const handleChangePassword = () => {
    navigation.navigate('ChangePassword', { userProfile });
  };

  const handleBackIconPress = () => {
    navigation.goBack();
  };

  const handleEditDetails = () => {
    navigation.navigate('Edit Details', { userProfile });
  };

  return (
 

    < View
     style={styles.container}
     >
       

      <ScrollView>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
          <Icon color="black" name="arrow-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.heading}>Account Information</Text>
      </View>
      <TouchableOpacity
        style={styles.editDetailsButton}
   
            onPress={handleChangePassword}>
        <Text style={styles.editDetailsButtonText1}>Change Password</Text>
      </TouchableOpacity>
    
      <View style={styles.userDetails}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={handleEditDetails}>
        <Text style={styles.editDetailsButtonText}>Edit Details</Text>
      </TouchableOpacity>
        <Text style={styles.userDetailText}>Email: </Text>
        <Text style={styles.text}>{profileData.email}</Text>
        <Text style={styles.userDetailText}>Full Name:</Text>
        <Text  style={styles.text} >{profileData.name}</Text>
        <Text style={styles.userDetailText}>Phone:</Text>
        <Text  style={styles.text}>{profileData.phone}</Text>
        <Text style={styles.userDetailText}>Gender:</Text>
        <Text  style={styles.text}>{profileData.gender}</Text>
        <Text style={styles.userDetailText}>City:</Text>
        <Text  style={styles.text}>{profileData.city}</Text>
        <Text style={styles.userDetailText}>Shipping Address:
        </Text>
        <Text  style={styles.text}>{profileData.shippingAddress}</Text>
       
        <Text style={styles.userDetailText}>Country: {profileData.country}</Text>
        <Text  style={styles.text}>{profileData.country}</Text>
      </View>

      

      <View>
        <EasyButton
        secondary
          large
          //secondary
          style={styles.logoutButton}
          onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch),
          ]}
        >
          <Text style={{ fontSize: 14, color: "white", fontWeight: "bold" }}>
            Logout
          </Text>
        </EasyButton>
      </View>
      </ScrollView>
      </View>

  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    AddUserProfile:(userProfile)=>dispatch(actions.setUserProfile(userProfile))
  
    
    }
   
  };


const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "#f40105",
    width:"80%",
    marginLeft:40,

   // padding:2,
   // margin:3,
    //paddingVertical: 2,
   // paddingHorizontal: 20,
    //borderRadius: 10,
  },
  container: {
   // flex: 1,
   //backgroundColor:"gainsboro"
   backgroundColor:'white'

  },
  text:{
    fontSize:16,
    fontWeight:'bold',
    color:"black",
   

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  heading: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  backIcon: {
    marginRight: 10,
  },
  userDetails: {
    backgroundColor: '#FFF',
     margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: '#4c738d',
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 4,
    shadowRadius: 5,
    elevation: 4,
  },
  userDetailText: {
    fontSize: 18,
   // marginBottom: 10,
    color: '#BF932A',
    fontWeight:'bold',
   // marginTop:10,
  },
  editDetailsButton: {
    // alignSelf: 'center',
    //backgroundColor: '#FED9B7',
    //  paddingVertical: 10,
    //  paddingHorizontal: 20,
    // borderRadius: 5,
    // marginVertical: 10,
    marginLeft:240,
    marginTop:10,
  },
  editButton:{
  //  backgroundColor:"#4c7e8d",
  //backgroundColor:'#DC7215',
   alignContent:"center",
   //borderColor:'grey',
   borderRadius:4,
   //borderWidth:3,
  // alignSelf:"center",
    paddingVertical: 6,
     paddingHorizontal: 10,
    // marginBottom:10,
     left:199,
    // right:10,
    width:"39%"


  },
  editDetailsButtonText: {
    color: '#365a65',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf:'center'
  },
  editDetailsButtonText1: {
    color: '#365a65',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default connect(null, mapDispatchToProps)(EditProfile);
