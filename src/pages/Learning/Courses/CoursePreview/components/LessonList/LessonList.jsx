import React from 'react';
import { Box, Typography } from '@mui/material';
import LessonContentSection from './components/LessonContentSection';
import { secondConvert } from 'utils';
import { useSelector, useDispatch } from 'react-redux';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { setTheaterView } from 'store/reducers/courseDetailSlice';

const LessonList = () => {
  const dispatch = useDispatch();

  const lessonStructure = useSelector((state) => state.courseDetail.lessonStructure);
  const lessonData = useSelector((state) => state.courseDetail.lessonData);

  const handleExpand = () => {
    dispatch(setTheaterView());
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <ChevronRightIcon sx={{ marginRight: '1rem', cursor: 'pointer' }} onClick={handleExpand} />
        <Box sx={{ marginBottom: '1.5rem' }}>
          <Typography
            fontSize={'0.875rem'}
            fontWeight={700}
            lineHeight={'150%'}
            sx={{ color: '#201B40' }}>
            NỘI DUNG KHOÁ HỌC
          </Typography>
          <Typography
            fontSize={'0.75rem'}
            fontWeight={400}
            lineHeight={'160%'}
            sx={{ color: '#818181' }}>
            {lessonData?.lessonTotal} bài học - {lessonData?.totalLessonDetailOfCourse} học phần -{' '}
            {secondConvert(lessonData?.totalCourseDuration)} giờ học
          </Typography>
        </Box>
      </Box>

      <Box>
        {lessonStructure?.map((section, index) => (
          <LessonContentSection section={section} key={index} fatherIndex={index} />
        ))}
      </Box>
    </>
  );
};
export default LessonList;
