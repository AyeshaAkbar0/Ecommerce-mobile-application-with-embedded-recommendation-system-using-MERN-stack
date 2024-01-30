
import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text , TouchableOpacity, StyleSheet} from "react-native";
import axios from "axios";
import { baseURL } from "../../assets/common/baseUrl";
import { useFocusEffect } from "@react-navigation/native";
import OrderCard from "../../Shared/OrderCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateSelector from "./DateSelector" ;
import Icon from "react-native-vector-icons/Ionicons"
import Receive from 'react-native-vector-icons/MaterialIcons'
//import StyleSheet from "styled-components/dist/sheet/Sheet";

const Orders = (props) => {
  const [orderList, setOrderList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Selected date state
  const [orderStatusUpdateTimestamp, setOrderStatusUpdateTimestamp] = useState(Date.now());
  const [filteredOrders, setFilteredOrders] = useState(null);
  const [originalOrderList, setOriginalOrderList] = useState([]);







  
  const getOrders = () => {
    AsyncStorage.getItem("jwt").then((res) => {
      axios
        .get(`${baseURL}orders`, {
          headers: { Authorization: `Bearer ${res}` },
        })
        .then((res) => {
          setOrderList(res.data);
          setOriginalOrderList(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  const date = "2023-08-01"; // Replace this with your desired date

  const getOrdersByDate = (selectedDate) => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        axios
          .get(`${baseURL}orders/byDate/${selectedDate}`, {
            headers: { Authorization: `Bearer ${res}` },
           // params: { date }, // Pass the date as a query parameter
          })
          .then((res) => {
            setOrderList(res.data);
            setOriginalOrderList(res.data);
          })
          .catch((error) => {
            console.error("Error fetching orders by date:", error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

 

  const updateOrderStatus = (orderId, newStatus) => {
    console.log('Called this functon');
    setOrderList((orderList) =>
    orderList.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setOrderStatusUpdateTimestamp(Date.now());
  };


  const handleOrderFilter = (filterType) => {
    // Check if there are orders to filter
    if (!originalOrderList.length) return;

  // Filter the orders based on the selected type (1, 2, or 3)
  const filteredOrders = originalOrderList.filter((order) => order.status === filterType);
  setOrderList(filteredOrders);





  };


  useFocusEffect(
    useCallback(() => {
      getOrders();
      setFilteredOrders([]); // Initialize filteredOrders with all orders
      return () => {
        setOrderList([]);
        setOriginalOrderList([]); // Reset the original list
      };
    }, [])
  );
  

  // Trigger getOrdersByDate whenever the selectedDate changes
  useEffect(() => {
    getOrdersByDate(selectedDate);
  }, [selectedDate]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
     
     

      <TouchableOpacity
        style={{
          position: "absolute",
          marginTop: -10,
          right: -4,
          backgroundColor: "white",
          padding: 11,
      //marginLeft:10,
          //borderRadius: 4,
        }}
        onPress={() => {
          console.log("Just called")
          props.navigation.navigate("StatisticsScreen")}}
      >
        <Icon name ="stats-chart"  size={25} color="blue"></Icon>
        <Text style={{fontSize:12,fontWeight:"bold", color:'black' }}>Stats</Text>
      </TouchableOpacity>

      {/* Render DateSelector component and pass the selectedDate and setSelectedDate as props */}
      <DateSelector selectedDate={selectedDate} setSelectedDate={setSelectedDate} />



      <View style={styles.orderOptions}>
            {/* <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter('2')}
            >
              <Text style={{fontWeight:'bold', color:'white'}}>Shipped</Text>
            </TouchableOpacity> */}

<TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter('3')}
            >
              <Receive name ="pending" size={27} color="black"></Receive>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Pending
              </Text>
            </TouchableOpacity>


            <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter('2')}
            >
               <Receive name ="local-shipping" size={27} color="black"></Receive>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Shipped
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter("1")}
            >
              <Receive name ="rate-review" size={27} color="black"></Receive>
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Delivered
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter('1')}
            >
              <Text style={{fontWeight:'bold', color:'white'}}>Delivered</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              style={styles.orderOption}
              onPress={() => handleOrderFilter('3')}
            >
              <Text style={{fontWeight:'bold', color:'white'}}>Pending</Text>
            </TouchableOpacity> */}
            {/* Add more order filter options as needed */}
          </View>
           {/* {filteredOrders && filteredOrders.length ? (
  <View style={styles.orderList}>
    // Render the list of filtered orders using OrderCard component 
    {filteredOrders.map((x) => (
      <OrderCard key={x.id} {...x} />
    ))}
  </View>
) : (
  <View style={styles.noOrderContainer}>
    <Text>No Orders Found</Text>
  </View>
          )}  */}




      

      <FlatList
        data={orderList}
        renderItem={({ item }) => (

          <OrderCard
          navigation={props.navigation}
          
          
          orderStatusUpdateTimestamp={orderStatusUpdateTimestamp} // Pass the timestamp
          
          

          updateOrderStatus={updateOrderStatus} // Pass the callback function
          {...item}
          editMode={true}
        />
          // <OrderCard navigation={props.navigation} {...item} editMode={true} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};


const styles= StyleSheet.create({
  orderOptions: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    marginTop:9,
   
  },
  orderOption: {
    padding: 16,
    //alignContent:"center",
    alignItems:"center",
   // backgroundColor: '#FF7235',
   // borderRadius: 5,
   // borderColor:'#FF7235'
  },
})

export default Orders;











































// import React, { useState, useEffect, useCallback } from "react";
// import { View, FlatList, Text, TouchableOpacity } from "react-native";
// import axios from "axios";
// import { baseURL } from "../../assets/common/baseUrl";
// import { useFocusEffect } from "@react-navigation/native";
// import OrderCard from "../../Shared/OrderCard";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import DateSelector from "./DateSelector";

// const Orders = (props) => {
//   const [orderList, setOrderList] = useState([]);
//   const [totalSales, setTotalSales] = useState([]);
//   const [totalCount, setTotalCount] = useState(0);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const getOrders = (date = null) => {
//     AsyncStorage.getItem("jwt").then((res) => {
//       const url = date ? `${baseURL}orders/byDate?date=${date}` : `${baseURL}orders`;
//       axios
//         .get(url, {
//           headers: { Authorization: `Bearer ${res}` },
//         })
//         .then((res) => {
//           setOrderList(res.data);
//         })
//         .catch((error) => {
         
//             console.error("Error fetching orders:", error);
//             // You can also check the error.response.data to see the error response from the server
        
//         });
//     });
//   };

//   const getTotalSales = () => {
//     AsyncStorage.getItem("jwt")
//       .then((res) => {
//         axios
//           .get(`${baseURL}orders/get/totalsales`, {
//             headers: { Authorization: `Bearer ${res}` },
//           })
//           .then((res) => {
//             setTotalSales(res.data.totalsales);
//           })
//           .catch((error) => {
//             console.error(error);
//           });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   const getTotalCount = () => {
//     axios
//       .get(`${baseURL}orders/get/count`)
//       .then((res) => {
//         setTotalCount(res.data.count);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getTotalSales();
//       getOrders();
//       getTotalCount();

//       return () => {
//         setOrderList([]);
//       };
//     }, [])
//   );

//   useEffect(() => {
//     getOrders();
//   }, []);

//   const handleDateSelection = () => {
//     // Implement the logic to show a date picker or any other method
//     // to select a date and set the selected date in the state.
//     // For simplicity, we'll set a default date of today if no date is selected.
//     const date = "2023-07-18"; // Replace this with the selected date in 'YYYY-MM-DD' format
//     setSelectedDate(date);
//     getOrders(date); // Fetch orders for the selected date
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <View
//         style={{
//           marginVertical: 8,
//           marginHorizontal: 15,
//           padding: 10,
//           borderRadius: 4,
//           borderWidth: 2,
//           borderColor: "black",
//         }}
//       >
//         <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
//           Total Sales: ${totalSales}
//         </Text>
//         <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
//           Total Orders: {totalCount}
//         </Text>
//       </View>

//       <DateSelector selectedDate={selectedDate} onChange={handleDateSelection} />

//       <FlatList
//         data={orderList}
//         renderItem={({ item }) => (
//           <OrderCard navigation={props.navigation} {...item} editMode={true} />
//         )}
//         keyExtractor={(item) => item.id}
//       />
//     </View>
//   );
// };

// export default Orders;

