// import React , { useContext,useState } from "react";
// import { View, Dimensions, StyleSheet, Button, Pressable} from "react-native";
//  import { TouchableOpacity } from 'react-native';

// import { Text, Left, Right, H1, Container, Thumbnail,HStack,Spacer, ListItem, Body} from 'native-base'
// import {connect} from 'react-redux'
// import Icon  from "react-native-vector-icons/FontAwesome";
// import cartItems from "../../Redux/Reducers/cartItem";
// import * as actions from '../../Redux/Actions/cartActions'
// // import { SwipeListView } from "react-native-swipe-list-view";
// import SwipeableRow from 'react-native-swipeable-row';
// import CartItem from "./CartItem";
// import EasyButton from "../../Shared/StyledComponents/EasyButton";
// import AuthGlobal from "../../Context/store/AuthGlobal";


// var {height, width}= Dimensions.get('window')
// const Cart =(props)=>{
//   //Add new 
//   const [totalPrice, setTotalPrice] = useState(0);

//   const updateTotalPrice = () => {
//   let totalPrice = 0;
//   props.cartItems.forEach((item) => {
//     totalPrice += item.product.price * item.quantity;
//   });
//   setTotalPrice(totalPrice);
// };
//   console.log(props.cartItems);
//   const context = useContext(AuthGlobal);
 
//     return(
//         <>
//         {props.cartItems.length ?
//         (
//            <View>
             
             
//     <SwipeableRow
//      data={props.cartItems}
      
//       renderItem={(data) =>(
      
//       <CartItem item={data} updateQuantity={props.updateQuantity} />
      
     
//       )}
     
//       renderHiddenItem={(data) => {
//         return (
//           <View style={styles.hiddenContainer}>
//             <TouchableOpacity
//             style={styles.hiddenButton}
//              onPress={() => props.removeFromCart(data.item)}

//             >
//               <Icon name="trash" color={"white"} size={30} />

//             </TouchableOpacity>
        
//           </View>
//         );
//       }}
//       disableRightSwipe={true}
//       previewOpenDelay={3000}
//       friction={1000}
//       tension={40}
//       leftOpenValue={75}
//       stopLeftSwipe={75}
//       rightOpenValue={-75}
//     />      

//               {props.cartItems.map((data)=>{
//                 return(
//                     <CartItem  item={data} 
                    
//                     //Add new
                    
//                     /> 
//                 );
//               })}
            
            
// <View style={styles.bottomContainer}>
// <HStack space={2}>
//   <Text style={styles.price}>Rs.{totalPrice}</Text>
//   <Spacer />
//   <EasyButton 
//   danger
//   medium
//    onPress={() => props.clearCart()}  >
//     <Text  style={{color:"white"}}>Clear</Text>
//   </EasyButton>

//   {context.stateUser.isAuthenticated?(<EasyButton
//                 medium
//                 primary
//                 onPress={() => {
//                   props.navigation.navigate("Checkout");
//                 }}
//               >
//                 <Text style={{ color: "#FFF", fontWeight: "bold" }}>
//                   Checkout
//                 </Text>
//               </EasyButton>):<EasyButton
//                 medium
//                 secondary
//                 onPress={() => {
//                   props.navigation.navigate("Login");
//                 }}
//               >
//                 <Text style={{ color: "#FFF", fontWeight: "bold" }}>
//                   Login
//                 </Text>
//               </EasyButton>}
// </HStack>
// </View>    
// </View>      
//          ):(
//           <View style={styles.emptyContainer}>
//                  <Text>
//                      Looks like your Cart is empty!
//                  </Text>
//                  <Text>Add products to Your cartto get started..</Text>
//                  </View>
//          )}
//     </>
      
//     )
// }
// const mapStateToProps = (state) => {
//     const { cartItems } = state;
//     return {
//       cartItems: cartItems,
//     };
//   };

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         clearCart:()=>dispatch(actions.clearCart()),
        
//         removeFromCart:(item)=>{
//             dispatch(actions.removeFromCart(item))
//         }
//     }

// }

// const styles= StyleSheet.create({
//     emptyContainer:{
//         height:height,
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     bottomContainer:{
//         flexDirection:'row',
//         position:'relative',
//         bottom:-150,
//         left:0,
//         backgroundColor:'white',
//         elevation:20,
//         marginTop:100
//     },
//     price:{
//         fontSize:18,
//         margin:20,
//         color:'red'
//     },
//     hiddenContainer: {
//         flex: 1,
//         justifyContent: "flex-end",
//         flexDirection: "row",
//       },
//       hiddenButton: {
//         backgroundColor: "red",
//         justifyContent: "center",
//         alignItems: "flex-end",
//         paddingRight: 25,
//         height: 70,
//         width: width / 1.2,
//       },
    
// })
// export default connect(mapStateToProps,mapDispatchToProps)(Cart);




/////Working Now

// import React from "react";
// import { View, Dimensions, StyleSheet, Button, Pressable} from "react-native";
//  import { TouchableOpacity } from 'react-native';

// import { Text, Left, Right, H1, Container, Thumbnail, ListItem, Body} from 'native-base'
// import {connect} from 'react-redux'
// import Icon  from "react-native-vector-icons/FontAwesome";
// import cartItems from "../../Redux/Reducers/cartItem";
// import * as actions from '../../Redux/Actions/cartActions'
// import { SwipeListView } from "react-native-swipe-list-view";
// import CartItem from "./CartItem";

// var {height, width}= Dimensions.get('window')
// const Cart =(props)=>{
//     var total=0;
//     props.cartItems.forEach(element => {
//         return (total += element.product.price) 
//     });
//     return(
//         <>
//         {props.cartItems.length ?
//         (
//             <Container>
             
             
//     <SwipeListView
//       data={props.cartItems}
//       renderItem={(data) =>(<CartItem item={data} />)}
//       renderHiddenItem={(data) => {
//         return (
//           <View style={styles.hiddenContainer}>
//             <TouchableOpacity
//             style={styles.hiddenButton}
//              onPress={() => props.removeFromCart(data.item)}

//             >
//               <Icon name="trash" color={"white"} size={30} />

//             </TouchableOpacity>
//             {/* <Pressable
//               style={styles.hiddenButton}
//               // onPress={() => props.removeFromCart(data.item)}
//             >
//               <Icon name="trash" color={"white"} size={30} />
//             </Pressable> */}
//           </View>
//         );
//       }}
//       disableRightSwipe={true}
//       previewOpenDelay={3000}
//       friction={1000}
//       tension={40}
//       leftOpenValue={75}
//       stopLeftSwipe={75}
//       rightOpenValue={-75}
//     />



  
              
            
    


      
// {/* 
//               {props.cartItems.map((data)=>{
//                 return(
//                     <CartItem  item={data}/>
//                 );
//               })} */}
//               <View style={styles.bottomContainer}>
               
//                     <Text style={styles.price}>
//                        Rs.{total}
//                     </Text>
               
//                     <Button title="Clear" 
//                     onPress={()=>props.clearCart()}
//                     >
//                     </Button>
                    
//                     <Button title="Checkout"
//                     onPress={()=>{props.navigation.navigate("Checkout")}}>

//                     </Button>
                  
//               </View>
//             </Container>
//         ):(
//             <Container style={styles.emptyContainer}>
//                 <Text>
//                     Looks like your Cart is empty!
//                 </Text>
//                 <Text>Add products to Your cartto get started..</Text>
//             </Container>
//         )}
//         </>
      
//     )
// }
// const mapStateToProps = (state) => {
//     const { cartItems } = state;
//     return {
//       cartItems: cartItems,
//     };
//   };

// const mapDispatchToProps=(dispatch)=>{
//     return{
//         clearCart:()=>dispatch(actions.clearCart()),
        
//         removeFromCart:(item)=>{
//             dispatch(actions.removeFromCart(item))
//         }
//     }

// }

// const styles= StyleSheet.create({
//     emptyContainer:{
//     flex:1,
//         height:height,
//         alignItems:'center',
//         justifyContent:'center'
//     },
//     bottomContainer:{
//         flexDirection:'row',
//         //position:'absolute',
//         bottom:-150,
//         left:0,
//         backgroundColor:'white',
//         elevation:20
//     },
//     price:{
//         fontSize:18,
//         margin:20,
//         color:'red'
//     },
//     hiddenContainer: {
//         flex: 1,
//         justifyContent: "flex-end",
//         flexDirection: "row",
//       },
//       hiddenButton: {
//         backgroundColor: "red",
//         justifyContent: "center",
//         alignItems: "flex-end",
//         paddingRight: 25,
//         height: 70,
//         width: width / 1.2,
//       },
    
// })
// export default connect(mapStateToProps,mapDispatchToProps)(Cart);
///khtam worrking


















// //LAST TRY
// import React, { useContext, useState, useEffect } from "react";
// import { View, Dimensions, StyleSheet, Button, Pressable } from "react-native";
// import { TouchableOpacity } from 'react-native';

// import { Text, Left, Right, H1, Container, Thumbnail, HStack, Spacer, ListItem, Body } from 'native-base'
// import { connect } from 'react-redux'
// import Icon from "react-native-vector-icons/FontAwesome";
// import cartItems from "../../Redux/Reducers/cartItem";
// import * as actions from '../../Redux/Actions/cartActions'
// import SwipeableRow from 'react-native-swipeable-row';
// import CartItem from "./CartItem";
// import EasyButton from "../../Shared/StyledComponents/EasyButton";
// import AuthGlobal from "../../Context/store/AuthGlobal";

// var { height, width } = Dimensions.get('window')
// const Cart = (props) => {
//   const [totalPrice, setTotalPrice] = useState(0);
//   const context = useContext(AuthGlobal);

//   useEffect(() => {
//     updateTotalPrice();
//   }, [props.cartItems]);

//   const updateTotalPrice = () => {
//     let totalPrice = 0;
//     props.cartItems.forEach((item) => {
//       totalPrice += (item.product.price * item.quantity);

//       console.log(totalPrice);
//     });
//     setTotalPrice(totalPrice);
//   };

//   return (
//     <>
//       {props.cartItems.length ?
//         (
//           <View>
//             <SwipeableRow
//               data={props.cartItems}
//               renderItem={(data) => (
//                 <CartItem item={data} updateQuantity={props.updateQuantity} updateTotalPrice={updateTotalPrice} price={data.product.price} />
//               )}
//               renderHiddenItem={(data) => {
//                 return (
//                   <View style={styles.hiddenContainer}>
//                     <TouchableOpacity
//                       style={styles.hiddenButton}
//                       onPress={() => props.removeFromCart(data.item)}
//                     >
//                       <Icon name="trash" color={"white"} size={30} />
//                     </TouchableOpacity>
//                   </View>
//                 );
//               }}
//               disableRightSwipe={true}
//               previewOpenDelay={3000}
//               friction={1000}
//               tension={40}
//               leftOpenValue={75}
//               stopLeftSwipe={75}
//               rightOpenValue={-75}
//             />

//             {props.cartItems.map((data) => {
//               return (
//                 <CartItem item={data} updateQuantity={props.updateQuantity} updateTotalPrice={updateTotalPrice} price={data.product.price} />
//               );
//             })}

//             <View style={styles.bottomContainer}>
//               <HStack space={2}>
//                 <Text style={styles.price}>Rs.{totalPrice}</Text>
//                 <Spacer />
//                 <EasyButton
//                   danger
//                   medium
//                   onPress={() => props.clearCart()}>
//                   <Text style={{ color: "white" }}>Clear</Text>
//                 </EasyButton>

//                 {context.stateUser.isAuthenticated ? (
//                   <EasyButton
//                     medium
//                     primary
//                     onPress={() => props.navigation.navigate("Checkout")}>
//                     <Text style={{ color: "#FFF", fontWeight: "bold" }}>Checkout</Text>
//                   </EasyButton>
//                 ) : (
//                   <EasyButton
//                     medium
//                     secondary
//                     onPress={() => props.navigation.navigate("Login")}>
//                     <Text style={{ color: "#FFF", fontWeight: "bold" }}>Login</Text>
//                   </EasyButton>
//                 )}
//               </HStack>
//             </View>
//           </View>
//         ) : (
//           <View style={styles.emptyContainer}>
//             <Text>Looks like your Cart is empty!</Text>
//             <Text>Add products to your cart to get started.</Text>
//           </View>
//         )}
//     </>
//   )
// }

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearCart: () => dispatch(actions.clearCart()),
//     removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
//     updateQuantity: (item, quantity) => dispatch(actions.updateQuantity(item, quantity)),
//   }
// }

// const styles = StyleSheet.create({
//   emptyContainer: {
//     height: height,
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     position: 'relative',
//     bottom: -150,
//     left: 0,
//     backgroundColor: 'white',
//     elevation: 20,
//     marginTop: 100
//   },
//   price: {
//     fontSize: 18,
//     margin: 20,
//     color: 'red'
//   },
//   hiddenContainer: {
//     flex: 1,
//     justifyContent: "flex-end",
//     flexDirection: "row",
//   },
//   hiddenButton: {
//     backgroundColor: "red",
//     justifyContent: "center",
//     alignItems: "flex-end",
//     paddingRight: 25,
//     height: 70,
//     width: width / 1.2,
//   },
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);





















// import React from 'react';
// import { View, Dimensions, StyleSheet, Button, Pressable } from 'react-native';
// import { TouchableOpacity } from 'react-native';

// import { Text, Left, Right, H1, Thumbnail, ListItem, Body, HStack, Spacer } from 'native-base';
// import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as actions from '../../Redux/Actions/cartActions';
// import SwipeableRow from 'react-native-swipeable-row';
// import CartItem from './CartItem';

// var { height, width } = Dimensions.get('window');

// const Cart = (props) => {
//   var total = 0;
//   props.cartItems.forEach((element) => {
//     return (total += element.product.price);
//   });

//   return (
//     <>
//       {props.cartItems.length ? (
//         <View style={styles.container}>
//           {/* <H1 style={{ alignSelf: 'center' }}>CART</H1> */}

//           <SwipeableRow
//             data={props.cartItems}
//             renderItem={({ item }) => <CartItem item={item} />}
//             renderHiddenItem={({ item }) => {
//               return (
//                 <View style={styles.hiddenContainer}>
//                   <TouchableOpacity
//                     style={styles.hiddenButton}
//                     onPress={() => props.removeFromCart(item)}
//                   >
//                     <Icon name="trash" color={'white'} size={30} />
//                   </TouchableOpacity>
//                 </View>
//               );
//             }}
//             disableRightSwipe={true}
//             previewOpenDelay={3000}
//             friction={1000}
//             tension={40}
//             leftOpenValue={75}
//             stopLeftSwipe={75}
//             rightOpenValue={-75}
//           />

//           <View style={styles.bottomContainer}>
          
//             {/* <Left>
//               <Text style={styles.price}>Rs.{total}</Text>
//             </Left>
//             <Right>
//               <Button title="Clear" onPress={() => props.clearCart()} />
//               <Button title="Checkout" onPress={() => props.navigation.navigate('Checkout')} />
//             </Right> */}
// <View style={styles.bottomContainer}>
// <HStack space={2}>
//   <Text style={styles.price}>Rs.{total}</Text>
//   <Spacer />
//   <Button title="Clear" onPress={() => props.clearCart()} />
//   <Button title="Checkout" onPress={() => props.navigation.navigate('Checkout')} />
// </HStack>
// </View>
//          </View>
//        </View>
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text>Looks like your Cart is empty!</Text>
//           <Text>Add products to your cart to get started..</Text>
//         </View>
//       )}
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearCart: () => dispatch(actions.clearCart()),
//     removeFromCart: (item) => {
//       dispatch(actions.removeFromCart(item));
//     },
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     backgroundColor: 'white',
//     elevation: 20,
//   },
//   price: {
//     fontSize: 18,
//     margin: 20,
//     color: 'red',
//   },
//   hiddenContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//   },
//   hiddenButton: {
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     paddingRight: 25,
//     height: 70,
//     width: width / 1.2,
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);




// import React from 'react';
// import { View, Dimensions, StyleSheet, Button, Pressable, Image } from 'react-native';
// import { TouchableOpacity } from 'react-native';

// import { Text, Left, Right, H1, ListItem, Body, HStack, Spacer } from 'native-base';
// import { connect } from 'react-redux';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import * as actions from '../../Redux/Actions/cartActions';
// import SwipeableRow from 'react-native-swipeable-row';

// var { height, width } = Dimensions.get('window');

// const Cart = (props) => {
//   var total = 0;
//   props.cartItems.forEach((element) => {
//     return (total += element.product.price);
//   });

//   return (
//     <>
//       {props.cartItems.length ? (
//         <View style={styles.container}>
//           {/* <H1 style={{ alignSelf: 'center' }}>CART</H1> */}

//           <SwipeableRow
//             data={props.cartItems}
//             renderItem={({ item }) => (
//               <ListItem style={styles.cartItem}>
//                 <Left>
//                   <Image source={{ uri: item.product.image }} style={styles.thumbnail} />
//                 </Left>
//                 <Body>
//                   <Text>{item.product.name}</Text>
//                   <Text note>{item.product.price}</Text>
//                 </Body>
//               </ListItem>
//             )}
//             renderHiddenItem={({ item }) => {
//               return (
//                 <View style={styles.hiddenContainer}>
//                   <TouchableOpacity
//                     style={styles.hiddenButton}
//                     onPress={() => props.removeFromCart(item)}
//                   >
//                     <Icon name="trash" color={'white'} size={30} />
//                   </TouchableOpacity>
//                 </View>
//               );
//             }}
//             disableRightSwipe={true}
//             previewOpenDelay={3000}
//             friction={1000}
//             tension={40}
//             leftOpenValue={75}
//             stopLeftSwipe={75}
//             rightOpenValue={-75}
//           />

//           <View style={styles.bottomContainer}>
//             <HStack space={2}>
//               <Text style={styles.price}>Rs.{total}</Text>
//               <Spacer />
//               <Button title="Clear" onPress={() => props.clearCart()} />
//               <Button title="Checkout" onPress={() => props.navigation.navigate('Checkout')} />
//             </HStack>
//           </View>
//         </View>
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text>Looks like your Cart is empty!</Text>
//           <Text>Add products to your cart to get started..</Text>
//         </View>
//       )}
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearCart: () => dispatch(actions.clearCart()),
//     removeFromCart: (item) => {
//       dispatch(actions.removeFromCart(item));
//     },
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cartItem: {
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   thumbnail: {
//     width: 50,
//     height: 50,
//     borderRadius: 5,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     backgroundColor: 'white',
//     elevation: 20,
//   },
//   price: {
//     fontSize: 18,
//     margin: 20,
//     color: 'red',
//   },
//   hiddenContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     flexDirection: 'row',
//   },
//   hiddenButton: {
//     backgroundColor: 'red',
//     justifyContent: 'center',
//     alignItems: 'flex-end',
//     paddingRight: 25,
//     height: 70,
//     width: width / 1.2,
//   },
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);



//Mine
/////Working Now


import React, { useState,useEffect } from 'react';
import { View, Dimensions, StyleSheet, Button, Alert,Image, ActivityIndicator} from "react-native";
 import { TouchableOpacity } from 'react-native';
 import { Text, Left, Right, H1, Container, Thumbnail, ListItem, Body} from 'native-base'
import {connect} from 'react-redux'
import Icon  from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons"
//import cartItems from "../../Redux/Reducers/cartItem";
import * as actions from '../../Redux/Actions/cartActions'
import { SwipeListView } from "react-native-swipe-list-view";
import CartItem from "./CartItem";
import { useNavigation } from '@react-navigation/native';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import * as checkoutActions from '../../Redux/Actions/checkoutActions'
import  { useContext } from "react";
import AuthGlobal from "../../Context/store/AuthGlobal";


var {height, width}= Dimensions.get('window')
const Cart =(props)=>{
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isCheckoutInProgress, setIsCheckoutInProgress] = useState(false);

  //new lineesha
  const userId= context.stateUser.user.userId;

  const handleItemSelect = (price, isSelected) => {
    let newSelectedItems;
    if (isSelected) {
      newSelectedItems = [...selectedItems, price];
    } else {
      newSelectedItems = selectedItems.filter((item) => item !== price);
    }
    setSelectedItems(newSelectedItems);

  // Update checkoutItems based on selectedItems
  const newCheckoutItems = props.cartItems.cartItems.filter(
    (item) => newSelectedItems.includes(item.product.price)
  );
  setCheckoutItems(newCheckoutItems);
};
const calculateTotalPrice = () => {
  if (selectedItems.length === 0) {
    return 0; // Set total price to 0 when there are no selected items
  }
  // Calculate the total price based on the quantity of each selected item
  return props.cartItems.cartItems.reduce((acc, item) => {
    if (selectedItems.includes(item.product.price)) {
      return acc + item.product.price * item.quantity;
    }
    return acc;
  }, 0);
};

const handleClearCart = () => {
  setSelectedItems([]); // Clear the selected items when the cart is cleared
  setCheckoutItems([]); // Clear the checkout items as well
  props.clearCart(userId);
};
useEffect(() => {
  props.storeCheckoutItems(checkoutItems);
}, [checkoutItems]);

const handleCheckout = () => {
  if (checkoutItems.length === 0) {
    // Show alert if no items are selected for checkout
    Alert.alert('Please select your products from the cart for further checkout.');
    return;
  }
  const totalPrice = calculateTotalPrice();
    console.log("Totalllprice",totalPrice)
    // ... (existing code)
    if (props.storeCheckoutItems) {
      props.storeCheckoutItems(checkoutItems); // Dispatch the action to store checkoutItems in the Redux store
    } else {
      console.log("props.storeCheckoutItems is undefined or null");
    }

    props.storeTotalPrice(totalPrice);


// Navigate to the Checkout screen
props.navigation.navigate('Checkout');
};
const handleRemoveFromCart = (item) => {
  console.log('hiiii')
  const cartId=item._id
  props.removeFromCart(item,cartId,userId); // Pass the entire data.item object as the payload
};



return (
  // <>
  //   <View style={styles.header}>
  //     <Text style={styles.title}>My Cart</Text>
  //   </View>

  //   {context.stateUser.isAuthenticated ? (
  //     <View style={{ flex: 1 }}>
  //       {props.cartItems.cartItems.length ? (
  //         <SwipeListView
  //           data={props.cartItems.cartItems.map((item) => ({
  //             ...item,
  //             isSelected: selectedItems.includes(item.product.price),
  //           }))}
  //           renderItem={(data) => <CartItem item={data} onItemSelect={handleItemSelect} />}
  //           renderHiddenItem={(data) => {
  //             return (
  //               <View style={styles.hiddenContainer}>
  //                 <TouchableOpacity
  //                   style={styles.hiddenButton}
  //                   onPress={() => handleRemoveFromCart(data.item)}
  //                 >
  //                   <Icon name="trash" color={'white'} size={30} />
  //                 </TouchableOpacity>
  //               </View>
  //             );
  //           }}
  //           disableRightSwipe={true}
  //           previewOpenDelay={3000}
  //           friction={1000}
  //           tension={40}
  //           leftOpenValue={75}
  //           stopLeftSwipe={75}
  //           rightOpenValue={-75}
  //         />
  //       ) : (
  //         <View style={styles.emptyContainer}>
  //           <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Your Cart is Empty</Text>
  //           <Text style={{ fontSize: 16, fontWeight: '300' }}>Add products to your cart to get started.</Text>
  //         </View>
  //       )}


        
  //       <View style={styles.bottomContainer}>
  //         <View style={styles.Total}>
  //           <Text style={styles.price}>Total:${calculateTotalPrice()}</Text>
  //         </View>
  //         <View style={styles.buttonsContainer}>
  //           <EasyButton medium danger style={styles.Button} onPress={handleClearCart}>
  //             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Clear</Text>
  //           </EasyButton>
  //           <EasyButton primary medium style={styles.Check} onPress={handleCheckout}>
  //             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>
  //               Checkout
  //             </Text>
  //           </EasyButton>
  //         </View>
  //       </View>
  //     </View>
  //   ) : (
  //     <View style={styles.emptyContainer}>
  //       <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Please log in to view your cart.</Text>
  //       <EasyButton
  //         medium
  //         secondary
  //         style={styles.Check}
  //         onPress={() => {
  //           navigation.navigate('User', { screen: 'Login' });
  //         }}
  //       >
  //         <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>
  //           Login
  //         </Text>
  //       </EasyButton>
  //     </View>
  //   )}
    

  // </>
    <>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
        {props.cartItems.cartItems.length > 0 && ( // Only show when there are items in cart
    <TouchableOpacity
      style={styles.clearButton}
      onPress={() =>
        Alert.alert(
          'Clear Cart',
          'Are you sure you want to clear your cart?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: handleClearCart, // Call your handleClearCart function
            },
          ],
        )
      }
    >
      <Icon2 name="delete" size={25} color="red"  >
        <Text style={{fontWeight:"bold", color:'red',}}>Clear All</Text></Icon2>
    </TouchableOpacity>
  )}
      </View>
  
      {context.stateUser.isAuthenticated ? (
        <View style={{ flex: 1, backgroundColor:"white" }}>
         
          {props.cartItems.cartItems.length ? (
            <SwipeListView
              data={props.cartItems.cartItems.map((item) => ({
                ...item,
                isSelected: selectedItems.includes(item.product.price),
              }))}
             


              renderItem={(data) => <CartItem item={data} onItemSelect={handleItemSelect} />}
              renderHiddenItem={(data) => {
                return (
                  <View style={styles.hiddenContainer}>
                    <TouchableOpacity
                      style={styles.hiddenButton}
                      onPress={() => handleRemoveFromCart(data.item)}
                    >
                      <Icon   styles={styles.icon} name="trash" color={'white'} size={35} />
                    </TouchableOpacity>
                  </View>
                );
             
              }}
              disableRightSwipe={true}
             
              previewOpenDelay={3000}
              friction={1000}
              tension={40}
              leftOpenValue={75}
              stopLeftSwipe={75}
              rightOpenValue={-75}
            
            />
          ) : (
            <View style={styles.emptyContainer}>
             <Image style={{padding:90, marginBottom:20, width:"20%", height:"20%"}} source={{ uri: 
              "https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
            //  "https://png.pngtree.com/png-vector/20220629/ourmid/pngtree-empty-shopping-cart-store-icon-png-image_5624129.png"
              }}/>
              <Text style={{ fontSize: 18, fontWeight: 'bold',  }}>Whoops,Cart's lonely! 🛒📚</Text>
              <Text style={{ fontSize: 16, fontWeight: '300', marginLeft:30,
            marginRight:30,}}>Fill it up with Bookworm wonders 
              and let the journey commence! 🚀</Text>
            </View>
          )}
  
          {props.cartItems.cartItems.length > 0 && (
            <View style={styles.bottomContainer}>
              <View style={styles.Total}>
                <Text style={styles.price}>Total:${calculateTotalPrice()}</Text>
              </View>
              <View style={styles.buttonsContainer}>
                {/* <EasyButton medium danger style={styles.Button} onPress={handleClearCart}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>Clear</Text>
                </EasyButton> */}
                <EasyButton primary
                 //medium 
                 style={styles.Check} onPress={handleCheckout}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17, alignSelf: 'center' }}>
                    Place Order
                  </Text>
                </EasyButton>
              </View>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
           <View style={{alignContent:'center',alignItems:'center', alignSelf:'center'}}>
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Please log in to view your cart.</Text>
         
          <EasyButton
            medium
            //secondary
            style={styles.Check}
            onPress={() => {
              navigation.navigate('User', { screen: 'Login' });
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, alignSelf: 'center' }}>
              Login
            </Text>
          </EasyButton>
          </View>
        </View>
      )}
    </>
  );

  

};
//ayesha
// const mapStateToProps = (state) => {
//   const { cartItems } = state;
//   return {
//     cartItems: cartItems,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     clearCart: () => dispatch(actions.clearCart()),
//     removeFromCart: (item) => {
//       dispatch(actions.removeFromCart(item));
//     },
//     storeCheckoutItems: (checkoutItems) => {
//       dispatch(checkoutActions.storeCheckoutItems(checkoutItems));
//     },
//   };
// };
const mapStateToProps = (state) => {
  const { cartItems } = state;
  return {
    cartItems: cartItems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: (userId) => dispatch(actions.clearCart(userId)),
    removeFromCart: (item,cartId,userId) => {
      dispatch(actions.removeFromCart(item,cartId,userId));
    },
    storeCheckoutItems: (checkoutItems) => {
      dispatch(checkoutActions.storeCheckoutItems(checkoutItems));
    },
    storeTotalPrice: (totalPrice) => {
      dispatch(actions.storeTotalPrice(totalPrice));
    },
  };
};
const styles= StyleSheet.create({
  clearButton: {
    position: 'absolute',
    top: 12,
    right: 10,
    padding: 10,
    //backgroundColor:'grey',
    //borderRadius:12,
    
  },
    emptyContainer:{
   flex:1,
   backgroundColor:"white",
       height:height,
        alignItems:'center',
        justifyContent:'center',
        width:width
    },
    // bottomContainer:{
    //     flexDirection:'row',
    //     //position:'relative',
    //     marginTop:320,
    //    // left:0,
    //     backgroundColor:'white',
    //     elevation:20,
    //     width:width
    // },

    bottomContainer: {
      flexDirection: 'row',
      backgroundColor: 'white',
      elevation: 20,
      width: '100%',
      position: 'absolute', // This will position the container at the bottom
      bottom: 0, // This will align the container to the bottom of the parent container
      justifyContent: 'space-between',
    },
    buttonsContainer: {
      marginTop:6,
      marginRight:2,
    //  flexDirection: 'row',
      

    },
    Button:{
      backgroundColor:"#d84339",
      left:40,

      marginTop:10,
      marginBottom:10


    },
    Check:{
      backgroundColor:"#FF7235",

     // left:25,
      //marginTop:20,
     // marginBottom:10

    },
    price:{
        fontSize:18,
        margin:20,
        color:'black',
        fontWeight:'bold',
        marginLeft:5,
    },
    hiddenContainer: {
        flex: 1,
        justifyContent: "flex-end",

        flexDirection: "row",
        height:height,
        width:"100%",
        backgroundColor:'red',

      },
      icon:{
        top:10,
      },
      hiddenButton: {
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingRight: 25,
        height: 70,
        width: width / 1.2,
      },
      header: {
        backgroundColor: 'white', // Set your desired background color
        padding: 20,
        alignItems: 'left',
      },
      title: {
        color: 'black',
        bottom:0,
        marginTop:10,
        marginBottom:20, // Set your desired text color
        fontSize: 22, // Set your desired font size
        fontWeight: 'bold',
      },
      Total:{
       // backgroundColor:"black"
      }
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
