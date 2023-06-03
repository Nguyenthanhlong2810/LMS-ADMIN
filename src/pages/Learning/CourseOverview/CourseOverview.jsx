import { Box, Button, Typography, styled, Grid } from '@mui/material';
import { BackButton, Video } from 'components';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DAY_FORMAT } from 'consts/date.const';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CourseAPI } from 'apis/Courses';
import { ROUTE_PATH } from 'consts';

const CourseOverviewStyled = styled(Box)`
  padding: 1.5rem;
  background-color: #fff;
  margin-bottom: 30px;
  * {
    font-weight: 500;
  }
  margin-top: 1rem;
`;

const DetailCourseStyled = styled(Box)`
  margin-top: 15px;
`;

const MenuButton = styled(Button)({
  background: '#E9E9E9',
  color: '#565771',
  marginRight: '0.5rem',
  ':hover': {
    color: '#fff',
    background: '#457EFF'
  }
});

export default function CourseOverview() {
  const { id } = useParams();
  const coursesMenus = [
    {
      name: 'Chi tiết khóa học',
      link: `${ROUTE_PATH.COURSE_DETAIL}/${id}`
    },
    {
      name: 'Lịch học'
      // link: '/learning/courses/detail/' + id
    },
    {
      name: 'Cấu trúc bài học',
      link: `${ROUTE_PATH.LESSON_STRUCTURE}/${id}`
    },
    {
      name: 'Kích hoạt',
      link: `${ROUTE_PATH.ACTIVATION_SETTING}/${id}`
    },
    {
      name: 'Hoạt động gán',
      link: `${ROUTE_PATH.ASSIGN_COURSE}/${id}`
    }
  ];
  const [course, setCourse] = useState({});
  const [previewType, setPreViewType] = useState('IMAGE');
  const dateFormat = dayjs(course.createdDate).format(DAY_FORMAT.ddMMYYYY);
  const navigate = useNavigate();

  useEffect(() => {
    getCourseById();
  }, []);

  const getCourseById = async () => {
    try {
      const res = await CourseAPI.getById(id);
      const typePreview = res?.data.data?.pathPreview?.split('.')?.at(-1);
      if (typePreview === 'mp4') {
        setPreViewType('VIDEO');
      } else {
        setPreViewType('IMAGE');
      }
      setCourse(res?.data.data);
    } catch (error) {
      toast.error('Something error !');
    }
  };

  const onClickMenuButton = (link) => () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <>
      <BackButton />
      <CourseOverviewStyled>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 5fr', gridGap: 15 }}>
          <Typography>Tên khóa học</Typography>
          <Typography sx={{ textTransform: 'uppercase' }}>{course.name}</Typography>
          <Typography>ID khóa học</Typography>
          <Typography>{course.programCode}</Typography>
        </Box>
        <Typography mt="15px" color="#818181" fontWeight={300}>
          Video Preview
        </Typography>
        <Grid container spacing={3} sx={{ marginTop: 1 }}>
          <Grid item xs={12} sm={4}>
            {previewType === 'VIDEO' && <Video src={course?.pathPreview}></Video>}
            {previewType === 'IMAGE' && <img src={course?.pathPreview} style={{ width: '100%' }} />}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gridGap: 15 }}>
              <Typography>Loại hình đào tạo</Typography>
              <Typography>{course.courseTypeName}</Typography>
              <Typography>Loại khóa học</Typography>
              <Typography>{course.trainingTypeName}</Typography>
              <Typography>Phiên bản</Typography>
              <Typography>{course.id}</Typography>
              <Typography>Ngày tạo</Typography>
              <Typography>{dateFormat}</Typography>
              <Typography>Trạng thái</Typography>
              <Typography>{course.passStatusName}</Typography>
            </Box>
          </Grid>
        </Grid>
        <DetailCourseStyled>
          <Typography sx={{ mb: '15px' }}>TỔNG QUAN VỀ KHÓA HỌC</Typography>
          <Typography sx={{ lineHeight: '170%' }}>{course.summary}</Typography>
        </DetailCourseStyled>
      </CourseOverviewStyled>
      <Box sx={{ display: 'flex' }}>
        {coursesMenus.map((c, i) => (
          <MenuButton key={i} onClick={onClickMenuButton(c.link)} size="small">
            {c.name}
          </MenuButton>
        ))}
      </Box>
      {/* <TabMenu styled={{ borderBottom: 0 }} tabsMenu={tabs}></TabMenu> */}
    </>
  );
}
