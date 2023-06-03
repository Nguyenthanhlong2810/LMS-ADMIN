import React, { useState } from 'react';
import { FormControl } from 'components';
import { FormControlLabel, Radio, RadioGroup, TextField, Box, Button } from '@mui/material';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { PROGRAM_TYPE } from 'consts';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import ApprovalProcess from './ApprovalProcess';
const ApprovalForm = ({ disabled, courseCategory }) => {
  const { handleSubmit, register, control, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const onSaveSurvey = () => {
    // handleSubmit(submitForm)();
  };
  const onCancel = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn hủy tạo không?',
      onConfirm: () => {
        navigate(-1);
      }
    });
  };
  return (
    <form>
      <FormControl label="Loại">
        <Controller
          name="requireApproval"
          render={({ field: { value, onChange } }) => (
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              row
              value={value}
              onChange={onChange}>
              {PROGRAM_TYPE.map((c) => (
                <FormControlLabel
                  key={c.value}
                  value={c.value}
                  control={<Radio />}
                  label={c.label}
                />
              ))}
            </RadioGroup>
          )}
          control={control}
        />
      </FormControl>
      <FormControl label="Kế hoạch">
        <TextField {...register('name')} placeholder="Nhập tên hạng mục" />
      </FormControl>
      <ApprovalProcess
        control={control}
        watch={watch}
        courseCategory={courseCategory}
        disabled={disabled}
      />
      <Box sx={{ padding: 2, gap: 1, textAlign: 'right' }}>
        <Button
          variant="outlined"
          color="info"
          size="large"
          sx={{ color: 'black', borderColor: 'black', marginRight: '8px' }}
          onClick={onCancel}>
          Hủy
        </Button>

        <LoadingButton
          color="secondary"
          size="large"
          variant="contained"
          loading={isLoading}
          onClick={onSaveSurvey}>
          Lưu
        </LoadingButton>
      </Box>
    </form>
  );
};
export default ApprovalForm;
