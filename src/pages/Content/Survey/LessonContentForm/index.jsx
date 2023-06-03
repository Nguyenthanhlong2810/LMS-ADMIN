import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { BackButton, FormControl, Modal, Title } from 'components';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import Examination from 'pages/Content/QuizTest/Examination/Examination';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { StyledHorizonLine } from '../style';
import Survey from '../SurveyList/index';
import ExaminationFieldArray from './ExaminationFieldArray';
import ImportContentFieldArray from './ImportContentFieldArray';
import SurveyFieldArray from './SurveyFieldArray';
import { toast } from 'react-toastify';
import ImportContentList from 'pages/Content/ImportContent/ImportContentList/ImportContentList';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LessonStructureAPI } from 'apis/LessonStructure';
import { HTTP_STATUS } from 'consts/status.const';
import { DEFAULT_ERROR_MESSAGE } from 'consts';

export const schema = yup.object({
  nameContent: yup.string().required().matches(/\S/),
  contentUpload: yup.array().min(1, 'Trường này không thể bỏ trống').required(),
  surveySettings: yup.array().min(1, 'Trường này không thể bỏ trống').required()
});

const SearchSurveyTitle = 'Tìm kiếm khảo sát';
const SearchExaminationTitle = 'Tìm kiếm bài kiểm tra';
const SearchImportContentTitle = 'Tìm kiếm nội dụng';

const CreateUpdateLessonContent = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const isUpdate = location.pathname.includes('update');
  const defaultLessonContent = {
    examSettings: [
      {
        timeWork: null
      }
    ],
    surveySettings: [{}]
  };

  const { showLoading, hideLoading } = useLoading();
  const [openSurveyModal, setOpenSurveyModal] = useState(false);
  const [openExaminationModal, setOpenExaminationModal] = useState(false);
  const [openImportContentModal, setOpenImportContentModal] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultLessonContent,
    resolver: yupResolver(schema)
  });
  const submitForm = async (values) => {
    values.courseId = id;
    values.contentUploadIds = getValues('contentUpload')?.map((item) => item.id);
    values.examSettings = values.examSettings?.map((item) => ({
      ...item,
      timeWork: `${item.timeWork.hour()}:${item.timeWork.minute()}`
    }));
    showLoading();
    try {
      if (isUpdate) {
        await LessonStructureAPI.update({ ...values });
        toast.success('Cập nhật nội dung bài học thành công');
      } else {
        await LessonStructureAPI.create({ ...values });
        toast.success('Thêm nội dung bài học thành công');
      }

      navigate(-1);
    } catch (error) {
      hideLoading();
      toast.error(error?.response?.data?.message);
    }
  };

  const onSaveLessonContent = () => {
    handleSubmit(submitForm)();
  };

  useEffect(() => {
    if (isUpdate) {
      getLessonContentById(id);
    }
  }, [id]);

  const getLessonContentById = async (id) => {
    try {
      showLoading();
      const res = await LessonStructureAPI.getLessonById(id);
      if (res && res.status === HTTP_STATUS.StatusOK) {
        const data = res.data.data;
        data.examSettings = data.examSettings || [
          {
            blockContent: true,
            markPass: null,
            timeWork: null
          }
        ];
        reset(data);
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const onCancel = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn hủy nội dung bài học này không?',
      onConfirm: () => {
        navigate(-1);
      }
    });
  };
  const onCloseSurveyModal = (data) => {
    setOpenSurveyModal(false);
    if (data) {
      setValue('surveySettings', data, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true
      });
    }
    setOpenSurveyModal(false);
  };

  const onCloseImportContentModal = (data) => {
    if (data) {
      setValue('contentUpload', data, {
        shouldValidate: true,
        shouldTouch: true,
        shouldDirty: true
      });
    }
    setOpenImportContentModal(false);
  };

  const onCloseExaminationModal = (data) => {
    if (data) {
      setValue('examSettings', data);
    }
    setOpenExaminationModal(false);
  };

  return (
    <>
      <BackButton />
      <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 15 }}>
        <Box sx={{ padding: '25px 155px', backgroundColor: 'white' }}>
          <Title>{isUpdate ? 'Chỉnh sửa nội dung bài học' : 'Thêm nội dung bài học'}</Title>
          <StyledHorizonLine />
          <FormControl label="Tên nội dung" required>
            <TextField
              {...register('nameContent')}
              placeholder="Nhập tên nội dung"
              inputProps={{
                maxLength: 200
              }}
              error={!!errors?.nameContent?.message}
              helperText={errors?.nameContent?.message}
            />
          </FormControl>
          <FormControl label="Thêm nội dung" required>
            <TextField
              placeholder="Tìm kiếm tập tin hoặc video hoặc gói nội dung"
              disabled
              // {...register('addContentInputSearch')}
              error={!!errors?.contentUpload?.message}
              helperText={errors?.contentUpload?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon onClick={() => setOpenImportContentModal(true)} />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
          <ImportContentFieldArray {...{ control, register, getValues, setValue, errors }} />

          <Title>bài kiểm tra</Title>
          <ExaminationFieldArray
            {...{ control, register, getValues, setValue, errors }}
            setOpenExaminationModal={setOpenExaminationModal}
          />

          <Title>khảo sát</Title>
          <SurveyFieldArray
            {...{ control, register, getValues, setValue, errors }}
            setOpenSurveyModal={setOpenSurveyModal}
          />

          <Box sx={{ padding: 2, gap: 1, textAlign: 'right' }}>
            <Button
              variant="outlined"
              color="info"
              size="large"
              sx={{ color: 'black', borderColor: 'black', marginRight: '8px' }}
              onClick={onCancel}>
              Hủy
            </Button>

            <LoadingButton
              color="secondary"
              size="large"
              variant="contained"
              onClick={onSaveLessonContent}>
              Lưu
            </LoadingButton>
          </Box>
        </Box>
      </form>

      {openSurveyModal && (
        <Modal
          isOpen={openSurveyModal}
          title={SearchSurveyTitle}
          onClose={() => setOpenSurveyModal(false)}>
          <Survey isUseInModal={true} onClose={onCloseSurveyModal} />
        </Modal>
      )}

      {openExaminationModal && (
        <Modal
          isOpen={openExaminationModal}
          title={SearchExaminationTitle}
          onClose={() => setOpenExaminationModal(false)}>
          <Examination isUseInModal={true} onClose={onCloseExaminationModal} />
        </Modal>
      )}
      {openImportContentModal && (
        <Modal
          isOpen={openImportContentModal}
          title={SearchImportContentTitle}
          onClose={() => setOpenImportContentModal(false)}>
          <ImportContentList
            isUseInModal={true}
            onClose={onCloseImportContentModal}
            selectedDefault={
              getValues('contentUpload') ? getValues('contentUpload')?.map((item) => item.id) : []
            }
          />
        </Modal>
      )}
    </>
  );
};

export default CreateUpdateLessonContent;
