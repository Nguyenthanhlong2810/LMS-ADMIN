import { Box, Button } from '@mui/material';
import { ROUTE_PATH } from 'consts';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Examination from './Examination/Examination';
import ExaminationList from './Examination/Examination';
import QuestionBank from './QuestionBank/QuestionBank';

const QuizTest = () => {
  let location = useLocation();
  let navigate = useNavigate();
  const isQuestionBank = location.pathname === ROUTE_PATH.EXAMINATION ? false : true;
  return (
    <Box sx={{ p: 3, backgroundColor: 'white' }}>
      {/* <Button
        variant="contained"
        color={isQuestionBank ? 'secondary' : 'grey'}
        size="large"
        className="mr-3"
        onClick={() => navigate('/content/question-bank')}>
        Ngân hàng câu hỏi
      </Button>
      <Button
        variant="contained"
        color={isQuestionBank ? 'grey' : 'secondary'}
        size="large"
        onClick={() => navigate(ROUTE_PATH.EXAMINATION)}>
        Bài kiểm tra
      </Button> */}
      {isQuestionBank ? <QuestionBank /> : <Examination />}
    </Box>
  );
};

export default QuizTest;
