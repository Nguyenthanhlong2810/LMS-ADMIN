import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, InputAdornment, TextField } from '@mui/material';
import { BackButton, FormControl, Modal, Title } from 'components';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import Examination from 'pages/Content/QuizTest/Examination/Examination';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { StyledHorizonLine } from './style';
import ExaminationFieldArray from './ExaminationFieldArray';
import ImportContentFieldArray from './ImportContentFieldArray';
import SurveyFieldArray from './SurveyFieldArray';
import { toast } from 'react-toastify';
import ImportContentList from 'pages/Content/ImportContent/ImportContentList/ImportContentList';
import Survey from 'pages/Content/Survey/SurveyList';
import { omit, pick } from 'lodash';
import { useRef } from 'react';
import { LessonStructureAPI } from 'apis/LessonStructure';
import { DEFAULT_ERROR_MESSAGE, ROUTE_PATH } from 'consts';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validation';

const SearchSurveyTitle = 'Tìm kiếm khảo sát';
const SearchExaminationTitle = 'Tìm kiếm bài kiểm tra';
const SearchImportContentTitle = 'Tìm kiếm nội dụng';

const CreateUpdateLessonContent = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const selectedExamIds = useRef([]);
  const selectedSurveyIds = useRef([]);
  const { pathname } = useLocation();

  const courseId = searchParams.get('courseId');
  const isCreate = pathname.includes(ROUTE_PATH.LESSON_CONTENT_ADD);

  const defaultLessonContent = {
    nameContent: '',
    examSettings: [],
    surveySettings: []
  };
  const { showLoading, hideLoading } = useLoading();
  const [openSurveyModal, setOpenSurveyModal] = useState(false);
  const [openExaminationModal, setOpenExaminationModal] = useState(false);
  const [openImportContentModal, setOpenImportContentModal] = useState(false);

  const form = useForm({
    defaultValues: defaultLessonContent,
    resolver: yupResolver(schema)
  });
  const {
    handleSubmit,
    watch,
    register,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors }
  } = form;
  const contentUploadsWatch = watch('contentUploads');
  const contentUploadIds = (contentUploadsWatch || []).map((c) => c.id);

  useEffect(() => {
    if (!isCreate && id) {
      getLessonStructureById(id);
    }
  }, []);

  const getLessonStructureById = async (id) => {
    try {
      const res = await LessonStructureAPI.getById(id);
      if (res?.data?.data) {
        const data = res.data.data;
        if (data.examSettings) {
          data.examSettings = data.examSettings.map((c) => ({
            ...c,
            id: c.exam?.id,
            examTitle: c.exam?.examTitle
          }));
        } else {
          data.examSettings = [];
        }

        if (data.surveySettings) {
          data.surveySettings = data.surveySettings.map((c) => ({
            ...c,
            id: c.survey?.id,
            surveyName: c.survey?.surveyName
          }));
        } else {
          data.surveySettings = [];
        }
        if (!data.contentUploads) {
          data.contentUploads = [];
        }
        reset(data);
      }
    } catch (error) {
      toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
    }
  };

  const submitForm = async (values) => {
    showLoading();
    try {
      if (!contentUploadsWatch?.length) {
        return;
      }
      const submitValue = omit(values, 'contentUploads');
      submitValue.examSettings = submitValue.examSettings.map((c) => {
        const examSetting = pick(c, 'blockContent', 'description', 'status');
        examSetting.exam = {
          id: c.id
        };
        return examSetting;
      });
      submitValue.surveySettings = submitValue.surveySettings.map((c) => {
        const surveySetting = pick(c, 'allowNumberDay', 'assignAfter', 'description', 'status');
        surveySetting.survey = {
          id: c.id
        };
        return surveySetting;
      });
      submitValue.contentUploadIds = contentUploadIds;

      if (isCreate && courseId) {
        const res = await LessonStructureAPI.create({ ...submitValue, courseId: +courseId });
        if (res.data?.status) {
          toast.success('Thêm nội dung bài học thành công');
          navigate(-1);
        } else {
          toast.error('Thêm nội dung bài học không thành công');
        }
      } else if (!isCreate && id) {
        const res = await LessonStructureAPI.update({ ...submitValue, id: +id });
        if (res.data?.status) {
          toast.success('Cập nhật nội dung bài học thành công');
          navigate(-1);
        } else {
          toast.error('Cập nhật nội dung bài học không thành công');
        }
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error(error.message ?? DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };
  const onSaveLessonContent = () => {
    handleSubmit(submitForm)();
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
    if (data) {
      data.forEach((c) => {
        c.assignAfter = null;
        c.allowNumberDay = null;
      });
      const existedValue = getValues('surveySettings');
      const newValue = data.filter((c) => !existedValue.some((v) => v.id === c.id));
      if (newValue.length) {
        setValue('surveySettings', [...existedValue, ...newValue]);
      }
    }
    setOpenSurveyModal(false);
  };

  const onCloseImportContentModal = (data) => {
    if (data) {
      const existedValue = getValues('contentUploads');
      const newValue = data.filter((c) => !existedValue.some((v) => v.id === c.id));
      if (newValue.length) {
        setValue('contentUploads', [...existedValue, ...newValue]);
        trigger('contentUploads');
      }
    }
    setOpenImportContentModal(false);
  };

  const onCloseExaminationModal = (data) => {
    if (data) {
      const existedValue = getValues('examSettings');
      const newValue = data.filter((c) => !existedValue.some((v) => v.id === c.id));
      if (newValue.length) {
        setValue('examSettings', [...existedValue, ...newValue]);
      }
    }
    setOpenExaminationModal(false);
  };

  const onOpenExaminationModal = () => {
    const selectedIds = getValues('examSettings').map((c) => c.id);
    selectedExamIds.current = selectedIds;
    setOpenExaminationModal(true);
  };
  const onOpenSurveyModal = () => {
    const selectedIds = getValues('surveySettings').map((c) => c.id);
    selectedSurveyIds.current = selectedIds;
    setOpenSurveyModal(true);
  };
  return (
    <>
      <BackButton />
      <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 15 }}>
        <TextField {...register('courseId')} hidden sx={{ display: 'none' }} />
        <Box sx={{ padding: '25px 155px', backgroundColor: 'white' }}>
          <Title>Thêm nội dung bài học</Title>
          <StyledHorizonLine />
          <FormControl label="Tên nội dung" required padding={'1rem 0'}>
            <TextField
              {...register('nameContent')}
              placeholder="Nhập tên nội dung"
              inputProps={{
                maxLength: 200
              }}
              error={Boolean(errors?.nameContent)}
              helperText={errors?.nameContent?.message}
            />
          </FormControl>
          <FormControl label="Thêm nội dung" required padding={'1rem 0'}>
            <TextField
              placeholder="Tìm kiếm tập tin hoặc video hoặc gói nội dung"
              disabled
              value=""
              onClick={() => setOpenImportContentModal(true)}
              error={Boolean(errors?.contentUploads)}
              helperText={errors?.contentUploads?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon onClick={() => setOpenImportContentModal(true)} />
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
          <ImportContentFieldArray {...form} />

          <Title>bài kiểm tra</Title>
          <ExaminationFieldArray {...form} onOpenExaminationModal={onOpenExaminationModal} />

          <Title>khảo sát</Title>
          <SurveyFieldArray {...form} onOpenSurveyModal={onOpenSurveyModal} />

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
          <Survey
            disabledSelected={true}
            selectedIds={selectedSurveyIds.current}
            isUseInModal={true}
            onClose={onCloseSurveyModal}
          />
        </Modal>
      )}

      {openExaminationModal && (
        <Modal
          isOpen={openExaminationModal}
          title={SearchExaminationTitle}
          onClose={() => setOpenExaminationModal(false)}>
          <Examination
            selectedIds={selectedExamIds.current}
            disabledSelected={true}
            isUseInModal={true}
            onClose={onCloseExaminationModal}
          />
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
            selectedDefault={contentUploadIds}
            disabledSelected={true}
          />
        </Modal>
      )}
    </>
  );
};

export default CreateUpdateLessonContent;
