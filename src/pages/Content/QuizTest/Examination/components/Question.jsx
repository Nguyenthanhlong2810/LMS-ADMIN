import { Box, IconButton, styled, Typography } from '@mui/material';
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PropTypes from 'prop-types';
import { ROUTE_PATH } from 'consts';

const ExamStyled = styled(Box)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: #f5f8ff;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  &:hover {
    background-color: #e7eeff;
  }
`;

export default function Question({ question, onDelete, isOnlyView }) {
  const { codeManage, mark, questionId, id } = question;

  const handleDetailQuestion = () => {
    const url = window.location.origin;
    window.open(
      url + ROUTE_PATH.QUESTION_BANK_DETAIL + '/' + (questionId || id) + '?onlyView=true',
      '_blank'
    );
  };

  return (
    <ExamStyled>
      <div className="d-flex justify-content-space-between align-items-center p-2">
        <Box>
          <Typography sx={{ mb: '0.3rem' }} fontSize={'0.8rem'} fontWeight={400}>
            {codeManage}
          </Typography>
          <Typography fontWeight={700} fontSize={'1.1rem'}>
            Điểm {mark}
          </Typography>
        </Box>
        {!isOnlyView && (
          <IconButton onClick={onDelete}>
            <DeleteOutlineIcon fontSize="large" />
          </IconButton>
        )}
      </div>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', pr: '50px' }}>
        <IconButton onClick={handleDetailQuestion}>
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </ExamStyled>
  );
}

Question.propTypes = {
  examCode: PropTypes.string,
  point: PropTypes.string
};
