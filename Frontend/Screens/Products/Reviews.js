import React,{useState, useEffect} from 'react';
import{View, Text, StyleSheet,  ScrollView} from 'react-native';
import axios from 'axios';
import { baseURL } from '../../assets/common/baseUrl';
import StarRating from 'react-native-star-rating';




const Reviews=(props)=>{
    const { route } = props;
    const { item } = route.params;
    console.log("Item is : ", item)


    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios
          .get(`${baseURL}Rate/getBookReviews/${item._id}`) // Assuming this is the correct API endpoint
          .then((response) => {
            setReviews(response.data);
          })
          .catch((error) => {
            console.error('Error fetching reviews:', error);
          });
      }, []);

return(
    <View>
 
  <ScrollView>
  {reviews.map((review) => (
  
    <View key={review._id}  style={styles.reviewContainer}>
      <Text style={{color:"black", fontWeight:"bold"}}>{review.userId.name}</Text>
      <Text>{review.date}</Text>
      {/* Display the star rating based on the review's numeric rating */}
      <StarRating
       
        disabled={true}
        maxStars={5}
        rating={review.rating}
        starSize={18}
        starStyle={styles.customStarStyle} 
      
        
        // width={30}
        containerStyle={styles.starContainer}
         // Adjust the size of the stars as needed
      />
      <Text>{review.comment}</Text>
     
    </View>
   
  ))}
   </ScrollView>
  
</View>
)
}

const styles= StyleSheet.create({
    reviewContainer: {
        marginBottom: 15,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
      },
      starContainer: {
    // marginLeft: 310,
        marginLeft:270,
        marginTop:-19,
        marginRight:55,
        //backgroundColor:'red',
         // Adjust the value as needed
      },
      customStarStyle: {
        color: '#e39805',
        marginLeft:-6,
        //flexDirection: "row",
      //  justifyContent: "flex-end",
        marginRight: 5,// Change this to the desired star color
      },
    });


export default Reviews;







