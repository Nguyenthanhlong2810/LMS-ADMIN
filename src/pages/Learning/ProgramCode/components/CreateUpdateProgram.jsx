import { Autocomplete, Button, DialogActions, MenuItem, Select, TextField } from '@mui/material';
import { FormControl } from 'components';
import React, { useCallback, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProgramAPI } from 'apis/ProgramCode';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { listYear } from './CreateUpdateProgram.const';
import { DEFAULT_ERROR_MESSAGE } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';

const schema = yup
  .object({
    groupCode: yup.string().trim().required(),
    firstGroupCode: yup.string().trim().required(),
    programName: yup.string().trim().max(50).required(),
    shortProgramName: yup.string().trim().required(),
    ordinalNumber: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .min(0)
      .integer()
      .required(),
    key: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .min(0)
      .integer()
      .required()
  })
  .required();
const CreateUpdateProgram = ({ onClose, detailProgram, getListData, language }) => {
  const confirm = useConfirmDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [dropDown, setDropDown] = useState({
    groupCode: [],
    firstGroupCode: [],
    secondGroupCode: [],
    programName: [],
    shortProgramName: []
  });

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: detailProgram || { year: dayjs().year(), language: 'vn' },
    resolver: yupResolver(schema)
  });

  const submitForm = async (values) => {
    setIsLoading(true);
    try {
      if (detailProgram) {
        await ProgramAPI.update({ ...values, language, id: detailProgram.id });
      } else {
        await ProgramAPI.create({ ...values, language });
      }
      getListData();
      toast.success('Lưu thành công');
      onClose();
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  const debounceDropDown = useCallback(
    debounce(async (formKey, value) => {
      if (value) {
        const response = await ProgramAPI.autoComplete({ [formKey]: value });
        setDropDown((prevState) => ({
          ...prevState,
          [formKey]: response.data.map((item) => item[formKey])
        }));
        setValue(formKey, value, { shouldValidate: true });
      }
    }, 350),
    []
  );
  const onChangeDebounce = (formKey) => (e, value) => {
    debounceDropDown(formKey, value);
  };

  const onCancel = () => {
    confirm({
      content: detailProgram
        ? 'Bạn có chắc chắn muốn hủy sửa mã chương trình không?'
        : 'Bạn có chắc chắn muốn hủy tạo mã chương trình mới không?',
      onConfirm: () => {
        onClose();
      }
    });
  };

  return (
    <div>
      <FormControl label="Nhóm chương trình" required>
        <Controller
          name="groupCode"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={dropDown.groupCode}
              onInputChange={onChangeDebounce('groupCode')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors?.groupCode?.message}
                  helperText={errors?.groupCode?.message}
                  placeholder="Nhập nội dung"
                />
              )}
            />
          )}
        />
      </FormControl>
      <FormControl label="Mã nhóm 1" required>
        <Controller
          name="firstGroupCode"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={dropDown.firstGroupCode}
              onInputChange={onChangeDebounce('firstGroupCode')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors?.firstGroupCode?.message}
                  helperText={errors?.firstGroupCode?.message}
                  placeholder="Nhập nội dung"
                />
              )}
            />
          )}
        />
      </FormControl>
      <FormControl label="Mã nhóm 2">
        <Controller
          name="secondGroupCode"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={dropDown.secondGroupCode}
              onInputChange={onChangeDebounce('secondGroupCode')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors?.subject?.message}
                  helperText={errors?.subject?.message}
                  placeholder="Nhập nội dung"
                />
              )}
            />
          )}
        />
      </FormControl>

      <FormControl label="Chương trình" required>
        <Controller
          name="programName"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={dropDown.programName}
              onInputChange={onChangeDebounce('programName')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors?.programName?.message}
                  helperText={errors?.programName?.message}
                  placeholder="Nhập nội dung"
                />
              )}
            />
          )}
        />
      </FormControl>
      <FormControl label="Thứ tự" required>
        <TextField
          {...register('ordinalNumber')}
          error={!!errors?.ordinalNumber?.message}
          helperText={errors?.ordinalNumber?.message}
          inputProps={{ min: 0 }}
          type="number"
          placeholder="Nhập số nguyên"
        />
      </FormControl>
      <FormControl label="Tên chương trình viết tắt" required>
        <Controller
          name="shortProgramName"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              freeSolo
              options={dropDown.shortProgramName}
              onInputChange={onChangeDebounce('shortProgramName')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={!!errors?.shortProgramName?.message}
                  helperText={errors?.shortProgramName?.message}
                  placeholder="Nhập nội dung"
                />
              )}
            />
          )}
        />
      </FormControl>
      <FormControl label="Năm" required>
        <Controller
          name="year"
          control={control}
          render={({ field }) => (
            <Select {...field}>
              {listYear.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FormControl label="Khóa" required>
        <TextField
          {...register('key')}
          error={!!errors?.key?.message}
          helperText={errors?.key?.message}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          type="number"
          placeholder="Nhập số nguyên"
        />
      </FormControl>
      <DialogActions className="button-group" sx={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          color="info"
          size="large"
          sx={{ color: 'black', borderColor: 'black' }}
          onClick={onCancel}>
          Hủy
        </Button>

        <LoadingButton
          color="secondary"
          size="large"
          loading={isLoading}
          onClick={handleSubmit(submitForm)}
          variant="contained">
          Lưu
        </LoadingButton>
      </DialogActions>
    </div>
  );
};

export default CreateUpdateProgram;
