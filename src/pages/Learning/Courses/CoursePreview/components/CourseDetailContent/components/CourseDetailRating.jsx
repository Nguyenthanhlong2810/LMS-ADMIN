import { Box } from '@mui/material';
import React from 'react';
const CourseDetailRating = () => {
  return (
    <Box>
      <div style={{ fontWeight: '700', lineHeight: '150%', padding: '1rem 0 0.563rem 0' }}>
        Tổng quan
      </div>
      <div style={{ lineHeight: '1.575rem', whiteSpace: 'pre-line' }}>
        Sau khóa học, các bạn có thể:
        <br /> Tìm thấy lời giải đáp cho câu hỏi nên bắt đầu đi vào con đường làm nhân viên kiểm thử
        như thé nào?
        <br /> Nắm bắt cơ hội nghề nghiệp trong lĩnh vực này
        <br /> Có kiến thức cơ bản về kiểm thử phẩn mềm <br /> Thi lấy chứng chỉ ISTQB
      </div>
    </Box>
  );
};

export default CourseDetailRating;
