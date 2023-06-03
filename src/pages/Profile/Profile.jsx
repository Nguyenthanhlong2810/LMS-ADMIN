import { Avatar, Box, TextField, Typography } from '@mui/material';
import { BackButton } from 'components';
import { FlexCol } from 'components/Layout/Layout';
import React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppSelector } from 'store/configureStore';

export default function Profile() {
  const user = useAppSelector((state) => state.user);
  const { register, reset } = useForm();

  useEffect(() => {
    reset(user);
  }, [user]);

  return (
    <FlexCol>
      <BackButton />
      <fieldset disabled>
        <Box p={4} display="flex">
          <Box textAlign="center">
            <Avatar
              src={user.avatarUrl}
              alt="User Avatar"
              sx={{ width: 97, height: 97, marginX: 8, marginY: 2 }}
            />
            <Typography fontWeight={300} fontSize={16} color="#5D5A6F">
              {user.name}
            </Typography>
          </Box>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            gap={4}
            maxWidth={422}
            width="100%">
            <TextField label="Họ tên" {...register('fullname')} />
            <TextField label="Email" {...register('email')} />
            <TextField label="Bộ phận" {...register('division')} />
            <TextField label="Phòng ban" {...register('department')} />
            <TextField label="Ngày sinh" {...register('birthdate')} />
            <TextField label="Số điện thoại" {...register('phoneNumber')} />
            <TextField label="Địa điểm" {...register('site')} />
            <TextField label="Vị trí" {...register('position')} />

            <TextField label="Tên người quản lý" {...register('managerName')} />
            <TextField label="Email người quản lý" {...register('managerEmail')} />
          </Box>
        </Box>
      </fieldset>
    </FlexCol>
  );
}
