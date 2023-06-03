import React, { useState } from 'react';
import { Box, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { FormControl, Title } from 'components';
import ImageForm from './components/ImageForm';
import VideoForm from './components/VideoForm';

const Banner = () => {
  const [checked, setChecked] = useState('image');

  const handleRadioChange = (event) => {
    setChecked(event.target.value);
  };

  return (
    <>
      <Box sx={{ padding: '25px 155px', backgroundColor: 'white' }}>
        <Title>Cấu hình banner</Title>
        <Divider />

        <FormControl>
          <RadioGroup row defaultValue="image" value={checked} onChange={handleRadioChange}>
            <FormControlLabel
              value="image"
              sx={{ marginRight: 10 }}
              control={<Radio />}
              label="Hình ảnh"
            />
            <FormControlLabel value="video" control={<Radio />} label="Video" />
          </RadioGroup>
        </FormControl>

        {checked === 'image' ? <ImageForm /> : <VideoForm />}
      </Box>
    </>
  );
};

export default Banner;
