import React, { useEffect, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Autocomplete, Box, Button, MenuItem, Select, TextField } from '@mui/material';
import { BackButton, FormControl, InputUpload, Title } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { AssignCourseAPI } from 'apis/AssignCourse';
import {
  ASSIGN_TYPE,
  TRAINING_AGAIN_TYPE,
  UNIT_TIME,
  UNIT_TRAINING_TIME,
  HTTP_STATUS,
  DEFAULT_ERROR_MESSAGE
} from 'consts';
import { DAY_FORMAT } from 'consts/date.const';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import { Flex, FlexCol, FlexRow } from 'components/Layout/Layout';
import * as yup from 'yup';
import CoursePicker from '../Pickers/CoursePicker';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup';
import { CourseAPI } from 'apis/Courses';

const AssignCourseAction = (props) => {
  const { isOpenModal, assignCourseId, courseId, onClose, getListData } = props;
  const { id } = useParams();
  // const idCourse = assignCourseId || id;
  const schema = yup.object({
    time: yup
      .number()
      .typeError('Trường này không thể bỏ trống')
      .required('Trường này không thể bỏ trống'),
    fromTime: yup.date().required(),
    typeAssign: yup.string().required(),
    courseId: yup.string().required(),
    appUserIds: yup
      .array()
      .required('Trường này không thể bỏ trống')
      .min(1, 'Trường này không thể bỏ trống')
  });
  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 }
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const confirm = useConfirmDialog();
  const { showLoading, hideLoading } = useLoading();
  const fileListRef = useRef(undefined);

  const defaultAssignCourse = {
    typeAssign: 'COMPULSORY',
    unitTime: 'DAY',
    typeTrainAgain: 'ASSIGN_TIME',
    unitTrainTime: 'DAY',
    assignDate: dayjs(),
    fromTime: dayjs(),
    toTime: dayjs(),
    appUserIds: [],
    time: undefined
  };
  const {
    handleSubmit,
    control,
    register,
    setValues,
    getValues,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: defaultAssignCourse,
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (assignCourseId) {
      getAssignCourseById(assignCourseId);
    }
  }, [assignCourseId]);

  const getAssignCourseById = async (id) => {
    try {
      showLoading();
      const res = await AssignCourseAPI.getById(id);
      if (res && res.status === HTTP_STATUS.StatusOK) {
        reset(res.data.data);
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const submitForm = async (values) => {
    // values.courseId = idCourse?.toString() ?? values.courseId;
    values.time = parseInt(values.time);
    values.trainAgainTime = parseInt(values.trainAgainTime);
    values.appUserIds = [1];
    values.file = fileListRef.current;
    showLoading();
    try {
      const res = await AssignCourseAPI.create({ ...values });
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Thực hiện gán thành công');
      }
      if (assignCourseId) {
        getListData();
        onClose();
      } else if (id) {
        navigate('/training/assign-course');
      } else {
        getListData();
        onClose();
      }
    } catch (error) {
      // toast.error(error?.message);
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const onSaveAssignCourse = () => {
    handleSubmit(submitForm)();
  };

  const onCancel = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn hủy gán  không?',
      onConfirm: () => {
        isOpenModal ? onClose() : navigate(-1);
      }
    });
  };

  const onChangeFile = (file, cb) => {
    fileListRef.current = file;
    cb(file?.name);
  };

  return (
    <>
      {!isOpenModal && <BackButton />}
      <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 15 }}>
        <Box sx={{ padding: '25px', backgroundColor: 'white' }}>
          {!isOpenModal && <Title>Hoạt động gán</Title>}
          <FlexRow>
            <Box width={'50%'}>
              <FormControl label="Tên khóa học" required>
                <Controller
                  name="courseId"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CoursePicker
                      value={value ?? ''}
                      onChange={onChange}
                      courseId={courseId}
                      disabled={assignCourseId ? true : false}
                      error={Boolean(errors.courseId)}
                      helperText={errors.courseId?.message}
                    />
                  )}
                />
              </FormControl>
            </Box>
            <Box width={'50%'}>
              <FormControl label="Mã học viên" required>
                <Controller
                  name="appUserIds"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      value={value}
                      onChange={(_, val) => onChange(val)}
                      options={top100Films}
                      getOptionLabel={(option) => option.title}
                      // defaultValue={[top100Films[2]]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          InputProps={{
                            ...params.InputProps,
                            type: 'search'
                          }}
                          error={!!errors?.appUserIds?.message}
                          helperText={errors?.appUserIds?.message}
                        />
                      )}
                    />
                  )}
                />
              </FormControl>
            </Box>
          </FlexRow>
          <Box width={'100%'} justifyContent="end" display="flex">
            <FormControl width="50%" paddingTop="0">
              <Controller
                name="file"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputUpload
                    placeholder="Import file"
                    value={value}
                    // disabled={watchType !== COURSE_TYPE.OFFER}
                    onChange={(file) => onChangeFile(file, onChange)}
                    // maxSize={MAX_SIZE_IMAGE}
                  />
                )}
              />
            </FormControl>
          </Box>
          <FlexRow>
            <Box width={'50%'}>
              <FormControl label="Loại hình gán" required>
                <Controller
                  name="typeAssign"
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onChange={onChange}>
                      {ASSIGN_TYPE?.map((type, i) => (
                        <MenuItem value={type.value} key={i}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  control={control}
                />
              </FormControl>
            </Box>
            <Box width={'50%'}>
              <FormControl label="Ngày gán">
                <Controller
                  name={'assignDate'}
                  render={({ field: { value, onChange } }) => (
                    <DesktopDatePicker
                      inputFormat={DAY_FORMAT.ddMMYYYY}
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                  control={control}
                />
              </FormControl>
            </Box>
          </FlexRow>
          <FlexRow>
            <Box width={'50%'}>
              <FormControl label="Thời lượng" required>
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  {...register('time')}
                  error={!!errors?.time?.message}
                  helperText={errors?.time?.message}
                />
              </FormControl>
            </Box>
            <Box width={'50%'}>
              <FormControl paddingTop={'40px'}>
                <Controller
                  name="unitTime"
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onChange={onChange}>
                      {UNIT_TIME?.map((type, i) => (
                        <MenuItem value={type.value} key={i}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  control={control}
                />
              </FormControl>
            </Box>
          </FlexRow>
          <FlexRow>
            <Box width={'50%'}>
              <FormControl label="Từ ngày" required>
                <Controller
                  name={'fromTime'}
                  render={({ field: { value, onChange } }) => (
                    <DesktopDatePicker
                      inputFormat={DAY_FORMAT.ddMMYYYY}
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          error={!!errors?.fromTime?.message}
                          helperText={errors?.fromTime?.message}
                        />
                      )}
                    />
                  )}
                  control={control}
                />
              </FormControl>
            </Box>
            <Box width={'50%'}>
              <FormControl label="Đến ngày">
                <Controller
                  name={'toTime'}
                  render={({ field: { value, onChange } }) => (
                    <DesktopDatePicker
                      inputFormat={DAY_FORMAT.ddMMYYYY}
                      value={value}
                      onChange={(value) => {
                        onChange(value);
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  )}
                  control={control}
                />
              </FormControl>
            </Box>
          </FlexRow>
          <FormControl label="Tính thời gian tái đào tạo theo">
            <Controller
              name="typeTrainAgain"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {TRAINING_AGAIN_TYPE?.map((type, i) => (
                    <MenuItem value={type.value} key={i}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>

          <Flex sx={{ flex: 1 }}>
            <FlexCol sx={{ width: '50%' }}>
              <FormControl label="Thời gian yêu cầu tái đào tạo">
                <TextField
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  placeholder="Nhập số nguyên"
                  {...register('trainAgainTime')}
                />
              </FormControl>
            </FlexCol>
            <FlexCol sx={{ width: '50%' }}>
              <FormControl label="Đơn vị tính">
                <Controller
                  name="unitTrainTime"
                  render={({ field: { value, onChange } }) => (
                    <Select value={value} onChange={onChange}>
                      {UNIT_TRAINING_TIME?.map((type, i) => (
                        <MenuItem value={type.value} key={i}>
                          {type.label}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  control={control}
                />
              </FormControl>
            </FlexCol>
          </Flex>

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
              // loading={isLoading}
              onClick={onSaveAssignCourse}>
              Gán
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default AssignCourseAction;
