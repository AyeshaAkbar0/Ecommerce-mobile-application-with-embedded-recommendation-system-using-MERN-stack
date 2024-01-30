// import React, { useState, useEffect } from "react";
// import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,Platform, Dimensions } from "react-native";
// import { Select } from "native-base";
// import FormContainer from "../../Shared/Form/FormContainer";
// import Input from "../../Shared/Form/Input";
// import EasyButton from "../../Shared/StyledComponents/EasyButton";
// import Icon from "react-native-vector-icons/FontAwesome";
// import Toast from "react-native-toast-message";
// import Error from "../../Shared/Error";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { baseURL, hostIP } from "../../assets/common/baseUrl";
// import axios from "axios";
// import * as ImagePicker from "react-native-image-picker";
// import mime from "mime";
// var { height } = Dimensions.get("window");

// const AddProduct = (props) => {
//   const [pickerValue, setPickerValue] = useState("");
//   const [book_Author, setBook_Author] = useState("");
//   const [book_Title, setBook_Title] = useState("");
//   const [price, setPrice] = useState("");
//   const [image, setImage] = useState("");
//   const [countInStock, setCountInStock] = useState("");
//   const [categoryItems, setCategoryItems] = useState([]);
//   const [token, setToken] = useState("");
//   const [err, setError] = useState("");
//   const[description, setDescription]=useState("")

//   useEffect(() => {
//     // Fetch categories and token
//     axios
//       .get(`${baseURL}categories`)
//       .then((res) => {
//         setCategoryItems(
//           res.data.map((item) => {
//             return { label: item.name, value: item._id };
//           })
//         );
//       })
//       .catch((error) => {
//         alert("Error loading categories");
//       });

//     AsyncStorage.getItem("jwt")
//       .then((res) => {
//         setToken(res);
//       })
//       .catch((error) => console.log(error));
//   }, []);


  

//   const pickImage = () => {
//     const options = {
//       mediaType: "photo",
//       allowsEditing: true,
//       aspect: [4, 5],
//       quality: 1,
//     };
  
//     ImagePicker.launchImageLibrary(options, (response) => {
//       console.log("Image Picker Response:", response);
  
//       if (response.didCancel) {
//         console.log("User cancelled image picker");
//       } else if (response.error) {
//         console.log("Image picker error:", response.error);
//       } else {
//         const selectedImageUri = response.assets[0].uri;
//         setImage(selectedImageUri);
//         console.log("Selected Image URI:", selectedImageUri);
//       }
//     });
//   };
  
  

//     const addProduct = () => {
//         if (book_Title === "" || book_Author === "" || categoryItems === "" || countInStock === "") {
//           setError("Please fill in the form correctly");
//         } else {
//           setError("");
      
//           const Form ={
//             book_Title:book_Title,
//             Book_Author:book_Author,
//             price:price,
//             countInStock:countInStock,
//             category:pickerValue,
//             description:description,
//           }
      
//           const config = {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           };
      
//           axios
//             .post(`${baseURL}products`, Form, config)
//             .then((res) => {
//               if (res.status === 200 || res.status === 201) {
//                 Toast.show({
//                   topOffset: 60,
//                   type: "success",
//                   text1: "New Product added",
//                   text2: "",
//                 });
//                 // Remove the setTimeout function to prevent automatic navigation back
//                 props.navigation.navigate("Products"); // Navigate back to the 'Products' screen immediately
//               }
//             })
//             .catch((error) => {
//               console.log(error.stack);
//               Toast.show({
//                 topOffset: 60,
//                 type: "error",
//                 text1: "Something went wrong",
//                 text2: "Please try again",
//               });
//             });
//         }
//       };
      

//   return (
//     <View style={{backgroundColor:'white'}}>
//     <FormContainer >
//       <View style={styles.imageContainer}>
//         {image ? (
//           <Image style={styles.image} source={{ uri: image }} />
//         ) : (
//           <Text>     No Image Selected</Text>
//         )}
//         <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//           <Icon style={{ color: "white" }} name="camera" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.label}>
//         <Text style={{color:"black", fontWeight:"bold", fontSize:17}}>Author:</Text>
//       </View>
//       <TextInput
//        style={styles.input}
//         placeholder="Enter Author"
//         name="Book_Author"
//         id="Book_Author"
//         value={book_Author}
//         onChangeText={(text) => setBook_Author(text)}
//       />

//       <View style={styles.label}>
//         <Text  style={{color:"black", fontWeight:"bold", fontSize:17}} >Title:</Text>
//       </View>
//       <TextInput
//        style={styles.input}
//         placeholder="Enter Book Title"
//         name="title"
//         id="title"
//         value={book_Title}
//         onChangeText={(text) => setBook_Title(text)}
//       />

//       <View style={styles.label}>
//         <Text   style={{color:"black", fontWeight:"bold", fontSize:17}}>Price:</Text>
//       </View>
//       <TextInput
//        style={styles.input}
//         placeholder="Enter Price"
//         name="price"
//         id="price"
//         keyboardType={"numeric"}
//         value={price}
//         onChangeText={(text) => setPrice(text)}
//       />

//       <View style={styles.label}>
//         <Text   style={{color:"black", fontWeight:"bold", fontSize:17}}>Count in stock:</Text>
//       </View>
//       <TextInput
//        style={styles.input}
//         placeholder="Enter Stock"
//         name="stock"
//         id="stock"
//         keyboardType={"numeric"}
//         value={countInStock}
//         onChangeText={(text) => setCountInStock(text)}
//       />
//       <View style={styles.label}>
//         <Text   style={{color:"black", fontWeight:"bold", fontSize:17}}>Description:</Text>
//       </View>
//       <TextInput
//        style={styles.input}
//         placeholder="Enter description"
//         name="description"
//         id="description"
    
//         value={description}
//         onChangeText={(text) => setDescription(text)}
//       />


//       <Select
//       style={styles.select}
//         minWidth="200"
//         selectedValue={pickerValue}
//         onValueChange={(e) => setPickerValue(e)}
    
//         placeholder="Select your Category"
//         _selectedItem={{
//           bg: "red",
//         }}
//       >
//         {categoryItems.map((item) => (
//           <Select.Item key={item.value} label={item.label} value={item.value} />
//         ))}
//       </Select>
//       {err ? <Error message={err} /> : null}
//       <View style={styles.buttonContainer}>
//         <EasyButton large primary onPress={addProduct}>
//           <Text style={styles.buttonText}>Add Book</Text>
//         </EasyButton>
//       </View>
//     </FormContainer>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   label: {
//     width: "80%",
//     marginTop: 10,
//     color:'black',
//   },
//   select:{
//     marginTop:0,
//     fontWeight:'bold',
//     color:"black",
//   //  backgroundColor:"yellow",
//   borderColor:"black"


//   },
//   input: {
//     height: 40,
//     width:'80%',
//     borderColor: 'black',
//     marginBottom:5,
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     backgroundColor: 'rgba(255, 220, 178, 0.4)', // Light orange shade
//     },
//   buttonContainer: {
//     width: "80%",
//     marginBottom: 80,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "black",
//     fontWeight:"bold",
//     fontSize:15,

//   },
//   imageContainer: {
//     width: 200,
//     height: 200,
//     borderStyle: "solid",
//     borderWidth: 8,
//     padding: 0,
//     justifyContent: "center",
//     borderRadius: 100,
//     borderColor: "#E0E0E0",
//     elevation: 10,
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderRadius: 100,
//   },
//   imagePicker: {
//     position: "absolute",
//     right: 5,
//     bottom: 5,
//     backgroundColor: "grey",
//     padding: 8,
//     borderRadius: 100,
//     elevation: 20,
//   },
// });

// export default AddProduct;













import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput,Platform, Dimensions } from "react-native";
import { Select } from "native-base";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Error from "../../Shared/Error";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseURL, hostIP } from "../../assets/common/baseUrl";
import axios from "axios";
import * as ImagePicker from "react-native-image-picker";
import mime from "mime";
var { height } = Dimensions.get("window");

const AddProduct = (props) => {
  const [pickerValue, setPickerValue] = useState("");
  const [book_Author, setBook_Author] = useState("");
  const [book_Title, setBook_Title] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [categoryItems, setCategoryItems] = useState([]);
  const [token, setToken] = useState("");
  const [err, setError] = useState("");
  const[description, setDescription]=useState("")

  useEffect(() => {
    // Fetch categories and token
    axios
      .get(`${baseURL}categories`)
      .then((res) => {
        setCategoryItems(
          res.data.map((item) => {
            return { label: item.name, value: item._id };
          })
        );
      })
      .catch((error) => {
        alert("Error loading categories");
      });

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));
  }, []);


  



  const pickImage = () => {
    const options = {
      mediaType: "photo",
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log("Image Picker Response:", response);
  
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("Image picker error:", response.error);
      } else {
        const selectedImageUri = response.assets[0].uri;
        setImage(selectedImageUri);
        console.log("Selected Image URI:", selectedImageUri);
      }
    });
  };
  
  

    const addProduct = () => {
        if (book_Title === "" || book_Author === "" || categoryItems === "" || countInStock === "") {
          setError("Please fill in the form correctly");
        } else {
          setError("");



    let formData = new FormData();

    const newImageUri = "file:///" + image.split("file:/").join("");
    console.log(image.split("/").pop());
    console.log(mime.getType(image));

    formData.append("image", {
      uri: Platform.OS == "android" ? image : newImageUri,
      type: mime.getType(image),
      name: image.split("/").pop(),
    });

    formData.append("book_Title", book_Title);
     formData.append("Book_Author", book_Author);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", pickerValue);
   formData.append("countInStock", countInStock);
   // formData.append("richDescription", richDescription);
   // formData.append("rating", rating);
   // formData.append("numReviews", numReviews);
   // formData.append("isFeatured", isFeatured);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
      
           // ... (previous code)

    // const data = new FormData();
    // data.append("book_Title", book_Title);
    // data.append("Book_Author", book_Author);
    // data.append("price", price);
    // data.append("countInStock", countInStock);
    // data.append("category", pickerValue);
    // data.append("description", description);

    // // Check if an image is selected before appending it to the FormData
    // if (image) {
    //   const imageUriParts = image.split(".");
    //   const imageType = imageUriParts[imageUriParts.length - 1];
    //   const imageName = `book_${Date.now()}.${imageType}`;
    //   data.append("image", {
    //     uri: image,
    //     type: `image/${imageType}`,
    //     name: imageName,
    //   });
    // }

    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "multipart/form-data",
    //   },
    // };
    // console.log("FormDATA IS HERE :", formData);
      
    axios
    .post(`${baseURL}products/newone/`, formData, config)
    .then((res) => {
      // console.log("FormDATA IS HERE :", formData);
      if (res.status == 200 || res.status == 201) {
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: "New Product added",
          text2: "",
        });
        props.route.params.fetchProductData();
        setTimeout(() => {
          props.navigation.navigate("Products");
        }, 500);
      }
    })
    .catch((error) => {
      console.log(error);
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
    <View style={{backgroundColor:'white'}}>
    <FormContainer >
      <View style={styles.imageContainer}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <Text style={{marginLeft:45,}}>Upload Image</Text>
        )}
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Icon style={{ color: "white" }} name="camera" />
        </TouchableOpacity>
      </View>

      <View style={styles.label}>
        <Text style={{color:"black", fontWeight:"bold", fontSize:17}}>Author:</Text>
      </View>
      <TextInput
       style={styles.input}
        placeholder="Enter Author"
        name="Book_Author"
        id="Book_Author"
        value={book_Author}
        onChangeText={(text) => setBook_Author(text)}
      />

      <View style={styles.label}>
        <Text  style={{color:"black", fontWeight:"bold", fontSize:17}} >Title:</Text>
      </View>
      <TextInput
       style={styles.input}
        placeholder="Enter Book Title"
        name="title"
        id="title"
        value={book_Title}
        onChangeText={(text) => setBook_Title(text)}
      />

      <View style={styles.label}>
        <Text   style={{color:"black", fontWeight:"bold", fontSize:17}}>Price:</Text>
      </View>
      <TextInput
       style={styles.input}
        placeholder="Enter Price"
        name="price"
        id="price"
        keyboardType={"numeric"}
        value={price}
        onChangeText={(text) => setPrice(text)}
      />

      <View style={styles.label}>
        <Text   style={{color:"black", fontWeight:"bold", fontSize:17}}>Count in stock:</Text>
      </View>
      <TextInput
       style={styles.input}
        placeholder="Enter Stock"
        name="stock"
        id="stock"
        keyboardType={"numeric"}
        value={countInStock}
        onChangeText={(text) => setCountInStock(text)}
      />
      <View style={styles.label}>
        <Text   style={{color:"black", fontWeight:"bold", fontSize:17}}>Description:</Text>
      </View>
      <TextInput
       style={styles.input}
        placeholder="Enter description"
        name="description"
        id="description"
    
        value={description}
        onChangeText={(text) => setDescription(text)}
      />


      <Select
      style={styles.select}
        minWidth="200"
        selectedValue={pickerValue}
        onValueChange={(e) => setPickerValue(e)}
    
        placeholder="Select Book Category"
        _selectedItem={{
          bg: "red",
        }}
      >
        {categoryItems.map((item) => (
          <Select.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Select>
      {err ? <Error message={err} /> : null}
      <View style={styles.buttonContainer}>

        <TouchableOpacity
         onPress={addProduct}>
        
        <Text style={styles.buttonText}>Add Book</Text>
        </TouchableOpacity>
        {/* <EasyButton
        large
         secondary
          onPress={addProduct}>
          <Text style={styles.buttonText}>Add Book</Text>
        </EasyButton> */}
      </View>
    </FormContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    width: "80%",
    marginTop: 10,
    color:'black',
  },
  select:{
    marginTop:0,
    fontWeight:'bold',
    color:"black",
  //  backgroundColor:"yellow",
  borderColor:"black"


  },
  input: {
    height: 40,
    width:'80%',
    borderColor: 'black',
    marginBottom:10,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(255, 220, 178, 0.4)', // Light orange shade
    },
  buttonContainer: {
    backgroundColor:"#6DB5CA",
    borderRadius:6,
    paddingVertical:10,
    width: "80%",
    marginBottom: 40,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight:"bold",
    fontSize:15,

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

export default AddProduct;



