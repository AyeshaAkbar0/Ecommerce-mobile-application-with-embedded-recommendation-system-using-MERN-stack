import React from 'react';
import { TouchableOpacity, View, Text,Dimensions } from 'react-native';
import ProductCard from './ProductCard';

var {width, height}= Dimensions.get('window');
const ProductList=(props)=>{
    const {item }=props;
  //  console.log('Item is ::::::::::;;;', item);
    return(
        <TouchableOpacity 
        
        onPress={()=>
        
          props.navigation.navigate('Product Detail', {item:item})
        }
        style={{width:'50%', height:height/2.5}}>
          <View style={{width:width/2, backgroundColor:'gainsboro'}}>
        <ProductCard {...item} ></ProductCard>
          </View>
        </TouchableOpacity>
    )
}
export default ProductList;