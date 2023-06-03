import { Box, Button, Divider } from '@mui/material';
import { Title, BackButton } from 'components';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS } from 'consts';
import React, { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { COURSE_TYPE, defaultValue } from './config';
import { AdminAPI } from 'apis/Admin';
import { useEffect } from 'react';
import { schema } from './validation';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseAPI } from 'apis/Courses';
import { useLoading } from 'hooks/LoadingProvider';
import { formatSubmitData, getFormValueFromData, isFileValid } from './utils';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import FormBody from './components/FormBody/FormBody';
import { useForm } from 'react-hook-form';
import { Flex, FlexCol } from 'components/Layout/Layout';

export default function CourseForm() {
  const { id } = useParams();

  const isUpdate = Boolean(id);

  const [courseCategory, setCourseCategory] = useState({
    courseType: [],
    passStatus: [],
    securityArea: [],
    trainingType: []
  });
  const fileListRef = useRef({});
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const confirm = useConfirmDialog();

  const form = useForm({
    defaultValues: { ...defaultValue, type: COURSE_TYPE.OFFER },
    resolver: yupResolver(schema)
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

  const createCourse = async (data) => {
    try {
      showLoading();
      const { submitData, files } = formatSubmitData(data, fileListRef.current);
      const res = await CourseAPI.create(submitData, Object.values(files));
      hideLoading();
      if (res.status === HTTP_STATUS.StatusOK) {
        const newId = res.data?.data?.id;
        if (newId) {
          toast.success('Tạo khóa học mới thành công');
          navigate('/learning/courses-overview/' + newId);
        } else {
          toast.error(res?.data?.message);
        }
      }
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const updateCourse = async (data) => {
    try {
      showLoading();
      const { submitData, files } = formatSubmitData(data, fileListRef.current);
      const res = await CourseAPI.update(submitData, Object.values(files));
      hideLoading();
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Cập nhật khóa học thành công');
        navigate('/learning/courses-overview/' + submitData.id);
      }
    } catch (error) {
      hideLoading();
      toast.error(error?.response?.data?.data);
    }
  };

  const onSubmit = async (data) => {
    if (isUpdate) {
      updateCourse(data);
    } else {
      createCourse(data);
    }
  };

  const onCancel = () => {
    confirm({
      content: isUpdate
        ? 'Bạn có chắc chắn muốn hủy sửa khóa học không?'
        : 'Bạn có chắc chắn muốn hủy tạo khóa học mới không?',
      onConfirm: () => {
        navigate(-1);
      }
    });
  };

  const onChangeFile = (field, file, cb) => {
    fileListRef.current[field] = file;
    cb(file?.name);
  };

  const onChangeFilePreview = (file, cb) => {
    if (file && !isFileValid(file)) {
      return toast.error(
        'Ảnh/video vượt quá dung lượng tối đa hoặc sai định dạng. Xin vui lòng kiểm tra lại.'
      );
    }

    fileListRef.current['fileNamePreview'] = file;
    cb(file?.name);
  };

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
          <Title>{isUpdate ? 'Chỉnh sửa thông tin khoá học' : 'Tạo khoá học mới'}</Title>
          <Divider />
          <form>
            <FormBody
              form={form}
              courseCategory={courseCategory}
              onChangeFile={onChangeFile}
              onChangeFilePreview={onChangeFilePreview}
            />
          </form>
        </Box>

        <Flex justifyContent="flex-end">
          <Button
            variant="outlined"
            color="info"
            size="large"
            sx={{ color: 'black', borderColor: 'black' }}
            onClick={onCancel}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            sx={{ marginLeft: '1rem' }}
            onClick={form.handleSubmit(onSubmit)}>
            {isUpdate ? 'Lưu' : 'Lưu nháp'}
          </Button>
        </Flex>
      </FlexCol>
    </>
  );
}
