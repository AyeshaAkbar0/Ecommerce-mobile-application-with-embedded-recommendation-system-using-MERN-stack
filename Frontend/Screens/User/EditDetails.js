// EditDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, TouchableOpacity,ScrollView,TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from "react-native-toast-message"
 import { Radio } from 'native-base';
 import { baseURL } from '../../assets/common/baseUrl';
 import AsyncStorage from "@react-native-async-storage/async-storage";

 import DateTimePicker from '@react-native-community/datetimepicker';
// import { RadioButton } from 'react-native-paper';

const EditDetails = ({ route, navigation }) => {
  const { userProfile } = route.params;

 const [editedProfile, setEditedProfile] = useState(userProfile);
 
 const [showDatePicker, setShowDatePicker] = useState(false);
 const [token, setToken] = useState();

 const handleBackIconPress = () => {
  navigation.goBack(); // Navigate back to the previous screen (UserProfile)
};





 const handleSaveDetails = () => {
  AsyncStorage.getItem("jwt")
        .then((res) => {
    // Implement the logic to save the edited details using Axios
    axios.put(`${baseURL}users/${userProfile.id}`, editedProfile 
    , {
      headers: { Authorization: `Bearer ${res}` },})
      .then((response) => {
        console.log(userProfile.id)
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Details Updated',
          text2: 'Your details have been updated successfully!',
        });
        // Handle the response, e.g., show a success message
        console.log('Details updated successfully:', response.data);
        navigation.navigate('Edit Profile', { userProfile: editedProfile });
      })
  })
    

     
      .catch((error) => {
        console.log(userProfile.id)
        console.log(editedProfile);
        // Handle the error, e.g., show an error message
        console.error('Error updating details:', error);
      });

      const handleDateChange = (event, selectedDate) => {
        setShowDatePicker(false);
        if (selectedDate) {
          const formattedDate = selectedDate.toISOString().split('T')[0];
          setEditedProfile({ ...editedProfile, birthday: formattedDate });
        }
  };

 
};

  return (
    <ScrollView>

<View style={styles.container}>
<TouchableOpacity style={styles.backIcon} onPress={handleBackIconPress}>
        <Icon  color='black' name="arrow-back" size={30} />
      </TouchableOpacity>
      <View style={{margin:10}}></View>
<View style={styles.editDetailsContainer}>
  <Text style={styles.editLabel}>Name:</Text>
  <TextInput
    style={styles.editInput}
    value={editedProfile.name}
    onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
  />
</View>

<View style={styles.editDetailsContainer}>
  <Text style={styles.editLabel}>Phone:</Text>
  <TextInput
    style={styles.editInput}
    value={editedProfile.phone}
    onChangeText={(text) => setEditedProfile({ ...editedProfile, phone: text })}
  />
</View>

<View style={styles.editDetailsContainer}>
  <Text style={styles.editLabel}>Gender:</Text>
  <Radio.Group
    style={styles.radioGroup}
    value={editedProfile.gender}
    onChange={(value) => setEditedProfile({ ...editedProfile, gender: value })}
  >
    <View style={styles.radioButtonContainer}>
      <Radio selectedColor="#007AFF" value="Male" />
      <Text> Male</Text>
    </View>
    <View style={styles.radioButtonContainer}>
      <Radio selectedColor="#007AFF" value="Female" />
      <Text> Female</Text>
    </View>
    <View style={styles.radioButtonContainer}>
      <Radio selectedColor="#007AFF" value="Other" />
      <Text> Other</Text>
    </View>
  </Radio.Group>
</View>

<View style={styles.editDetailsContainer}>
        <Text style={styles.editLabel}>Address:</Text>
       <TextInput
          style={styles.editInput}
          value={editedProfile.shippingAddress}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, shippingAddress: text })}
        />
      </View>
      <View style={styles.editDetailsContainer}>
        <Text style={styles.editLabel}>City:</Text>
        <TextInput
          style={styles.editInput}
          value={editedProfile.city}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, city: text })}
        />
      </View>
      <View style={styles.editDetailsContainer}>
        <Text style={styles.editLabel}>Country:</Text>
        <TextInput
          style={styles.editInput}
          value={editedProfile.country}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, country: text })}
        />
      </View>


<TouchableOpacity style={styles.saveButton} onPress={handleSaveDetails}>
  <Text style={styles.saveButtonText}>Save Details</Text>
</TouchableOpacity>
</View>
</ScrollView>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
alignItems: 'center',
backgroundColor: 'white',
paddingVertical: 20,
},
editDetailsContainer: {
width: '90%',
marginBottom: 20,
},

backIcon: {
  position: 'absolute',
  top: 0,
  left: 10,
},

editLabel: {
fontSize: 16,
fontWeight: 'bold',
marginBottom: 5,
color: '#333',
},
editInput: {
height: 40,
borderColor: '#ccc',
//borderColor: 'white',
borderWidth: 1,
borderRadius: 5,
paddingHorizontal: 10,
 backgroundColor: 'rgba(255, 220, 178, 0.4)', // Light orange shade

},
radioGroup: {
flexDirection: 'row',
justifyContent: 'space-between',
marginVertical: 5,
},
radioButtonContainer: {
flexDirection: 'row',
alignItems: 'center',
},
saveButton: {
  //marginTop:25,
backgroundColor: '#DC7215', // Blue color
paddingVertical: 7,
paddingHorizontal: 100,

borderRadius: 4,
},
saveButtonText: {
color: '#FFF',
fontWeight: 'bold',
fontSize: 16,
},
});

export default EditDetails;
