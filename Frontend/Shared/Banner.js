import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";

import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://img.freepik.com/free-photo/close-up-open-book_23-2147872195.jpg?q=10&h=200",
      "https://st2.depositphotos.com/1008450/11130/i/600/depositphotos_111309458-stock-photo-at-the-book-shop.jpg",
      "https://readinggroups.org/assets/books-d1128e7a86c8a04a3bcccb7be5a3607934c5e432faacfe5c517e42b8ad7cdb19.jpg",
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View
        style={styles.container}
       >
        <View 
        style={styles.swiper}
        >
          <Swiper
            style={{ height: width /2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="cover"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width:width,
   // padding:10
    // width:'100%',
    // flexDirection:"row",
    // alignContent:"center",
    // justifyContent:"center",
    // padding:20,
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
   width: width - 40,
   //width:width,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});
export default Banner;
