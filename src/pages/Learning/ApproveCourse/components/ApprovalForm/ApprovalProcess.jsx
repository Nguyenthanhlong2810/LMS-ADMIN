import { FormControlLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import { FormControl } from 'components';
import React from 'react';
import { Controller } from 'react-hook-form';
import { FlexRow, HalfBox } from './Layout';

export default function ApprovalProcess({ control, watch, courseCategory, disabled }) {
  const watchCourseRegistrationApproval = watch('requireApproval');
  const watchCourseCancelApproval = watch('requireCancel');

  console.log({ watchCourseRegistrationApproval, watchCourseCancelApproval });
  return (
    <FlexRow>
      <HalfBox>
        <FormControl label="yêu cầu phê duyệt đăng ký khóa học">
          <Controller
            name="requireApproval"
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                value={value}
                onChange={onChange}>
                <FormControlLabel value="true" control={<Radio />} label="Có" />
                <FormControlLabel value="false" control={<Radio />} label="Không" />
              </RadioGroup>
            )}
            control={control}
          />

          <Controller
            name="approveName"
            render={({ field: { value, onChange } }) => (
              <Select
                value={value ?? ''}
                onChange={onChange}
                disabled={disabled || watchCourseRegistrationApproval !== 'true'}>
                {courseCategory?.requestApproveUpdate?.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
          />
        </FormControl>
      </HalfBox>
      <HalfBox display="flex">
        <FormControl label="yêu cầu phê duyệt hủy đăng ký khóa học">
          <Controller
            name="requireCancel"
            render={({ field: { value, onChange } }) => (
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={onChange}
                row>
                <FormControlLabel value="true" control={<Radio />} label="Có" />
                <FormControlLabel value="false" control={<Radio />} label="Không" />
              </RadioGroup>
            )}
            control={control}
          />
          <Controller
            name="cancelName"
            render={({ field: { value, onChange } }) => (
              <Select
                value={value ?? ''}
                onChange={onChange}
                disabled={disabled || watchCourseCancelApproval !== 'true'}>
                {courseCategory?.cancelApproveUpdate?.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
          />
        </FormControl>
      </HalfBox>
    </FlexRow>
  );
}
