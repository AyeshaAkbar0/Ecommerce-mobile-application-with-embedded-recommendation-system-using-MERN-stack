//working
// import React,{useEffect, useState, useContext} from "react";
// import {View, Text, Button } from 'react-native'
// import { Item,Picker } from "native-base";
// import Icon from 'react-native-vector-icons/FontAwesome'
// import FormContainer from "../../../Shared/Form/FormContainer";
// import Input from "../../../Shared/Form/Input";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { connect } from "react-redux";
// import Toast from "react-native-toast-message";
// import{Select}  from 'native-base';
// import AuthGlobal from "../../../Context/store/AuthGlobal";
// const countries = require('../../../assets/data/countries.json');
// const Checkout =(props)=>{

//   const context = useContext(AuthGlobal)
//     const [orderItems, setOrderItems]= useState();
//     const [address, setAddress]= useState();
//     const [address2, setAddress2]= useState();
//     const [ zip, setZip]= useState();
//     const [country, setCountry]= useState(null);
//     const [phone, setPhone]= useState();
//     const [city, setCity]= useState();
//     const [ user, setUser ] = useState();

//     useEffect(()=>{
//         setOrderItems(props.cartItems)
//         if(context.stateUser.isAuthenticated) {
//           setUser(context.stateUser.user.userId)
//       } else {
//           props.navigation.navigate("Checkout");
//           Toast.show({
//               topOffset: 60,
//               type: "error",
//               text1: "Please Login to Checkout",
//               text1: "Please Login to Checkout",
//               text2: ""
//           });
//       }

//         return()=>{
//             setOrderItems();
//         }

//     },[])
//     const checkOut=()=>{
//         let order = {
//             country, city,
//             dateOrdered: Date.now(),
//             orderItems,
//             phone:phone,
//             shippingAddress1 :address,
//             shippingAddress2:address2,
//             zip,
//             user,
//             status:3
//         }
//         props.navigation.navigate("Payment", {order:order})
//     }

//     return(
//         <KeyboardAwareScrollView
//         viewIsInsideTabBar={true}
//         extraHeight={200}
//         enableOnAndroid={true}
//         >
//             <FormContainer title={'Shipping Address'}>
//                 <Input
//                 placeholder={'Phone'}
//                 name={"phone"}
//                 value={phone}
//                 keyboardType={"numeric"}
//                 onChangeText={(text)=>setPhone(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'Shipping Address 1'}
//                 name={"ShippingAddress1"}
//                 value={address}
//                 onChangeText={(text)=>setAddress(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'Shipping Address 2'}
//                 name={"ShippingAddress2"}
//                 value={address2}
//                 onChangeText={(text)=>setAddress2(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'City'}
//                 name={"city"}
//                 value={city}
//                 onChangeText={(text)=>setCity(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'zip Code'}
//                 name={"zip"}
//                 value={zip}
//                 keyboardType={"numeric"}
//                 onChangeText={(text)=>setZip(text)}
//                 >
//                 </Input>
//                 <View>
//       <Select
//        minWidth="200" 
//         mode="dropdown"
//         iosIcon={<Icon name="arrow-down" type="FontAwesome" style={{ color: '#007aff' }} />}
//         style={{ width: '100%', marginTop: 10 }}
//         selectedValue={country}
//         onValueChange={(value) => setCountry(value)}
//         placeholder="Select Your Country"
//         placeholderStyle={{ color: 'blue' }}
//         placeholderIconColor="#007aff"
//       >
//         <Select.Item label="Select Your Country" value={null} key="placeholder" />
//         {countries.map((c) => (
//           <Select.Item label={c.label} value={c.value} key={c.value} />
//         ))}
//       </Select>
//     </View>
               

//                 {/* <Item picker> */}
//                 {/* <Picker
//         mode="dropdown"
//         iosIcon={<Icon name="arrow-down" color={"007aff"} />}
//         style={{
//           width: '100%', // Set the width to fill the available space
//           marginTop: 10, // Add spacing as needed
//         }}
//         placeholder="Select Your Country"
//         placeholderStyle={{ color: 'blue' }}
//         placeholderIconColor="007aff"
//         selectedValue={country}
//         onValueChange={(value) => setCountry(value)}
//       >
//          <Picker.Item label="Select Your Country" value={null} />
//         {countries.map((c) => (
//           <Picker.Item key={c.value} label={c.label} value={c.label} />
//         ))}
//     </Picker>  */}
//                  {/* <Picker
//                   mode="dropdown"
//                   iosIcon={<Icon name="arrow-down" color={"007aff"}></Icon>}
//                   style={{width:undefined}}
//                   placeholder="Select Your Country"
//                   placeholderStyle={{color:'blue'}}
//                   placeholderIconColor="007aff"
//                   selectValue={country}
                 
//                   onValueChange={(e)=>setCountry(e)}
                  
//                   >
//                   {countries.map((c) => {
//               return <Picker.Item key={c.value} label={c.label} value={c.label} />;
//             })}

//                  </Picker>
//                 </Item> */}
//                 <View style={{width:'80%', alignItems:'center', marginTop:60}}>
//                     <Button title="Confirm" onPress={()=>checkOut()}></Button>

//                 </View>
                

//             </FormContainer>

//         </KeyboardAwareScrollView>
//     )
// }

// const mapStateToProps=(state)=>{
//     const {cartItems}= state
//     return{
//         cartItems:cartItems
//     }

// }

// export default connect(mapStateToProps)(Checkout)


 
//Mine Workings

// import React,{useEffect, useState, useContext} from "react";
// import {View, Text, Button } from 'react-native'
// import { Item,Picker } from "native-base";
// import Icon from 'react-native-vector-icons/FontAwesome'
// import FormContainer from "../../../Shared/Form/FormContainer";
// import Input from "../../../Shared/Form/Input";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { connect } from "react-redux";
// import Toast from "react-native-toast-message";
// import{Select}  from 'native-base';
// import * as actions from '../../../Redux/Actions/cartActions';
// import AuthGlobal from "../../../Context/store/AuthGlobal";
// const countries = require('../../../assets/data/countries.json');
// const Checkout =(props)=>{


//   const context = useContext(AuthGlobal)
//   const { checkoutItems } = props;
//     const [orderItems, setOrderItems]= useState();
//     const [address, setAddress]= useState();
//     const [address2, setAddress2]= useState();
//     const [ zip, setZip]= useState();
//     const [country, setCountry]= useState(null);
//     const [phone, setPhone]= useState();
//     const [city, setCity]= useState();
//     const [ user, setUser ] = useState();

//     useEffect(()=>{
//         setOrderItems(checkoutItems)
//         if(context.stateUser.isAuthenticated) {
//           setUser(context.stateUser.user.userId)
//       } else {
//           props.navigation.navigate("Checkout");
//           Toast.show({
//               topOffset: 60,
//               type: "error",
//               text1: "Please Login to Checkout",
//               text1: "Please Login to Checkout",
//               text2: ""
//           });
//       }

//         return()=>{
//             setOrderItems();
//         }

//     },[])
//     const checkOut=()=>{
//         let order = {
//             country, city,
//             dateOrdered: Date.now(),
//             orderItems,
//             phone:phone,
//             shippingAddress1 :address,
//             shippingAddress2:address2,
//             zip,
//             user,
//             status:3
//         }
//         props.navigation.navigate("Payment", {order:order})
//     }

//     return(
//         <KeyboardAwareScrollView
//         viewIsInsideTabBar={true}
//         extraHeight={200}
//         enableOnAndroid={true}
//         >
//             <FormContainer title={'Shipping Address'}>
//                 <Input
//                 placeholder={'Phone'}
//                 name={"phone"}
//                 value={phone}
//                 keyboardType={"numeric"}
//                 onChangeText={(text)=>setPhone(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'Shipping Address 1'}
//                 name={"ShippingAddress1"}
//                 value={address}
//                 onChangeText={(text)=>setAddress(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'Shipping Address 2'}
//                 name={"ShippingAddress2"}
//                 value={address2}
//                 onChangeText={(text)=>setAddress2(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'City'}
//                 name={"city"}
//                 value={city}
//                 onChangeText={(text)=>setCity(text)}
//                 >
//                 </Input>
//                 <Input
//                 placeholder={'zip Code'}
//                 name={"zip"}
//                 value={zip}
//                 keyboardType={"numeric"}
//                 onChangeText={(text)=>setZip(text)}
//                 >
//                 </Input>
//                 <View>
//       <Select
//        minWidth="200" 
//         mode="dropdown"
//         iosIcon={<Icon name="arrow-down" type="FontAwesome" style={{ color: '#007aff' }} />}
//         style={{ width: '100%', marginTop: 10 }}
//         selectedValue={country}
//         onValueChange={(value) => setCountry(value)}
//         placeholder="Select Your Country"
//         placeholderStyle={{ color: 'blue' }}
//         placeholderIconColor="#007aff"
//       >
//         <Select.Item label="Select Your Country" value={null} key="placeholder" />
//         {countries.map((c) => (
//           <Select.Item label={c.label} value={c.value} key={c.value} />
//         ))}
//       </Select>
//     </View>
               

//                 <View style={{width:'80%', alignItems:'center', marginTop:60}}>
//                     <Button title="Confirm" onPress={()=>checkOut()}></Button>

//                 </View>
                

//             </FormContainer>

//         </KeyboardAwareScrollView>
//     )
// }

// const mapStateToProps = (state) => {
//   const { checkoutItems } = state.checkoutItems;
// console.log(checkoutItems);
// return {
//   checkoutItems: checkoutItems,
// };
// };

// export default connect(mapStateToProps)(Checkout);
















import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet , TextInput, TouchableOpacity, ScrollView
} from "react-native";
import { Item, Picker } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import Toast from "react-native-toast-message";
import { Select } from "native-base";
import * as actions from "../../../Redux/Actions/cartActions";
import AuthGlobal from "../../../Context/store/AuthGlobal";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";




const countries = require("../../../assets/data/countries.json");

const Checkout = (props) => {
 const {userProfile}=props;
  console.log("wafaaaaa",userProfile)
  const context = useContext(AuthGlobal);
  const { checkoutItems } = props;
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState(null);
  const [phone, setPhone] = useState();
  const [city, setCity] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    setOrderItems(checkoutItems);
    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId);
    } else {
      props.navigation.navigate("Checkout");
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Please Login to Checkout",
       // text1: "Please Login to Checkout",
        text2: "",
      });
    }

    if (userProfile) {
      setPhone(userProfile.phone);
      setAddress(userProfile.shippingAddress);
      setAddress2(""); // You can populate this field if needed
      setCity(userProfile.city);
      setZip(""); // You can populate this field if needed
      setCountry(userProfile.country);
    }

    return () => {
      setOrderItems();
    };
  }, [userProfile]);

  const checkOut = () => {
    // Check if required fields are not empty
    if (!phone
      
      || !address || !city || !zip || !country
      ) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "All fields are required",
        text2: "Enter complete data",
      });
      return;
    }

    let order = {
      country,
      city,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
      user,
      status: 3,
    };
    props.navigation.navigate("Confirm", { order: order });
  };

  return (
    <ScrollView
    style={styles.container}
    >
    {/* // <KeyboardAwareScrollView
    //   viewIsInsideTabBar={true}
    //   extraHeight={200}
    //   enableOnAndroid={true}
    //   style={styles.container}
    // > */}
      <FormContainer title={"Shipping Address"}>
      <Text style={[styles.editLabel,{marginRight:12}]}>Phone*</Text>
        <TextInput
          style={styles.input}
          placeholder={"Phone *"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
          placeholderTextColor="#999"
        />
         <Text style={[styles.editLabel,{marginLeft:68}]}>Shipping Address 1*</Text>
        <TextInput
          style={styles.input}
          placeholder={"Shipping Address 1 *"}
          value={address}
          onChangeText={(text) => setAddress(text)}
          placeholderTextColor="#999"
        />
          <Text style={[styles.editLabel,{marginLeft:68}]}>Shipping Address 2*</Text>
        <TextInput
          style={styles.input}
          placeholder={"Shipping Address 2"}
          value={address2}
          onChangeText={(text) => setAddress2(text)}
          placeholderTextColor="#999"
        />
          <Text style={[styles.editLabel,{marginRight:30}]}>Country*</Text>
        <TextInput
          style={styles.input}
          placeholder={"City *"}
          value={city}
          onChangeText={(text) => setCity(text)}
          placeholderTextColor="#999"
        />
          <Text style={styles.editLabel}>Zip Code*</Text>
        <TextInput
          style={styles.input}
          placeholder={"Zip Code *"}
          value={zip}
          keyboardType={"numeric"}
          onChangeText={(text) => setZip(text)}
          placeholderTextColor="#999"
        />
        <View style={styles.countrySelect}>
          <Select
            minWidth="200"
            mode="dropdown"
            iosIcon={
              <Icon
                name="arrow-down"
                color='black'
                type="FontAwesome"
                style={styles.icon}
              />
            }
            style={styles.select}
            selectedValue={country}
            onValueChange={(value) => setCountry(value)}
            placeholder={userProfile ? userProfile.country : "Select Country *"}
            placeholderStyle={styles.placeholder}
            placeholderIconColor="#007aff"
          >
            {countries.map((c) => (
              <Select.Item
                label={c.label}
                value={c.value}
                key={c.value}
              />
            ))}
          </Select>
        </View>
  
        <View style={styles.confirmButton}>
          <TouchableOpacity
           onPress={checkOut}
           style={styles.pay}
          >
            <Text style={{color:'white', fontWeight:"bold", fontSize:17}}>Next</Text>
          </TouchableOpacity>
         
          {/* <EasyButton 
          //long
           primary
            onPress={checkOut} >
            <Text
            style={{fontSize:14, fontWeight:'bold', color:"white"}}>Pay Now</Text></EasyButton> */}
        </View>
      </FormContainer>
      </ScrollView>
    // </KeyboardAwareScrollView>
  );
  };
const mapStateToProps = (state) => {
  const { checkoutItems } = state.checkoutItems;

  console.log(checkoutItems);
  const { userProfile } = state.userProfile;
  return {
    checkoutItems: checkoutItems,
    userProfile:userProfile,
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
   // paddingHorizontal: 20,
  },
 
  countrySelect: {
    //width: "50%",
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#6DB5CA",
    borderRadius: 3,
   // paddingHorizontal: 10,
  },
  select: {
    width: "70%",
    fontSize: 16,
   // paddingVertical: 8,
  },
  editLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
    right:120,
    },
    input: {
      height: 40,
      width:'80%',
      borderColor: '#ccc',
      marginBottom:5,
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(255, 220, 178, 0.4)', // Light orange shade
      },
  icon: {
   // color: "#007aff",
    fontSize: 18,
    marginRight: 5,
  },
  placeholder: {
    color: "blue",
  },
  confirmButton: {
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    marginBottom:10,
  // backgroundColor:"grey"
  },
  pay:{
    backgroundColor:"#FF7235",
    width:"98%",
   // alignContent:"center",
    alignItems:"center",
    padding:8,
    margin:2,
    borderRadius:6,
  }
});

export default connect(mapStateToProps, actions)(Checkout);
