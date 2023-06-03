import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, FormControlLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { schema } from './validation';
import LoadingButton from '@mui/lab/LoadingButton';
import { FormControl, Switch, Title, InputSelect } from 'components';
import ListAnswer from './ListAnswer';
import { WrapperQuestion } from 'components/WrapBox';
import QuestionField from './QuestionField';
import {
  LIST_ANSWER_DEFAULT,
  multiAnswerInQuestion,
  QUESTION_TYPES,
  QUIZ_TYPE_VALUE,
  YES_NO_ANSWER
} from '../questionBank.const';
import YesNoAnswer from './YesNoAnswer';
import { fetchSecurityArea } from 'store/reducers/SecurityAreaSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { QuestionBankAPI } from 'apis/QuestionBank';
import ResponseAnswer from './ResponseAnswer';
import { useLoading } from 'hooks/LoadingProvider';
import { DEFAULT_ERROR_MESSAGE, messageCreate, messageUpdate, ROUTE_PATH } from 'consts';
import { toLetters } from './helper';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { TextHelper } from 'components/Layout/Layout';

const defaultValues = {
  nameSecurityArea: '',
  contentQuestion: '',
  mark: null,
  type: QUIZ_TYPE_VALUE.oneChoice,
  responseCorrect: 'Đúng',
  responseIncorrect: 'Không đúng',
  mixAnswers: true,
  answers: LIST_ANSWER_DEFAULT
};
const QuestionForm = ({ disabled, detailQuestion }) => {
  const { loading, hideLoading, showLoading } = useLoading();
  const confirm = useConfirmDialog();
  const dispatch = useDispatch();
  const { securityAreas } = useSelector((state) => state.SecurityArea);
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: detailQuestion || defaultValues,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (detailQuestion) {
      form.reset(detailQuestion);
    }
  }, [detailQuestion]);

  const {
    handleSubmit,
    control,
    register,
    watch,
    setValue,
    formState: { errors }
  } = form;
  useEffect(() => {
    if (securityAreas.length === 0) {
      dispatch(fetchSecurityArea());
    }
  }, []);

  const submitForm = async (values) => {
    values.answers = values.answers.map((answer, index) => {
      answer.option = toLetters(index);
      return answer;
    });
    showLoading();
    try {
      if (detailQuestion) {
        await QuestionBankAPI.update({ ...values, id: detailQuestion.id });
        toast.success(messageUpdate.QuestionBank);
      } else {
        await QuestionBankAPI.create(values);
        toast.success(messageCreate.QuestionBank);
      }

      navigate(ROUTE_PATH.QUESTION_BANK);
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };
  const onCancel = () => {
    confirm({
      content: detailQuestion?.id
        ? 'Bạn có chắc chắn muốn hủy chỉnh sửa câu hỏi không?'
        : 'Bạn có chắc chắn muốn hủy tạo câu hỏi không?',
      onConfirm: () => {
        navigate(ROUTE_PATH.QUESTION_BANK);
      }
    });
  };
  const changeQuestionType = (e) => {
    switch (e.target.value) {
      case QUIZ_TYPE_VALUE.fill:
        setValue('answers', [], { shouldValidate: true, shouldTouch: true, shouldDirty: true });

        break;
      case QUIZ_TYPE_VALUE.yesNo:
        setValue('answers', YES_NO_ANSWER, { shouldValidate: true });
        setValue('correctAnswers', 'A', { shouldValidate: true });
        break;
      default:
        if (!multiAnswerInQuestion.includes(form.getValues('type'))) {
          setValue('answers', LIST_ANSWER_DEFAULT);
        }
        break;
    }
  };

  const questionType = watch('type');
  return (
    <form>
      <fieldset disabled={disabled}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl label="Mã câu hỏi quản lý" required>
              <TextField
                error={!!errors?.codeManage?.message}
                helperText={errors?.codeManage?.message}
                {...register('codeManage')}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl label="Loại câu hỏi" required>
              <Controller
                name="type"
                render={({ field }) => (
                  <Select
                    {...field}
                    onChange={(value) => {
                      changeQuestionType(value);
                      field.onChange(value);
                    }}
                    disabled={disabled}>
                    {Object.values(QUESTION_TYPES).map((c) => (
                      <MenuItem key={c.value} value={c.value}>
                        {c.label}
                      </MenuItem>
                    ))}
                  </Select>
                )}
                control={control}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl label="Điểm" required>
              <TextField
                error={!!errors?.mark?.message}
                helperText={errors?.mark?.message}
                {...register('mark', {
                  onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                })}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl label="Miền bảo mật" required>
              <InputSelect
                name="nameSecurityArea"
                control={control}
                errorMes={errors?.nameSecurityArea?.message}
                disabled={disabled || detailQuestion?.active}>
                {securityAreas.map((securityArea, index) => (
                  <MenuItem key={index} value={securityArea.code}>
                    {securityArea.name}
                  </MenuItem>
                ))}
              </InputSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl label="Mô tả">
              <TextField
                error={!!errors?.description?.message}
                helperText={errors?.description?.message}
                {...register('description')}
                multiline
                minRows={3}
              />
              <TextHelper>{(watch('description')?.length || 0) + '/' + 200}</TextHelper>
            </FormControl>
          </Grid>
        </Grid>
        <Title className="ml-3">{QUESTION_TYPES[questionType]?.label}</Title>
        <WrapperQuestion>
          <QuestionField form={form} disabled={disabled} />
          {multiAnswerInQuestion.includes(questionType) && (
            <div className="text-right mr-3">
              <Controller
                name="mixAnswers"
                render={({ field }) => (
                  <FormControlLabel
                    className=""
                    value="start"
                    control={<Switch onChange={field.onChange} checked={field.value} />}
                    label="Trộn đáp án"
                    labelPlacement="start"
                  />
                )}
                control={control}
              />
            </div>
          )}

          <FormControl>
            {multiAnswerInQuestion.includes(questionType) && (
              <ListAnswer form={form} disabled={disabled} />
            )}

            {questionType === QUIZ_TYPE_VALUE.fill && <ResponseAnswer form={form} />}
            {questionType === QUIZ_TYPE_VALUE.yesNo && <YesNoAnswer form={form} />}
          </FormControl>
        </WrapperQuestion>
        {!disabled && (
          <Box sx={{ padding: 2, gap: 1, textAlign: 'right' }}>
            <Button
              variant="outlined"
              color="info"
              size="large"
              sx={{ color: 'black', borderColor: 'black', marginRight: 2 }}
              onClick={onCancel}>
              Hủy
            </Button>

            <LoadingButton
              color="secondary"
              size="large"
              loading={loading}
              onClick={handleSubmit(submitForm)}
              variant="contained">
              Lưu
            </LoadingButton>
          </Box>
        )}
      </fieldset>
    </form>
  );
};

export default QuestionForm;
