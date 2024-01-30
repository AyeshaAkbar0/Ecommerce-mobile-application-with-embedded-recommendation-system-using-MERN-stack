// import React from 'react'
// import {View, StyleSheet}  from 'react-native'
// import{Left, Body, Content, ListItem, Thumbnail, Text } from 'native-base'

// const SearchedProducts= (props)=>{
//     const { productsFiltered }= props;
//     return(
//     <Content>
//     {productsFiltered.length> 0 ? (productsFiltered.map((item)=>{
//         return(
//        <ListItem 
//         key={item._id}
//         avatar
//         >
      
//        <Left>
//        <Thumbnail 
//        source={{uri:item.image}}
//        ></Thumbnail>
//        </Left>
//        <Body>
//         <Text>
//             {item.book_Title}
//         </Text>
//         <Text>
//             {item.Book_Author}
//         </Text>
//        </Body>
//        </ListItem>)
//     }))
// :
// (<View style={styles.container}>
//     <Text alignSelf={'center'}>
//       No products Matched
//     </Text>
// </View>)}
//     </Content>
//     );
// };
// const styles= StyleSheet.create({
//     container:{
//         justifyContent:'center',
//         alignItems:'center'    }
// })
// export default SearchedProducts;




// import React from "react";
// import { View, StyleSheet, Dimensions } from "react-native";
// import {
//   Content,
//   Left,
//   Body,
//   ListItem,
//   Thumbnail,
//   Text,
 
//   Container,
// } from "native-base";


// var {width}= Dimensions.get('window')

// const SearchedProduct = (props) => {
//   const { productsFiltered } = props;
//   return 
//   (
//     <Content >
//       {productsFiltered.length > 0 ? (
//         productsFiltered.map((item) => (
//           <
//             ListItem
//           onPress={()=>{
//             props.navigation.navigate('Product Detail', {item:item})
//           }}
//             key={item._id}
//             avatar
//           >
//             <Left>
//               <Thumbnail
//                 source={{
//                   uri: item.image
//                    }}
//               />
//             </Left>
//             <Body>
//               <Text>{item.book_Title}</Text>
//               <Text note>{item.Book_Author} </Text>
//             </Body>
//           </ListItem>
//         ))
//       ) : (
//         <View style={styles.center}>
//           <Text style={{ alignSelf: "center" }}>
//             No product match the selected criteria
//           </Text>
//         </View>
//       )}
//     </Content>
//   );
// };

// const styles = StyleSheet.create({
//   center: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
// export default SearchedProduct;


import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { Image, Text, Container } from 'native-base';

var { width } = Dimensions.get('window');

const SearchedProduct = (props) => {
  const { productsFiltered, navigation } = props;

  return (
    <ScrollView>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <TouchableOpacity
            key={item._id}
            onPress={() => {
              navigation.navigate('Product Detail', { item: item });
            }}
            style={styles.listItem}
          >
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.thumbnail}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.book_Title}</Text>
              <Text note style={styles.author}>
                {item.Book_Author}
              </Text>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ }}>No product matches the selected criteria</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  author: {
    fontSize: 12,
  },
  center: {
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default SearchedProduct;

