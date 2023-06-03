import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function BackButton({ onClick }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant="outlined"
      size="small"
      type="submit"
      sx={{
        height: 'min-content',
        maxWidth: 'fit-content',
        background: '#fff',
        color: '#000'
      }}
      onClick={handleClick}>
      <ArrowBackIcon sx={{ color: '#55C763' }} />
      Quay lại
    </Button>
  );
}
