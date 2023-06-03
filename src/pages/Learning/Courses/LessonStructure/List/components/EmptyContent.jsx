import { Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';

export default function EmptyContent({ onAdd }) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        alignItems: 'center'
      }}>
      <Typography>Chưa có nội dung bài học</Typography>
      <Button onClick={onAdd}>
        <AddIcon /> Thêm nội dung bài học
      </Button>
    </Box>
  );
}
