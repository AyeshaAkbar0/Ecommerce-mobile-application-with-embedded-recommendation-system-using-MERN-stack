import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { submitReview } from "../Redux/Actions/submittedReviewsActions";
import { connect } from "react-redux";
import React, { useEffect, useState,useContext } from "react";
import { View, Text, StyleSheet , Image,TouchableOpacity} from "react-native";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { baseURL } from "../assets/common/baseUrl";
import RNPickerSelect from "react-native-picker-select";
import { Select, Button } from "native-base";
import AuthGlobal from "../Context/store/AuthGlobal";
import { useNavigation } from "@react-navigation/native";
import * as actions from "../Redux/Actions/userActions";



import EasyButton from "./StyledComponents/EasyButton";
import TrafficLight from "./StyledComponents/TrafficLight";



const UserOrderCard = (props) => {
  const [reviewSubmitted, setReviewSubmitted] = useState({});
  const {userProfile}=props;
  console.log("Userrrrrrrrrrrrr", userProfile)
  const navigation=useNavigation()
  const context = useContext(AuthGlobal);
 
  //const submittedReviews = []; // Store submitted review bookIds

  const userId= context.stateUser.user.userId;
  const [orderStatus, setOrderStatus] = useState();
  const [statusText, setStatusText] = useState();
  const [statusChange, setStatusChange] = useState();
  const [token, setToken] = useState();
  const [cardColor, setCardColor] = useState();
  const [expanded, setExpanded] = useState(false);
  // const context = useContext(AuthGlobal);

  const isAdmin = context.stateUser.user.isAdmin;
  
  
  const renderBookInfo = () => {
    return props.orderItems.map((item) => {
      const { product, quantity } = item;
      
      //const showReviewButton = props.showReviewButton && props.status === "1";
      //
      console.log("Industry",props.orderId)
      console.log("order", props.user);
  
      const showReviewButton =
        props.showReviewButton &&
        props.status === "1" &&
        !hasReviewedItem(item, props.submittedReviews,props.orderId);

    
      return (

      <>
      {product?
      (
       <View key={product._id} style={styles.bookInfoContainer}>
       <Image source={{ uri: product.image
               ? product.image
               : 'https://img.freepik.com/free-photo/red-hardcover-book-front-cover_1101-833.jpg?w=360'
               }}
               resizeMode="contain"  style={styles.bookImage} />
       <View style={styles.bookDetails}>
         <Text style={styles.bookTitle}>{product.book_Title}</Text>
         <Text style={styles.bookPrice}>Price:${product.price}</Text>
         <Text style={styles.bookQuantity}>Quantity: {quantity}</Text>
         
           {showReviewButton && (
  <>
   
    <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => {
            const bookId = item.product._id;
            const bookTitle= item.product.book_Title;
            const orderId=props.orderId
            console.log("AMazing",orderId)
            
            navigation.navigate("SubmitReviewScreen", {
              bookId: bookId,
              bookTitle:bookTitle,
              userId: userId,
              orderId: orderId
              
            });
          }}
        >
      <Text style={styles.reviewButtonText}>Review</Text>
     </TouchableOpacity>
  </>
)}


         
       </View>
     </View>
      ):null
      
    }
       
       
      </>
      );
    });
  };
  const hasReviewedItem = (item, submittedReviews,orderId) => {
    //console.log("itsssssssmeeee",submittedReviews)
    return submittedReviews.some((review) => review.bookId === item.product._id && review.orderId === orderId);
  };






  useEffect(() => {

    renderBookInfo();
    if (props.editMode) {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (props.status == "3") {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>);
      setStatusText("pending");
      setCardColor("#B2BEB5");
    } else if (props.status == "2") {
      setOrderStatus(<TrafficLight limited></TrafficLight>);
      setStatusText("shipped");
      setCardColor("#89CFF0");
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>);
      setStatusText("delivered");
      setCardColor("#98FB98");
    }
    return () => {
      setOrderStatus();
      setStatusText();
      setCardColor();
    };
  }, [updateOrder, props.orderStatusUpdateTimestamp]);

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
    };

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "Order Edited",
          text2: "",
        });
        props.updateOrderStatus(props.id, statusChange);
        // setTimeout(() => {
          
        //   props.navigation.navigate("Admin");
        // }, 500);
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };
  // const codes = [
  //   { label: "pending", value: "3" },
  //   { label: "shipped", value: "2" },
  //   { label: "delivered", value: "1" },
  // ];
  const MySelect = ({ onValueChange, items, value, placeholder }) => {
    return (
      <View>
        <Select
          minWidth={200}
          selectedValue={value}
          onValueChange={onValueChange}
          placeholder={placeholder}
          _selectedItem={{
            bg: "red",
          }}
        >
          {items.map((item) => (
            <Select.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Select>
      </View>
    );
  };


    return (
      <View style={{flex:1, alignItems:"center"}}>
      <View style={styles.userDetails}>
  
      <View
            style={[
              styles.container,
              { backgroundColor: cardColor },
              { flexDirection: "row", justifyContent: "space-between" },
            ]}
          >
            <Text style={[styles.textColor, { fontWeight: "bold" }]}>
              Order# {props.id}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)}>
              <Icon name={expanded ? "chevron-up" : "chevron-down"} size={20} />
            </TouchableOpacity>
          </View>
          {!expanded ? (
  
            <View>
               {renderBookInfo()}
        
           
            
         
                       
             
              <Text style={styles.textColor}> Status: {statusText} {orderStatus}</Text>
          
             
  
              <Text style={styles.textColor}> Date Order: {props.dateOrdered.split("T")[0]}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>Total:$</Text>
                <Text style={styles.price}>{props.totalPrice} </Text>
              </View>
            </View>
          ) : (
            <>
  
  
  
        <View style={{ marginTop: 1,padding:0 }}>
        {renderBookInfo()}
       
          <Text style={styles.textColor}> Status: {statusText} {orderStatus}
          </Text>
         
          <Text style={styles.textColor}> Address: {props.shippingAddress1} {props.shippingAddress2}
          </Text>
          <Text style={styles.textColor}> Phone {props.phone}
          </Text>
      
          <Text style={styles.textColor}> City: {props.city}</Text>
          <Text style={styles.textColor}> Country: {props.country}</Text>
          <Text style={styles.textColor}> Date Order: {props.dateOrdered.split("T")[0]}
         
          </Text>
          <View style={styles.priceContainer}>
                <Text style={styles.price}>Total:$</Text>
                <Text style={styles.price}>{props.totalPrice} </Text>
              </View>
          
  
         
         
          {props.editMode ? (
            <View>
              {statusText !== "delivered" ? ( // Hide the select and update button when status is delivered
                <View>
                  <View>
                    <MySelect
                      onValueChange={(value) => setStatusChange(value)}
                      items={[
                        { label: "Pending", value: "3" },
                        { label: "Shipped", value: "2" },
                        { label: "Delivered", value: "1" },
                      ]}
                      value={statusChange}
                      placeholder="Change Status"
                      
                    />
                  </View>
                  {statusText === "pending" || statusText === "shipped" ? (
                    <View
                      style={{ marginTop: 5, marginBottom: 1, alignItems: "center" }}
                    >
                      <Button style={styles.Button} onPress={() => updateOrder()}>
                        Update
                      </Button>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
        </>
        
        )}
          
      </View>
      </View>
     
        )
  };
  const mapStateToProps = (state) => {
   
  
   
    const { userProfile } = state.userProfile;
    console.log("User is ", userProfile)
    return {
      
      userProfile:userProfile,
    };
  };





  const styles = StyleSheet.create({
    container: {
      padding: 15,
      margin: 10,
      borderRadius: 10,
      borderColor:"black",
      borderWidth:1,
  
    },
    title: {
      backgroundColor: "#62B1F6",
      padding: 5,
    },
    priceContainer: {
      marginTop: 10,
      alignSelf: "flex-end",
      flexDirection: "row",
      marginBottom:10,
     
    },
    price: {
      color: "black",
      fontWeight: "bold",
      fontSize:15,
  
    },
    textColor: {
      color: "black",
      fontSize:16
      
    // }, thumbnail: {
    //   width: 40,
    //   height: 50,
    //   borderRadius: 5,
    },
  
    userDetails: {
      alignItems: 'center',
     // padding: 20,
      borderRadius: 10,
      backgroundColor: '#FFF',
      width: '80%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 3,
      marginBottom:10,
      
     
    },
    bookInfoContainer: {
      flexDirection: "row",
       alignItems: "center",
      justifyContent: "space-between", // Added justifyContent
      marginBottom: 10,
      paddingHorizontal: 15,
      marginLeft:-10,
      marginTop:10,
    },
    bookImage: {
      width: 50,
      height: 70,
      borderRadius:10,
      //marginLeft: 1, // Move image to the right side
    },
    bookDetails: {
      flex: 1,
    },
    bookTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color:"black",
     // marginBottom: 5,
      marginLeft:5
    },
    bookPrice: {
      fontWeight: "bold",
      color:"black",
      fontSize: 14,
      marginLeft:5
    },
    bookQuantity: {
      fontWeight: "bold",
      color:"black",
      fontSize: 14,
      marginLeft:5,
      marginBottom:5,
     
    },
    Button: {
      backgroundColor: '#F5853F',
      width:"50%",
      marginVertical: 15,
      // paddingHorizontal: 20,
      // borderRadius: 5,
      marginTop: 10,
    },
    reviewButtonText:{
      //backgroundColor: '#98FB98',
      marginBottom:5,
      marginTop:5,
      color:"#FF7235",
      marginLeft:5,
      fontWeight:"bold",
      //borderRadius:5,
   
     // textAlign:"center",


    }
  });
  
  //export default UserOrderCard;
  export default connect(mapStateToProps, actions)(UserOrderCard);
  