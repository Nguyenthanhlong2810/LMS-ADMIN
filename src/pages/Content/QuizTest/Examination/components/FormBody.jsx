import { MenuItem, TextField, Box, Button, InputAdornment } from '@mui/material';
import { FormControl, InputNumber, InputSelect } from 'components';
import {
  FlexRow,
  FormLayout,
  HalfBox,
  TextHelper,
  TextHelperError
} from 'components/Layout/Layout';
import React, { useEffect, useState } from 'react';
import QuestionList from './QuestionList';
import { Controller, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecurityArea } from 'store/reducers/SecurityAreaSlice';
import ChooseQuestionModal from './ChooseQuestionModal/ChooseQuestionModal';
import SearchIcon from '@mui/icons-material/Search';
import { EXAM_RESULT_DISPLAY, EXAM_TYPES } from '../config';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { FlexCol } from 'pages/Learning/ApproveCourse/components/ApprovalForm/Layout';

export default function FormBody({ form, disabled, isUpdate }) {
  const { securityAreas } = useSelector((state) => state.SecurityArea);
  const dispatch = useDispatch();

  const {
    register,
    control,
    getValues,
    watch,
    formState: { errors }
  } = form;
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'examQuizs' // unique name for your Field Array
  });
  const [openAddQuizModal, setOpenAddQuizModal] = useState(false);
  const toggleModal = () => {
    setOpenAddQuizModal(!openAddQuizModal);
  };
  const onAddQuestion = (questions) => {
    if (questions) {
      append(questions.map((question) => ({ ...question, questionId: question.id })));
    }
  };
  useEffect(() => {
    if (securityAreas.length === 0) {
      dispatch(fetchSecurityArea());
    }
  }, []);

  const preventBackspace = (e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      return;
    }
  };

  return (
    <>
      <FormLayout>
        <FlexRow>
          <HalfBox>
            <FormControl label="Loại bài kiểm tra" required>
              <InputSelect name="examType" control={control} errorMes={errors?.examType?.message}>
                {EXAM_TYPES.map((type) => (
                  <MenuItem value={type} key={type}>
                    {type}
                  </MenuItem>
                ))}
              </InputSelect>
            </FormControl>
          </HalfBox>
          <HalfBox display="flex">
            <FormControl label="Mã bài kiểm tra quản lý" required>
              <Box display="flex">
                <TextField
                  {...register('examCode')}
                  fullWidth
                  error={!!errors?.examCode?.message}
                  helperText={errors?.examCode?.message}
                />
              </Box>
            </FormControl>
          </HalfBox>
        </FlexRow>

        <FormControl label="Tiêu đề bài kiểm tra" required>
          <Box display="flex">
            <TextField
              {...register('examTitle')}
              fullWidth
              error={!!errors?.examTitle?.message}
              helperText={errors?.examTitle?.message}
            />
          </Box>
        </FormControl>

        <FormControl label="Mô tả">
          <Box display="flex">
            <TextField
              {...register('description')}
              fullWidth
              multiline
              minRows={2}
              error={!!errors?.description?.message}
              helperText={errors?.description?.message}
              inputProps={{
                maxLength: 200
              }}
            />
          </Box>
          <TextHelper>{(watch('description')?.length || 0) + '/' + 200}</TextHelper>
        </FormControl>

        <FlexRow>
          <HalfBox>
            <FormControl
              label="Thời gian làm bài"
              flexFlow="row"
              alignItems="start"
              titleWidth="160px">
              <Controller
                name="timeWork"
                render={({ field: { value, onChange } }) => (
                  <FlexCol>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        value={value}
                        ampm={false}
                        onChange={onChange}
                        views={['hours', 'minutes', 'seconds']}
                        inputFormat="HH:mm:ss"
                        renderInput={(params) => (
                          <TextField error={!!errors?.timeWork?.message} {...params} />
                        )}
                      />
                    </LocalizationProvider>
                    {value && !value?.isValid() && (
                      <TextHelperError>Thời gian không đúng định dạng</TextHelperError>
                    )}
                  </FlexCol>
                )}
                control={control}
              />
            </FormControl>
          </HalfBox>
          <HalfBox>
            <FormControl label="Điểm đạt" flexFlow="row" alignItems="start" titleWidth="160px">
              <InputNumber
                endAdornment={<InputAdornment position="end">%</InputAdornment>}
                error={!!errors?.markPass}
                helperText={errors?.markPass?.message}
                {...register('markPass', {
                  onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                })}
              />
            </FormControl>
          </HalfBox>
        </FlexRow>

        <FormControl label="Miền bảo mật" required>
          <InputSelect
            name="domain"
            control={control}
            errorMes={errors?.domain?.message}
            disabled={disabled || isUpdate}>
            {securityAreas.map((securityArea, index) => (
              <MenuItem key={index} value={securityArea.code}>
                {securityArea.name}
              </MenuItem>
            ))}
          </InputSelect>
        </FormControl>
        <div className="text-right mr-2">
          <Button color="cancel" onClick={toggleModal} endIcon={<SearchIcon color="primary" />}>
            Thêm câu hỏi
          </Button>
        </div>
        {openAddQuizModal && (
          <ChooseQuestionModal
            isOpen={openAddQuizModal}
            onClose={toggleModal}
            onAddQuestion={onAddQuestion}
            selectedDefault={watch('examQuizs').map((c) => c.questionId)}></ChooseQuestionModal>
        )}
        <QuestionList listQuestion={fields} getValues={getValues} remove={remove} />

        <Box sx={{ width: '50%' }}>
          <FormControl label="Thiết lập hiển thị kết quả">
            <InputSelect
              name="resultDisplay"
              control={control}
              placeholder="Chọn hiển thị kết quả"
              errorMes={errors?.resultDisplay?.message}>
              {EXAM_RESULT_DISPLAY.map((resultDisplay) => (
                <MenuItem value={resultDisplay.value} key={resultDisplay.value}>
                  {resultDisplay.label}
                </MenuItem>
              ))}
            </InputSelect>
          </FormControl>
        </Box>
      </FormLayout>
    </>
  );
}
