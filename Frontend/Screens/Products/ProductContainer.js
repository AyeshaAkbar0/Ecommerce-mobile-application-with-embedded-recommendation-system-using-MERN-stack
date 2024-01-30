// import React, { useState, useEffect, useCallback } from "react";
// import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import { Container, Header,  Item, Input, Text } from "native-base";
//  import Icon from "react-native-vector-icons/FontAwesome"
// import  {baseURL}  from "../../assets/common/baseUrl";
// import axios from "axios";

// import ProductList from "./ProductList";
// import SearchedProduct from "./SearchedProducts";

// import Banner from "../../Shared/Banner";
// import CategoryFilter from "./CategoryFilter";
// import PriceFilter from "./PriceRangeFilter"; // Import the PriceFilter component

// import { VStack, Divider, Box , Ionicons} from 'native-base';

// const productsCategories = require("../../assets/data/categories.json");

// var {width, height } = Dimensions.get("window");

// const ProductContainer = (props) => {
//   const [products, setProducts] = useState([]);
//   const [productFiltered, setProductFiltered] = useState([]);
//   const [focus, setFocus] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [productsCtg, setProductsCtg] = useState([]);
//   const [active, setActive] = useState(-1);
//   const [initialState, setInitialState] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1); // Current page for infinite scrolling

//   useFocusEffect(
//     useCallback(() => {
//       setFocus(false);
//       setActive(-1);

//       // Products
//       axios.get(`${baseURL}products/?page=${page}`).then((res) => {
      
//         setProducts(res.data);
//         setProductFiltered(res.data);
//         setProductsCtg(res.data);
//         setInitialState(res.data);
//         setLoading(false);

        
//       }).catch((error) => {
//         //console.log("Products api call error", error);
//         if (error.response) {
//           // The request was made and the server responded with a status code
//           // that falls out of the range of 2xx
//           console.log(error.response.data);
//           console.log(error.response.status);
//           console.log(error.response.headers);
//         } else if (error.request) {
//           // The request was made but no response was received
//           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//           // http.ClientRequest in node.js
//           console.log(error.request);
//         } else {
//           // Something happened in setting up the request that triggered an Error
//           console.log('Error', error.message);
//         }
//       });;

//       // Categories
//       axios
//         .get(`${baseURL}categories/`)
//         .then((res) => {
//           setCategories(res.data);
          
//         })
//         .catch((error) => {
//           console.log("categories api call error", error);
//         });

//       return () => {
//         setProducts([]);
//         setProductFiltered([]);
//         setProductsCtg([]);
//         setFocus();
//         setCategories([]);
//         setActive();
//         setInitialState();
//       };
//     }, [])
//   );

//   // const searchProduct = (text) => {
//   //   setProductFiltered(
//   //     products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
//   //   );
//   // };

//   // const searchProduct = (text) => {
//   //   setProductFiltered(
//   //     products.filter((i) => i.name && i.name.toLowerCase().includes(text.toLowerCase()))
//   //   );
//   // };

//   const searchProduct = (text) => {
//     setProductFiltered(
//       products.filter((item) => {
//         const itemName = item.book_Title.toLowerCase(); // Convert item name to lowercase
//         const searchText = text.toLowerCase(); // Convert search term to lowercase
//         return itemName.includes(searchText);
//       })
//     );
//   };
  
  

//   const openList = () => {
//     setFocus(true);
//   };

//   const onBlur = () => {
//     setFocus(false);
//   };

//   // // Categories
//   const changeCtg = (ctg) => {
//     ctg === "all"
//       ? setProductsCtg(initialState)
//       : setProductsCtg(products.filter((i) => 
      
       
//       i.category._id === ctg));
//     setActive(true);
//   };
//   // const changeCtg = (ctg) => {
//   //   ctg === "all"
//   //     ? setProductsCtg(initialState)
//   //     : setProductsCtg(products.filter((i) => {
//   //         console.log(i.category);
//   //         return i.category._id === ctg;
//   //       }));
//   //   setActive(true);
//   // };
  

//   return (

//     <>
//     <View  style={{backgroundColor:"white"}}>

//         <Container>
        

          
// <View  style={{width:width}}>
// <VStack my={4} space={5} w="90%"  divider={<Box px={2}><Divider /></Box>}>
//    <VStack w="95%" space={5} 
//    alignSelf="center"
//    >
//     <Input
//        onChangeText={searchProduct}
//       placeholder="Search Here"
//        variant="filled"
//        width="100%"
//        borderRadius={10}
//        borderColor='black'
//        py={1}
//        px={2}
 
//   InputLeftElement={
  
//     <View style={styles.iconleft}>
//   <Icon

//     //ml="20"
//     size={20} // Change the value to a number instead of a string
//     color="gray"
    
//     name="search"
//     // as={<Ionicons name="ios-search" />}
//   />
//   </View>
//   } 
//       InputRightElement={
//         focus ? (
//           <View style={styles.iconright}>
//           <Icon
          
//             onPress={onBlur}
//             name="times-circle"
//             size={25}
//             color="gray"
//           />
//           </View>
//         ) : null
//       }
//       onFocus={openList}
//     />
//   </VStack> 
// </VStack>
// </View>

// <View style={{marginLeft:346,marginTop:-60,marginBottom:10,padding:10, width:width}}>
// <PriceFilter updateBookList={setProductsCtg} />

// </View>



//           {focus == true ? (
//             <SearchedProduct
//               navigation={props.navigation}
//               productsFiltered={productFiltered}
//             />
//           ) : (
//             <View style={styles.scrollContainer}>
//             <ScrollView  style={{ marginBottom: 80, padding: 5, width:width ,}}>
//               <View>
//                 <View>
//                   <Banner />
//                 </View>
//                 <View>
//                   <CategoryFilter
//                     categories={categories}
//                     categoryFilter={changeCtg}
//                     productsCtg={productsCtg}
//                     active={active}
//                     setActive={setActive}
//                   />
//                 </View>
//                 {productsCtg.length > 0 ? (
//                   <View style={styles.listContainer}>
//                     {productsCtg.map((item) => {
//                       return (
//                         <ProductList
//                           navigation={props.navigation}
//                           key={item._id}
//                           item={item}
//                         />
//                       );
//                     })}
//                   </View>
//                 ) : (
//                   <View style={[styles.center, { height: height / 2 }]}>
//                     <Text>Loading...</Text>
//                   </View>
//                 )}
//               </View>
//             </ScrollView>
//             </View>
//           )
//           }
//         </Container>
//       {/* // ) : (
//       //   <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
//       //     <ActivityIndicator size="large" color="#a0e1eb" />
//       //   </Container>
//       // )} */}
//       </View>
//     </>
//   );
// };


// const styles = StyleSheet.create({
//   listContainer: {
//    // height: height ,
//     flex: 1,
//      flexDirection: "row",
//      alignItems: "flex-start",
//    flexWrap: "wrap",
//     backgroundColor: "gainsboro",
//      width:width
//   },
//   center: {
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   scrollContainer: {
//     //flex: 1,
//    width: "100%",
//    // height:height+1000,
//   },
//   iconleft:{
//     marginLeft:5,
//   },
//   iconright:{
//     marginRight:5,
//   }
// });





















// import React, { useState, useEffect, useCallback } from "react";
// import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import { Container, Header, Item, Input, Text } from "native-base";
// import Icon from "react-native-vector-icons/FontAwesome";
// import { baseURL } from "../../assets/common/baseUrl";
// import axios from "axios";

// import ProductList from "./ProductList";
// import SearchedProduct from "./SearchedProducts";
// import Banner from "../../Shared/Banner";
// import CategoryFilter from "./CategoryFilter";
// import PriceFilter from "./PriceRangeFilter";
// import { VStack, Divider, Box } from 'native-base';

// const productsCategories = require("../../assets/data/categories.json");

// var { width, height } = Dimensions.get("window");

// const ProductContainer = (props) => {
//   const [products, setProducts] = useState([]);
//   const [productFiltered, setProductFiltered] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [productsCtg, setProductsCtg] = useState([]);
//   const [active, setActive] = useState(-1);
//   const [initialState, setInitialState] = useState([]);
//   const [focus, setFocus] = useState(false);

//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1); // Current page for infinite scrolling

//   useFocusEffect(
//     useCallback(() => {
//       setActive(-1);

//       // Categories
//       axios
//         .get(`${baseURL}categories/`)
//         .then((res) => {
//           setCategories(res.data);
//         })
//         .catch((error) => {
//           console.log("categories api call error", error);
//         });

//       return () => {
//         setProducts([]);
//        // setProductFiltered([]);
//         setProductsCtg([]);
       
//         setActive();
//         setInitialState();
//         setPage(1);
//       };
//     }, [])
//   );

//   useEffect(() => {
//     setLoading(true);

//     // Fetch products based on current page
//     axios
//       .get(`${baseURL}products/?page=${page}`)
//       .then((res) => {
//        // console.log("Heavy",res);
//         // setProducts((prevProducts) => [...prevProducts, ...res.data]);
//          // Assuming res.data.productList is an array of products
//       setProducts((prevProducts) => [...prevProducts, ...res.data.productList]);
//       setLoading(false);
//        setProductsCtg((prevProductsCtg) => [...prevProductsCtg, ...res.data.productList]);
//         //console.log("Productctg is :::::", productsCtg);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log("Products api call error", error);
//       });
//       //console.log(products);

//   }, [page]);

//   const searchProduct = (text) => {
//     setProductFiltered(
//       products.filter((item) => {
//         const itemName = item.book_Title.toLowerCase();
//         const searchText = text.toLowerCase();
//         return itemName.includes(searchText);
//       })
//     );
//   };

//   const openList = () => {
//     setFocus(true);
//   };

//   const onBlur = () => {
//     setFocus(false);
//   };

//   const changeCtg = (ctg) => {
//     ctg === "all"
//       ? setProductsCtg(initialState)
//       : setProductsCtg(products.filter((i) => i.category._id === ctg));
//     setActive(true);
//   };

//   const handleLoadMore = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   return (
//     <Container>
//       <View style={{ backgroundColor: "white" }}>
//         <View style={{ width: width }}>
//           <VStack my={4} space={5} w="90%" divider={<Box px={2}><Divider /></Box>}>
//             <VStack w="95%" space={5} alignSelf="center">
//             <Input
//        onChangeText={searchProduct}
//       placeholder="Search Here"
//        variant="filled"
//        width="100%"
//        borderRadius={10}
//        borderColor='black'
//        py={1}
//        px={2}
 
//   InputLeftElement={
  
//     <View style={styles.iconleft}>
//   <Icon

//     //ml="20"
//     size={20} // Change the value to a number instead of a string
//     color="gray"
    
//     name="search"
//     // as={<Ionicons name="ios-search" />}
//   />
//   </View>
//   } 
//       InputRightElement={
//         focus ? (
//           <View style={styles.iconright}>
//           <Icon
          
//             onPress={onBlur}
//             name="times-circle"
//             size={25}
//             color="gray"
//           />
//           </View>
//         ) : null
//       }
//       onFocus={openList}
//     />
//             </VStack>
//           </VStack>
//         </View>

//         <View style={{ marginLeft: 346, marginTop: -60, marginBottom: 10, padding: 10, width: width }}>
//         <PriceFilter updateBookList={setProductsCtg} />
//         </View>

//         {focus == true ? (
//           <SearchedProduct navigation={props.navigation} productsFiltered={productFiltered} />
//         ) : (
//           <View style={styles.scrollContainer}>
//             <ScrollView style={{ marginBottom: 80, padding: 5, width: width }}>
//               <View>
//                 <View>
//                   <Banner />
//                 </View>
//                 <View>
//                   <CategoryFilter
//                     categories={categories}
//                     categoryFilter={changeCtg}
//                     productsCtg={productsCtg}
//                     active={active}
//                     setActive={setActive}
//                   />
//                 </View>
//                 <View>
//                 <FlatList
//                 contentContainerStyle={styles.listContainer}
//                   data={productsCtg}
//                  // keyExtractor={(item) => item._id.toString()} 
//                   renderItem={({ item }) => (
//                     <ProductList navigation={props.navigation}
//                     // key={item._id}
//                        item={item} />
//                   )}
                 
//                   ListFooterComponent={loading ? <ActivityIndicator size="large" color="#a0e1eb" 
//                   alignSelf="center"
//                   /> : null}
//                   onEndReached={handleLoadMore}
//                   onEndReachedThreshold={0.1}
//                 />
               
//                </View>


//               </View>
//             </ScrollView>
//           </View>
//         )}
//       </View>
//     </Container>
//   );
// };




// const styles = StyleSheet.create({
//   listContainer: {
//    // height: height ,
//     flex: 1,
//      flexDirection: "row",
//      alignItems: "flex-start",
//    flexWrap: "wrap",
//     backgroundColor: "gainsboro",
//      width:width
//   },
//   center: {
//     // justifyContent: "center",
//     // alignItems: "center",
//   },
//   scrollContainer: {
//     //flex: 1,
//    width: "100%",
//    // height:height+1000,
//   },
//   iconleft:{
//     marginLeft:5,
//   },
//   iconright:{
//     marginRight:5,
//   }
// });

// export default ProductContainer;

















import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList, Dimensions, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Container, Header, Item, Input, Text } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import { baseURL } from "../../assets/common/baseUrl";
import axios from "axios";

import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProducts";
import Banner from "../../Shared/Banner";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceRangeFilter";
import { VStack, Divider, Box } from 'native-base';

var { width, height } = Dimensions.get("window");

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [productFiltered, setProductFiltered] = useState([]);
  const [active, setActive] = useState(-1); 

  const [focus, setFocus] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default category is "all"

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      axios
        .get(`${baseURL}categories/`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Categories api call error", error);
        });

      axios
        .get(`${baseURL}products/?page=1`)
        .then((res) => {
          setProducts(res.data.productList);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Products api call error", error);
        });

      return () => {
        // Cleanup if needed
      };
    }, [])
  );

  useEffect(() => {
    if (page > 1) {
      setLoading(true);
      axios
        .get(`${baseURL}products/?page=${page}`)
        .then((res) => {
          setProducts((prevProducts) => [...prevProducts, ...res.data.productList]);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Products api call error", error);
        });
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  //   const searchProduct = (text) => {
  //   setProductFiltered(
  //     products.filter((item) => {
  //       const itemName = item.book_Title.toLowerCase();
  //       const searchText = text.toLowerCase();
  //       return itemName.includes(searchText);
  //     })
  //   );
  // };

  const searchProduct = (text) => {
    // Convert the search text to lowercase for case-insensitive search
    const searchText = text.toLowerCase();

    axios.get(`${baseURL}products/get/admin/`)
    .then((res) => {
      //console.log("Response data:", res.data);
      const allProducts = res.data; // Use the entire array
  
      const filteredProducts = searchText
        ? allProducts.filter((item) => {
            const itemName = item.book_Title.toLowerCase();
            return itemName.includes(searchText);
          })
        : allProducts; // If searchText is not provided, don't apply filtering
      
      // console.log("Filtered products:", filteredProducts);
      setProductFiltered(filteredProducts);
      //setProducts(filteredProducts);
    })
    .catch((error) => {
      console.log("Products API call error:", error);
    });
  }







  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const changeCategory = (ctg) => {
    setSelectedCategory(ctg);
    // Fetch products based on the selected category
    if (ctg === "all") {
      axios
        .get(`${baseURL}products/?page=1`)
        .then((res) => {
          setProducts(res.data.productList);
        })
        .catch((error) => {
          console.log("Products api call error", error);
        });
    } else {
      axios
      .get(`${baseURL}products/?categories=${ctg}&page=1`)
      .then((res) => {
        setProducts(res.data.productList);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Products api call error", error);
        setLoading(false);
      });
    }
  };

  return (
    <Container>
     <View style={{ backgroundColor: "white" }}>
         <View style={{ width: width }}>
           <VStack my={4} space={5} w="90%" divider={<Box px={2}><Divider /></Box>}>
             <VStack w="95%" space={5} alignSelf="center">
            <Input
       onChangeText={searchProduct}
      placeholder="Search Here"
       variant="filled"
       width="100%"
       borderRadius={10}
       borderColor='black'
       py={1}
       px={2}
 
  InputLeftElement={
  
    <View style={styles.iconleft}>
  <Icon

    //ml="20"
    size={20} // Change the value to a number instead of a string
    color="gray"
    
    name="search"
    // as={<Ionicons name="ios-search" />}
  />
  </View>
  } 
      InputRightElement={
        focus ? (
          <View style={styles.iconright}>
          <Icon
          
            onPress={onBlur}
            name="times-circle"
            size={25}
            color="gray"
          />
          </View>
        ) : null
      }
      onFocus={openList}
    />
            </VStack>
          </VStack>
        </View>

        <View style={{ marginLeft: 346, marginTop: -60, marginBottom: 10, padding: 10, width: width }}>
        <PriceFilter updateBookList={setProducts} />
        </View>
             {focus == true ? (
          <SearchedProduct navigation={props.navigation} productsFiltered={productFiltered} />
        ) : (
          <>
          <View style={styles.scrollContainer}>
            <ScrollView style={{ marginBottom: 80, padding: 5, width: width }}>
             
                <View>
                  <Banner />
                </View>

      {/* Category filter */}
      {/* <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <Text
            key={category._id}
            style={[
              styles.categoryText,
              selectedCategory === category._id && styles.selectedCategoryText,
            ]}
            onPress={() => changeCategory(category._id)}
          >
            {category.name}
          </Text>
        ))}
      </View> */}




<View style={styles.categoriesContainer}>
        <CategoryFilter
          categories={categories} // Pass the categories array
          active={active}
          setActive={setActive}
          categoryFilter={changeCategory} // Pass the categoryFilter function
        />
      </View>


      {/* Product list */}
      <FlatList
        contentContainerStyle={styles.listContainer}
        data={products}
        renderItem={({ item }) => (
          <ProductList navigation={props.navigation} item={item} />
        )}
        ListFooterComponent={loading ? (
          <ActivityIndicator size="large" color="#a0e1eb" alignSelf="center" />
        ) : null}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
      />
      </ScrollView>
      </View>
      </>
      
      )}
    
      
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    // paddingVertical: 10,
    // paddingHorizontal:60,
  },
  // categoryText: {
  //   fontWeight: "bold",
  //   fontSize: 16,
  //   color: "gray",
  // },
  // selectedCategoryText: {
  //   color: "black",
  // },
  listContainer: {
   // height: height ,
    flex: 1,
     flexDirection: "row",
     alignItems: "flex-start",
   flexWrap: "wrap",
    backgroundColor: "gainsboro",
     width:width
  },
  center: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  scrollContainer: {
    //flex: 1,
   width: "100%",
   // height:height+1000,
  },
  iconleft:{
    marginLeft:5,
  },
  iconright:{
    marginRight:5,
  }
});


export default ProductContainer;

