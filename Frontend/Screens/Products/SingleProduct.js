// import React, {useState, useEffect}from 'react'
// import { Image,View, StyleSheet, Text, ScrollView, Button } from 'react-native'
// import { Left, Right, Container, H1 } from 'native-base'
// import * as actions from "../../Redux/Actions/cartActions";

// import  {Toast}  from 'react-native-toast-message/lib/src/Toast'
// import { connect } from 'react-redux'

// const SingleProduct =(props)=>{
//     const [item, setItem]= useState(props.route.params.item)
//     const[availability, setAvailability ]= useState('')
//     return(
//         <Container style={styles.containter}>
//             <ScrollView style={{marginBottom:80, padding:5}}>
//                 <View>
//                     <Image
//                     source={{
//                         uri:item.image? item.image : "https://m.media-amazon.com/images/I/41UG6tNeHBL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg"
//                     }}
//                     resizeMode='contain'
//                     style={styles.image}>

//                     </Image>

//                 </View>
//                 <View style={styles.contentContainer}>
//                     {/* <H1 style={styles.contentHeader}>{item.book_Title}</H1> */}
//                     <Text style={styles.contentText}>{item.Book_Author}</Text>
//                 </View>
//             </ScrollView>
//             <View style={styles.bottomContainer}>
//                 <Left>
//                     <Text style={styles.price}>
//                         {item.price}
//                     </Text>
//                 </Left>
//                 <Right>
//                     <Button title='ADD'  onPress={() => {
//               props.addItemToCart(item),
//                 Toast.show({
//                   topOffset: 60,
//                   type: "success",
//                   text1: `${item.book_Title} added to card`,
//                   text2: "GO to your card to compleat order",
//                 });
//             }}
// >

//                     </Button>
//                 </Right>
//             </View>

//         </Container>
//     )
// }
// const mapDispatchToProps = (dispatch) => {
//     return {
//       addItemToCart: (product) =>
//         dispatch(actions.addToCart({ quantity: 1, product })),
//     };
//   };
  
  
// const styles= StyleSheet.create({
//     containter:{
//         position:'relative',
//         height:'100%'
//     },
//     imagecontainer:{
//         backgroundColor:'white',
//         padding:0,
//         margin:0

//     },
//     image:{
//     width: '100%',
//     height:250
//     },
//     contentContainer:{
//         marginTop:20,
//         justifyContent:'center',
//         alignItems:'center'
//     },
//     contentHeader:{
//         fontWeight:'bold',
//         marginBottom:20
//     },
//     contentText:{
//         fontSize:18,
//         fontWeight:'bold',
//         marginBottom:20
//     },
//     bottomContainer:{
//         flexDirection:'row',
//         position:'absolute',
//         bottom:0,
//         left:0,
//         backgroundColor:'white'
//     },
//     price:{
//         fontSize:24,
//         margin:20,
//         color:'red'
//     },
//     button:{
//         left:30,
//         margin:20
//     }
// })
// export default connect(null, mapDispatchToProps)(SingleProduct);




//Working
// import React, { useState, useEffect } from 'react';
// import { Image, View, StyleSheet, Text, ScrollView,Dimensions, Button } from 'react-native';
// import { Container, H1 } from 'native-base';
// import Toast  from 'react-native-toast-message';
// import { connect } from 'react-redux';
// import * as actions from '../../Redux/Actions/cartActions';
// import EasyButton from '../../Shared/StyledComponents/EasyButton';
// import TrafficLight from '../../Shared/StyledComponents/TrafficLight';

// var {width}= Dimensions.get('window')

// const SingleProduct = ({ route, addItemToCart }) => {
//   const [item, setItem] = useState(route.params.item);
//   const [availability, setAvailability] = useState('');
//   const [availabilityText, setAvailabilityText] = useState("")

//   useEffect(()=>{
//     if(route.params.item.countInStock==0){
//         setAvailability(<TrafficLight  unavailable ></TrafficLight>);
//         setAvailabilityText("Unavailable");
//     }
//     else if(route.params.item.countInStock<=5){
//       setAvailability(<TrafficLight  limited ></TrafficLight>);
//         setAvailabilityText("Limited Stock");
//     }
//     else {
//       setAvailability(<TrafficLight  available ></TrafficLight>);
//         setAvailabilityText("Available");
//     }
//     return()=>{
//       setAvailability(null);
//       setAvailabilityText("");
//     }

//   },[])

//   return (
//     <Container style={styles.container}>
//        <View style={styles.scrollContainer}>
//       <ScrollView style={[styles.ScrollView,{ marginBottom: 80, padding: 5 }]}>
//         <View style={{marginTop:20,}}>
//           <Image
         
//             source={{
//               uri: item.image
//                 ? item.image
//                 : 'https://m.media-amazon.com/images/I/41UG6tNeHBL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
//             }}
//             resizeMode='contain'
//             style={styles.image}
//           />
//         </View>
//         <View style={styles.contentContainer}>
//           {/* <H1 style={styles.contentHeader}>{item.book_Title}</H1> */}
//           <Text style={[styles.contentContainer, {color:'black'}]} >{item.book_Title}</Text>
//           <Text style={[styles.contentText, {color:'black'}]}>{item.Book_Author}</Text>
//         </View>
//         <View style={styles.availabilityContainer}>
//           <View style={styles.availability}>
//             <Text>Availibity: {availabilityText}  </Text>
//             {availability}
//           </View>
//         </View>
//       </ScrollView>
//       </View>
//       <View style={styles.bottomContainer}>
//         <View style={styles.leftContainer}>
//           <Text style={styles.price}>${item.price}</Text>
//         </View>
//         <View style={styles.rightContainer}>
//           <EasyButton
//           primary medium
//             onPress={() => {
//               addItemToCart(item);
//               Toast.show({
//                 topOffset: 60,
//                 type: 'success',
//                 text1: `${item.book_Title} added to cart`,
//                 text2: 'Go to your cart to complete the order',
//               });
//             }
//         }
//           >
//             <Text style={{color:"white", fontWeight:"bold"}}>Add</Text>
//           </EasyButton>
//         </View>
//       </View>
//     </Container>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addItemToCart: (product) => dispatch(actions.addToCart({ quantity: 1, product })),
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//    // position: 'relative',
//    // height: '100%',
//    // width:"100%",
//     //position: 'relative',
//    height: '100%',
//     width: width,
//     alignItems: 'center', // Center horizontally
//     justifyContent: 'center', 
//   },
//   image: {
//     width: width,
//     height: 250,
//   },
//   scrollContainer: {
//     flex: 1,
//     width: "100%"
//   },
//   ScrollView:{
//     width: width,
//   },
//   contentContainer: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     //color:'#22222',
//     fontSize:25,
//     fontWeight:'bold'

//   },
//   contentHeader: {
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   contentText: {
//     fontSize: 18,
//     // fontWeight: 'bold',

//     marginBottom: 20,
//   },
//   bottomContainer: {
//     flex:1,
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right:0,
//     // backgroundColor: '#FCF5EF',
//     backgroundColor:"white",
//     width:width,
   
  
//   },
//   leftContainer: {
//     flex: 1/2,
//     marginLeft:50,
//     margin: 5,
//   },
//   rightContainer: {
//     flex: 1/2,
//     marginLeft:50,
//     margin: 5,
//   },
//   price: {
//     fontSize: 24,
//     marginRight:60,
//     marginTop:8,
//     color: 'black',
//   },
//   availabilityContainer: {
//    // marginBottom: 20,
//     alignItems: "center",
//   },
//   availability: {
//     flexDirection: "row",
//   //  marginBottom: 5,
//    // fontVariant:'arial'
//   },
// });

// export default connect(null, mapDispatchToProps)(SingleProduct);



//Mine Updated One Now 

// import React, { useState, useEffect } from 'react';
// import { Image, View, StyleSheet, ScrollView,Text,Dimensions, Button,TouchableOpacity } from 'react-native';
// import { Container, H1 } from 'native-base';
// import axios from 'axios';
// import Toast  from 'react-native-toast-message';
// import { connect } from 'react-redux';
// import * as actions from '../../Redux/Actions/cartActions';
// import EasyButton from '../../Shared/StyledComponents/EasyButton';
// import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
// import {useNavigation} from "@react-navigation/native";
// import { useRoute } from '@react-navigation/native';
// import { baseURL } from '../../assets/common/baseUrl';
 
// var {width}= Dimensions.get('window')

// const SingleProduct = ({route,  addItemToCart }) => {



 
//   const [item, setItem] = useState(route.params.item);
//   console.log('Result is coming is this ', item);
//   const [availability, setAvailability] = useState('');
//   const [availabilityText, setAvailabilityText] = useState("");
//   const [recommendations,setRecommendations]=useState([]);
//   const navigation = useNavigation();

//   useEffect(()=>{
//     if(route.params.item.inStock==0){
//         setAvailability(<TrafficLight  unavailable ></TrafficLight>);
//         setAvailabilityText("Unavailable");
//     }
//     else if(route.params.item.countInStock<=5){
//       setAvailability(<TrafficLight  limited ></TrafficLight>);
//         setAvailabilityText("Limited Stock");
//     }
//     else {
//       setAvailability(<TrafficLight  available ></TrafficLight>);
//         setAvailabilityText("Available");
//     }
//     return()=>{
//       setAvailability(null);
//       setAvailabilityText("");
//     }

//   },[item.book_Title ])

//   useEffect(() => {

//     setItem(route.params.item);
//     // Make the Flask API call to get book recommendations
//     axios.get(`https://9d2f-111-68-96-41.ngrok-free.app/recommend_books/${item.book_Title}`)
//       .then((res) => {
//         console.log("Recommendations API response:", res); 
//         console.log("successfully");
//         // Update the recommendations state with the received data
//         setRecommendations(res.data.recommendations);
//       })
//       .catch((error) => {
//         console.log('Error retrieving recommendations:', error);
//         console.log('Full error object:', error);
//       });
//   }, [item.book_Title]);

//   // const handleRecommendationPress = (recommendation) => {
//   //   // Pass the entire book data as the route param
//   //   navigation.navigate('NewComp', { item: recommendation });
//   // };

//   const handleRecommendationPress = (recommendation) => {
//     // Fetch the details for the new book using the recommendation's title
//     axios
//       .get(`${baseURL}products/title/${recommendation.title}`)
//       .then((response) => {
//         // Update the book data with the new book details
//         setItem(response.data);
//       })
//       .catch((error) => {
//         console.log('Error fetching book details:', error);
//       });
//   };


//   return (
//     <View style={styles.container}>
//       <ScrollView>
//        <View style={styles.scrollContainer}>
//       {/* <ScrollView style={[styles.ScrollView,{ marginBottom: 80, padding: 5 }]}> */}
//         <View style={{marginTop:10}}>
//           <Image
         
//             source={{
//               uri: item.image
//                 ? item.image
//                 : 'https://m.media-amazon.com/images/I/41UG6tNeHBL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
//             }}
//             resizeMode='contain'
//             style={styles.image}
//           />
//         </View>
//         <View 
        
//      style={styles.contentContainer}
//         >
//         <View
//          style={{ alignItems: 'center' }}
//          >
//           {/* <H1 style={styles.contentHeader}>{item.book_Title}</H1> */}
//           <Text
//           style={ {color:'black',fontSize:18, fontWeigt:"bold"}} 
//            >{item.book_Title}</Text>
//           <Text style={[styles.contentText, {color:'black'}]}>{item.Book_Author}</Text>
//         </View>
//         </View>
//         <View 
//        style={styles.availabilityContainer}
//         >
//           <View
//            style={styles.availability}
//            >
//             <Text style={{color:"black", fontSize:15}}>Availibity: {availabilityText}  </Text>
            
//             {availability}
           
//           </View>
//           <Text></Text>

//         </View>
//      {/* </ScrollView> */}
//       </View  >

   

      
       
        
//         {recommendations.length > 0 && (
//           <View 
//           style={[styles.recommendationsContainer]}
//           >
//             <Text style={styles.recommendationsHeading}>Recommended Books:</Text>
//             <ScrollView horizontal={true}>
//               {recommendations.map((recommendation) => (
             
//                 <TouchableOpacity

//                   style={styles.recommendationBox}
//                   onPress={() => handleRecommendationPress(recommendation)}
//                   key={recommendation.title}
//                 >
//                  {<Image source={{ uri: recommendation.thumbnail }} style={styles.recommendationImage} />}
//                   <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView> 
//           </View>
//         )}
     
//               </ScrollView>




      
//       <View style={styles.bottomContainer}>
//         <View style={styles.leftContainer}>
//           <Text style={styles.price}>${item.price}</Text>
//         </View>
//         <View style={styles.rightContainer}>
//           <EasyButton
//           primary medium
//             onPress={() => {
//               addItemToCart(item);
//               Toast.show({
//                 topOffset: 60,
//                 type: 'success',
//                 text1: `${item.book_Title} added to cart`,
//                 text2: 'Go to your cart to complete the order',
//               });
//             }
//         }
//           >
//             <Text style={{color:"white", fontWeight:"bold"}}>Add</Text>
//           </EasyButton>
//         </View>
//       </View>
    
      
//     </View>
//   );
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addItemToCart: (product) => dispatch(actions.addToCart({ quantity: 1, product })),
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//    // position: 'relative',
//    // height: '100%',
//   // backgroundColor:"green",
//     //position: 'relative',
//    height: '100%',
//     width: width,
//     alignItems: 'center', // Center horizontally
//    justifyContent: 'center', 
//   },
//   image: {
//     width: width,
//     height: 230,
//   },
//   scrollContainer: {
//     // flex: 1,
//     // width: "100%",
//     // length:"80%",
//    // background:"green"
//   },
//   ScrollView:{
//     width: width,
//   },
//   contentContainer: {
//     marginTop: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//    // color:'#22222',
//     fontSize:25,
//     fontWeight:'bold'

//   },
//   contentHeader: {
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   contentText: {
//     fontSize: 16,
//     fontWeight:"bold",
//     // fontWeight: 'bold',
//     justifyContent:"center",
//     alighSelf:'center',

//     //marginBottom: 5,
//   },
//   bottomContainer: {
//     //flex:1,
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right:0,
//     // backgroundColor: '#FCF5EF',
//     backgroundColor:"white",
//     width:width,
   
  
//   },
//   leftContainer: {
//     flex: 1/2,
//     marginLeft:50,
//     margin: 5,
//   },
//   rightContainer: {
//     flex: 1/2,
//     marginLeft:50,
//     margin: 5,
//   },
//   price: {
//     fontSize: 24,
//     marginRight:60,
//     marginTop:8,
//     color: 'black',
//   },
//   availabilityContainer: {
//   //
//   marginTop:1,
//  // marginBottom: 20,
//     alignItems: "center",
    
//   },
//   availability: {
//     flexDirection: "row",
//    //marginBottom: 5,
//   //  fontVariant:'arial'
//   },
//   recommendationsContainer: {

//   // marginTop:120,
//     marginBottom:100,
//     paddingHorizontal: 10,
//   // backgroundColor:'green'
//   },
//   recommendationsHeading: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     //marginTop: 200,
//     marginBottom:10,
//     color:'#D84339'
//   },
//   recommendationBox: {
//     marginRight: 10,
//    width: 150,
//     height: 180,
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 5,
//     color:"green",
//     overflow: 'hidden',
//   },
//   recommendationImage: {
//     width: '90%',
//     height: '90%',
//     resizeMode: 'cover',
//   },
//   recommendationTitle:{
//     fontWeight:"bold",
//     color:"black",
//     fontSize:15,

//   }
//   // recommendationTitle: {
//   //   textAlign: 'center',
//   //   fontSize: 14,
//   //   fontWeight: 'bold',
//   //   marginTop: 5,
//   //   marginBottom:30,
//   // },
  
// });

// export default connect(null, mapDispatchToProps)(SingleProduct);












import React, { useState, useEffect, useContext } from 'react';
import { Image, View, StyleSheet, ScrollView,Text,Dimensions, Button,TouchableOpacity } from 'react-native';

import { Container, H1 } from 'native-base';
import axios from 'axios';
import Toast  from 'react-native-toast-message';
import { connect } from 'react-redux';
import * as actions from '../../Redux/Actions/cartActions';
import EasyButton from '../../Shared/StyledComponents/EasyButton';
import TrafficLight from '../../Shared/StyledComponents/TrafficLight';
import {useNavigation} from "@react-navigation/native";
import { useRoute } from '@react-navigation/native';
import { baseURL } from '../../assets/common/baseUrl';
import AuthGlobal from '../../Context/store/AuthGlobal';
import StarRating from 'react-native-star-rating';

 
var {width, height}= Dimensions.get('screen')

// // const SingleProduct = ({ route, addItemToCart }) => {
// //   const { item: initialItem } = route.params; // Initial book data passed from product card

// //   const [item, setItem] = useState(initialItem);
// //   console.log('Initial item:', item);

// //   const [availability, setAvailability] = useState('');
// //   const [availabilityText, setAvailabilityText] = useState('');
// //   const [recommendations, setRecommendations] = useState([]);
// //   const navigation = useNavigation();
// const SingleProduct = ({ route, addItemToCart }) => {
//   const { item: initialItem } = route.params; // Initial book data passed from product card

//   const [item, setItem] = useState(initialItem);
//   console.log('Initial item:', item);

//   const [availability, setAvailability] = useState('');
//   const [availabilityText, setAvailabilityText] = useState('');
//   const [recommendations, setRecommendations] = useState([]);
//   const navigation = useNavigation();
  

//   useEffect(() => {
//     if (initialItem.inStock === 0) {
//       setAvailability(<TrafficLight unavailable />);
//       setAvailabilityText('Unavailable');
//     } else if (initialItem.countInStock <= 5) {
//       setAvailability(<TrafficLight limited />);
//       setAvailabilityText('Limited Stock');
//     } else {
//       setAvailability(<TrafficLight available />);
//       setAvailabilityText('Available');
//     }
//     return () => {
//       setAvailability(null);
//       setAvailabilityText('');
//     };
//   }, [initialItem.book_Title]);

//   useEffect(() => {
//     // Make the API call to get book recommendations for the initial book
//     axios
//       .get(`https://1ab1-111-68-96-41.ngrok-free.app/recommend_books/${initialItem.book_Title}`)
//       .then((res) => {
//         console.log('Recommendations API response:', res);
//         // Update the recommendations state with the received data
//         setRecommendations(res.data.recommendations);
//       })
//       .catch((error) => {
//         console.log('Error retrieving recommendations:', error);
//         console.log('Full error object:', error);
//       });
//   }, [initialItem.book_Title]);

//   const handleRecommendationPress = (recommendation) => {
//     // Fetch the details for the new book using the recommendation's title
//     axios
//       .get(`${baseURL}products/title/${recommendation.title}`)
//       .then((response) => {
//         // Update the book data with the new book details
//         setItem(response.data);
//         // Call the recommendation API for the new book
//         axios
//           .get(`https://1ab1-111-68-96-41.ngrok-free.app/recommend_books/${response.data.book_Title}`)
//           .then((res) => {
//             console.log('Recommendations API response:', res);
//             // Update the recommendations state with the received data
//             setRecommendations(res.data.recommendations);
//           })
//           .catch((error) => {
//             console.log('Error retrieving recommendations:', error);
//             console.log('Full error object:', error);
//           });
//       })
//       .catch((error) => {
//         console.log('Error fetching book details:', error);
//       });
//   };


const SingleProduct = ({ route, addItemToCart }) => {
  const { item: initialItem } = route.params;
  const [expanded, setExpanded] = useState(false);
  const context = useContext(AuthGlobal);

  const isAdmin = context.stateUser.user.isAdmin;
  
  

  const [item, setItem] = useState(initialItem);
  console.log('Initial item:', item);

  const [availability, setAvailability] = useState('');
  const [availabilityText, setAvailabilityText] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  //new add
  const [averageRating, setAverageRating] = useState(0); // State for average rating

  //new line add
  const [totalRatings, setTotalRatings] = useState(0);




  const navigation = useNavigation();
  //add new line 
 
  console.log("stateUser", context.stateUser)
  const userId= context.stateUser.user.userId;
  console.log("UserId",userId)




  const toggleDescription = () => {
    setExpanded(!expanded);
  };




  
  const handleAddToCart = () => {
    if (context.stateUser.isAuthenticated) {
      addItemToCart(userId, item);
      Toast.show({
        topOffset: 60,
        type: 'success',
        text1: `${item.book_Title} added to cart`,
        text2: 'Go to your cart to complete the order',
        
      });
    } else {
      navigation.navigate('User', { screen: 'Login' });
    }
  };

  useEffect(() => {
    if (initialItem.inStock === 0) {
      setAvailability(<TrafficLight unavailable />);
      setAvailabilityText('Unavailable');
    } else if (initialItem.inStock <= 5) {
      setAvailability(<TrafficLight limited />);
      setAvailabilityText('Limited Stock');
    } else {
      setAvailability(<TrafficLight available />);
      setAvailabilityText('Available');
    }
    return () => {
      setAvailability(null);
      setAvailabilityText('');
    };
  }, [initialItem.book_Title]);

  const fetchRecommendedBooks = (bookTitle) => {
    axios
      .get(`https://30a5-182-191-144-187.ngrok-free.app/recommend_books/${bookTitle}`)
      .then((res) => {
        console.log('Recommendations API response:', res);
        setRecommendations(res.data.recommendations);
      })
      .catch((error) => {
        console.log('Error retrieving recommendations:', error);
        console.log('Full error object:', error);
      });
  };

  useEffect(() => {
    // Fetch the initial recommended books for the initial book
    fetchRecommendedBooks(initialItem.book_Title);

    //new addnow
    fetchAverageRating(initialItem._id); // Fetch average rating

    //new add
    fetchTotalRatings(initialItem._id);
  }, [initialItem.book_Title]);

  const fetchTotalRatings = (bookId) => {
    axios
      .get(`${baseURL}Rate/totalRatings/${bookId}`)
      .then((res) => {
        setTotalRatings(res.data.totalRatings); // Update the state with the total number of ratings
      })
      .catch((error) => {
        console.log('Error retrieving total ratings:', error);
      });
  };
  
  //new function now 
  const fetchAverageRating = (bookId) => {
    axios
      .get(`${baseURL}Rate/averageRating/${bookId}`)
      .then((res) => {
        console.log('Average Rating API response:', res);
        setAverageRating(res.data.averageRating); // Set the average rating state
      })
      .catch((error) => {
        console.log('Error retrieving average rating:', error);
        console.log('Full error object:', error);
      });
  };

  const handleRecommendationPress = (recommendation) => {
    // Fetch the details for the new book using the recommendation's title
    axios
      .get(`${baseURL}products/title/${recommendation.title}`)
      .then((response) => {
        // Update the book data with the new book details
        setItem(response.data);
        // Fetch the new recommended books for the new book
        fetchRecommendedBooks(response.data.book_Title);
        const data = response.data.book_Title;
        console.log('1st    AZios : ', data);
      })
      .catch((error) => {
        console.log('Error fetching book details:', error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView     style={styles.scrollContainer}>
       {/* <View style={styles.scrollContainer}> */}
      {/* <ScrollView style={[styles.ScrollView,{ marginBottom: 80, padding: 5 }]}> */}
        <View style={{marginTop:10}}>
          <Image
         
            source={{
              uri: item.image
                ? item.image
                : 'https://m.media-amazon.com/images/I/41UG6tNeHBL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
            }}
            resizeMode='contain'
            style={styles.image}
          />
        </View>
        <View 
        
     style={styles.contentContainer}
        >
        <View
         style={{ alignItems: 'center' }}
         >
          {/* <H1 style={styles.contentHeader}>{item.book_Title}</H1> */}
          <Text
          style={ {color:'black',fontSize:18, fontWeight:"bold"}} 
           >{item.book_Title}</Text>
          <Text style={[styles.contentText, {color:'black'}]}>{item.Book_Author}</Text>
        </View>
        </View>
     
  
      {/* </View  > */}
      <View style={styles.avgrating}>
        <View style={styles.both}>
        
      <StarRating
              disabled={true}
              maxStars={5}
              rating={averageRating} // Use the average rating state here
              starSize={13}
              fullStarColor={'orange'}
            />
            <Text style={{marginTop:-4, }}> ({averageRating})</Text>
            </View>
            
            </View>
            
      <View 
       style={styles.availabilityContainer}
        >
          <View
           style={styles.availability}
           >
            <Text style={{color:"black", fontSize:14, fontWeight:"bold"}}>{availabilityText}  </Text>
            {availability}
             </View>
          <TouchableOpacity
  onPress={() => navigation.navigate("Reviews", { item: item })}
>
  <Text style={{left:287, color:"#BD7423",marginTop:-19, fontWeight:"bold" }}>Reviews({totalRatings})</Text>
</TouchableOpacity>
<View style={{ alignContent:"flex-start",left:3, }}>
<Text style={{ color:"black", fontWeight:"bold"}}>No of Pages:{item.num_pages}</Text>
</View>

        </View>

      <View>
      <Text style={{ color: 'black', fontWeight: 'bold', fontSize:16, marginLeft:3, }}>Description:</Text>
      {expanded ? (
        
        <Text style={{margin:5,}}>{item.description}</Text>
      ) : (
        <Text style={{margin:5,}} numberOfLines={2}>{item.description}</Text>
      )}
      <TouchableOpacity onPress={toggleDescription}>
        <Text style={{ color: 'black', marginLeft:5,
      marginBottom:10, }}>{expanded ? 'Read Less' : 'Read More'}</Text>
      </TouchableOpacity>
    </View>
       
        
        {recommendations.length > 0 && (
          <View 
          style={[styles.recommendationsContainer]}
          >
            <Text style={styles.recommendationsHeading}>Recommended Books:</Text>
            <ScrollView horizontal={true}>
              {recommendations.map((recommendation) => (
             
                <TouchableOpacity

                  style={styles.recommendationBox}
                  onPress={() => handleRecommendationPress(recommendation)}
                  key={recommendation.title}
                >
                 {<Image source={{ uri: recommendation.thumbnail }} style={styles.recommendationImage} />}
                  <Text style={styles.recommendationTitle}>{recommendation.title}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView> 
          </View>
        )}
     
              </ScrollView>




      
      <View style={styles.bottomContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <View style={styles.rightContainer}>
          {/* <EasyButton
          primary medium
            onPress={() => {
              addItemToCart(userId,item);
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: `${item.book_Title} added to cart`,
                text2: 'Go to your cart to complete the order',
              });
            }
        }
          >
            <Text style={{color:"white", fontWeight:"bold"}}>Add</Text>
          </EasyButton> */}
           {!isAdmin && (
              <>
           {item.inStock>0?(

           <EasyButton primary medium onPress={handleAddToCart}>
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Add</Text>
          </EasyButton>
           ):null}
           </>
            )}
        </View>
      </View>
    
      
    </View>
  );
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addItemToCart: (product) => dispatch(actions.addToCart({ quantity: 1, product })),
//   };
// };

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

const styles = StyleSheet.create({
  avgrating:{
   // backgroundColor:"green",
    width:"9%",
    left:290,
    top:-270,

  },
  both:{
    flexDirection:"row"

  },
  container: {
   // position: 'relative',
    height: '100%',
    padding:4,
   backgroundColor:"white",
    //position: 'relative',
  // height :height,
    width: width,
   // alignItems: 'center', // Center horizontally
   //justifyContent: 'center', 
  },
  image: {
    width: width,
    height: 230,
  },
  scrollContainer: {
    // flex: 1,
    // width: "100%",
    // length:"80%",
   // background:"green"
  },
  ScrollView:{
    width: width,
  },
  contentContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
   // color:'#22222',
    fontSize:25,
    fontWeight:'bold'

  },
  contentHeader: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  contentText: {
    fontSize: 16,
    //fontWeight:"bold",
    // fontWeight: 'bold',
    justifyContent:"center",
    alighSelf:'center',

    //marginBottom: 5,
  },
  bottomContainer: {
    //flex:1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    // backgroundColor: '#FCF5EF',
    backgroundColor:"white",
    width:width,
   
  
  },
  leftContainer: {
    flex: 1/2,
    marginLeft:50,
    margin: 5,
  },
  rightContainer: {
    flex: 1/2,
    marginLeft:50,
    margin: 5,
  },
  price: {
    fontSize: 24,
    marginRight:60,
    marginTop:8,
    color: 'black',
  },
  availabilityContainer: {
  //
  marginTop:1,
 // backgroundColor:"green"
 // marginBottom: 20,
   // alignItems: "center",
    
  },
  availability: {
    flexDirection: "row",
    marginLeft:3,
  // marginRight:2,
   //marginBottom: 5,
  //  fontVariant:'arial'
  },
  recommendationsContainer: {

  // marginTop:120,
    marginBottom:80,
    paddingHorizontal: 10,
  // backgroundColor:'green'
  },
  recommendationsHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    //marginTop: 200,
    marginBottom:10,
    color:'#D84339',
    marginTop:4,
    marginLeft:-2,
  },
  recommendationBox: {
    marginRight: 10,

   width: 150,
    height: 240,
    borderWidth: 3,
    borderColor: '#ddd',
    borderRadius: 5,
    color:"green",
    overflow: 'hidden',
   // marginBottom:16,
  },
  recommendationImage: {
    alignSelf:"center",
    width: '90%',
    height: '80%',
    resizeMode: 'cover',
    marginTop:5,
  },
  recommendationTitle:{
    alignSelf:"center",
    fontWeight:"bold",
    color:"black",
    fontSize:15,
    marginTop:5
   // marginBottom:0,

  }
  // recommendationTitle: {
  //   textAlign: 'center',
  //   fontSize: 14,
  //   fontWeight: 'bold',
  //   marginTop: 5,
  //   marginBottom:30,
  // },
  
});

export default connect(null, mapDispatchToProps)(SingleProduct);