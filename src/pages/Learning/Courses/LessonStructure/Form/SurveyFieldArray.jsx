import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material';
import { FormControl, InputNumber } from 'components';
import SearchIcon from '@mui/icons-material/Search';
import { StyledHorizonLine } from './style';
import { Flex } from '../../../../../components/Layout/Layout';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SurveyItemContainer = styled('div')({
  padding: '1rem',
  marginBottom: 5,
  background: '#FAFAFA',
  alignItems: 'center'
});

export default function SurveyFieldArray({
  formState: { errors },
  control,
  register,
  watch,
  onOpenSurveyModal
}) {
  const { fields, remove } = useFieldArray({
    control,
    name: 'surveySettings'
  });
  const watchSurveySettings = watch('surveySettings');
  return (
    <>
      <StyledHorizonLine />
      <FormControl label="" padding={'1rem 0'}>
        <div className="d-flex">
          <TextField
            placeholder="Tìm kiếm khảo sát"
            disabled
            className="flex-1"
            onClick={onOpenSurveyModal}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>

        {fields?.map((item, index) => {
          return (
            <SurveyItemContainer key={item.id}>
              <Flex justifyContent="space-between" alignItems="center">
                <Typography fontWeight="bold">{watchSurveySettings[index]?.surveyName}</Typography>
                <IconButton
                  onClick={() => remove(index)}
                  component="span"
                  color="error"
                  sx={{ float: 'right', background: 'transparent' }}>
                  <HighlightOffIcon />
                </IconButton>
              </Flex>

              <FormControl
                label="Gán sau"
                required
                flexFlow="row"
                alignItems="center"
                titleWidth="110px">
                <InputNumber
                  {...register(`surveySettings.${index}.assignAfter`, {
                    onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                  })}
                  placeholder="Nhập số nguyên"
                  sx={{ width: 180 }}
                  type="number"
                  error={!!errors?.surveySettings?.[index]?.assignAfter}
                  helperText={errors?.surveySettings?.[index]?.assignAfter?.message}
                />
                <div style={{ color: '#ADABAB' }}>Ngày kể từ ngày hoàn thành khóa học</div>
              </FormControl>
              <FormControl
                label="Cho phép"
                required
                flexFlow="row"
                type="number"
                alignItems="center"
                titleWidth="110px">
                <InputNumber
                  {...register(`surveySettings.${index}.allowNumberDay`, {
                    onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                  })}
                  placeholder="Nhập số nguyên"
                  sx={{ width: '180px' }}
                  type="number"
                  error={!!errors?.surveySettings?.[index]?.allowNumberDay}
                  helperText={errors?.surveySettings?.[index]?.allowNumberDay?.message}
                />
                <div style={{ color: '#ADABAB' }}>Ngày để hoàn thành</div>
              </FormControl>
            </SurveyItemContainer>
          );
        })}
      </FormControl>
    </>
  );
}
