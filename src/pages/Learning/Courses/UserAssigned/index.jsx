import React, { useState } from 'react';
import { Box, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { BackButton, FormControl, Title } from 'components';
import FileUserAssignedList from './FileUser/FileUserAssignedList';
import SingleUserAssignedList from './SingleUser/SingleUserAssignedList';

const UserAssigned = () => {
  const [checked, setChecked] = useState('single');
  const handleRadioChange = (event) => {
    setChecked(event.target.value);
  };

  return (
    <>
      <BackButton />
      <Box sx={{ p: 3, marginTop: '15px', backgroundColor: 'white' }}>
        <Title>danh sách học viên đã gán</Title>
        <Divider />
        <FormControl>
          <RadioGroup row defaultValue="single" value={checked} onChange={handleRadioChange}>
            <FormControlLabel
              value="single"
              sx={{ marginRight: 10 }}
              control={<Radio />}
              label="Danh sách gán đơn"
            />
            <FormControlLabel value="file" control={<Radio />} label="Danh sách gán theo tiệp" />
          </RadioGroup>
        </FormControl>
        {checked === 'single' ? <SingleUserAssignedList /> : <FileUserAssignedList />}
      </Box>
    </>
  );
};

export default UserAssigned;
