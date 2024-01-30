import React, { useState, useEffect } from "react";
import { View, Text, ScrollView} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { baseURL } from "../../assets/common/baseUrl";
import axios from "axios"; // Import axios for making HTTP requests
import AsyncStorage from "@react-native-async-storage/async-storage";

const StatisticsScreen = () => {
  const [totalPriceData, setTotalPriceData] = useState([]);
  const [dateLabelsFormatted, setDateLabelsFormatted] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalSales, setTotalSales] = useState([]);


  useEffect(() => {
    getTotalCount();
    getTotalSales();
    const fetchTotalPrices = async () => {
      const currentDate = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

      const formattedDates = [];
      const totalPrices = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(sevenDaysAgo);
        date.setDate(date.getDate() + i);
        formattedDates.push(`${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`);
      }

      try {
        const jwt = await AsyncStorage.getItem("jwt");
        console.log("DATE ARE :", formattedDates);
        
        for (const date of formattedDates) {
          const response = await axios.get(`${baseURL}orders/totalPriceByDate/${date}`, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          totalPrices.push(response.data.totalPrice);
        }

        setDateLabelsFormatted(formattedDates);
        setTotalPriceData(totalPrices);
      } catch (error) {
        console.error("Error fetching total prices:", error);
      }
    };

    fetchTotalPrices();
  }, []);


  const getTotalCount = () => {
    axios
      .get(`${baseURL}orders/get/count`)
      .then((res) => {
        setTotalCount(res.data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTotalSales = () => {
    AsyncStorage.getItem("jwt").then((res) => {
      axios
        .get(`${baseURL}orders/get/totalsales`, {
          headers: { Authorization: `Bearer ${res}` },
        })
        .then((res) => {
          setTotalSales(res.data.totalsales); // Access totalsales property from the response
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };


  const data = {
    labels: dateLabelsFormatted,
    datasets: [
      {
        data: totalPriceData,
      },
    ],
  };

  return (
    <View>

    <View
    style={{
     // marginVertical: 8,
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "black",
      backgroundColor:"#FF7235"
    }}
  >
    <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
      Total Sales: ${totalSales}
    </Text>
    <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
      Total Orders: {totalCount}
    </Text>
  </View>

    <ScrollView horizontal={true}> 
    <View style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        Sales of last week
      </Text>
      <BarChart
        data={data}
        width={Dimensions.get("window").width *1.5}
        height={250}
        yAxisLabel="$"
        chartConfig={{
          backgroundColor: "#ffffff",
        //  backgroundGradientFrom: "#ffffff",
        backgroundGradientFrom: "#A9F1DF",
        //  backgroundGradientTo: "#ffffff",
          backgroundGradientTo: "#FFBBBB",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />
    </View>
    </ScrollView>
  </View>

  );

};

export default StatisticsScreen;


