import LoadingButton from '@mui/lab/LoadingButton';
import { Button, Checkbox, MenuItem, TextField } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
import { QuestionAPI } from 'apis/FQA/questionApi';
import { FormControl, InputSelect, InputUpload, Modal } from 'components';
import { DEFAULT_ERROR_MESSAGE, TOPIC_STATUS } from 'consts';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import './addQuestionModal.scss';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const addNewTitle = 'Thêm mới câu hỏi thường gặp';
const updateTitle = 'Chỉnh sửa câu hỏi thường gặp';
const validationSchema = Yup.object({
  managerTopicId: Yup.number().required(),
  question: Yup.string().required().max(1000).matches(/\S/),
  answer: Yup.string().required().max(3000).matches(/\S/)
});
const QuestionModal = (props) => {
  const { item, isOpen, onClose: handleClose, language, refreshTopic } = props;
  const { topics } = useSelector((state) => state.FAQQuestions);
  const [questionCount, setQuestionCount] = useState();
  const [answerCount, setAnswerCount] = useState();
  const [fileData, setFileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const defaultValues = item
    ? {
        ...item,
        statusQuestion: item.statusQuestion === TOPIC_STATUS.apply ? true : false,
        managerTopicId: item.managerTopic.id
      }
    : {
        statusQuestion: false
      };
  let fileThumbnail = item?.urlFile?.split('/') || [];
  fileThumbnail = fileThumbnail[fileThumbnail.length - 1];
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const onClose = () => {
    setFileData(null);
    handleClose();
  };
  useEffect(() => {
    setQuestionCount(item?.question);
    setAnswerCount(item?.answer);
  }, [item]);
  const onSubmit = async (values) => {
    const { statusQuestion, managerTopicId } = values;
    setIsLoading(true);
    const sendValues = {
      // ...values,
      key: language,
      question: questionCount,
      answer: answerCount,
      typeFile: 'CV',
      urlFile: null,
      statusQuestion: statusQuestion ? TOPIC_STATUS.apply : TOPIC_STATUS.notApply,
      managerTopicId
    };
    try {
      const bodyFormData = new FormData();
      if (fileData) {
        bodyFormData.append('file', fileData);
      }
      bodyFormData.append('questionRequestJson', JSON.stringify(sendValues));
      if (item?.id) {
        bodyFormData.append('id', item?.id);
        await QuestionAPI.update(bodyFormData);
      } else {
        await QuestionAPI.create(bodyFormData);
      }
      toast.success('Lưu thành công');
      refreshTopic();
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
    setIsLoading(false);
  };

  const handleQuestion = (event) => {
    const questionCount = event.target.value ? event.target.value : '';
    if (questionCount && questionCount.length) {
      setQuestionCount(questionCount);
    }
  };

  const handleAnswer = (event) => {
    const answerCount = event.target.value ? event.target.value : '';
    if (answerCount && answerCount.length) {
      setAnswerCount(answerCount);
    }
  };
  const handleUploadFile = (event) => {
    setFileData(event);
  };

  const managerTopicId = watch('managerTopicId');
  const FILE_ACCEPT = ['.jpg', '.png', '.jpeg', '.doc', '.docx', '.pdf'];
  return (
    <Modal isOpen={isOpen} title={item ? updateTitle : addNewTitle} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="dialog-content faq-question-form">
          <FormControl label="Chủ đề" required>
            <InputSelect
              name="managerTopicId"
              control={control}
              errorMes={errors?.managerTopicId?.message}
              displayEmpty={true}
              renderValue={managerTopicId !== undefined ? undefined : () => <div>Chọn</div>}>
              {topics.map((topic, i) => (
                <MenuItem value={topic.id} key={i}>
                  {topic.name}
                </MenuItem>
              ))}
            </InputSelect>
          </FormControl>

          <FormControl label="Câu hỏi" required>
            <TextField
              {...register('question')}
              error={!!errors?.question?.message}
              helperText={errors?.question?.message}
              multiline
              minRows={4}
              placeholder="Nhập câu hỏi"
              onChange={handleQuestion}
            />
            <Typography className="letter-count">{questionCount?.length || 0} / 1000</Typography>
          </FormControl>

          <FormControl label="Câu trả lời" required>
            <TextField
              {...register('answer')}
              error={!!errors?.answer?.message}
              helperText={errors?.answer?.message}
              multiline
              minRows={4}
              placeholder="Nhập câu trả lời"
              onChange={handleAnswer}
            />
            <Typography className="letter-count">{answerCount?.length || 0} / 3000</Typography>
          </FormControl>

          {/* <div>
            <DialogTitle
              className="upload-title"
              sx={{
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '190%',
                paddingLeft: 2
              }}>
              {'File đính kèm'}
            </DialogTitle>
            <div className="upload-file">
              <div>
                <InputUpload
                  placeholder="Đính kèm file"
                  accept={FILE_ACCEPT}
                  maxSize={5}
                  onChange={handleUploadFile}
                />
                <p className="mt-2 file-name"> {fileData?.name || fileThumbnail}</p>
              </div>
              <Typography className="notification">
                Hệ thống chỉ hỗ trợ tệp có định dạng .jpg, .png, .jpeg, .docx, .pdf; và dung lượng
                không vượt quá 5MB
              </Typography>
            </div>
          </div> */}

          <Controller
            name="statusQuestion"
            control={control}
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
          />
        </div>
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
            // onClick={handleSubmit(onSubmit)}
            type="submit"
            size="large"
            loading={isLoading}
            color="secondary"
            variant="contained">
            Lưu
          </LoadingButton>
        </DialogActions>
      </form>
    </Modal>
  );
};
QuestionModal.propTypes = {
  item: PropTypes.any,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};
export default QuestionModal;
