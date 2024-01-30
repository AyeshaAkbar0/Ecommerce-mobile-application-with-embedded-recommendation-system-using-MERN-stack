import React,{useContext} from 'react'
import {View, StyleSheet, Dimensions, Image, Text, Button} from 'react-native'
import { connect } from 'react-redux';
const localImage = require('../../assets/images/download.jpg');
import * as actions from "../../Redux/Actions/cartActions";
import  Toast  from 'react-native-toast-message';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import AuthGlobal from '../../Context/store/AuthGlobal';
import { useNavigation } from '@react-navigation/native';






var {width}= Dimensions.get('window')
const ProductCard = (props)=>{
    const navigation = useNavigation();

    const context = useContext(AuthGlobal);

  const isAdmin = context.stateUser.user.isAdmin;
    const userId= context.stateUser.user.userId
    
    const {_id, book_Title,Book_Author,image,inStock,price}= props

    const handleAddToCart = () => {
        if (context.stateUser.isAuthenticated) {
          props.addItemToCart(userId, props);
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: `${book_Title} added to Cart`,
            text2: 'Go to your cart to complete Order',
            backgroundColor: 'green', // Set your desired background color
        textColor: 'blue',
          });
        } else {
          // Navigate to the login screen
          // You can replace 'User' and 'Login' with the actual names of your screens
          navigation.navigate('User', { screen: 'Login' });
        }
      };
    return(
        <View style={styles.container}>
            <Image style={styles.image}
            resizeMode='contain'
            source={{uri:image}}></Image>
            <View style={styles.card}/>
            <Text style={styles.title}>
                {book_Title.length>15?book_Title.substring(0,15-3)
                + '...':book_Title}
            </Text>
            <Text style={styles.price}>
               ${price}
            </Text>
          
            
            {!isAdmin && ( // Add the negation (!) to show the button when user is not an admin
  <>
    {inStock > 0 ? (
      <View style={{ marginBottom: 40, marginTop: 10 }}>
        <EasyButton primary medium onPress={handleAddToCart}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
        </EasyButton>
      </View>
    ) : (
      <Text style={{ marginTop: 20, color: 'black' }}>Currently Unavailable</Text>
    )}
  </>
)}

        </View >
    )

}





const mapDispatchToProps = (dispatch) => {
    return {
  
      //working
      // addItemToCart: (product) =>
      //   dispatch(actions.addToCart({ quantity: 1, product })),
     // new
      addItemToCart: (userId,product) =>
        dispatch(actions.addToCartServer(userId, product._id, 1)),
    };
  };
const styles=StyleSheet.create({
    container:{
    width:width/2-20,
    height:width/1.7,
    padding:10,
    marginTop:55,
    marginBottom:5,
    marginLeft:10,
    alignItems:'center',
    elevation:8,
    backgroundColor:'white',
    //backgroundColor:'red'

    },
    image:{
        width:width/2-20-10,
        height:width/2-10-30,
        backgroundColor:'transparent',
        position:'absolute',
        top:-45
    },
    card:{
        marginBottom:10,
        height:width/2-20-90,
        backgroundColor:'transparent',
        width:width/2-20-10
    },
    title:{
        marginTop:10,
        fontWeight:'bold',
        fontSize:16,
        textAlign:'center'
    },
    price:{
        fontSize:18,
        color:'#222222',
        marginTop:2
    }
})
export default connect(null, mapDispatchToProps) (ProductCard);