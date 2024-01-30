// import React , {useState, useCallback}from 'react';
// import {View, Text, FlatList, ActivityIndicator, StyleSheet
// ,Dimensions, Button } from 'react-native'
// import {Header , Item , Input } from "native-base";
// import Icon from "react-native-vector-icons/FontAwesome"
// import { useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';
// import baseUrl from '../../assets/common/baseUrl';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// var {height, width} = Dimensions.get("window")


// const Products =(props)=>{
//     const [productList, setProductList]= useState([]);
//     const [productFilter , setProductFilter] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [token , setToken ] = useState([]);

//     useFocusEffect(
//         useCallback(
//             ()=>{
//                 //Get Token
                
//                 AsyncStorage.getItem("jwt").then((res)=>{
//                     setToken(res)
//                 }).catch((error)=>{
//                     console.log(error)
//                 })
//                 axios.get(`${baseUrl}products`).then((res)=>
//                 {
//                     setProductList(res.data);
//                     setProductFilter(res.data);
//                     setLoading(false);

//                 })
//                 return ()=>{
//                     setProductList();
//                     setProductFilter();
//                     setLoading(true)

//                 }

//             },
//             [],
//         )
//     )

//     return (
//         <View>
//            <View>
//             <Header searchBar rounded>
//                 <Item style={{padding:5}}>
//                     <Icon name="search"></Icon>
//                     <Input  placeholder='Search Here'
//                     //onChange
//                     />
//                 </Item>

//             </Header>
//            </View>
//            {loading? (
//              <View>
//                 <ActivityIndicator
//                 size ="large" color="#a0e1eb"/>
            
//              </View>
//            ):(
//             <FlatList
//             data={productFilter}
//             renderItem={({item, index})=>{
//                 <Text>
//                     {item.name}
//                 </Text>
//             }}
//             keyExtractor={(item)=>item.id}
//             />
//            )}
          
//         </View>
//     )
// }

// export default Products;





import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, 
 TouchableOpacity, StyleSheet, Dimensions,ScrollView,  } from 'react-native';
import { Header,Container, Item, Input , Button} from 'native-base';
import { VStack, Divider,Box,Heading, Ionicons } from 'native-base';
import Icon from 'react-native-vector-icons/Fontisto';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { baseURL } from '../../assets/common/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ListItemm from './ListItem';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import { TouchableRipple } from 'react-native-paper';
import AddProduct from './AddProduct';




const { height, width } = Dimensions.get('window');

const ListHeader=()=>{
  return(

  <>
   
    <View elevation={1}
     style={styles.listHeader}
     >
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold',marginLeft:50}}>Author</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold',marginLeft:10}}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{fontWeight:'bold',marginLeft:10}}>Category</Text>
      </View>
      <View style={styles.headerItem} >
        <Text style={{fontWeight:'bold',marginLeft:10}}>Price</Text>
      </View>
    </View>
    </>
  
  )
}

const Products = (props) => {
  const [productList, setProductList] = useState([]);
  const [productFilter, setProductFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [totalProducts, setTotalProducts] = useState(0);
  




  

  const getTotalProductsCount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    try {
      const response = await axios.get(`${baseURL}products/get/count`, config);
      setTotalProducts(response.data.count);
      console.log("Calle  APIIIII");
    } catch (error) {
      console.error('Error fetching total product count:', error);
    }
  };

// Add this function to fetch data again
const fetchProductData = () => {
  // Fetch product list and total products count here
  getTotalProductsCount();
  axios.get(`${baseURL}products/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  .then((res) => {
    setProductList(res.data);
    setProductFilter(res.data);
    setLoading(false);
  })
  .catch((error) => {
    console.log(error);
  });
};

  useFocusEffect(
    useCallback(() => {
     getTotalProductsCount();
    //  fetchProductData();
      return () => {
        // Clean up any necessary resources if needed
      };
    }, [productList ])
  );

  useEffect(() => {
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(`${baseURL}products/get/admin`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProductList(res.data);
          setProductFilter(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      return () => {
       
        setProductList([]);
        setProductFilter([]);
        setLoading(true);
      };
    }, [])
  );
  const searchProduct = (text) => {
    if (text.trim() === "") {
      setProductFilter(productList);
      console.log("Product",productList);
      return;
    }
  
    const filteredProducts = productList.filter((item) => {
      const itemName = item.book_Title ? item.book_Title.toLowerCase() : "";
      const categoryName = item.category && item.category.name ? item.category.name.toLowerCase() : "";
      const brandName = item.brand ? item.brand.toLowerCase() : "";
  
      return (
        itemName.includes(text.toLowerCase().trim()) ||
        categoryName.includes(text.toLowerCase().trim()) ||
        brandName.includes(text.toLowerCase().trim())
      );
    });
  
    setProductFilter(filteredProducts);
  };

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id);
        setProductFilter(products);
        getTotalProductsCount();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  return (

    <>
    <View  style={{flex:1, backgroundColor:"white", }}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.orderOption}
        onPress={() => props.navigation.navigate("Orders")}
        >
          <Icon  color="#F94B00" name="shopping-bag-1" size={18}  />
          <Text style={styles.buttonText}>Orders</Text>

        </TouchableOpacity>
    
        <TouchableOpacity
        style={styles.orderOption}
        onPress={() => props.navigation.navigate("Product Form")}
        >
        <Icon2 name="bookshelf" size={18} color="#F94B00" />
        <Text style={styles.buttonText}>Books</Text>

        </TouchableOpacity>

       
        <TouchableOpacity
        style={styles.orderOption}
         onPress={() => props.navigation.navigate("Categories")}
        >
        <Icon1 name="category" size={18} color="#F94B00" />
        <Text style={styles.buttonText}>Categories</Text>

        </TouchableOpacity>
       
      </View>
    <View>
    <View>
      <Text style={{color:'black', fontSize:16, fontWeight:"bold"}}>Total Products: {totalProducts}</Text>
      {/* ... (existing JSX code) */}
    </View>

    <VStack my="4" space={5} w="width" maxW="300px" 
     divider={<Box px="2">
         
       </Box>}
        >
      <VStack w="width" 
    space={5}
       alignSelf="center">
        {/* <Heading ></Heading> */}
        <Input
        onChangeText={searchProduct} placeholder="Search Books" 
        //variant="filled"
         width="100%"
        // color="yellow"
         borderRadius="34" py="1" px="2" 
         borderBottomColor={"blue"}
         InputLeftElement={<Icon

          style={styles.icon}
          ml="4"
          name="search"
          size={20} // Change the value to a number instead of a string
          color="grey"
          
        />
        } />
      </VStack>
      </VStack>
        <TouchableRipple
 style={styles.button}
 onPress={() => props.navigation.navigate("Add Product",  { fetchProductData })}>
          <Text style={{fontSize:16,marginHorizontal:3, fontWeight:"bold",color:"black", marginLeft:5}}>Add New</Text>
        </TouchableRipple>


      
      
   
      {loading ? (
        <View
         style={styles.spinner}
         >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <View style={styles.flatlistContainer}>
          {/* <ScrollView > */}
        <FlatList

        style={{ marginBottom:290}}
        // ListHeaderComponent={ListHeader}
        data={productFilter}
       
        renderItem={({ item, index }) => (
          <ListItemm
            {...item}
            navigation={props.navigation}
            index={index}
            delete={deleteProduct}
            fetchProductData={fetchProductData} // Pass the fetchProductData 

          ></ListItemm>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* /</ScrollView> */}
      </View>
      )}
       
          
        </View>
      </View>
   </>
  );
};





const styles = StyleSheet.create({
  orderOption: {
    margin:12,
    paddingHorizontal:8,
    paddingVertical:2,
    opacity:13,

     padding: 15,
     backgroundColor: "#B8E1EF",
     //backgroundColor: "#D0E0F0",
    alignContent:"center",
    alignItems:"center",
     borderRadius: 3,
    // borderColor: "#7ebfd5",
     borderColor: "#97b8ec",
     padding:2,

    //  shadowOpacity:13,
    //  shadowColor:'green',
    //  shadowOffset:13,
    //  shadowRadius:14,


     borderWidth:2,
  },
  loadingContainer: {
  // flex: 1,
 // backgroundColor:"green",
   alignItems: 'center',
    justifyContent: 'center',
  },
  listHeader: {
   // flex:1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gainsboro',
    width:width
  },

  headerItem: {
   // flex: 1, // Use flex: 1 to take up the available space
    margin:10
  },
  categoryHeaderItem: {
    //flex: 1,
    minWidth: 100, // Set a fixed width for the Category item, adjust as needed
    margin: 3,
  },
  priceHeaderItem: {
 
  },
  flatlistContainer:{

    width:width,
   // height:height*2,
  },
  icon:{
    marginLeft:5,
  }
,

  
  
  headerText: {
    fontWeight: "bold",
  },
  spinner: {
   // height: height,
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    backgroundColor:"white",
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "black",
    fontWeight:"bold",
    fontSize:16,
   // color:"#F94B00"
   color:"black"

  },
  button:{
    marginLeft:310,
    marginTop:-47,
    marginBottom:30,
    borderRadius:10,
    borderWidth:1,
    borderBlockColor:"orange",
    marginVertical:23,
    
  // backgroundColor:'blue',
   // padding:5

  }
});

export default Products;


