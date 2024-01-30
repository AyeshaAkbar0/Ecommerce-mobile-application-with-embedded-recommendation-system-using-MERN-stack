// import AsyncStorage from "@react-native-async-storage/async-storage";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Dimensions,
//   TextInput,
//   StyleSheet,
//   Alert
// } from "react-native";
// import { baseURL } from "../../assets/common/baseUrl";
// import EasyButton from "../../Shared/StyledComponents/EasyButton";

// var { width } = Dimensions.get("window");

// const Item = (props) => {
//   return (
//     <View style={styles.item}>
//       <Text style={{color:"black", fontSize:18, fontWeight:"bold"}}>{props.item.name}</Text>
//       <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
//         <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
//       </EasyButton>
//     </View>
//   );
// };


// const Categories = (props) => {
//   const [categories, setCategories] = useState([]);
//   const [categoryName, setCategoryName] = useState();
//   const [token, setToken] = useState();

//   useEffect(() => {
//     AsyncStorage.getItem("jwt")
//       .then((res) => {
//         setToken(res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     axios
//       .get(`${baseURL}categories/`)
//       .then((res) => {
//         setCategories(res.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     return () => {
//       setCategories();
//       setToken();
//     };
//   }, [deleteCategory]);

//   const addCategory = () => {
//     const category = {
//       name: categoryName,
//     };

//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     axios
//       .post(`${baseURL}categories/`, category, config)
//       .then((res) => {
//         console.log(res);
//         setCategories([...categories, res.data]);
//       })
//       .catch((error) => {
//         console.log(error);
//         alert("Error to load categories");
//       });

//     setCategoryName("");
//   };

//   const deleteCategory = (id) => {
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     };
//     axios
//     .delete(`${baseURL}categories/${id}`, config)
//     .then((res) => {
//       const updatedCategories = categories.filter((item) => item._id !== id);
//       setCategories(updatedCategories);
//     })
//     .catch((error) => {
//       console.log(error);
//       if (error.response) {
//         console.log("Response data:", error.response.data);
//         console.log("Response status:", error.response.status);
//         console.log("Response headers:", error.response.headers);
//       } else if (error.request) {
//         console.log("Request error:", error.request);
//       } else {
//         console.log("Error:", error.message);
//       }
//       alert("Error deleting category. Please try again.");
//     });
// };

//   return (
//     <View style={{ position: "relative", height: "100%", backgroundColor:"white" }}>
//       <View style={{ marginBottom: 60 }}>
//         <FlatList
//           data={categories}
//           renderItem={({ item, index }) => (
//             <Item item={item} index={index} delete={deleteCategory} />
//           )}
//         //   keyExtractor={(item) => item.id}
//         keyExtractor={(item) => item._id}
//         />
//       </View>
//       <View style={styles.bottomBar}>
//         <View>
//           <Text style={{fontWeight:"bold", color:"black", fontSize:16,}}>Add Category : </Text>
//         </View>
//         <View style={{ width: width / 2.5 }}>
//           <TextInput
//             style={styles.input}
//             value={categoryName}
//             onChangeText={(text) => setCategoryName(text)}
//           />
//         </View>
//         <EasyButton medium primary onPress={() => addCategory()}>
//           <Text style={{ color: "white", fontWeight: "bold" }}>Submit</Text>
//         </EasyButton>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   bottomBar: {
//     backgroundColor: "gainsboro",
//     width: width,
//     height: 60,
//     padding: 2,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     backgroundColor:"white",
//     borderWidth: 1,
//   },
//   item: {
//     shadowColor: "black",
//     backgroundColor:"white",
//     shadowOffset: {
//       width: 4,
//       height: 2,
//     },
//     shadowOpacity: 0.5,
//     shadowRadius: 2,
//     elevation: 5,
//     padding: 5,
//     margin: 5,
//     borderStartColor: "white",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderRadius: 5,
//   },
// });
// export default Categories;














import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import { baseURL } from "../../assets/common/baseUrl";
import EasyButton from "../../Shared/StyledComponents/EasyButton";


var { width } = Dimensions.get("window");

const Categories = (props) => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${baseURL}categories/`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      setCategories([]);
      setToken(null);
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(`${baseURL}categories/`, category, config)
      .then((res) => {
        console.log(res);
        setCategories([...categories, res.data]);
      })
      .catch((error) => {
        console.log(error);
        alert("Error loading categories");
      });

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${baseURL}categories/${id}`, config)
      .then((res) => {
        const updatedCategories = categories.filter((item) => item._id !== id);
        setCategories(updatedCategories);
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
        } else if (error.request) {
          console.log("Request error:", error.request);
        } else {
          console.log("Error:", error.message);
        }
        alert("Error deleting category. Please try again.");
      });
  };

  const confirmDelete = (id, name) => {
    Alert.alert(
      "Confirm Delete",
      `Are you sure you want to delete the category "${name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => deleteCategory(id),
        },
      ]
    );
  };

  const Item = (props) => {
    return (
      <View style={styles.item}>
        <Text style={{ color: "black", fontSize: 18, fontWeight: "bold" }}>
          {props.item.name}
        </Text>
        <EasyButton
          danger
          medium
          onPress={() => confirmDelete(props.item._id, props.item.name)}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
        </EasyButton>
      </View>
    );
  };

  return (
    <View style={{ position: "relative", height: "100%", backgroundColor: "white" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item item={item} index={index} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View>
          <Text style={{ fontWeight: "bold", color: "black", fontSize: 16 }}>
          Category name:
          </Text>
        </View>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            style={styles.input}
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <EasyButton medium primary onPress={() => addCategory()}>
          <Text style={{ color: "white", fontWeight: "bold" }}>ADD</Text>
        </EasyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    bottomBar: {
      backgroundColor: "gainsboro",
      width: width,
      height: 60,
      padding: 2,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "absolute",
      bottom: 0,
      left: 0,
    },
    input: {
      height: 40,
      borderColor: "gray",
      backgroundColor:"white",
      borderWidth: 1,
    },
    item: {
      shadowColor: "black",
      backgroundColor:"white",
      shadowOffset: {
        width: 4,
        height: 2,
      },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 5,
      padding: 5,
      margin: 5,
      borderStartColor: "white",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 5,
    },
  });

export default Categories;
