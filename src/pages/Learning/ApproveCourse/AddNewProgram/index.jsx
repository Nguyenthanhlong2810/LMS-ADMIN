import React from 'react';
import { Box } from '@mui/material';
import ApprovalForm from '../components/ApprovalForm';
import { Title } from 'components';

const AddNewProgram = () => {
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <Title>chương trình yêu cầu phê duyệt</Title>
      </Box>
      <ApprovalForm />
    </>
  );
};
export default AddNewProgram;
