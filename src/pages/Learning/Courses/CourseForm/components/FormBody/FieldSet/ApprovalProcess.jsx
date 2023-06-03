import { FormControlLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import { FormControl } from 'components';
import { FlexRow, HalfBox, TextHelperError } from 'components/Layout/Layout';
import React, { useRef, useState } from 'react';
import { Controller } from 'react-hook-form';

export default function ApprovalProcess({ form, courseCategory, disabled }) {
  const {
    control,
    watch,
    formState: { errors }
  } = form;
  const watchCourseRegistrationApproval = watch('requireApproval');
  const watchCourseCancelApproval = watch('requireCancel');
  const approvalSelectComponent = useRef(null);
  const cancelSelectComponent = useRef(null);
  const [position, setPosition] = useState({ approvalX: 0, cancelX: 0, y: 0 });

  const setPositionSelect = () => {
    if (approvalSelectComponent.current && cancelSelectComponent.current) {
      setPosition({
        approvalX: approvalSelectComponent.current.getBoundingClientRect().left,
        cancelX: cancelSelectComponent.current.getBoundingClientRect().left,
        y: approvalSelectComponent.current.getBoundingClientRect().top - 215
      });
    }
  };

  return (
    <FlexRow>
      <HalfBox>
        <FormControl label="yêu cầu phê duyệt đăng ký khóa học" paddingLeft="0">
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
                onOpen={setPositionSelect}
                ref={approvalSelectComponent}
                value={value ?? ''}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      top: `${position.y}px !important`,
                      left: `${position.approvalX}px !important`
                    }
                  }
                }}
                style={{ maxWidth: '27vw', minWidth: '100%' }}
                onChange={onChange}
                disabled={disabled || watchCourseRegistrationApproval !== 'true'}
                error={Boolean(errors.approveName)}>
                {courseCategory?.requestApproveUpdate?.map((c) => (
                  <MenuItem style={{ fontSize: '14px' }} key={c.id} value={c?.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
          />
          {errors.approveName && <TextHelperError>{errors.approveName?.message}</TextHelperError>}
        </FormControl>
      </HalfBox>
      <HalfBox display="flex">
        <FormControl label="yêu cầu phê duyệt hủy đăng ký khóa học" paddingRight="0">
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
                onOpen={setPositionSelect}
                value={value ?? ''}
                style={{ maxWidth: '27vw', minWidth: '100%' }}
                ref={cancelSelectComponent}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      top: `${position.y}px !important`,
                      left: `${position.cancelX}px !important`
                    }
                  }
                }}
                onChange={onChange}
                disabled={disabled || watchCourseCancelApproval !== 'true'}
                error={Boolean(errors.cancelName)}>
                {courseCategory?.cancelApproveUpdate?.map((c) => (
                  <MenuItem style={{ fontSize: '14px' }} key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
          />
          {errors.cancelName && <TextHelperError>{errors.cancelName?.message}</TextHelperError>}
        </FormControl>
      </HalfBox>
    </FlexRow>
  );
}
