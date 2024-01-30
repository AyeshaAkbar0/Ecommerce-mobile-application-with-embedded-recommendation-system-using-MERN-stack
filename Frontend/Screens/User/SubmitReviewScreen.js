import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { baseURL } from '../../assets/common/baseUrl';
import StarRating from 'react-native-star-rating';
import { submitReview } from '../../Redux/Actions/submittedReviewsActions';
import { Connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native";
const SubmitReviewScreen = ({ route }) => {
  const navigation=useNavigation()
  const { bookId,userId,orderId, bookTitle } = route.params;
  console.log("bvxx",userId)
  console.log("teyeyye",bookId)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleBackIconPress = () => {
    navigation.goBack(); // Navigate back to the previous screen (UserProfile)
  };

  const handleReviewSubmit = async () => {
    try {
      const currentDate = new Date();
      await axios.post(`${baseURL}Rate/submitReview`, {
        bookId: bookId,

        userId: userId,
        orderId:orderId,
        rating: rating,
        comment: comment,
        date: currentDate.toISOString(),
      });
      
      navigation.navigate('User', { screen: 'User Profile' });

      // Handle successful submission or navigation back
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
        <Icon  color='black' name="arrow-back" size={30} />
      </TouchableOpacity>
      <Text style={{fontsize:14, fontWeight:"600" , color:"black",
      marginBottom:10,
      marginTop:20,
      alignContent:"center",
      alignSelf:'center',
    }}>Submit Review for Book Title: <Text style={{fontWeight:"bold", fontSize:16,color:"#6DB5CA"}}>{bookTitle}</Text></Text>
  
      
      {/* Star rating component */}
      <View style={styles.rating}>
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        starStyle={styles.customStarStyle} 
      
        selectedStar={(rating) => setRating(rating)}
      />
      </View>
      <TextInput
      style={styles.text}
        placeholder="Write your review ..."
       // placeholderTextColor={"black"}
        value={comment}
        onChangeText={text => setComment(text)}
      />
      <View style={styles.button}>
      <Button color={"#FF7235"} title="Submit Review" onPress={handleReviewSubmit} />
      </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  backIcon:{
    top:26,
    marginBottom:20,

  },
  container:{
    height:"100%",
    backgroundColor:"white"
    ,
    flex:1,
  },
  rating:{
   // backgroundColor:"grey",
   marginTop:20,
    width:"80%",
    left:35,
    marginBottom:20,
  },
  button:{
    backgroundColor:"#FF7235",
 marginTop:200,
 margin:10,
 
},
customStarStyle: {
  color: '#e39805',
 // marginLeft:-6,
  //flexDirection: "row",
//  justifyContent: "flex-end",
 // marginRight: 5,// Change this to the desired star color
},
text:{
  marginTop:10,
  padding:20,
  paddingBottom:80,
  fontSize:16,
  backgroundColor:"gainsboro",
  width:"95%",
  height:"20%",
  left:10,
}
})

export default SubmitReviewScreen;
