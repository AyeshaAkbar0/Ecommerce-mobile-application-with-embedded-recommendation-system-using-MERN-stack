


import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const DateSelector = ({ selectedDate, setSelectedDate }) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  // Helper function to format the date to 'YYYY-MM-DD' format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(formatDate(date));
    hideDatePicker();
    // Call the handleConfirm function to update the selected date
    // and fetch orders based on the selected date
    handleConfirm(formatDate(date));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateText}>
          {selectedDate ? formatDate(new Date(selectedDate)) : "Orders by Date:"}
        </Text>
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={selectedDate ? new Date(selectedDate) : new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginBottom: 8,
    marginRight:45,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
   
  },
});

export default DateSelector;
