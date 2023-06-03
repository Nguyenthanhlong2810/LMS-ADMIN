import { Box, Divider } from '@mui/material';
import { Title } from 'components';
import React from 'react';
import RegistrationSetting from './FieldSet/RegistrationSetting';
import ApprovalProcess from './FieldSet/ApprovalProcess';
import CourseInfo from './FieldSet/CourseInfo';
import { FormLayout } from 'components/Layout/Layout';

export default function FormBody({
  form,
  courseCategory,
  onChangeFile,
  onChangeFilePreview,
  disabled
}) {
  return (
    <FormLayout>
      <CourseInfo
        form={form}
        onChangeFile={onChangeFile}
        courseCategory={courseCategory}
        onChangeFilePreview={onChangeFilePreview}
        site={'vn'}
        disabled={disabled}
      />

      <Box sx={{ padding: '1rem 0' }}>
        <Title>cài đặt đăng ký</Title>
        <Divider />
        <RegistrationSetting form={form} disabled={disabled} />
      </Box>

      <Box sx={{ padding: '1rem 0' }}>
        <Title>quy trình phê duyệt</Title>
        <Divider />
        <ApprovalProcess form={form} courseCategory={courseCategory} disabled={disabled} />
      </Box>

      {/* <FlexRow padding={2}>
        <HalfBox>
          <Title>xếp hạng khóa học</Title>
          <Divider />
          <FormControl label="Cho phép học viên đánh giá">
            <Controller
              name="rate"
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
              control={form.control}
            />
          </FormControl>
        </HalfBox>
        <HalfBox>
          <Title>trạng thái khóa học</Title>
          <Divider />
          <FormControl label="Đang hoạt động">
            <Controller
              name="status"
              render={({ field: { value, onChange } }) => (
                <Switch checked={value} onChange={onChange} />
              )}
              control={form.control}
            />
          </FormControl>
        </HalfBox>
      </FlexRow> */}
      {/* <Box sx={{ padding: '1rem 0' }}>
        <Title>trạng thái khóa học</Title>
        <Divider />
        <FormControl label="Đang hoạt động" paddingLeft="0">
          <Controller
            name="status"
            render={({ field: { value, onChange } }) => (
              <Switch checked={value} onChange={onChange} />
            )}
            control={form.control}
          />
        </FormControl>
      </Box> */}
    </FormLayout>
  );
}
