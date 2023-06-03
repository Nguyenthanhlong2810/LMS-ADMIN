import {
  Autocomplete,
  Box,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import { FormControl, FreeTagInput, InputUpload } from 'components';
import { IMAGE_ACCEPT } from 'consts';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import {
  ACCEPT_IMAGES,
  ACCEPT_VIDEO,
  COURSE_TYPE,
  MAX_LENGTH,
  MAX_SIZE_IMAGE,
  MAX_SIZE_VIDEO
} from '../../../config';
import {
  Flex,
  FlexCol,
  FlexRow,
  HalfBox,
  TextHelper,
  TextHelperError
} from 'components/Layout/Layout';
import RemoveIcon from '@mui/icons-material/Remove';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ChooseProgramModal from '../ChooseProgramModal';
import CategoryTrainingPicker from '../../Pickers/CategoryTrainingPicker';
import { isEmpty } from 'lodash';

export default function CourseInfo({
  form,
  onChangeFile = () => {},
  courseCategory,
  onChangeFilePreview = () => {},
  disabled
}) {
  const {
    register,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = form;
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const watchType = watch('type');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'requirementCoursesName'
  });
  useEffect(() => {
    if (isEmpty(fields)) {
      append({ value: '' });
    }
  }, [fields]);
  const experiences = courseCategory.experiences?.map((c) => c.name) || [];
  const skills = courseCategory.skills?.map((c) => c.name) || [];

  const onOpenProgramModal = () => setOpenProgramModal(true);
  const onCloseProgramModal = (value) => {
    if (value) {
      setValue('programName', value.programName);
      setValue('programYear', value.year);
      setValue('programKey', value.key);
      trigger('programName');
    }
    setOpenProgramModal(false);
  };
  const appendRequirements = () => {
    if (fields.length < MAX_LENGTH.requirements) {
      append({ value: '' }, { shouldFocus: true });
    }
  };
  const onKeyDownRequirement = (e) => {
    const value = e.target.value;
    if (value && e.key === 'Enter') {
      appendRequirements();
    }
  };

  return (
    <>
      {openProgramModal && (
        <ChooseProgramModal
          selectedDefault={{ programName: watch('programName') }}
          onClose={onCloseProgramModal}
        />
      )}
      <FormControl label="Tên khóa học" required padding={'1rem 0'}>
        <TextField
          hiddenLabel
          {...register('name')}
          autoFocus={true}
          placeholder="Nhập tên khóa học"
          inputProps={{
            maxLength: MAX_LENGTH.name
          }}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
        />
        <TextHelper>{(watch('name')?.length || 0) + '/' + MAX_LENGTH.name}</TextHelper>
      </FormControl>

      <FlexRow>
        <Box width={'50%'}>
          <FormControl label="Hạng mục đào tạo" required paddingLeft="0">
            <Controller
              name="categoryTrainingName"
              render={({ field: { value, onChange } }) => (
                <CategoryTrainingPicker
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                  placeholder="Chọn hạng mục"
                  error={Boolean(errors.categoryTrainingName)}
                  helperText={errors.categoryTrainingName?.message}
                />
              )}
              control={control}
            />
          </FormControl>
        </Box>
        <Box width={'50%'} display="flex">
          <FormControl label="Mã khóa học quản lý" required paddingRight="0">
            <Box display="flex" sx={{ alignItems: 'start' }}>
              <TextField
                fullWidth
                disabled
                hiddenLabel
                {...register('programName')}
                placeholder="Tìm kiếm từ Mã chương trình"
                error={Boolean(errors.programName)}
                helperText={errors.programName?.message}
              />
              <IconButton aria-label="delete" disabled={disabled} onClick={onOpenProgramModal}>
                <SearchIcon />
              </IconButton>
            </Box>
          </FormControl>
        </Box>
      </FlexRow>
      <Box width={'50%'} alignSelf="end" display="flex">
        <FormControl label="Khóa" width="50%" disabled>
          <TextField {...register('programKey')} disabled />
        </FormControl>
        <FormControl label="Năm" width="50%" disabled paddingRight="0">
          <TextField {...register('programYear')} disabled />
        </FormControl>
      </Box>

      <Controller
        name="type"
        render={({ field: { value, onChange } }) => (
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            row
            sx={{ width: '100%' }}
            onChange={onChange}>
            <Box display="flex" sx={{ flex: 1 }}>
              <HalfBox>
                <FormControl paddingLeft="0">
                  <FormControlLabel
                    value={COURSE_TYPE.OFFER}
                    control={<Radio />}
                    label="Cung cấp bởi"
                  />
                </FormControl>
              </HalfBox>
              <HalfBox>
                <FormControl paddingRight="0">
                  <FormControlLabel
                    value={COURSE_TYPE.PROVIDE}
                    control={<Radio />}
                    label="Hợp tác với"
                  />
                </FormControl>
              </HalfBox>
            </Box>
          </RadioGroup>
        )}
        control={control}
      />

      <Flex sx={{ flex: 1 }}>
        <FlexCol sx={{ width: '50%' }}>
          <FormControl paddingLeft="0">
            <Controller
              name="fileNameOfferBy"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputUpload
                  placeholder="Tải ảnh"
                  value={value}
                  disabled={watchType !== COURSE_TYPE.OFFER}
                  onChange={(file) => onChangeFile('fileNameOfferBy', file, onChange)}
                  maxSize={MAX_SIZE_IMAGE}
                  accept={IMAGE_ACCEPT}
                />
              )}
            />
          </FormControl>
        </FlexCol>
        <FlexCol sx={{ width: '50%' }}>
          <FormControl paddingRight="0">
            <Controller
              name="fileNameProvideBy1"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputUpload
                  placeholder="Tải ảnh"
                  value={value}
                  disabled={watchType === COURSE_TYPE.OFFER}
                  onChange={(file) => onChangeFile('fileNameProvideBy1', file, onChange)}
                  maxSize={MAX_SIZE_IMAGE}
                  accept={IMAGE_ACCEPT}
                />
              )}
            />
            <Controller
              name="fileNameProvideBy2"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputUpload
                  placeholder="Tải ảnh"
                  value={value}
                  disabled={watchType === COURSE_TYPE.OFFER}
                  onChange={(file) => onChangeFile('fileNameProvideBy2', file, onChange)}
                  maxSize={MAX_SIZE_IMAGE}
                  accept={IMAGE_ACCEPT}
                />
              )}
            />
            <Controller
              name="fileNameProvideBy3"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputUpload
                  placeholder="Tải ảnh"
                  value={value}
                  disabled={watchType === COURSE_TYPE.OFFER}
                  onChange={(file) => onChangeFile('fileNameProvideBy3', file, onChange)}
                  maxSize={MAX_SIZE_IMAGE}
                  accept={IMAGE_ACCEPT}
                />
              )}
            />
            <TextHelper>
              Hệ thống chỉ cho phép tải ảnh định dạng {ACCEPT_IMAGES.join(', ')}, dung lượng tối đa{' '}
              {MAX_SIZE_IMAGE}MB.
            </TextHelper>
          </FormControl>
        </FlexCol>
      </Flex>

      <FlexRow>
        <HalfBox>
          <FormControl label="Loại khóa học" required paddingLeft="0">
            <Controller
              name="courseTypeName"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value ?? ''}
                  onChange={onChange}
                  placeholder="Chọn loại khóa học"
                  disabled={disabled}
                  error={Boolean(errors.courseTypeName)}>
                  {courseCategory.courseType.map((c, index) => (
                    <MenuItem key={index} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
            {errors.courseTypeName && (
              <TextHelperError>{errors.courseTypeName?.message}</TextHelperError>
            )}
          </FormControl>
        </HalfBox>
        <HalfBox display="flex">
          <FormControl label="Loại hình đào tạo" required paddingRight="0">
            <Controller
              name="trainingTypeName"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value ?? ''}
                  onChange={onChange}
                  placeholder="Chọn"
                  disabled={disabled}
                  error={Boolean(errors.trainingTypeName)}>
                  {courseCategory.trainingType.map((c, index) => (
                    <MenuItem key={index} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
            {errors.trainingTypeName && (
              <TextHelperError>{errors.trainingTypeName?.message}</TextHelperError>
            )}
          </FormControl>
        </HalfBox>
      </FlexRow>

      <FlexRow>
        <HalfBox>
          <FormControl label="Trạng thái hoàn thành" required paddingLeft="0">
            <Controller
              name="passStatusName"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value ?? ''}
                  onChange={onChange}
                  placeholder="Chọn trạng thái"
                  disabled={disabled}
                  error={Boolean(errors.passStatusName)}>
                  {courseCategory.passStatus.map((c, index) => (
                    <MenuItem key={index} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
            {errors.passStatusName && (
              <TextHelperError>{errors.passStatusName?.message}</TextHelperError>
            )}
          </FormControl>
        </HalfBox>
        <HalfBox display="flex">
          <FormControl label="Thẻ" required paddingRight="0">
            <Controller
              name="tagsList"
              render={({ field: { value, onChange } }) => (
                <FreeTagInput
                  value={value}
                  onChange={onChange}
                  maxLength={5}
                  disabled={disabled}
                  error={Boolean(errors.tagsList)}
                  helperText={errors.tagsList?.message}
                />
              )}
              control={control}
            />
          </FormControl>
        </HalfBox>
      </FlexRow>

      <FormControl label="Tổng quan về khóa học" required padding={'1rem 0'}>
        <TextField
          {...register('summary')}
          placeholder="Nhập nội dung tóm tắt về khóa học"
          multiline
          inputProps={{
            maxLength: 300
          }}
          rows={3}
          error={Boolean(errors.summary)}
          helperText={errors.summary?.message}
        />
        <TextHelper>{(watch('summary')?.length || 0) + '/' + MAX_LENGTH.summary}</TextHelper>
      </FormControl>

      <FormControl label="Mô tả chi tiết về khóa học" padding={'1rem 0'}>
        <TextField
          {...register('detail')}
          placeholder="Nhập nội dung chi tiết về khóa học"
          multiline
          inputProps={{
            maxLength: 5000
          }}
          rows={3}
          error={Boolean(errors.detail)}
          helperText={errors.detail?.message}
        />
        <TextHelper>{(watch('detail')?.length || 0) + '/' + MAX_LENGTH.detail}</TextHelper>
      </FormControl>

      <FormControl label="Ảnh/Video khoá học" padding={'1rem 0'}>
        <Controller
          name="fileNamePreview"
          control={control}
          render={({ field: { value, onChange } }) => (
            <InputUpload
              placeholder="Tải video hoặc ảnh"
              value={value}
              onChange={(file) => onChangeFilePreview(file, onChange)}
              // error={!!errors.fileNamePreview}
              helperText={errors.fileNamePreview?.message}
            />
          )}
        />
        <TextHelper>
          Hệ thống cho phép video định dạng {ACCEPT_VIDEO.join(', ')} dung lượng tối đa{' '}
          {MAX_SIZE_VIDEO}MB ảnh định dạng {IMAGE_ACCEPT.join(', ')} dụng lượng tối đa{' '}
          {MAX_SIZE_IMAGE}MB
        </TextHelper>
      </FormControl>

      <FlexRow>
        <HalfBox>
          <FormControl label="Yêu cầu" paddingLeft="0">
            <Box display="flex" flexDirection="column">
              {fields.map((field, index, arr) => (
                <Box display="flex" sx={{ marginTop: '10px' }} key={field.id}>
                  <TextField
                    fullWidth
                    placeholder="Nhập yêu cầu"
                    inputProps={{
                      maxLength: 100
                    }}
                    onKeyDown={onKeyDownRequirement}
                    autoFocus={index > 0 ? true : false}
                    {...register(`requirementCoursesName[${index}].value`)}
                  />
                  {disabled ? null : index === arr.length - 1 ? (
                    <IconButton
                      onClick={appendRequirements}
                      sx={{ visibility: fields.length < MAX_LENGTH.requirements ? '' : 'hidden' }}>
                      <AddIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => remove(index)}>
                      <RemoveIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>
          </FormControl>
        </HalfBox>
        <HalfBox display="flex">
          <FormControl label="Miền bảo mật" required paddingRight="0">
            <Controller
              name="securityAreaName"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                  error={Boolean(errors.securityAreaName)}>
                  {courseCategory.securityArea.map((c, index) => (
                    <MenuItem key={index} value={c.code}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
            {errors.securityAreaName && (
              <TextHelperError>{errors.securityAreaName?.message}</TextHelperError>
            )}
          </FormControl>
        </HalfBox>
      </FlexRow>

      <FlexRow>
        <HalfBox>
          <FormControl label="Kỹ năng" required paddingLeft="0">
            <Controller
              name="skillName"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value ?? []}
                  multiple
                  options={skills}
                  onChange={(_, val) => onChange(val)}
                  selectOnFocus
                  clearOnBlur
                  disabled={disabled}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn hoặc nhập"
                      error={Boolean(errors.skillName)}
                      helperText={errors.skillName?.message}
                    />
                  )}
                />
              )}
              control={control}
            />
          </FormControl>
        </HalfBox>
        <HalfBox display="flex">
          <FormControl label="Mức độ kinh nghiệm" required paddingRight="0">
            <Controller
              name="experienceName"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  value={value ?? ''}
                  options={experiences}
                  onChange={(_, val) => onChange(val)}
                  selectOnFocus
                  clearOnBlur
                  disabled={disabled}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Chọn hoặc nhập"
                      error={Boolean(errors.experienceName)}
                      helperText={errors.experienceName?.message}
                    />
                  )}
                />
              )}
              control={control}
            />
          </FormControl>
        </HalfBox>
      </FlexRow>
    </>
  );
}
