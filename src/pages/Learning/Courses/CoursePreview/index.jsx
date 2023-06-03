import { Box, Fab, Fade, Button, Grid, Toolbar, useScrollTrigger, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { useLoading } from 'hooks/LoadingProvider';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CourseDetailContent from './components/CourseDetailContent';
import LessonList from './components/LessonList/LessonList';
import LectureView from './components/LectureView/LectureView';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetail } from 'store/thunk/courseDetailThunk';
import { formatResponseData } from './utils';
import { CertificateAPI } from 'apis/Certificate/CertificateAPI';
import { CourseAPI } from 'apis/Course/CourseAPI';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {
  setSelectLecture,
  setTheaterView,
  setFirstPreviewUrl,
  setLessonStructure,
  setLessonData
} from 'store/reducers/courseDetailSlice';
import { toast } from 'react-toastify';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { PropTypes } from 'prop-types';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS, ROUTE_PATH } from 'consts';
import CourseProgess from './components/LessonList/components/CourseProgress';
import { useAppSelector } from 'store/configureStore';
import { BoxContainerStyled } from './style';
import { Flex } from 'components/Layout/Layout';

const CourseDetail = (props) => {
  const [previewCertificate, setPreviewCertificate] = useState();
  const [courseProgress, setCourseProgress] = useState({});

  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { hideLoading, showLoading } = useLoading();
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedLecture = useSelector((state) => state.courseDetail.selectedLecture);
  const lessonData = useSelector((state) => state.courseDetail.lessonData);
  const isTheaterView = useSelector((state) => state.courseDetail.isTheaterView);
  const firstPreviewUrl = useSelector((state) => state.courseDetail.firstPreviewUrl);
  const inputRef = useRef();
  const focusInput = () => {
    inputRef?.current?.focus();
  };
  const [time, setTime] = useState();
  const [focusNote, setFocusNote] = useState(false);
  const [tabCourseDetail, setTabCourseDetail] = useState(0);

  useEffect(() => {
    getMyCourseDetail();
    getMyCertificate();
    getProcessUserCourses();
    return () => {
      dispatch(setSelectLecture({}));
      dispatch(setFirstPreviewUrl(''));
      dispatch(setLessonStructure([]));
      dispatch(setLessonData({}));
    };
  }, []);

  const getMyCourseDetail = async () => {
    try {
      const params = {
        courseId: id,
        isPreview: true
      };
      showLoading();
      const { payload } = await dispatch(fetchCourseDetail(params));
      if (payload) {
        const formatedData = formatResponseData(payload?.lessonStructures);
        if (formatedData) {
          dispatch(setLessonStructure(formatedData));
          const typePreview = payload?.pathPreview?.split('.')?.at(-1);
          if (typePreview !== 'mp4') {
            const firstSection = { ...formatedData[0]?.children[0], fatherIndex: 0, childIndex: 0 };
            dispatch(setSelectLecture(firstSection));
          } else {
            dispatch(setFirstPreviewUrl(payload?.pathPreview));
          }
        } else {
          dispatch(setLessonStructure([]));
        }
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const getMyCertificate = async () => {
    try {
      const params = {
        courseId: id
      };
      showLoading();
      const res = await CertificateAPI.getDetail(params);
      if (res.status === HTTP_STATUS.StatusOK) {
        setPreviewCertificate(res.data?.data);
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const getProcessUserCourses = async () => {
    try {
      // showLoading();
      const params = { courseId: Number(id) };
      const res = await CourseAPI.getProcessCoursesUser(params);
      const responseData = res?.data?.data;
      // if (responseData?.totalCompletedLessonOfCourse === responseData.totalLessonOfCourse) {
      //   const resonse = await CourseAPI.setCompletedCourse(params);
      // }
      setCourseProgress(responseData);
    } catch (error) {
      console.log('ErrorProvider  errors  getting user courses progress');
    } finally {
      // hideLoading();
    }
  };

  const handleNoteAtTime = (time) => {
    setTime(time);
  };
  const handleExpand = () => {
    dispatch(setTheaterView());
  };
  const handleFinish = () => {
    navigate(-1);
  };
  return (
    <>
      <Toolbar id="back-to-top-anchor" sx={{ minHeight: '0 !important' }} />
      <BoxContainerStyled sx={{ mt: '-2rem' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Title>{lessonData?.courseName}</Title>
          <CourseProgess courseProgress={courseProgress} />
        </Box>
        <Grid container columnSpacing={3}>
          <Grid item xs={isTheaterView ? 12 : 8}>
            <Box sx={{ p: '3rem', background: '#fff', borderRadius: '7px' }}>
              {firstPreviewUrl && <LectureView path={firstPreviewUrl} firstPreviewUrl />}
              {selectedLecture?.type === 'VIDEO' && !firstPreviewUrl && (
                <>
                  <LectureView
                    handleNoteAtTime={handleNoteAtTime}
                    focusInput={focusInput}
                    path={selectedLecture?.linkFileContent}
                    selectedLecture={selectedLecture}
                    focusNote={focusNote}
                    getProcessUserCourses={getProcessUserCourses}
                    setTabCourseDetail={setTabCourseDetail}
                    setFocusNote={setFocusNote}
                  />
                  <Box sx={{ paddingY: 1 }}>
                    <Typography textTransform="uppercase" fontWeight="bold">
                      {selectedLecture?.nameContent?.split('.')?.at(0)}
                    </Typography>
                  </Box>
                </>
              )}
              {(selectedLecture?.type === 'VIDEO' || firstPreviewUrl) && (
                <CourseDetailContent
                  previewCertificate={previewCertificate}
                  handleNoteAtTime={handleNoteAtTime}
                  inputRef={inputRef}
                  time={time}
                  setTabCourseDetail={setTabCourseDetail}
                  tabCourseDetail={tabCourseDetail}
                  setFocusNote={setFocusNote}
                />
              )}
            </Box>
          </Grid>
          {!isTheaterView && (
            <Grid item xs={4}>
              <LessonList />
            </Grid>
          )}
        </Grid>
      </BoxContainerStyled>
      <Flex justifyContent="flex-end">
        <Button onClick={handleFinish} variant="contained">
          Xong
        </Button>
      </Flex>
      {isTheaterView && <ExpandButton handleExpand={handleExpand} />}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
};

export default CourseDetail;

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.PropTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const ExpandButton = ({ handleExpand }) => {
  return (
    <Button
      variant="contained"
      startIcon={<NavigateBeforeIcon />}
      sx={{ position: 'absolute', top: '18rem', right: '0', minWidth: '2rem', padding: '0.5rem' }}
      onClick={handleExpand}
    />
  );
};
