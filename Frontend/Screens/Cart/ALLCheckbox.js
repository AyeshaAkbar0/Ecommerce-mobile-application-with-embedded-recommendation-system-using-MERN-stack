import React, { useState } from 'react';
import { Checkbox, VStack, Text } from 'native-base';

const AllCheckbox = ({ cartItems, handleSelectAll }) => {
  const [selectAll, setSelectAll] = useState(false);

  const handleAllCheckboxChange = () => {
    setSelectAll(!selectAll);
    handleSelectAll(!selectAll);
  };

  const allSelected = cartItems.every((item) => item.selected);

  return (
    <VStack space={2} alignItems="flex-start">
      <Checkbox isChecked={selectAll} onChange={handleAllCheckboxChange}>
        <Text>All</Text>
      </Checkbox>
    </VStack>
  );
};

export default AllCheckbox;
