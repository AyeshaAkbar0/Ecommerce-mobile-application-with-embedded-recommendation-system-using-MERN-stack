import React from "react";
import { Badge, Text } from "native-base";
import { StyleSheet , Dimensions, View} from "react-native";

import {connect} from 'react-redux';

import cartItems from "../Redux/Reducers/cartItem";
var {width}= Dimensions.get("window")

const CartIcon =(props)=>{
  return(
    <>
    {props.cartItems.cartItems.length?(
        // <Badge style={styles.Badge}>
        //     <Text  style={styles.text}>
        //         {props.cartItems.length}
        //     </Text>
        // </Badge>
        <View style={styles.Badge}>
            <Text style={styles.text}>{props.cartItems.cartItems.length}</Text>
        </View>
    ):null}
    </>
  );

};

const mapStateToProps=(state)=>{
    const {cartItems}=state;
    return {
        cartItems:cartItems
    }

}

const styles= StyleSheet.create({
    Badge: {
        width: 22,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        top: -4,
        right: -15,
        backgroundColor: '#1c768f',
        borderRadius: 10, // Adjust the borderRadius to half of the width to make it circular
      },
      text: {
        fontSize: 16,
        //marginRight:9,
        fontWeight: 'bold',
        textAlign: 'center', // Align the text horizontally at the center
     //   textAlignVertical: 'center', // Align the text vertically at the center
        color: 'white', // Set the text color to make it visible against the red background
      },
})
export default connect(mapStateToProps)(CartIcon)