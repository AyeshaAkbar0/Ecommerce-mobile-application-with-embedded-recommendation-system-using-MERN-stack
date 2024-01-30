

import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Receive from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { baseURL } from "../../assets/common/baseUrl";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import { useNavigation } from "@react-navigation/native";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Authactions";
import OrderCard from "../../Shared/OrderCard";
import EditProfile from "./EditProfile";
import UserOrderCard from "../../Shared/UserOrderCard";

var { width } = Dimensions.get("window");

const UserProfile = (props) => {
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState([]);

  const context = useContext(AuthGlobal);
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchSubmittedReviews = async (userId) => {
  //     try {
  //       const response = await axios.get(`${baseURL}/Rate/submittedReviews?userId=${userId}`);
  //       return response.data;
  //     } catch (error) {
  //       console.error(error);
  //       return [];
  //     }
  //   };

  //   const getSubmittedReviews = async () => {
  //     const reviews = await fetchSubmittedReviews(context.stateUser.user.userId);
  //     setSubmittedReviews(reviews);
  //   };

  //   // Fetch and set the user's submitted reviews
  //   getSubmittedReviews();
  // }, []);

  const fetchSubmittedReviews = async (userId) => {
   
    try {
      const response = await axios.get(`${baseURL}Rate/submittedReviews?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const getSubmittedReviews = async () => {
    const reviews = await fetchSubmittedReviews(context.stateUser.user.userId);
    
    setSubmittedReviews(reviews);
  };

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }
      AsyncStorage.getItem("jwt")
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => {
              setUserProfile(user.data);
            });
        })
        .catch((error) => {
          console.log(error);
        });

      axios
        .get(
          `${baseURL}orders/get/userorders/${context.stateUser.user.userId}`
        )
        .then((res) => {
          const data = res.data;
          
         

          setOrders(data);
          // Set the initial filtered orders to be the same as all orders
          setFilteredOrders(data);
        })
        .catch((error) => {
          console.log(error);
        });
        // Fetch and set the user's submitted reviews
      getSubmittedReviews();

      return () => {
        setUserProfile();
        setOrders();
        setFilteredOrders([]);
      };
     


    }, [context.stateUser.isAuthenticated])
  );

  const handleOrderFilter = (filterType) => {
    // Check if there are orders to filter
    if (!orders.length) return;

    // Filter the orders based on the selected type (1, 2, or 3)
    const filteredOrders = orders.filter((order) => order.status === filterType);

    // Update the state with the filtered orders
    setFilteredOrders(filteredOrders);
  };

  const handleSettingIconPress = () => {
    navigation.navigate("Edit Profile", { userProfile: userProfile });
  };

  const handleReviewButtonPress = (orderId) => {
    // Navigate to the review screen or perform other actions
    // You can use navigation.navigate(...) here
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Text style={styles.profileName}>
          {userProfile ? userProfile.name : ""}
        </Text>
        {/* Settings Icon */}
        <TouchableOpacity
          style={styles.settingIcon}
          onPress={handleSettingIconPress}
        >
          <Icon color="black" name="profile" size={30} />
          <Text style={{ color: "black", fontSize:12 }}>Profile</Text>
        </TouchableOpacity>
      </View>
      {context.stateUser.user.isAdmin==false?(

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.orderContainer}>
          <Text style={styles.orderTitle}>My Orders</Text>
          <View style={styles.orderOptions}>

          <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter("3")}
            >
              <Receive name ="pending" size={27} color="black"></Receive>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                To Ship
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter("2")}
            >
               <Receive name ="local-shipping" size={27} color="black"></Receive>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                To Receive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter("1")}
            >
              <Receive name ="rate-review" size={27} color="black"></Receive>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                To Review
              </Text>
            </TouchableOpacity>
           
            {/* Add more order filter options as needed */}
          </View>
          {/* {filteredOrders && filteredOrders.length ? (

          <View>
            {filteredOrders.map((order) => (
              
              <OrderCard key={order.id} {...order} showReviewButton={order.status === "1"} />
            ))}
          </View>
        ) : (
          <View style={styles.noOrderContainer}>
            <Text>No Orders Found</Text>
          </View>
        )} */}
        {filteredOrders && filteredOrders.length ? (
  <View>
    {filteredOrders.map((order) => {
     console.log('Order Properties:', order); // Add this line
      return (
        <UserOrderCard
                  key={order.id}
                  {...order}
                 
                  showReviewButton={order.status === "1"} 
                  submittedReviews={submittedReviews}
                  orderId={order.id}
                />
      );
    })}
  </View>
) : (
  <View style={styles.noOrderContainer}>
    <Text style={{marginTop:50,}}>No Orders Found</Text>
  </View>
)}


        </View>
      

      {/* <View>
        <EasyButton
          long
          //secondary
          style={styles.logoutButton}
          onPress={() => [
            AsyncStorage.removeItem("jwt"),
            logoutUser(context.dispatch),
          ]}
        >
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
            Logout
          </Text>
        </EasyButton>
      </View> */}
      </ScrollView>
      ):(
        <View style={styles.admin}>
          <Text style={{fontWeight:"bold", color:"#FF7235", 
          fontSize:16, alignContent:"center"}}>Bookworm Power Activate! 📚✨

           <Text style={{color:'black',}}>
            Welcome to the heart of your bookstore
            universe. 🚀 Unleash your managerial magic with our enchanting admin interface. Rule over categories,
           orders, and tracking in style. Your online store mastery begins
            now! 📖🎉</Text></Text>
          </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  admin:{
    alignContent:"center",
    alignItems:"center",
    padding:20,
    margin:20,
    marginTop:90,


  },
  settingIcon: {
    position: "absolute",
    top: 19,
    right: 20,
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  profileContainer: {
   // backgroundColor: "#DADEDF",
    borderRadius: 15,
    paddingVertical: 20,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 25,
    marginTop: 5,
    fontWeight: "bold",
    color: "#4A686A",
    marginLeft: 10,
  },
  userDetails: {
    alignItems: "center",
    marginBottom: 20,
  },
  userDetailText: {
    fontSize: 16,
    marginBottom: 5,
  },
  orderContainer: {
    marginBottom: 10,
    paddingBottom: 20,
  },
  orderTitle: {
    fontSize: 20,
    marginLeft:14,
    fontWeight: "bold",
    marginBottom: 10,
    //color: "#033746",

  },
  orderOptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  orderOption: {
    // padding: 5,
    // backgroundColor: "black",
    alignContent:"center",
    alignItems:"center",
     borderRadius: 1,
     borderColor: "grey",
     padding:2,
     //borderWidth:2,
  },
    orderList: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    padding: 10,
  },
  noOrderContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  reviewButton: {
    backgroundColor: "#FF7235",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  reviewButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#f40105",
    padding:2,
    margin:3,
    //paddingVertical: 2,
   // paddingHorizontal: 20,
    ///borderRadius: 10,
  },
});

export default UserProfile;

