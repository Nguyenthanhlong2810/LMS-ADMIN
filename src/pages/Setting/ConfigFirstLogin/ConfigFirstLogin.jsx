import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { ConfigFirstLoginAPI } from 'apis/ConfigFirstLogin';
import { FreeTagInput } from 'components';
import Title from 'components/Title/Title';
import { useLoading } from 'hooks/LoadingProvider';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { schema } from './validation';

const defaultValues = { experiences: [], skills: [], skip: false };

const ConfigFirstLogin = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty, isValid }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });
  const { showLoading, hideLoading } = useLoading();
  const [site, setSite] = useState('vn');
  const initialConfig = useRef(defaultValues);

  useEffect(() => {
    getAllConfigFirstLogin();
  }, []);

  const getAllConfigFirstLogin = async () => {
    showLoading();
    try {
      const res = await ConfigFirstLoginAPI.getConfigFirstLogin();
      const { skills, experiences, skip } = res.data.data;
      const nameSkills = [...new Set(skills?.map((c) => c.name.trim()))];
      const nameExperiences = [...new Set(experiences?.map((c) => c.name.trim()))];
      initialConfig.current = {
        experiences: nameExperiences,
        skills: nameSkills,
        skip: Boolean(skip)
      };
      reset(initialConfig.current);
    } catch (error) {
      toast.error('Something error !');
    } finally {
      hideLoading();
    }
  };

  const onChangeSite = (e) => setSite(e.target.value);

  const onSubmit = async (values) => {
    try {
      await ConfigFirstLoginAPI.createConfigFirstLogin(values);
      toast.success('Màn hình câu hỏi lần đầu đăng nhập được cập nhật thành công.');
      initialConfig.current = values;
    } catch (error) {
      toast.error(
        <span
          dangerouslySetInnerHTML={{
            __html: error?.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại sau.'
          }}
        />
      );
    }
  };

  const onCancel = () => {
    reset(initialConfig.current);
  };
  const experiencesError =
    errors?.experiences?.message || errors?.experiences?.find((item) => item?.message)?.message;
  const skillsError =
    errors?.skills?.message || errors?.skills?.find((item) => item?.message)?.message;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            background: '#fff',
            padding: 2
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Kinh nghiệm làm việc</Title>
            {/* <Box>
            <ToggleButtonGroup
              color="primary"
              value={site}
              exclusive
              onChange={onChangeSite}
              size="small">
              <ToggleButton value="vn">Tiếng Việt</ToggleButton>
              <ToggleButton value="en">Tiếng Anh</ToggleButton>
            </ToggleButtonGroup>
          </Box> */}
          </Box>
          <Box>
            <Controller
              name="experiences"
              render={({ field: { value, onChange } }) => (
                <FreeTagInput
                  placeholder="Kinh nghiệm làm việc"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.experiences)}
                  helperText={experiencesError}
                />
              )}
              control={control}
            />
          </Box>
        </Box>

        <Box
          sx={{
            background: '#fff',
            padding: 2
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Các kỹ năng mà học viên hứng thú</Title>
          </Box>
          <Box>
            <Controller
              name="skills"
              render={({ field: { value, onChange } }) => (
                <FreeTagInput
                  placeholder="Kỹ năng hứng thú"
                  value={value}
                  onChange={onChange}
                  error={Boolean(errors.skills)}
                  helperText={skillsError}
                />
              )}
              control={control}
            />
          </Box>
        </Box>

        <Box
          sx={{
            background: '#fff',
            padding: 2
          }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Yêu cầu mong muốn của học viên</Title>
            <Box>
              <Controller
                name="skip"
                render={({ field }) => (
                  <FormControlLabel
                    control={<Checkbox onChange={field.onChange} checked={field.value} />}
                    label="Bỏ qua"
                  />
                )}
                control={control}
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginTop: 5 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onCancel}
            sx={{ color: '#fff', borderColor: 'black', background: '#66788A' }}>
            Hủy
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!isDirty && isValid}
            color="primary"
            size="large">
            Lưu
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ConfigFirstLogin;
