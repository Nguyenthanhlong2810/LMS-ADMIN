import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Typography } from '@mui/material';
import { BackButton, TitleAndLanguage } from 'components';
import QuestionList from './components/QuestionList';
import { useParams } from 'react-router-dom';
import { useLoading } from 'hooks/LoadingProvider';
import { toast } from 'react-toastify';
import { ExamAPI } from 'apis/Examination';
import { FlexCol } from 'components/Layout/Layout';
import { DEFAULT_ERROR_MESSAGE } from 'consts';

function ExaminationOverview() {
  const { id } = useParams();
  const { hideLoading, showLoading } = useLoading();
  const [detailExam, setDetailExam] = useState({});

  const handlePrintTest = () => {};
  const getExamById = async (id) => {
    try {
      showLoading();
      const { data } = await ExamAPI.getDetail(id);
      if (data) {
        setDetailExam(data);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };
  useEffect(() => {
    if (id) {
      getExamById(id);
    }
  }, []);

  return (
    <FlexCol gap={2}>
      <BackButton />
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage title="tổng quan bài kiểm tra" />
        <Divider />
        <Box sx={{ display: 'grid', gridAutoFlow: 'row', gridGap: '14px', m: '16px 0' }}>
          <Box sx={{ display: 'flex' }}>
            <Typography>Bài kiểm tra: </Typography>
            <Typography sx={{ ml: '8px' }} fontWeight={700}>
              {detailExam.examTitle}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Typography>Mã bài kiểm tra:</Typography>
            <Typography sx={{ ml: '8px' }} fontWeight={700}>
              {detailExam.examCode}
            </Typography>
          </Box>
        </Box>

        {/* <Button variant="contained" color="secondary" onClick={handlePrintTest}>
          In bài kiểm tra
        </Button> */}
        <Box sx={{ mt: 3 }}>
          <QuestionList listQuestion={detailExam.examQuizs || []} />
        </Box>
      </Box>
    </FlexCol>
  );
}

ExaminationOverview.propTypes = {
  id: PropTypes.number
};

export default ExaminationOverview;
