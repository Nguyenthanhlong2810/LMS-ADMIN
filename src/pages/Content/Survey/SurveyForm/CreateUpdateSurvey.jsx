import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { BackButton, FormControl, Title, ScreenLoading } from 'components';
import { useFieldArray, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  StyledButtonAddContent,
  StyledFormSurveyContent,
  StyledRangePoint,
  StyledRangePointItem
} from '../style';
import SurveyFieldArray from './SurveyFieldArray';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { SurveyAPI } from 'apis/Survey';
import { useLoading } from 'hooks/LoadingProvider';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS, messageCreate, messageUpdate } from 'consts';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const schema = yup
  .object({
    surveyName: yup.string().required().matches(/\S/)
  })
  .required();

const surveyEvaluations = [
  {
    value: 1,
    text: 'Hoàn toàn không hài lòng'
  },
  {
    value: 2,
    text: 'Không hài lòng'
  },
  {
    value: 3,
    text: 'Trung lập'
  },
  {
    value: 4,
    text: 'Hài lòng'
  },
  {
    value: 5,
    text: 'Hoàn toàn hài lòng'
  }
];

const CreateUpdateSurvey = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { loading, showLoading, hideLoading } = useLoading();
  const defaultSurveyContent = {
    description: '',
    surveyName: '',
    listContent: [
      {
        contentDescription: '',
        listQuestion: [{ question: '' }]
      }
    ],
    listOther: [{ other: '' }]
  };
  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: defaultSurveyContent,
    resolver: yupResolver(schema)
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'listOther'
  });

  const submitForm = async (values) => {
    setIsLoading(true);
    try {
      if (id) {
        await SurveyAPI.update({ ...values, id: id });
        toast.success(messageUpdate.Survey);
      } else {
        await SurveyAPI.create({ ...values });
        toast.success(messageCreate.Survey);
      }

      navigate(-1);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message);
    }
  };

  const onSaveSurvey = () => {
    handleSubmit(submitForm)();
  };

  useEffect(() => {
    if (id) {
      getSurveyById(id);
    }
  }, [id]);

  const getSurveyById = async (id) => {
    try {
      showLoading();
      const res = await SurveyAPI.getById(id);
      if (res && res.status === HTTP_STATUS.StatusOK) {
        reset(res.data.data);
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const onCancel = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn hủy tạo khảo sát này không?',
      onConfirm: () => {
        navigate(-1);
      }
    });
  };

  const isCreateUpdate = ['new', 'update'].some((item) => location.pathname.includes(item));

  return (
    <>
      <ScreenLoading loading={loading} />
      <BackButton />
      <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 15 }}>
        <Box sx={{ padding: '25px 155px', backgroundColor: 'white' }}>
          <Title>
            {location.pathname.includes('update')
              ? 'chỉnh sửa khảo sát'
              : location.pathname.includes('new')
              ? 'tạo khảo sát'
              : 'chi tiết khảo sát'}
          </Title>
          <FormControl label="Tên khảo sát" required>
            <TextField
              {...register('surveyName')}
              inputProps={{
                maxLength: 200
              }}
              error={!!errors?.surveyName?.message}
              helperText={errors?.surveyName?.message}
              disabled={!isCreateUpdate}
            />
          </FormControl>
          <FormControl label="Mô tả khái quát về khảo sát">
            <TextField
              multiline
              rows={3}
              {...register('description')}
              inputProps={{
                maxLength: 500
              }}
              disabled={!isCreateUpdate}
            />
          </FormControl>

          <Title>nội dung câu hỏi khảo sát</Title>
          <StyledRangePoint>
            {surveyEvaluations.map((c) => (
              <StyledRangePointItem key={c.value}>
                <p>{c.value}</p>
                <span>{c.text}</span>
              </StyledRangePointItem>
            ))}
          </StyledRangePoint>

          <StyledFormSurveyContent>
            <SurveyFieldArray
              {...{ control, register, getValues, setValue, errors }}
              isCreateUpdate={isCreateUpdate}
            />

            {isCreateUpdate && (
              <StyledButtonAddContent>
                <div style={{ padding: 15 }}>Thêm nội dung</div>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setValue('listContent', [
                      ...getValues().listContent,
                      {
                        contentDescription: '',
                        listQuestion: [{ question: '' }]
                      }
                    ]);
                  }}>
                  <Add />
                </Button>
              </StyledButtonAddContent>
            )}

            <div style={{ padding: '0 16px' }}>
              <Title> ý kiến khác/ other</Title>
            </div>

            {fields?.map((item, index) => {
              return (
                <FormControl label={`Câu hỏi ${index + 1}`} key={index}>
                  <div className="d-flex">
                    <div className="d-flex flex-1 flex-direction-column">
                      <TextField
                        {...register(`listOther[${index}].other`)}
                        inputProps={{
                          maxLength: 500
                        }}
                        disabled={!isCreateUpdate}
                      />
                      {fields.length !== 1 && isCreateUpdate && (
                        <Button
                          color="error"
                          onClick={() => remove(index)}
                          sx={{ alignSelf: 'end' }}>
                          Xoá
                        </Button>
                      )}
                    </div>

                    {index === fields.length - 1 && isCreateUpdate && (
                      <div>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() =>
                            append({
                              other: ''
                            })
                          }
                          sx={{ marginLeft: '15px' }}>
                          <Add />
                        </Button>
                      </div>
                    )}
                  </div>
                </FormControl>
              );
            })}
          </StyledFormSurveyContent>

          {isCreateUpdate && (
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
                loading={isLoading}
                onClick={onSaveSurvey}>
                Lưu
              </LoadingButton>
            </Box>
          )}
        </Box>
      </form>
    </>
  );
};

export default CreateUpdateSurvey;
