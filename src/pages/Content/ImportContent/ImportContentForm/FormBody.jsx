import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlexRow, FormLayout, HalfBox, TextHelper } from 'components/Layout/Layout';
import { FormControl, InputSelect, InputUpload } from 'components';
import { Box, FormControlLabel, MenuItem, Radio, RadioGroup, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import {
  ACCEPT_DOCUMENT,
  ACCEPT_VIDEO,
  ACCEPT_AICC_SCROM,
  CONTENT_TYPE,
  DOCUMENT_ACCEPT,
  VIDEO_ACCEPT,
  AICC_SCROM_ACCEPT,
  MAX_SIZE,
  EXAMPLE_PAGE,
  EXAMPLE_TIME,
  LIST_TYPE_CONTENT
} from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecurityArea } from 'store/reducers/SecurityAreaSlice';
import { TextHelperError } from 'components/InputUpload/InputUploadSingle';

const TEXT_UPLOAD_CONDITION = {
  DOCUMENT: `Hệ thống chỉ cho phép định dạng ${ACCEPT_DOCUMENT.join(', ')}.`,
  VIDEO: `Hệ thống chỉ cho phép định dạng ${ACCEPT_VIDEO.join(', ')} tối đa ${MAX_SIZE}MB.`,
  AICCSCROM: `Hệ thống chỉ cho phép định dạng ${ACCEPT_AICC_SCROM.join(', ')} tối đa ${MAX_SIZE}MB.`
};

function FormBody({ form, onChangeFile, clearUploadFiles, isUpdate }) {
  const {
    register,
    control,
    watch,
    formState: { errors },
    clearErrors,
    reset,
    getValues
  } = form;

  const watchContentType = watch('type');
  const dispatch = useDispatch();
  const { securityAreas } = useSelector((state) => state.SecurityArea);

  const onChangeContentType = (contentType) => {
    reset({
      type: contentType,
      nameContent: '',
      timeLong: getValues('timeLong'),
      code: getValues('code'),
      nameSecurityArea: getValues('nameSecurityArea')
    });
    clearUploadFiles();
    clearErrors();
  };

  const switchContentType = useMemo(() => {
    switch (watchContentType) {
      case CONTENT_TYPE.DOCUMENT:
        return {
          textCondition: TEXT_UPLOAD_CONDITION.DOCUMENT,
          contentAccept: DOCUMENT_ACCEPT,
          contentAcceptText: ACCEPT_DOCUMENT
        };
      case CONTENT_TYPE.VIDEO:
        return {
          textCondition: TEXT_UPLOAD_CONDITION.VIDEO,
          contentAccept: VIDEO_ACCEPT,
          contentAcceptText: ACCEPT_VIDEO,
          maxSize: MAX_SIZE
        };
      default:
        return {
          textCondition: TEXT_UPLOAD_CONDITION.AICCSCROM,
          contentAccept: AICC_SCROM_ACCEPT,
          contentAcceptText: ACCEPT_AICC_SCROM,
          maxSize: MAX_SIZE
        };
    }
  }, [watchContentType]);
  useEffect(() => {
    if (securityAreas.length === 0) {
      dispatch(fetchSecurityArea());
    }
  }, []);

  return (
    <>
      <FormLayout>
        <FormControl>
          <Controller
            name="type"
            control={control}
            render={({ field: { value } }) => (
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                row
                value={value}
                onChange={(_, value) => onChangeContentType(value)}
                sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {LIST_TYPE_CONTENT.map((item) => (
                  <FormControlLabel
                    value={item.value}
                    key={item.value}
                    control={<Radio />}
                    disabled={isUpdate}
                    label={item.label}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl label="Chọn nội dung" required>
          <Controller
            name="nameContent"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputUpload
                placeholder="Tải lên nội dung"
                value={value}
                disabled={isUpdate}
                accept={switchContentType?.contentAccept}
                acceptText={switchContentType?.contentAcceptText}
                textCondition={switchContentType?.textCondition}
                onChange={(file) => onChangeFile(file, onChange)}
                maxSize={switchContentType?.maxSize}
                error={Boolean(errors.nameContent)}
                helperText={errors.nameContent?.message}
              />
            )}
          />
        </FormControl>

        <FlexRow>
          <HalfBox>
            <FormControl label="thời lượng" required>
              <Box display="flex">
                <TextField
                  {...register('timeLong')}
                  type={watchContentType === CONTENT_TYPE.DOCUMENT ? 'number' : 'text'}
                  fullWidth
                  hiddenLabel
                  inputProps={{
                    maxLength: watchContentType === CONTENT_TYPE.DOCUMENT ? 4 : 9
                  }}
                  error={Boolean(errors.timeLong)}
                />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {errors && <TextHelperError>{errors.timeLong?.message}</TextHelperError>}
                <TextHelper>
                  {watchContentType === CONTENT_TYPE.DOCUMENT ? EXAMPLE_PAGE : EXAMPLE_TIME}
                </TextHelper>
              </Box>
            </FormControl>
          </HalfBox>
          <HalfBox>
            <FormControl label="Mã nội dung quản lý" required>
              <Box display="flex">
                <TextField
                  {...register('code')}
                  fullWidth
                  hiddenLabel
                  inputProps={{
                    maxLength: 20
                  }}
                  error={Boolean(errors.code)}
                  helperText={errors.code?.message}
                />
              </Box>
            </FormControl>
          </HalfBox>
        </FlexRow>

        {isUpdate && (
          <FormControl label="Mã nội dung hệ thống">
            <Box display="flex">
              <TextField {...register('codeSystem')} fullWidth hiddenLabel disabled={isUpdate} />
            </Box>
          </FormControl>
        )}

        <FormControl label="miền bảo mật" required>
          <InputSelect
            name="nameSecurityArea"
            control={control}
            errorMes={errors?.nameSecurityArea?.message}
            placeholder="Chọn miền bảo mật"
            disabled={isUpdate}>
            {securityAreas.map((securityArea, index) => (
              <MenuItem key={index} value={securityArea.code}>
                {securityArea.name}
              </MenuItem>
            ))}
          </InputSelect>
        </FormControl>
      </FormLayout>
    </>
  );
}

FormBody.propTypes = {};

export default FormBody;
