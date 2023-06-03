import React from 'react';
import { Box, Typography } from '@mui/material';
import Question from './Question';

function QuestionList({ listQuestion, remove }) {
  return (
    <Box sx={{ padding: 2 }}>
      <Typography sx={{ textTransform: 'uppercase', fontWeight: 700 }}>Câu hỏi</Typography>
      <Box
        sx={{
          width: '100%',
          maxHeight: '400px',
          mt: '15px',
          overflowY: 'auto'
        }}>
        {listQuestion.map((field, index) => (
          <Question
            key={field.id}
            question={field}
            onDelete={() => remove && remove(index)}
            isOnlyView={!remove}
          />
        ))}
      </Box>
    </Box>
  );
}

export default QuestionList;
