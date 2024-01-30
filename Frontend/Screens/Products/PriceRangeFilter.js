// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput , StyleSheet} from 'react-native';
// import Modal from 'react-native-modal';
// import axios from 'axios';
// import  Icon from 'react-native-vector-icons/Octicons';

// import { baseURL } from '../../assets/common/baseUrl';


// const PriceFilter = ({ updateBookList }) => {
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const applyFilter = async () => {
//     try {
//       const response = await axios.get(`${baseURL}products/api/products/price?minPrice=${minPrice}&maxPrice=${maxPrice}`);
//       if (response.data.success) {
//         updateBookList(response.data.products);
//       } else {
//         updateBookList([]);
//       }
//       toggleModal();
//     } catch (error) {
//       console.error('Error applying filter:', error);
//     }
//   };

//   return (
//     <View  >
//       <TouchableOpacity  style={styles.icon}   onPress={toggleModal}>
//         {/* Customize the icon and design for the price filter */}
//        <Icon color={'black'} size ={30} name="filter"></Icon>
//       </TouchableOpacity>
//       <Modal isVisible={isModalVisible}>
//         <View  style={{backgroundColor:'green'}}>
//           <Text>Min Price:</Text>
//           <TextInput value={minPrice} onChangeText={setMinPrice} keyboardType="numeric" />
//           <Text>Max Price:</Text>
//           <TextInput value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
//           <TouchableOpacity onPress={applyFilter}>
//             {/* Customize the design for the apply filter button */}
//             <Text>Apply Filter</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={toggleModal}>
//             {/* Customize the design for the close button */}
//             <Text>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     icon:{
//        // backgroundColor:"grey",
//        marginLeft:-6,
//        marginTop:-3,
//        //width:"40%",
//        // height:"20%"



//     }
// })

// export default PriceFilter;












import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import BottomSheet from 'react-native-raw-bottom-sheet';
import Slider from '@react-native-community/slider'; // Import the Slider component
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'
import  Toast  from 'react-native-toast-message';

import { baseURL } from '../../assets/common/baseUrl';

const PriceFilter = ({ updateBookList }) => {
  const [minPrice, setMinPrice] = useState(0); // Use numeric values for minPrice and maxPrice
  const [maxPrice, setMaxPrice] = useState(100);
  const [selectedMinPrice, setSelectedMinPrice] = useState(0);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(100);

  const bottomSheetRef = React.createRef();

  const openBottomSheet = () => {
    setSelectedMinPrice(minPrice); // Initialize the selected values with current minPrice and maxPrice
    setSelectedMaxPrice(maxPrice);
    bottomSheetRef.current.open();
  };

  const applyFilter = async () => {
    try {
      bottomSheetRef.current.close();
      const response = await axios.get(`${baseURL}products/api/products/price?minPrice=${selectedMinPrice}&maxPrice=${selectedMaxPrice}`);
      if (response.data.success) {
        updateBookList(response.data.products, () => {
          //bottomSheetRef.current.close(); // Close the bottom sheet after applying the filter and updating the book list
        });
      } else {
        updateBookList([]);
        bottomSheetRef.current.close(); // Close the bottom sheet on unsuccessful filter
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Toast.show({
          type:"error",
          text1:"Sorry, no products found",
          text2:"Try some different range"
        })
       
      } else {
        console.error('An error occurred:', error);
      }
    }
  };
  

  return (
    <View>
      <TouchableOpacity style={styles.icon} onPress={openBottomSheet}>
        <Icon color={'black'} size={30} name="sliders" />
      </TouchableOpacity>
      <BottomSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        height={300}
        customStyles={{
          container: {
            backgroundColor: 'white',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View style={styles.bottomSheetContent}>
        <Text>Minimum Price:</Text>
          <Slider
  style={{ width: '100%', height: 40 }}
  minimumValue={minPrice}
  maximumValue={maxPrice}
  value={selectedMinPrice} // Use selectedMinPrice as the value
  onValueChange={(value) => {
    setSelectedMinPrice(parseFloat(value));
  }}
/>
<Text>Maximum Price:</Text>
<Slider
  style={{ width: '100%', height: 40 }}
  minimumValue={minPrice}
  maximumValue={maxPrice}
  value={selectedMaxPrice} // Use selectedMaxPrice as the value
  onValueChange={(value) => {
    setSelectedMaxPrice(parseFloat(value));
  }}
/>



          <View style={styles.rangeLabels}>
            <Text>{selectedMinPrice}</Text>
            <Text>{selectedMaxPrice}</Text>
          </View>
          <TouchableOpacity onPress={applyFilter}>
            <View style={styles.button}>
            <Text  style={{fontSize:16,fontWeight:"bold",
            color:"white"
              }}>Apply Filter</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: -4,
    marginTop: -3,
  },
  bottomSheetContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  button:{
    backgroundColor:"#1c768f",
    borderRadius:15,
    alignContent:"center",
    alignItems:'center',
    padding:5,
    marginTop:15,
    
  }
});

export default PriceFilter;
















