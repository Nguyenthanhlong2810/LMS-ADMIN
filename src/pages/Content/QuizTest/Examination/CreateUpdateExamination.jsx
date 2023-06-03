import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider } from '@mui/material';
import { BackButton, Title } from 'components';
import { useLoading } from 'hooks/LoadingProvider';
import { Flex, FlexCol } from 'components/Layout/Layout';
import React from 'react';
import { useForm } from 'react-hook-form';
import FormBody from './components/FormBody';
import { defaultValue } from './config';
import { schema } from './components/validation';
import { toast } from 'react-toastify';
import { ExamAPI } from 'apis/Examination';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { omit } from 'lodash';
import { TIME_FORMAT } from 'consts/date.const';
import { DEFAULT_ERROR_MESSAGE, messageCreate, messageUpdate, ROUTE_PATH } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';

export default function CreateUpdateExamination() {
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  const location = useLocation();
  const detailExam = location.state;
  const confirm = useConfirmDialog();
  const isUpdate = Boolean(detailExam);
  if (detailExam) {
    detailExam.timeWork = detailExam.timeWork
      ? dayjs(detailExam.timeWork, TIME_FORMAT.HHmmss)
      : defaultValue.timeWork;
    detailExam.markPass ||= defaultValue.markPass;
    detailExam.examQuizs = detailExam.examQuizs.map((question) => ({
      ...question,
      questionId: question.id
    }));
  }

  const form = useForm({
    defaultValues: detailExam || defaultValue,
    resolver: yupResolver(schema)
  });

  const onCancel = () => {
    confirm({
      content: detailExam?.id
        ? 'Bạn có chắc chắn muốn hủy chỉnh sửa bài kiểm tra không?'
        : 'Bạn có chắc chắn muốn hủy tạo bài kiểm tra không?',
      onConfirm: () => {
        navigate(ROUTE_PATH.EXAMINATION);
      }
    });
  };

  const onSubmit = async (values) => {
    if (!values.examQuizs?.length) {
      return toast.error('Chọn ít nhất 1 câu hỏi cho bài kiểm tra');
    }
    let submitValue = { ...values };
    submitValue.examQuizId = submitValue.examQuizs.map((quiz) => quiz.id);
    submitValue = omit(submitValue, 'examQuizs');
    submitValue.timeWork = dayjs(submitValue.timeWork).format(TIME_FORMAT.HHmmss);

    showLoading();
    try {
      if (isUpdate) {
        await ExamAPI.update({ ...submitValue, id: detailExam.id });
        toast.success(messageUpdate.Examination);
      } else {
        await ExamAPI.create(submitValue);
        toast.success(messageCreate.Examination);
      }
      navigate(ROUTE_PATH.EXAMINATION);
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
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
          <Title>{isUpdate ? 'chỉnh sửa bài kiểm tra' : 'tạo bài kiểm tra'} </Title>
          <Divider />
          <FormBody form={form} isUpdate={isUpdate} />
        </Box>

        <Flex justifyContent="flex-end">
          <Button
            variant="outlined"
            size="large"
            color="cancel"
            sx={{ color: 'black', borderColor: 'black' }}
            onClick={onCancel}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            sx={{ ml: '15px' }}>
            Lưu
          </Button>
        </Flex>
      </FlexCol>
    </>
  );
}
