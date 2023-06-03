import { Box, Button, Divider } from '@mui/material';
import { AdminAPI } from 'apis/Admin';
import { CourseAPI } from 'apis/Courses';
import { Title, BackButton } from 'components';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormBody from '../CourseForm/components/FormBody/FormBody';
import { FlexCol, FlexRow } from '../../../../components/Layout/Layout';
import { COURSE_TYPE, defaultValue } from '../CourseForm/config';
import { getFormValueFromData } from '../CourseForm/utils';
import EditIcon from '@mui/icons-material/Edit';

export default function CourseDetail() {
  const { id } = useParams();

  const [courseCategory, setCourseCategory] = useState({
    courseType: [],
    passStatus: [],
    securityArea: [],
    trainingType: []
  });
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: { ...defaultValue, type: COURSE_TYPE.OFFER }
  });

  const getCourseCategory = async () => {
    try {
      const res = await AdminAPI.getCourseCategory('vn');
      if (res.status === HTTP_STATUS.StatusOK) {
        const { data } = res;
        setCourseCategory(data);
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const getCourseById = async (id) => {
    try {
      showLoading();
      const res = await CourseAPI.getById(id);
      if (res && res.status === HTTP_STATUS.StatusOK) {
        const values = getFormValueFromData(res.data.data);
        form.reset(values);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  useEffect(() => {
    getCourseCategory();
  }, []);

  useEffect(() => {
    if (id) {
      getCourseById(id);
    }
  }, [id]);

  return (
    <>
      <FlexCol
        sx={{
          gap: 2
        }}>
        <BackButton />
        <Box
          sx={{
            background: '#fff',
            padding: 2
          }}>
          <FlexRow justifyContent="space-between" alignItems="center">
            <Title>Chi tiết khóa học</Title>
            {!form.getValues('hadLearnerStudying') && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                type="submit"
                sx={{
                  height: 'min-content'
                }}
                onClick={() => navigate('/learning/courses/update/' + id)}>
                Chỉnh sửa khóa học
                <EditIcon fontSize="12px" />
              </Button>
            )}
          </FlexRow>
          <Divider />
          <form>
            <fieldset disabled>
              <FormBody form={form} courseCategory={courseCategory} disabled isActive={true} />
            </fieldset>
          </form>
        </Box>
      </FlexCol>
    </>
  );
}
