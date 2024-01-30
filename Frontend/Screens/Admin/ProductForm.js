import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  //Dropdown
} from "react-native";
import {Select } from "native-base"

import { Item, Picker } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Error from "../../Shared/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL, hostIP } from "../../assets/common/baseUrl";
import axios from "axios";
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
//import Dropdown from "../../Components/Dropdown";
import * as ImagePicker from "react-native-image-picker";
import mime from "mime";
//import { Picker } from "@react-native-picker/picker";
var { height } = Dimensions.get("window");





const ProductForm =(props)=>{


  
    const [pickerValue, setPickerValue] = useState("");
  const [book_Author, setBook_Author] = useState();
  const [book_Title, setBook_Title] = useState();
  const [price, setPrice] = useState();
 // const [description, setDescription] = useState();
  const [image, setImage] = useState();
 // const [mainImage, setMainImage] = useState();
  const [category, setCategory] = useState();
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState();
  const [err, setError] = useState();
  const [countInStock, setCountInStock] = useState();
 // const [rating, setRating] = useState(0);
  const [isFeatured, setIsFeature] = useState(false);
 // const [richDescription, setRichDescription] = useState();
 // const [numReviews, setNumReviews] = useState(0);
  const [item, setItem] = useState(null);

  const requestCameraRollPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'android'
          ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
          : PERMISSIONS.IOS.PHOTO_LIBRARY
      );
      if (result === RESULTS.GRANTED) {
        console.log('Camera roll permission granted');
      } else {
        console.log('Camera roll permission denied');
      }
    } catch (error) {
      console.log('Error requesting camera roll permission:', error);
    }
  };



  useEffect(() => {
    if (!props.route.params) {
      
      const obj= props.route.params;
      console.log('Here is object ',obj )
      
      setItem(null);
    } else {



      const obj= props.route.params;
      
      setItem(props.route.params.item);
      setBook_Author(props.route.params.item.Book_Author);
      setBook_Title(props.route.params.item.book_Title);
      setPrice(props.route.params.item.price);
      //setDescription(props.route.params.item.description);
      //setMainImage(`${hostIP}${props.route.params.item.image}`);
      setImage(props.route.params.item.image);
     // setPickerValue(props.route.params.item.category._id);
      setCountInStock(props.route.params.item.countInStock);
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    //Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategories(res.data);
        setCategoryItems(
          res.data.map((item) => {
            return { label: item.name, value: item._id };
          })
        );
      })
      .catch((error) => {
        alert("Error to load categories");
      });

    //Image Picker
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permission to make this work");
        }
      }
    })();
    return () => {
      setCategories([]);
    };
  }, []);



  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    };

    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error:', response.error);
      } else {
        setImage(response.uri);
      }
    });
  };
 const addProduct = () => {
    if (
      book_Title == "" ||
      book_Author == "" ||
      categories == "" ||
      countInStock == ""
    ) {
      setError("Please fill in the form correctly");
    }

    let formData = new FormData();
    console.log('Title of bookk is ',book_Title)
    // const newImageUri = "file:///" + image.split("file:/").join("");
    // console.log(image.split("/").pop());
    // console.log(mime.getType(image));

// formData.append("image", {
//       uri: Platform.OS == "android" ? image : newImageUri,
//       type: mime.getType(image),
//       name: image.split("/").pop(),
//     });

    formData.append("book_Title", book_Title);
    formData.append("Book_Author", book_Author);
    formData.append("price", price);
    //formData.append("description", description);
    formData.append("category", pickerValue);
    //formData.append("countInStock", countInStock);
    //formData.append("richDescription", richDescription);
    //formData.append("rating", rating);
    //formData.append("numReviews", numReviews);
   // formData.append("isFeatured", isFeatured);
   const Form = {
    book_Title:book_Title,
    Book_Author:book_Author,
    price:price,
    inStock:countInStock,
    
   }

   console.log('Form data is ',formData);
    const config = {
      headers: {
        //"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    if (item != null) {
      axios
        .put(`${baseURL}products/${item.id}`, Form, 
       config
        )
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Product successfully updated",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error.stack);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    } else {
      axios
        .post(`${baseURL}products`, Form, config)
        .then((res) => {
          if (res.status == 200 || res.status == 201) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "New Product added",
              text2: "",
            });
            setTimeout(() => {
              props.navigation.navigate("Products");
            }, 500);
          }
        })
        .catch((error) => {
          console.log(error.stack);
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
            text2: "Please try again",
          });
        });
    }
  };

  

    return (
      <View style={{backgroundColor:"white"}}>
        <FormContainer>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: image }} />
          <TouchableOpacity style={styles.imagePicker}
           onPress={pickImage}
           >
            <Icon style={{ color: "white" }} name="camera" />
          </TouchableOpacity>
        </View>
  

         <View style={styles.label}>
        <Text  style={{fontWeight:"bold", color:"black"}}>Title:</Text>
      </View>
      <Input
        placeholder="Enter Book Title"
        name="title"
        id="title"
        value={book_Title}
        onChangeText={(text) => setBook_Title(text)}
      />
              <View style={styles.label}>
          <Text style={{fontWeight:"bold", color:"black"}}>Author:</Text>
        </View>
        <Input
          placeholder="Enter Author"
          name="Book_Author"
          id="Book_Author"
          value={book_Author}
          onChangeText={(text) => setBook_Author(text)}
        />

      <View style={styles.label}>
        <Text style={{fontWeight:"bold", color:"black"}}>Price:</Text>
      </View>
      <Input
        placeholder="Enter Price"
        name="price"
        id="price"
        keyboardType={"numeric"}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      <View style={styles.label}>
        <Text style={{fontWeight:"bold", color:"black"}}>Count in stock:</Text>
      </View>
      <Input
        placeholder="Enter Stock"
        name="stock"
        id="stock"
        keyboardType={"numeric"}
        value={countInStock}
        onChangeText={(text) => setCountInStock(text)}
      />

      {/* <View style={styles.label}> */}
        {/* <Text>Description</Text>
      </View>
      <Input
        placeholder="Enter Description"
        name="description"
        id="description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      /> */}
        <Select
         minWidth="200" 
        selectedValue={pickerValue}
        onValueChange={(e) => [setPickerValue(e), setCategory(e)]}
        placeholder="Select your Category"
        _selectedItem={{
          bg: 'red',
        }}
      >
        {categoryItems.map((item) => (
          <Select.Item

            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Select>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>
        <EasyButton
         large 
        primary 
        onPress={() => addProduct()}>
          <Text style={styles.buttonText}>Update</Text>
        </EasyButton>
      </View>
    

        </FormContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
      width: "80%",
      marginTop: 10,
    },
    buttonContainer: {
      width: "70%",
      marginBottom: 50,
      marginTop: 20,
      alignItems: "center",
     



    },
    buttonText: {
      color: "white",
      fontWeight:"bold",
      fontSize:16,
    
    },
    imageContainer: {
      width: 200,
      height: 200,
      borderStyle: "solid",
      borderWidth: 8,
      padding: 0,
      justifyContent: "center",
      borderRadius: 100,
      borderColor: "#E0E0E0",
      elevation: 10,
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: 100,
    },
    imagePicker: {
      position: "absolute",
      right: 5,
      bottom: 5,
      backgroundColor: "grey",
      padding: 8,
      borderRadius: 100,
      elevation: 20,
    },
  });
export default ProductForm;















