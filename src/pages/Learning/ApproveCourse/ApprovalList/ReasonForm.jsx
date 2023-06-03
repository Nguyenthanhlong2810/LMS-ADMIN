import { Button, DialogActions, TextField } from '@mui/material';
import { FormControl } from 'components';
import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ApprovalListAPI } from 'apis/ApprovalList';
import { toast } from 'react-toastify';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS } from 'consts';

const ReasonForm = ({ onClose, isRefuse, idList, getListData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup
    .object({
      reason: yup.string().max(50).required()
    })
    .required();
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });
  const submitForm = async (values) => {
    setIsLoading(true);
    const data = {
      approveHistoryIds: idList,
      reason: values?.reason
    };
    if (isRefuse) {
      try {
        const res = await ApprovalListAPI.refuse(data);
        if (res.status === HTTP_STATUS.StatusOK) {
          setIsLoading(false);
          getListData();
          toast.success('Gửi thành công');
          onClose();
        }
      } catch (error) {
        toast.error(DEFAULT_ERROR_MESSAGE);
        setIsLoading(false);
      }
    } else {
      try {
        const res = await ApprovalListAPI.return(data);
        if (res.status === HTTP_STATUS.StatusOK) {
          setIsLoading(false);
          getListData();
          toast.success('Gửi thành công');
          onClose();
        }
      } catch (error) {
        toast.error(DEFAULT_ERROR_MESSAGE);
        setIsLoading(false);
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <FormControl>
        <TextField
          minRows={5}
          multiline
          {...register('reason')}
          error={!!errors?.name?.message}
          helperText={errors?.name?.message}
          InputProps={{
            maxLength: 1000
          }}
        />
      </FormControl>

      <DialogActions className="button-group" sx={{ justifyContent: 'center' }}>
        <Button
          variant="outlined"
          color="info"
          size="large"
          sx={{ color: 'black', borderColor: 'black' }}
          onClick={onClose}>
          Hủy
        </Button>

        <LoadingButton
          color="secondary"
          size="large"
          loading={isLoading}
          type="submit"
          variant="contained">
          Gửi
        </LoadingButton>
      </DialogActions>
    </form>
  );
};

export default ReasonForm;
