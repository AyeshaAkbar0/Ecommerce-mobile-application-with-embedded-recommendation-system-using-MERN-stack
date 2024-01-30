// import React from "react";
// import {View, StyleSheet,Dimensions, ScrollView } from 'react-native';
// import {
//     Text, Left, Right, ListItem, Thumbnail, Body
// } from 'native-base';
// import { batch, connect } from "react-redux";
// import * as actions from '../../../Redux/Actions/cartActions'
// import { Button } from "react-native";
// var {height}= Dimensions.get('window')

// const Confirm =(props)=>{
//     const confirmOrder=()=>{
//         setTimeout(()=>{
//         props.clearCart();
//         props.navigation.navigate("Cart");
//     },500)

//     }
//     const confirm= props.route.params
//     return(
//         <ScrollView contentContainerStyle={styles.container}>
//             <View style={styles.titleContainer}>
//                 <Text style={{fontSize:20, fontWeight:'bold'}}>
//                     Confirm Order
//                 </Text>
//                 {props.route.params?(
//                     <View style={{borderWidth:1, borderColor:'orange'}}>
//                         <Text style={styles.title}>
//                             Shipping to :
//                         </Text>
//                         <View style={{padding:8,}}>
                          
//                                 <Text>Address1: {confirm.order.order.shippingAddress1}</Text>
//                                 <Text>Address2: {confirm.order.order.shippingAddress2}</Text>
//                                 <Text>City: {confirm.order.order.city}</Text> 
//                                 <Text>Country: {confirm.order.order.country}</Text>
                           
//                         </View>
//                         <Text style={styles.title}>
//                            Items: 
//                            {confirm.order.order.orderItems.map((x)=>{
//                             return(
//                                 <ListItem 
//                                 style={styles.listItems}
//                                 key={x.product.book_Title}
//                                 avatar>
//                                     <Left>
//                                         <Thumbnail source={{uri:x.product.image}}/>
//                                     </Left>
//                                     <Body style={styles.body}>
//                                         <Left>
//                                             <Text>
//                                                 {x.product.book_Title}
                                            
//                                             </Text>
//                                         </Left>
//                                         <Right>
//                                             <Text >
//                                                 {x.product.price}
//                                             </Text>
//                                         </Right>

//                                     </Body>

//                                 </ListItem>
//                             )
//                            })}
//                         </Text>
//                     </View>

//                 ):null}
//                 <View style={{alignItems:'center', margin:20}}>
//                     <Button title="Place Order" onPress={confirmOrder}></Button>

//                 </View>

//             </View>

//         </ScrollView>
//     )
// }
// const mapDispatchToProps=(dispatch)=>{
//     return{
//         clearCart:()=>dispatch(actions.clearCart())
//     }
// }

// const styles = StyleSheet.create({
//     container:{
//         height:height,
//         padding:8,
//         alignContent:'center',
//         backgruound:'pink'
//     },
//     titleContainer:{
//         justifyContent:'center',
//         alignItems:'center',
//         margin:8
//     },
//     title:{
//         alignSelf:'center',
//         margin:8,
//         fontSize:16,
//         fontWeight:'bold'

//     },
//     listItems:{
//         alignItems:'center',
//         borderColor:'brown',
//         justifyContent:'center',
//         width:1.2
//     },
//     body:{
//         alignItems:'center',
//         margin:10,
//         flexDirection:'row'
//     }
// })

// export default connect(null, mapDispatchToProps)(Confirm);








//Working


// import React from "react";

// import { View, StyleSheet, Dimensions, ScrollView, Button } from "react-native";
// import {
//   Text,
//   Image,
//   Left,
//   Right,
//   ListItem,
//   Thumbnail,
//   Body,
//   Title,
// } from "native-base";

// import { connect } from "react-redux";
// import * as actions from "../../../Redux/Actions/cartActions";
// import { baseURL,hostIP } from "../../../assets/common/baseUrl";
// import Toast from "react-native-toast-message";
// import axios from "axios";
// var { height, width } = Dimensions.get("window");
// const Confirm = (props) => {
//   const finalOrder = props.route.params;
//   const confirmOrder = () => {
//     const order = finalOrder.order.order;

//     axios
//       .post("http://10.141.164.108:3000/api/v1/orders/", order)
//       .then((res) => {
//         if (res.status == 200 || res.status == 201) {
//           Toast.show({
//             topOffset: 60,
//             type: "success",
//             text1: "Order Completed",
//             text2: "",
//           });
//           setTimeout(() => {
//             props.clearCart();
//             props.navigation.navigate("Cart");
//           }, 500);
//         }
//       })
//       .catch((error) => {
//         Toast.show({
//           topOffset: 60,
//           type: "error",
//           text1: "Something went wrong",
//           text2: "Please try again",
//         });
//       });
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.titleContainer}>
//         <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
//         {props.route.params ? (
//           <View style={{ borderWidth: 1, borderColor: "orange" }}>
//             <Text style={styles.title}>Shipping to:</Text>
//             <View style={{ padding: 8 }}>
//               <Text>Address:{finalOrder.order.order.shippingAddress1}</Text>
//               <Text>Address2: {finalOrder.order.order.shippingAddress2}</Text>
//               <Text>City: {finalOrder.order.order.city}</Text>
//               <Text>Zip Code: {finalOrder.order.order.zip}</Text>
//               <Text>Country: {finalOrder.order.order.country}</Text>
//             </View>
//             <Text style={styles.title}>Items: </Text>
//             {finalOrder.order.order.orderItems.map((x) => {
//               return (
//                 // <ListItem style={styles.listItem} key={x.product.name} avatar>
//                 //   <Left>
//                 //     <Thumbnail
//                 //       source={{ uri: `${hostIP}${x.product.image}` }}
//                 //     />
//                 //   </Left>
//                 //   <Body style={styles.body}>
//                 //     <Left>
//                 //       <Text>{x.product.name}</Text>
//                 //     </Left>
//                 //     <Right>
//                 //       <Text>₹ {x.product.price}</Text>
//                 //     </Right>
//                 //   </Body>
//                 // </ListItem>

//                 <View >
//       <Image style={styles.image} source={{ 
//         uri: `${hostIP}${x.product.image}` 
//         }} />
//       <View s>
//         <Text >{x.product.book_Title}</Text>
//         <Text >₹ {x.product.price}</Text>
//       </View>
//     </View>

//               );
//             })}
//           </View>
//         ) : null}
//         <View style={{ alignItems: "center", margin: 20 }}>
//           <Button title={"Place order"} onPress={confirmOrder} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearCart: () => dispatch(actions.clearCart()),
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     height: height,
//     padding: 8,
//     alignContent: "center",
//     backgroundColor: "white",
//   },
//   titleContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//     margin: 8,
//   },
//   title: {
//     alignSelf: "center",
//     margin: 8,
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   listItem: {
//     alignItems: "center",
//     backgroundColor: "white",
//     justifyContent: "center",
//     width: width / 1.2,
//   },
//   body: {
//     margin: 10,
//     alignItems: "center",
//     flexDirection: "row",
//   },
//   image: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   details: {
//     flex: 1,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   price: {
//     fontSize: 14,
//     color: "gray",
//   },
// });
// export default connect(null, mapDispatchToProps)(Confirm);

//minee


import React,{useState} from "react";
import { useStripe } from "@stripe/stripe-react-native";
import { View, StyleSheet, Dimensions, ScrollView, Button, Modal } from "react-native";
import {
  Text,
  Image,
  Left,
  Right,
  ListItem,
  Thumbnail,
  Body,
  Title,
} from "native-base";

import { connect } from "react-redux";
import { removeCheckedOutItems } from '../../../Redux/Actions/cartActions';
import * as actions from "../../../Redux/Actions/cartActions";
import { baseURL,hostIP } from "../../../assets/common/baseUrl";
import Toast from "react-native-toast-message";
import axios from "axios";
var { height, width } = Dimensions.get("window");
import EasyButton from "../../../Shared/StyledComponents/EasyButton";
const imagecong = require('../../../assets/bookcong.jpg')


const Confirm = (props) => {
  const finalOrder = props.route.params;
  console.log("ddddtyyy",finalOrder)
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to contr
  const stripe = useStripe();
  const { totalPrice } = props;
    console.log("titalprice", totalPrice)





  const subscribe = async (totalPrice) => {
        
    // Sending request
    const response = await fetch(`${baseURL}payments/intent`, {
        method: "POST",
        body: JSON.stringify({ totalPrice }),
        headers: {
            "Content-Type": "application/json",
        },
    });
    const responseData = await response.json(); // Convert the response body to JSON
  
    console.log("response", responseData.paymentIntent); // Log the JSON data from the response
    
     // 2. Initialize the Payment sheet
  const initResponse = await stripe.initPaymentSheet({
  merchantDisplayName: 'notJust.dev',
  paymentIntentClientSecret: responseData.paymentIntent,
  });
  if (initResponse.error) {
  console.log(initResponse.error);
  Alert.alert('Something went wrong');
  return;
  }
  
  // 3. Present the Payment Sheet from Stripe
  const paymentResponse = await stripe.presentPaymentSheet();
  console.log("ddgdhfbblcdhbjlbbjbhbjbbbf")
  
  if (paymentResponse.error) {
  Alert.alert(
  `Error code: ${paymentResponse.error.code}`,
  paymentResponse.error.message
  );
  return;
  }
  // 4. If payment ok -> create the order
  }
  
  // const confirmOrder = () => {
  //   const order = finalOrder.order.order;
  //   console.log("Esgaa" ,order)
  //   const { checkoutItems } = props;

  //   try {
  //     console.log("cscschjdwhqvvvd")
  //     setPaymentLoading(true); // Start payment loading indicator
  //      subscribe(totalPrice); // Call the subscribe function for Stripe payment
  //     setPaymentLoading(false); // Stop payment loading indicator
  // } catch (error) {
  //     console.error(error);
  //     setPaymentLoading(false);
  //     Alert.alert("Payment failed. Please try again later.");
  // }


  //   axios
  //   .post(`${baseURL}orders/`, order)
  //   .then((res) => {
  //     if (res.status == 200 || res.status == 201) {
  //       // Show a toast notification for successful order completion
  //       Toast.show({
  //         topOffset: 60,
  //         type: "success",
  //         text1: "Order Completed",
  //         text2: "Your order has been placed successfully.",
  //       })}
  //     // ... (your existing code)

  //     // Call the PUT API to update stock after order is successfully placed
  //     checkoutItems.forEach((item) => {
  //       axios.put(`${baseURL}updateStock/${item.product._id}`, {
  //         quantity: item.quantity,
  //       })
  //       .then((response) => {
  //         console.log('Product stock updated:', response.data);
  //       })
  //       .catch((error) => {
  //         console.error('Error updating product stock:', error);
  //       });
  //     });
  //   })
  //     .catch((error) => {
  //       Toast.show({
  //         topOffset: 60,
  //         type: "error",
  //         text1: "Something went wrong",
  //         text2: "Please try again",
  //       });
  //     });
  // };


  const confirmOrder = async () => {
    const order = finalOrder.order;
    const { checkoutItems } = props;

    

    const handlePopupClose = () => {
      
      setShowPopup(false);
     
      props.removeCheckedOutItems(checkoutItems);
      props.navigation.navigate('Cart');
    };
  
    try {
      setPaymentLoading(true); // Start payment loading indicator
  
      // Call the subscribe function for Stripe payment
      await subscribe(totalPrice);
      console.log("Heere is the detail od :", order)
  
      // If payment succeeds, proceed with order placement and stock update
      axios
        .post(`${baseURL}orders/`, order)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            // Show a toast notification for successful order completion
            // Toast.show({
            //   topOffset: 60,
            //   type: "success",
            //   text1: "Order Completed",
            //   text2: "Your order has been placed successfully.",
            // });
            setShowPopup(true); // Show the custom popup
          setTimeout(handlePopupClose, 5000);

            // setTimeout(()=>{
            //   props.removeCheckedOutItems(checkoutItems)
            //   props.navigation.navigate('Cart')
            // },500)

            
          }
          checkoutItems.forEach((item)=>{
            
          })
         
  
          //Call the PUT API to update stock after order is successfully placed
          checkoutItems.forEach((item) => {
         
            axios
              .put(`${baseURL}products/updateStock/${item.product._id}`, {
                quantity: item.quantity,
              })
              .then((response) => {
                console.log('Product stock updated:', response.data);
              })
              .catch((error) => {
                console.error('Error updating product stock:', error);
              });
          });

          
        })
        .catch((error) => {
          console.log('Backend API Error:', error);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        })
        .finally(() => {
          setPaymentLoading(false); // Stop payment loading indicator
        });
  
    } catch (error) {
      console.error('Stripe payment error:', error);
      setPaymentLoading(false); // Stop payment loading indicator
      Alert.alert("Payment failed. Please try again later.");
    }
  };



  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold", alignSelf:"center", marginBottom:15 }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 2, borderColor: "grey" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 , }}>
              <Text style={{ fontSize: 15, fontWeight: "bold",  marginBottom:5 }}>Address:{finalOrder.order.shippingAddress1}</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold",  marginBottom:5 }}>Address2: {finalOrder.order.shippingAddress2}</Text>
              <Text  style={{ fontSize: 15, fontWeight: "bold",  marginBottom:5 }}>City: {finalOrder.order.city}</Text>
              <Text  style={{ fontSize: 15, fontWeight: "bold",  marginBottom:5 }}>Zip Code: {finalOrder.order.zip}</Text>
              <Text  style={{ fontSize: 15, fontWeight: "bold",  marginBottom:5 }}>Country: {finalOrder.order.country}</Text>
            </View>
            <Text style={styles.title}>Items: </Text>
            {finalOrder.order.orderItems.map((x) => {
              return (
      

                <View  style={styles.items}>
      
       
    
      <Image style={styles.image}  alt="Image here"
      
      source={{ uri: x.product.image }}

       />
       <View  style={{marginTop:10}}>
        <Text style={{fontSize:12, fontWeight:"bold", color:'black'}} >{x.product.book_Title}</Text>
        <Text style={{fontSize:12, fontWeight:"bold", color:'black'}}  >$ {x.product.price}</Text>
        <Text style={{fontSize:12, fontWeight:"bold", color:'black'}}  >Quantity: {x.quantity}</Text>
      </View>
    </View>

              );
            })}
          </View>
        ) : null}
        <View style={styles.pay}>
          <EasyButton 
         // medium
          primary
          
          large
            onPress={confirmOrder}  disabled={paymentLoading}>
           <Text style={{color:"white", fontWeight:"bold"}}>Pay Now</Text>
          </EasyButton>
          
        </View>
        
      </View>
      <CustomPopup visible={showPopup} />
    </ScrollView>
  );
};

const CustomPopup = ({ visible, onClose }) => (
  <Modal transparent visible={visible}>
    <View style={styles.centeredView}>
    <View style={styles.popupContainer}>
      <Image style={styles.image1} source={imagecong} />
      <Text style={styles.text1}>Order confirmed, fellow Bookworm! 📚</Text>
      <Text style={styles.text}>Get ready for literary adventures! 🎉🚀</Text>
    </View>
    </View>
  </Modal>
);

const mapStateToProps = (state) => {
  const { checkoutItems } = state.checkoutItems;
  console.log(checkoutItems);
  return {
    checkoutItems: checkoutItems,
    totalPrice: state.cartItems.totalPrice
  };
  
};


const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeCheckedOutItems: (itemsToRemove) =>
      dispatch(removeCheckedOutItems(itemsToRemove)),
  };
};


const styles = StyleSheet.create({
  pay:{
    alignItems: "center", margin: 10,  
    width:"90%",
   // backgroundColor:'red'
  },
  container: {
    width:width,
    //height: height,
    padding: 8,
   // marginTop:10,
    // alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
     justifyContent: "center",
    //alignItems: "center",
    margin: 12,
   marginTop:10,

  },
  title: {
   // alignSelf: "center",
    margin: 10,
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor:"#afd0d6",
    padding:8,
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: "90%"
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  image: {
    width: 50,
    height: 60,
    borderRadius: 15,
    marginRight: 10,
    margin:6
  },
  items:{
    flexDirection:"row"
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color:"red"
  },
  price: {
    fontSize: 14,
    color: "gray",
  },
  centeredView: {
    flex: 1,
   width:"100%",
   heigt:"100%",

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  popupContainer: {
    width: '80%',
    height:"60%" ,// Adjust the width as needed
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  image1: {
    marginTop:15,
    width: "40%",
    height: "45%",
    marginBottom: 25,
  },
  text: {
    fontSize: 16,
   // fontWeight: 'bold',
   // marginBottom: 10,
  },
  text1: {
    fontSize: 20,
    fontWeight: 'bold',
    color:"#E08600",
    marginBottom: 5,
    marginTop:50,
   // fontFamily:"cursive"
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Confirm);