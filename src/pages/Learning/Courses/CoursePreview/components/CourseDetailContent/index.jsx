import { TabMenu } from 'components/TabMenu';
import CourseDetailCertificate from './components/CourseDetailCertificate';
import CourseDetailNote from './components/CourseDetailNote';
import CourseDetailOverview from './components/CourseDetailOverview';
import CourseDetailRating from './components/CourseDetailRating';
import { useSelector } from 'react-redux';
import React from 'react';

const CourseDetailContent = ({
  previewCertificate,
  handleNoteAtTime,
  inputRef,
  time,
  setFocusNote,
  tabCourseDetail,
  setTabCourseDetail
}) => {
  const lessonData = useSelector((state) => state.courseDetail.lessonData);

  const tabsMenu = [
    {
      label: 'Tổng quan',
      component: <CourseDetailOverview overview={lessonData?.summary} />,
      disabled: false
    },
    {
      label: 'Xếp hạng và nhận xét',
      component: <CourseDetailRating />,
      disabled: true
    },
    {
      label: 'Hỏi đáp',
      component: <CourseDetailRating />,
      disabled: true
    },
    {
      label: 'Ghi chú',
      component: (
        <CourseDetailNote
          handleNoteAtTime={handleNoteAtTime}
          inputRef={inputRef}
          time={time}
          setFocusNote={setFocusNote}
        />
      ),
      disabled: true
    },
    {
      label: 'Chứng chỉ',
      component: <CourseDetailCertificate previewCertificate={previewCertificate} />,
      disabled: true
    }
  ];
  return (
    <TabMenu tabsMenu={tabsMenu} setTabValue={setTabCourseDetail} tabValue={tabCourseDetail} />
  );
};

export default CourseDetailContent;
