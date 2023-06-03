import { Autocomplete, Button, DialogActions, TextField } from '@mui/material';
import { FormControl } from 'components';
import React, { useCallback, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CategoryTrainingAPI } from 'apis/CategoryTraining';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { DEFAULT_ERROR_MESSAGE } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';

const schema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required()
      .max(50)
      .test(
        'notAllowSpecialCharactersNumber',
        'Hệ thống chỉ cho phép nhập tối đa 50 ký tự hoa thường. Cấm số, ký tự đặc biệt',
        (value) => !/[0-9`~,.<>;':"/[\]|{}()=_+-@#$%^&*?!"]/.test(value)
      ),
    no: yup
      .number()
      .transform((value) => (isNaN(value) ? undefined : value))
      .nullable()
      .min(0)
      .integer()
      .required()
  })
  .required();

const CreateUpdateProgram = ({ onClose, detailCategory, getListData, language }) => {
  const [parentList, setParentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const confirm = useConfirmDialog();

  const defaultValues = detailCategory
    ? {
        ...detailCategory,
        parent: detailCategory.parent
          ? { id: detailCategory.parent, name: detailCategory.parentName }
          : null
      }
    : {};
  const {
    handleSubmit,
    control,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    getListCategory();
  }, []);

  const submitForm = async (values) => {
    values.parent = values.parent?.id;
    delete values.parentName;
    setIsLoading(true);
    try {
      if (detailCategory) {
        await CategoryTrainingAPI.update({ ...values, language, id: detailCategory.id });
      } else {
        await CategoryTrainingAPI.create({ ...values, language });
      }
      getListData();
      toast.success('Lưu thành công');
      onClose();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      const errorMes =
        error?.response?.data.message === 'Duplicate name'
          ? 'Tên hạng mục này đã tồn tại. Xin vui lòng nhập tên mới'
          : error?.response?.data.message;

      toast.error(errorMes || DEFAULT_ERROR_MESSAGE);
    }
  };

  const onCancel = () => {
    confirm({
      content: detailCategory
        ? 'Bạn có chắc chắn muốn hủy sửa hạng mục đào tạo không?'
        : 'Bạn có chắc chắn muốn hủy tạo hạng mục đào tạo mới không?',
      onConfirm: () => {
        onClose();
      }
    });
  };
  const getListCategory = async () => {
    const { data } = await CategoryTrainingAPI.getAll();
    setParentList(data.data);
  };

  // const debounceDropDown = useCallback(
  //   debounce(async (value) => {
  //     if (value) {
  //       const { data } = await CategoryTrainingAPI.getCategoryParent(value);
  //       setParentList(data.data);
  //     }
  //   }, 500),
  //   []
  // );
  // const onChangeDebounce = () => (e, value) => {
  //   debounceDropDown(value);
  // };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormControl label="Tên hạng mục" required>
        <TextField
          {...register('name')}
          error={!!errors?.name?.message}
          helperText={errors?.name?.message}
          placeholder="Nhập ký tự"
        />
      </FormControl>
      <FormControl label="Hạng mục cha">
        <Controller
          name="parent"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Autocomplete
              value={value}
              onChange={(_, v) => onChange(v)}
              // value={field.value ?? ''}
              options={parentList}
              // onInputChange={onChangeDebounce()}
              // onChange={(e, value) => field.onChange(value)}
              // isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} placeholder="Chọn từ danh sách" />}
            />
          )}
        />
      </FormControl>
      <FormControl label="Thứ tự" required>
        <TextField
          {...register('no')}
          error={!!errors?.no?.message}
          helperText={errors?.no?.message}
          inputProps={{ min: 0 }}
          type="number"
          placeholder="Nhâp số"
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
          type="submit"
          variant="contained">
          Lưu
        </LoadingButton>
      </DialogActions>
    </form>
  );
};

export default CreateUpdateProgram;
