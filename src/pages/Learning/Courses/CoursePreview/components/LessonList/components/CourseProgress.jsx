import { Box, Button, Popover, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { options, getPlugins } from './CourseListDoughnutChart';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from 'components/ExpandMore/ExpandMore';
import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { ArcElement, Chart as ChartJS, Legend } from 'chart.js';

ChartJS.register(ArcElement, Legend);

const CourseProgess = ({ courseProgress }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [chartCourse, setChartCourse] = useState({
    datasets: [
      {
        data: [0, 1],
        backgroundColor: ['#55C763', '#999'],
        borderWidth: 0
      }
    ]
  });
  const open = Boolean(anchorEl);
  const idPopOver = open ? 'simple-popover' : undefined;

  const progressPercentage = Math.round(
    (courseProgress?.totalCompletedContentUpload / courseProgress?.totalContentUpload) * 100
  );
  const percentText = `${
    courseProgress.completed ? 100 : isNaN(progressPercentage) ? 0 : progressPercentage
  }%`;
  useEffect(() => {
    if (!isEmpty(courseProgress)) {
      if (courseProgress?.completed) {
        setChartCourse({
          datasets: [
            {
              data: [1, 0],
              backgroundColor: ['#55C763', '#999'],
              borderWidth: 0
            }
          ]
        });
      } else {
        if (
          courseProgress?.totalCompletedContentUpload === 0 &&
          courseProgress?.totalContentUpload === 0
        ) {
          return setChartCourse({
            datasets: [
              {
                data: [0, 1],
                backgroundColor: ['#55C763', '#999'],
                borderWidth: 0
              }
            ]
          });
        }
        return setChartCourse({
          datasets: [
            {
              data: [
                courseProgress?.totalCompletedContentUpload,
                courseProgress?.totalContentUpload - courseProgress?.totalCompletedContentUpload
              ],
              backgroundColor: ['#55C763', '#999'],
              borderWidth: 0
            }
          ]
        });
      }
    }
  }, [courseProgress]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ width: '2.875rem', height: '2.875rem' }}>
        <Doughnut
          id="doughnut-chart"
          data={chartCourse}
          options={options}
          redraw={true}
          plugins={getPlugins(percentText)}
        />
      </Box>
      <Button
        onClick={handleClick}
        sx={{ color: '#565771', paddingTop: '14px' }}
        endIcon={
          <ExpandMore
            expand={open}
            aria-expanded={open}
            aria-label="show more"
            sx={{ color: '#565771' }}>
            <ExpandMoreIcon />
          </ExpandMore>
        }>
        Tiến độ
      </Button>
      <Popover
        id={idPopOver}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}>
        <Typography sx={{ p: 2 }}>
          Hoàn thành {courseProgress?.totalCompletedLessonOfCourse}/
          {courseProgress?.totalLessonOfCourse} khoá học
        </Typography>
      </Popover>
    </Box>
  );
};
export default CourseProgess;
