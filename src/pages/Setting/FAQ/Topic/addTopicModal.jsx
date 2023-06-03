import { DEFAULT_ERROR_MESSAGE, TOPIC_STATUS } from 'consts/index';

import React, { useState } from 'react';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import DialogActions from '@mui/material/DialogActions';
import { FormControl, Modal } from 'components';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { TopicAPI } from 'apis/FQA/topicApi';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormControlLabel, TextField } from '@mui/material';

const addNewTitle = 'Thêm mới chủ đề câu hỏi thường gặp';
const updateTitle = 'Chỉnh sửa chủ đề câu hỏi thường gặp';

const validationSchema = Yup.object({
  name: Yup.string().required().max(200).matches(/\S/)
});
const TopicModal = (props) => {
  const { item, isOpen, onClose, language, refreshTopic } = props;
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues = item
    ? {
        ...item,
        statusTopic: item?.statusTopic === TOPIC_STATUS.apply ? true : false
      }
    : { name: '', statusTopic: false };
  const {
    handleSubmit,
    register,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  });

  const onSubmit = async (values) => {
    const { name, statusTopic } = values;
    setIsLoading(true);
    const reqValues = {
      key: language,
      name,
      statusTopic: statusTopic ? TOPIC_STATUS.apply : TOPIC_STATUS.notApply
    };
    try {
      if (item?.id) {
        await TopicAPI.update({
          id: item.id,
          ...reqValues
        });
      } else {
        await TopicAPI.create(reqValues);
      }
      toast.success('Lưu thành công');
      refreshTopic();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }

    setIsLoading(false);
  };
  return (
    <Modal
      isOpen={isOpen}
      title={item ? updateTitle : addNewTitle}
      onClose={onClose}
      fullWidth={false}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Chủ đề" required>
          <TextField
            {...register('name')}
            error={!!errors?.name?.message}
            helperText={errors?.name?.message}
            inputProps={{
              maxLength: 200
            }}
          />
        </FormControl>

        <Controller
          name="statusTopic"
          render={({ field }) => (
            <FormControlLabel
              className="ml-1"
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Áp Dụng"
            />
          )}
          control={control}
        />
        <DialogActions className="button-group" sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="info"
            size="large"
            sx={{ color: 'black', borderColor: 'black' }}
            onClick={onClose}>
            Hủy
          </Button>
          <LoadingButton type="submit" size="large" loading={isLoading} variant="contained">
            Lưu
          </LoadingButton>
        </DialogActions>
      </form>
    </Modal>
  );
};
TopicModal.propTypes = {
  item: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};
export default TopicModal;
