 import React,{useState, useEffect } from "react";
 import axios from "axios";
  import { baseURL } from "../../assets/common/baseUrl";
 import {View , Text}  from 'react-native';
const NewComp = ({ route, navigation }) => {
    const { item } = route.params; // Access the 'item' data from the route params
    console.log(item);
    const book = item.title;
    console.log("Book Title for the book i want is : ",book);

    const [bookData, setBookData] = useState(null);


  
    useEffect(() => {
      // Call the API to get book details based on the title
      axios
      .get(`${baseURL}products/title/${item.title}`)
        .then((response) => {
          setBookData(response.data);
          console.log('Book data received in NewComp:', response.data);
        })
        .catch((error) => {
          console.log('Error fetching book details:', error);
        });
    }, [item]);
  
    useEffect(() => {
      // Once the book data is received, navigate to 'SingleProduct' screen with the book details as a parameter
      if (bookData) {
        navigation.navigate('Product Detail', { item: bookData });
      }
    }, [bookData, navigation]);
  
    return (
      <View>
        <Text>Loading book data...</Text>
      </View>
    );
  };
  export default NewComp;