import React from 'react';

const CourseDetailOverview = ({ overview }) => {
  return (
    <>
      <div style={{ fontWeight: '700', lineHeight: '150%', padding: '1rem 0 0.563rem 0' }}>
        Tổng quan
      </div>
      <div style={{ lineHeight: '1.575rem', whiteSpace: 'pre-line' }}>{overview}</div>
    </>
  );
};

export default CourseDetailOverview;
