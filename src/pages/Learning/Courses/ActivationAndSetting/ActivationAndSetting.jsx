import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Checkbox, Divider, styled, Switch } from '@mui/material';
import { CourseAPI, CourseSettingApi } from 'apis/Courses';
import { BackButton, InputNumber, Title } from 'components';
import { BoxContainer } from 'components/Layout/BoxContainer';
import ExpandableTable from 'components/Table/ExpandableTable/ExpandableTable';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import { pick } from 'lodash';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Flex } from '../../../../components/Layout/Layout';
import InputNumberDebounce from './components/InputNumberDebounce';
import {
  setCheckedRecursiveDown,
  formatResponseDataActivation,
  isCheckAll,
  formatSubmitStructure
} from './utils';
import * as yup from 'yup';
import { DEFAULT_ERROR_MESSAGE } from 'consts';

const FlexCol = styled(Box)({
  display: 'flex',
  flexDirection: 'column'
});
const FormLabelRight = styled(Box)({
  width: '40%',
  textAlign: 'right',
  marginRight: '1rem'
});
const FormRow = styled(Box)({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const defaultValues = {
  id: undefined,
  isCertificated: false,
  isActivated: false,
  isHistoryRecorded: true,
  inactiveDay: undefined
};

export default function ActivationAndSetting() {
  const { id } = useParams();
  const [courseStructure, setCourseStructure] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const [hadLearnerStudying, setHadLearnerStudying] = useState(false);

  const confirm = useConfirmDialog();
  const navigate = useNavigate();

  useEffect(() => {
    getCourseLessonStructure();
    getCourseSetting();
  }, []);

  const getCourseLessonStructure = async () => {
    showLoading();
    try {
      const res = await CourseAPI.getCourseStructure(id);
      if (res?.status === 200) {
        setHadLearnerStudying(res.data.data.hadLearnerStudying);
        const formatedData = formatResponseDataActivation(res.data.data);
        setCourseStructure([formatedData]);
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
    hideLoading();
  };

  const getCourseSetting = async () => {
    showLoading();
    try {
      const res = await CourseSettingApi.get(id);
      if (res?.data) {
        reset(pick(res.data.data, ...Object.keys(defaultValues)));
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
    hideLoading();
  };

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(
      yup.object({
        inactiveDay: yup
          .number()
          .transform((value) => (isNaN(value) ? undefined : value))
          .positive()
          .integer()
        // .required()
      })
    )
  });

  const onCheck = (checked, row, field, typesAllowed = ['content']) => {
    row[field] = checked;
    if (row.type === 'course') {
      setCheckedRecursiveDown(checked, row, field, typesAllowed);
    } else {
      courseStructure[0][field] = isCheckAll(courseStructure[0], field, ['content']);
    }
    setCourseStructure([...courseStructure]);
  };

  const onChangeConditionPass = (row) => (value) => {
    row.conditionPass = +value;
    setCourseStructure([...courseStructure]);
  };

  const onSave = (formValue) => {
    const submitStructure = formatSubmitStructure(courseStructure[0]);
    showLoading();
    Promise.all([
      CourseSettingApi.updateCourseSetting({ ...formValue, courseId: +id }),
      CourseSettingApi.updateCourseStructureSetting(submitStructure)
    ])
      .then(() => {
        toast.success('Cập nhật thành công');
        navigate('/learning/courses-overview/' + id);
      })
      .catch(() => {
        toast.error('Cập nhật không thành công');
      })
      .finally(() => hideLoading());
  };

  const onCancel = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn hủy kích hoạt đang thiết lập không?',
      onConfirm: () => {
        navigate('/learning/courses-overview/' + id);
      }
    });
  };

  const columns = [
    {
      name: 'Tiêu đề',
      key: 'name',
      style: {
        width: '25%'
      }
    },
    {
      name: 'Có thể tải xuống',
      key: 'canDownload',
      render: (row) =>
        ['course', 'content'].includes(row.type) && (
          <Checkbox
            checked={row.canDownload}
            onChange={(_, checked) => onCheck(checked, row, 'canDownload')}
          />
        )
    },
    {
      name: 'Ghi nhận hoàn thành khi mở nội dung',
      key: 'completedOpen',
      render: (row) =>
        ['course', 'content'].includes(row.type) && (
          <Checkbox
            checked={row.completedOpen}
            onChange={(_, checked) => onCheck(checked, row, 'completedOpen')}
          />
        )
    },
    {
      name: 'Hoàn thành nội dung theo tuần tự',
      key: 'completedByOrder',
      render: (row) =>
        ['course'].includes(row.type) && (
          <Checkbox
            checked={row.completedByOrder}
            onChange={(_, checked) => onCheck(checked, row, 'completedByOrder')}
          />
        )
    },
    {
      name: 'Điều kiện hoàn thành',
      key: 'conditionPass',
      render: (row) =>
        ['content'].includes(row.type) && (
          <>
            <InputNumberDebounce
              disabled={row.completedOpen}
              value={row.conditionPass}
              onChange={onChangeConditionPass(row)}
            />
          </>
        )
    }
  ];
  return (
    <>
      <FlexCol gap={2}>
        <BackButton />
        <BoxContainer>
          <Title>Kích hoạt và thiết lập</Title>
          <Divider />
          <FlexCol gap={1} width="100%">
            <FormRow>
              <FormLabelRight>Cấp chứng chỉ</FormLabelRight>
              <Controller
                name="isCertificated"
                render={({ field: { value, onChange } }) => (
                  <Switch checked={value} onChange={onChange} disabled={hadLearnerStudying} />
                )}
                control={control}
              />
            </FormRow>
            <FormRow>
              <FormLabelRight>Kích hoạt khóa học</FormLabelRight>
              <Controller
                name="isActivated"
                render={({ field: { value, onChange } }) => (
                  <Switch checked={value} onChange={onChange} />
                )}
                control={control}
              />
            </FormRow>
            <FormRow>
              <FormLabelRight>
                Thêm vào lịch sử đào tạo khi tất cả các nội dung đã hoàn thành
              </FormLabelRight>
              <Controller
                name="isHistoryRecorded"
                render={({ field: { value, onChange } }) => (
                  <Switch checked={value} onChange={onChange} disabled={hadLearnerStudying} />
                )}
                control={control}
              />
            </FormRow>
            <fieldset disabled={hadLearnerStudying}>
              <FormRow>
                <FormLabelRight>Đặt lại tiến trình khi học viên không truy cập sau </FormLabelRight>
                <InputNumber
                  size="small"
                  placeholder="Nhập số nguyên"
                  {...register('inactiveDay', {
                    onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                  })}
                  error={Boolean(errors.inactiveDay)}
                  helperText={errors.inactiveDay?.message}
                />
                &nbsp;Ngày
              </FormRow>

              <Box sx={{ marginTop: 5 }}>
                <ExpandableTable columns={columns} data={courseStructure} defaultExpanded />
              </Box>
            </fieldset>
          </FlexCol>
        </BoxContainer>
        <Flex justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            sx={{ color: '#fff', borderColor: 'black', background: '#66788A', marginRight: 2 }}
            onClick={onCancel}>
            Hủy
          </Button>
          <Button variant="contained" color="secondary" size="large" onClick={handleSubmit(onSave)}>
            Lưu
          </Button>
        </Flex>
      </FlexCol>
    </>
  );
}
