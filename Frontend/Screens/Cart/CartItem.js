// import React, {useState} from 'react'
// import { StyleSheet } from 'react-native'
// import{Text, Left, Right,ListItem, Thumbnail, Body} from 'native-base'


// const CartItem =(props)=>{
//     const data = props.item.product;
//     const[quantity, setQuantity]= useState(props.item.quantity)
//     return(
//         <ListItem
//         style={styles.listItems}
//         key={Math.random()}
//         avatar>
//             <Left>
//                 <Thumbnail
//                 source={{uri:data.image}}/>
//             </Left>
//             <Body style={styles.body}>
//                 <Left>
//                     <Text>{data.book_Title}</Text>
//                 </Left>
//                 <Right>
//                     <Text>
//                        Rs. {data.price}
//                     </Text>
//                 </Right>
//             </Body>
            
//         </ListItem>
//     )
// }
//  const styles = StyleSheet.create({
//     listItems:{
//         alignItems:'center',
//         backgroundColor:'white',
//         justifyContent:'center'
//     },
//     body:{
//         margin:10,
//         alignItems:'center',
//         flexDirection:'row'
//     }
//  })

// export default CartItem;
 

/////Abhi kiya ye 


///RECENT WORKING

// import React, { useState, useEffect } from 'react';
// import * as actions from '../../Redux/Actions/cartActions'
// import {connect} from 'react-redux'
// import { VStack,Checkbox , HStack} from 'native-base';
// import AllCheckbox from './ALLCheckbox';

// import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

// var {width}= Dimensions.get("window")


// const CartItem = (props) => {
  


  



//   const data = props.item.item.product;
//   //const{price}=props;
//   const [quantity, setQuantity] = useState(props.item.item.quantity);
//   const[priceUpdated, setPriceUpdated] =useState("")
//   const [checkedObjects, setCheckedObjects] = useState([]);

//   useEffect(() => {
//     calculateTotalPrices(checkedObjects);
//   }, [checkedObjects]);


//   const handleCheckboxChange = (objectId, newValue) => {
   
//     let newCheckedObjects = [...checkedObjects];

  
//     let index = newCheckedObjects.indexOf(objectId);

//     if (index > -1) {
     
//       if (!newValue) {
//         newCheckedObjects.splice(index, 1);
//       }
 
//     } else {
//       if (newValue) {
//         newCheckedObjects.push(objectId);
//       }
 
//     }

   
//     setCheckedObjects(newCheckedObjects);
//   };
  
 
  
 

//   const calculateTotalPrices = (objectIds) => {
//     // Initialize a variable to store the total amount
//     let totalAmount = 0;

//     // Loop through the object ids array
//     objectIds.forEach((element) => {
//       // Find the corresponding object from the props.cartItems array
//       const cartItem = props.cartItems.find((item) => item.product.id === element);

//       // If the object exists, add its price and quantity to the total amount
//       if (cartItem) {
//         totalAmount += cartItem.product.price * cartItem.quantity;
//       }
//     });

//     console.log('Total:', totalAmount);
//     // Do whatever you want with the totalAmount, no need to return it here
//   };



  
//   const handleQuantityChange = (newQuantity) => {
//     setQuantity(newQuantity);

//     // Calculate the new total price based on the updated quantity
//     const newTotalPrice = data.price * newQuantity;
//     setPriceUpdated(newTotalPrice);
//     console.log(newTotalPrice);

//     // Pass the new total price to the updateTotalPrice function
//    props.updateQuantity(props.item.item, newQuantity);
//     // props.updateTotalPrice(newTotalPrice);
//   };

  


//   return (
//     <View style={styles.container}>
//      <Checkbox
//   value={checkedObjects.includes(data.id)}
//   onChange={(newValue) => handleCheckboxChange(data.id, newValue)}
//     accessibilityLabel="Select this item"
// />

 
      
//         <Image source={{ uri: data.image }} style={styles.thumbnail} />
   
//       <View style={styles.body}>
//         <Text>{data.book_Title}</Text>
//         <Text>Rs. {data.price}</Text>
       
//       </View>
//       <View style={styles.quantityContainer}>
//           <TouchableOpacity
//             style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
//             disabled={quantity === 1}
//             onPress={() => handleQuantityChange(quantity - 1)}
//           >
//             <Text>-</Text>
//           </TouchableOpacity>
//           {/* <>console.log()</> */}
//           <Text style={styles.quantity}>{quantity}</Text>
//           <TouchableOpacity
//             style={styles.quantityButton}
//             onPress={() => handleQuantityChange(quantity + 1)}
//           >
//             <Text>+</Text>
//           </TouchableOpacity>
    
//         </View>
//     </View>
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
//     updateQuantity: (item, quantity) => dispatch(actions.updateQuantity(item, quantity)),
//   };
// };





// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     width:width,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'white',
//     justifyContent: 'center',
//   },
//   thumbnail: {
//     width: 40,
//     height: 50,
//     borderRadius: 5,
//   },
//   body: {
//     margin: 10,
//     alignItems: 'center',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 5,
//   },
//   quantityButton: {
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderWidth: 1,
//     borderColor: 'black',
//   },
//   quantityButtonDisabled: {
//     opacity: 0.5,
//   },
//   quantity: {
//     marginHorizontal: 10,
//   },
// });

// export default connect(mapStateToProps,mapDispatchToProps)(CartItem);










import React, { useState, useEffect,useContext } from 'react';
//import { increaseQuantity, decreaseQuantity } from '../../Redux/Actions/cartActions';
import * as actions from '../../Redux/Actions/cartActions'
import AuthGlobal from '../../Context/store/AuthGlobal';
import {connect} from 'react-redux'
import { VStack,Checkbox ,ListItem, HStack} from 'native-base';
import AllCheckbox from './ALLCheckbox';
import Icon from "react-native-vector-icons/FontAwesome"

import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';

var {width}= Dimensions.get("screen")


const CartItem = (props) => {
  const context=useContext(AuthGlobal);
  const userId= context.stateUser.user.userId;

  const data = props.item.item.product;
  const cartId=props.item.item;
  const quantity = props.item.item.quantity;
  
  const handleIncrease = () => {
    props.increasequantity(data.id,userId,cartId);
  };

  const handleDecrease = () => {
    props.decreasequantity(data.id,userId,cartId);
  };




  return (

   
    <View style={styles.container}>
       {/* <ListItem
      style={[
        styles.listItems,
        props.item.item.isSelected ? styles.selectedItem : null,
      ]}
      key={Math.random()}
      avatar
    ></ListItem> */}
           <View style={{marginLeft:5,}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => props.onItemSelect(data.price, !props.item.item.isSelected)}
        >
          <Icon
            name={props.item.item.isSelected ? 'check-circle' : 'circle-o'}
            color={props.item.item.isSelected ? '#1c768f' : 'grey'}
            size={25}
          />
        </TouchableOpacity>
      </View >
        <Image source={{ uri: data.image }} style={styles.thumbnail} />
        <View  style={styles.newbox}>
        <View style={styles.body}>
        <Text style={{fontSize:15, fontWeight:"bold", color:'black'}} 
         >{data.book_Title}</Text>
        <Text style={{fontSize:15, fontWeight:"bold", color:'black'}}>${data.price}</Text>
       
      </View>
      <View
       style={styles.quantityContainer}
       >
      <TouchableOpacity
          style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
          disabled={quantity === 1}
          onPress={handleDecrease}
        >
          <Text style={{color:"white", fontSize:12, fontWeight:"bold"}}>-</Text>
        </TouchableOpacity>
        <Text style={{fontWeight:'bold'}}> {quantity} </Text>
        <TouchableOpacity
           style={[styles.quantityButton, quantity === data.inStock && styles.quantityButtonDisabled]}
          onPress={handleIncrease}
          disabled={quantity === data.inStock}
        >
          <Text style={{color:"white", fontSize:12, fontWeight:"bold"}}>+</Text>
        </TouchableOpacity>
        </View>
        </View>
    </View>
  );
};

//ayesha
// const mapDispatchToProps = (dispatch) => {
//   return {
//     increaseQuantity: (productId) => dispatch(increaseQuantity(productId)),
//     decreaseQuantity: (productId) => dispatch(decreaseQuantity(productId)),
//   };
// };


//new esha

const mapDispatchToProps = (dispatch) => {
  console.log("hiiiii");
  return {
    // addItemToCart: (userId,product) =>
    //   dispatch(actions.addToCartServer(userId, product._id, 1)),

    increasequantity: (productId,userId,cartId) =>
     dispatch(actions.increaseQuantity(productId,userId,cartId._id)),
     decreasequantity: (productId,userId,cartId) =>
     dispatch(actions.decreaseQuantity(productId,userId,cartId._id)),

    // increaseQuantity: (productId) => dispatch(actions.increaseQuantity(productId)),
    // decreaseQuantity: (productId) =>dispatch(decreaseQuantity(productId)),
  };
};








const styles = StyleSheet.create({
  container: {
     flex:1,
    //width:width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  //  justifyContent: 'center',
  },
  thumbnail: {
    marginLeft:10,
    marginTop:15,
    marginBottom:5,
    width: 60,
    height: 90,
    borderRadius: 5,
  },
  nebox:{
  

  },
  body: {

    
  margin: 10,
  
   //alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: "row",
// alignItems: 'center',
margin:10,
marginTop:1,
    //marginRight: 10,
    //alignContent:"space-between",
  //  justifyContent:"flex-end",
   // marginLeft:140,
   // right:150,
    //left:40,
  },
  quantityButton: {
    //marginLeft:50,
    paddingHorizontal: 10,
    paddingVertical: 3,
   // borderWidth: 1,
   // borderColor: 'black',
    backgroundColor:'#1c768f',
    borderRadius:20,
  },
  quantityButtonDisabled: {
  //  opacity: 0.9,
    backgroundColor:'#d84339'
  },
  quantity: {
    marginHorizontal: 10,
    color:"black",
    //fontSize:30,
    fontWeight:"bold",
  },
});

export default connect(null, mapDispatchToProps)(CartItem);
