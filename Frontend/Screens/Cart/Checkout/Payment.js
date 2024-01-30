// import React ,{useState}from "react";
// import {View } from 'react-native'
// import { Container, Header, Content, ListItem, Text, Radio, Left,
// Title ,Right, Picker, Icon, Body } from "native-base";
// import { Button } from "react-native";

// const methods =[{name:'Cash on Deelivery', value:1 },
// {name:'Bank Transfer', value:2},
// { name:'Card Payment', value:3}
// ]

// const paymentCards= [{name:'Wallet', value:1},
// {name:'Vise', value:2},
// {name:'MasterCard', value:3},
// {name:'Other', value:4}]

// const Payment =(props)=>{
//     const order = props.route.params
//     const [selected, setSelected]= useState();
//     const [card, setCard]= useState();
//     return(
//         <Container>
//             <Header>
//                 <Body>
//                     <Title>
//                         Choose Your Payment Method
//                     </Title>
//                 </Body>
//             </Header>
//             <Content>
//                 {methods.map((item, index)=>{
//                     return
//                     (
//                         <ListItem key={item.name} onPress={()=>setSelected(item.value)}>
//                             <Left>
//                                 <Text>{item.name}</Text>
//                             </Left>
//                             <Right>
//                                 <Radio selected={selected == item.value}></Radio>
//                             </Right>

//                         </ListItem>
//                     )
//                 })}
//                 {selected== 3?(
//                     <Picker
//                     mode="dropdown"
//                     iosIcon={<Icon name="arrow-down"></Icon>}
//                     headerStyle={{borderColor:'orange'}}
//                     headerBackButtonTextStyle={{color:'#fff'}}
//                     headerTitleStyle={{color:'#fff'}}
//                     selectedValue={card}
//                     onValueChange={(x)=>setCard(x)}>
//                         {paymentCards.map((c,index)=>{return(
//                             <Picker.Item 
//                             key= {c.name}
//                             label= {c.name} value={c.name}></Picker.Item>
//                         )})}
                       

//                     </Picker>

//                 ):null}
//                 <View style={{marginTop:60,alignSelf:'center'}}>
//                     <Button title="Confirm" onPress={()=>
//                         {props.navigation.navigate('Confirm', {order})}}/>

//                 </View>
//             </Content>
//         </Container>
//     )
// }

// export default Payment;



// working


// import React, { useState } from "react";
// import { View, Text, Button, StyleSheet, ScrollView } from "react-native";

// const methods = [
//   { name: "Cash on Delivery", value: 1 },
//   { name: "Bank Transfer", value: 2 },
//   { name: "Card Payment", value: 3 },
// ];

// const paymentCards = [
//   { name: "Wallet", value: 1 },
//   { name: "Vise", value: 2 },
//   { name: "MasterCard", value: 3 },
//   { name: "Other", value: 4 },
// ];

// const Payment = (props) => {
//   const order = props.route.params;
//   const [selected, setSelected] = useState(null);
//   const [card, setCard] = useState(null);

//   const handleMethodChange = (value) => {
//     setSelected(value);
//     if (value !== 3) {
//       setCard(null);
//     }
//   };

//   const handleCardChange = (value) => {
//     setCard(value);
//   };

//   const handleConfirm = () => {
//     props.navigation.navigate("Confirm", { order });
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.contentContainer}>
//         <Text style={styles.title}>Choose Your Payment Method</Text>
//         {methods.map((item) => (
//           <View key={item.value} style={styles.methodContainer}>
//             <Text style={styles.methodText}>{item.name}</Text>
//             <Button
//               title={selected === item.value ? "Selected" : "Select"}
//               onPress={() => handleMethodChange(item.value)}
//               color={selected === item.value ? "#007aff" : "#000"}
//             />
//           </View>
//         ))}
//         {selected === 3 && (
//           <View style={styles.cardContainer}>
//             <Text style={styles.cardLabel}>Select Payment Card:</Text>
//             {paymentCards.map((c) => (
//               <View key={c.value} style={styles.cardOptionContainer}>
//                 <Text>{c.name}</Text>
//                 <Button
//                   title={card === c.value ? "Selected" : "Select"}
//                   onPress={() => handleCardChange(c.value)}
//                   color={card === c.value ? "#007aff" : "#000"}
//                 />
//               </View>
//             ))}
//           </View>
//         )}
//       </ScrollView>
//       <View style={styles.confirmButtonContainer}>
//         <Button title="Confirm" onPress={handleConfirm} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },
//   contentContainer: {
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   methodContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   methodText: {
//     fontSize: 16,
//   },
//   cardContainer: {
//     marginTop: 20,
//   },
//   cardLabel: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   cardOptionContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   confirmButtonContainer: {
//     marginTop: 20,
//     alignSelf: "center",
//   },
// });

// export default Payment;




//Mine

import { useStripe } from "@stripe/stripe-react-native";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, Alert } from "react-native";
import { connect } from 'react-redux';
import  {baseURL}  from "../../../assets/common/baseUrl";
import EasyButton from "../../../Shared/StyledComponents/EasyButton";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

// const paymentCards = [
//   { name: "Wallet", value: 1 },
//   { name: "Vise", value: 2 },
//   { name: "MasterCard", value: 3 },
//   { name: "Other", value: 4 },
// ];

const Payment = (props) => {
  const order = props.route.params;
  const [selected, setSelected] = useState(null);
  const [card, setCard] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const { totalPrice } = props;
    console.log("titalprice", totalPrice)

    const subscribe = async (totalPrice) => {
        
      // Sending request
      const response = await fetch(`${baseURL}payments/intent`, {
          method: "POST",
          body: JSON.stringify({ totalPrice }),
          headers: {
              "Content-Type": "application/json",
          },
      });
      const responseData = await response.json(); // Convert the response body to JSON

      console.log("response", responseData.paymentIntent); // Log the JSON data from the response
      
       // 2. Initialize the Payment sheet
const initResponse = await stripe.initPaymentSheet({
  merchantDisplayName: 'notJust.dev',
  paymentIntentClientSecret: responseData.paymentIntent,
});
if (initResponse.error) {
  console.log(initResponse.error);
  Alert.alert('Something went wrong');
  return;
}

// 3. Present the Payment Sheet from Stripe
const paymentResponse = await stripe.presentPaymentSheet();
console.log("ddgdhfbblcdhbjlbbjbhbjbbbf")

  if (paymentResponse.error) {
  Alert.alert(
    `Error code: ${paymentResponse.error.code}`,
    paymentResponse.error.message
  );
  return;
}
// 4. If payment ok -> create the order
}

const handlePayment = async () => {
  if (selected === 1) {
      // Implement logic for Cash on Delivery here
      //props.navigation.navigate('Confirm',{order});
  } else if (selected === 3) {
      try {
          console.log("cscschjdwhqvvvd")
          setPaymentLoading(true); // Start payment loading indicator
          await subscribe(totalPrice); // Call the subscribe function for Stripe payment
          setPaymentLoading(false); // Stop payment loading indicator
      } catch (error) {
          console.error(error);
          setPaymentLoading(false);
          Alert.alert("Payment failed. Please try again later.");
      }
  }
};

  const handleMethodChange = (value) => {
    setSelected(value);
    if (value !== 3) {
      setCard(null);
    }
  };

  const handleCardChange = (value) => {
    setCard(value);
  };

  const handleConfirm = () => {
    props.navigation.navigate("Confirm", { order });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Choose Your Payment Method</Text>
        {methods.map((item) => (
          <View key={item.value} style={styles.methodContainer}>
            <Text style={styles.methodText}>{item.name}</Text>
            <Button
              title={selected === item.value ? "Selected" : "Select"}
              onPress={() => handleMethodChange(item.value)}
              color={selected === item.value ? "#007aff" : "#000"}
            />
          </View>
        ))}
        {/* {selected === 3 && (
          <View style={styles.cardContainer}>
            <Text style={styles.cardLabel}>Select Payment Card:</Text>
            {paymentCards.map((c) => (
              <View key={c.value} style={styles.cardOptionContainer}>
                <Text>{c.name}</Text>
                <Button
                  title={card === c.value ? "Selected" : "Select"}
                  onPress={() => handleCardChange(c.value)}
                  color={card === c.value ? "#007aff" : "#000"}
                />
              </View>
            ))}
          </View> */}
          {selected === 3 && (
          // No card options are displayed when "Card Payment" is selected
          <View style={styles.cardContainer}>
            {/* You can add some message here if needed */}
          </View>
        )}
       
      </ScrollView>
      <View style={styles.confirmButtonContainer}>
        {/* working */}
      {/* <EasyButton medium primary onPress={handlePayment} disabled={paymentLoading}  > */}
      <EasyButton medium primary onPress={handleConfirm} disabled={paymentLoading}  >
           <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Next</Text>
          </EasyButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contentContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  methodText: {
    fontSize: 16,
  },
  cardContainer: {
    marginTop: 20,
  },
  cardLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  cardOptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButtonContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
});

const mapStateToProps = (state) => {
    return {
       totalPrice: state.cartItems.totalPrice // Access the totalPrice from Redux store
    };
};

export default connect(mapStateToProps)(Payment);






