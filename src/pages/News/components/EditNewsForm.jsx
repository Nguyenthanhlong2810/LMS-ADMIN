import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import LoadingButton from '@mui/lab/LoadingButton';
import { NewAPI } from 'apis/News';
import { FormControl, FreeTagInput, InputUpload, Modal } from 'components';
import { DEFAULT_ERROR_MESSAGE, IMAGE_ACCEPT } from 'consts';
import { NEWS_TYPE } from '../const';
import { toast } from 'react-toastify';
import { messageWarning } from 'consts';
import ChooseCourseModal from './ChooseCourseModal/ChooseCourseModal';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import QuillEditor from 'components/Quill/Quill';
import ValidationMessage from 'consts/validation.const';
import { TextHelperError } from 'components/Layout/Layout';

const MAX_SIZE_IMAGE = 15; //MB
const MAX_SIZE_VIDEO = 200; //MB
const MIN_DIMENSIONS_IMAGE = {
  width: 1440,
  height: 580
};

const ListNewsTypes = NEWS_TYPE.slice(1);

const EditNewsForm = (props) => {
  const { setIsCreateNew, newDetail, typeOfNews, refreshNews, onClose } = props;
  const isVideoNews = typeOfNews === 'VIDEO';
  const schema = yup.object({
    subject: yup
      .string()
      .trim()
      .required()
      .matches(
        /^[a-zA-Z\s0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý]+$/,
        'Không được nhập ký tự đặc biệt'
      ),
    lmsNewsLabels: yup.array().of(yup.string().max(20, 'Mỗi từ khóa tối đa 20 ký tự')).max(3),
    contentType: yup.string(),
    textContent: yup.string().when('contentType', {
      is: NEWS_TYPE[0].value,
      // then: yup.string()
      then: yup.string().matches(/\S/),
      otherwise: yup.string().matches(/\S/).required()
    }),
    fileImage: newDetail ? yup.mixed().notRequired() : yup.mixed().required(),
    fileVideo: !newDetail && isVideoNews ? yup.mixed().required() : yup.mixed().notRequired(),
    courseLink: yup
      .string()
      .nullable()
      .when('contentType', {
        is: ListNewsTypes[1].value,
        then: yup.string().nullable().required('Trường này không được bỏ trống')
      })
  });
  let fileName = newDetail?.attachmentLink?.split('/') || [];
  fileName = fileName[fileName.length - 1];
  let fileThumbnail = newDetail?.thumbnail?.split('/') || [];
  fileThumbnail = fileThumbnail[fileThumbnail.length - 1];

  const defaultValues = newDetail
    ? { ...newDetail }
    : {
        contentType: 'NORMAL',
        isHotNews: false,
        textContent: undefined
      };
  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
    formState: { errors, isSubmitted },
    watch
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema)
  });
  const watchType = watch('contentType');
  const [fileImage, setFileImage] = useState(null);
  const [fileVideo, setFileVideo] = useState(null);
  const [isLoadingDraft, setIsLoadingDraft] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(false);
  const [isOpenCourse, setIsOpenCourse] = useState(false);
  const [isOpenEvent, setIsOpenEvent] = useState(false);
  const [textContent, setTextContent] = useState(undefined);
  const confirm = useConfirmDialog();

  const onChangeFormValue = (data, key) => {
    setValue(key, data, { shouldValidate: true });
  };
  const submitForm = async (values) => {
    if (!isVideoNews && (!textContent?.length || !/\S/.test(textContent))) return;
    delete values.fileImage;
    delete values.fileVideo;
    const contentType = typeOfNews === 'VIDEO' ? typeOfNews : values.contentType;
    const value = {
      ...values,
      contentType: contentType,
      fileAttach: contentType === 'VIDEO' ? fileVideo : fileImage
    };
    if (contentType !== 'COURSE_LINKED') {
      delete value.courseLink;
    }
    if (contentType === 'VIDEO') {
      value.thumbnailImg = fileImage;
    }
    if (!value.isHotNews || !value.status) {
      value.isPinned = false;
    }
    try {
      if (newDetail) {
        await NewAPI.update({ ...value, id: newDetail.id });
        refreshNews();
        onClose();
      } else {
        await NewAPI.create(value);
        setIsCreateNew(false);
      }
      toast.success('Lưu thành công');
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };
  const handleUploadVideo = (value) => {
    setFileVideo(value);
    onChangeFormValue(value, 'fileVideo');
  };
  const handleUploadFile = (value) => {
    setFileImage(value);
    onChangeFormValue(value, 'fileImage');
  };
  const onCancelCreate = () => {
    setIsCreateNew(false);
  };
  const onCancelEdit = () => {
    confirm({
      content:
        'Tin này sẽ không còn hiển thị trên Bản tin Học viên và chuyển sang trạng thái Tin nháp. Bạn có chắc chắn muốn huỷ đăng không?',
      onConfirm: onSaveDraft
    });
  };
  const onSaveDraft = async () => {
    onChangeFormValue(false, 'status');
    setIsLoadingDraft(true);
    await handleSubmit(submitForm)();
    setIsLoadingDraft(false);
  };
  const onSaveToPost = async () => {
    onChangeFormValue(true, 'status');
    setIsLoadingPost(true);
    await handleSubmit(submitForm)();
    setIsLoadingPost(false);
  };
  const toggleCourseModal = () => {
    setIsOpenCourse(!isOpenCourse);
  };
  const closeCourseModal = (value) => {
    if (value) {
      setValue('courseLink', value.id);
    }
    setIsOpenCourse(false);
  };
  const toggleEventModal = () => {
    setIsOpenEvent(!isOpenEvent);
  };
  const labelError =
    errors?.lmsNewsLabels?.message || errors?.lmsNewsLabels?.find((item) => item?.message)?.message;
  return (
    <div>
      <FormControl label="Tiêu đề" required>
        <TextField
          error={!!errors?.subject?.message}
          helperText={errors?.subject?.message}
          {...register('subject')}
          placeholder="Nhập nội dung tiêu đề"
          inputProps={{
            maxLength: 200
          }}
        />
      </FormControl>

      <Box sx={{ display: 'flex', alignItems: 'center', padding: 0, gap: 1 }}>
        <FormControl label="Từ khóa" flex={1}>
          <FreeTagInput
            defaultValue={getValues('lmsNewsLabels')}
            onChange={(value) => {
              onChangeFormValue(value, 'lmsNewsLabels');
            }}
            error={!!errors?.lmsNewsLabels}
            helperText={labelError}
            placeholder="Nhập"
          />
        </FormControl>

        <Controller
          name="isHotNews"
          render={({ field }) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              }
              label="Tin nổi bật"
            />
          )}
          control={control}
        />
      </Box>

      <FormControl label={'Hình ảnh thumbnail'} required>
        <InputUpload
          error={!!errors?.fileImage?.message}
          helperText={errors?.fileImage?.message}
          accept={IMAGE_ACCEPT}
          placeholder="Tải ảnh"
          value={fileImage?.name || (isVideoNews ? fileThumbnail : fileName)}
          onChange={handleUploadFile}
          maxSize={MAX_SIZE_IMAGE}
          acceptDimensions={MIN_DIMENSIONS_IMAGE}
        />
        <FormHelperText>{messageWarning.imageSize}</FormHelperText>
      </FormControl>
      {isVideoNews && (
        <FormControl label={'Thêm video'} required>
          <InputUpload
            error={!!errors?.fileVideo?.message}
            helperText={errors?.fileVideo?.message}
            accept={['.mp4']}
            acceptText={['.mp4']}
            value={fileVideo?.name || fileName}
            onChange={handleUploadVideo}
            placeholder="Tải video"
            maxSize={MAX_SIZE_VIDEO}
          />
          <FormHelperText>{messageWarning.videoSize}</FormHelperText>
        </FormControl>
      )}

      {!isVideoNews && (
        <FormControl label="Liên kết" required>
          <Controller
            name="contentType"
            render={({ field }) => (
              <RadioGroup row name="radio-buttons-group" {...field}>
                {ListNewsTypes.map((type) => (
                  <FormControlLabel
                    key={type.value}
                    value={type.value}
                    control={<Radio />}
                    label={type.label}
                  />
                ))}
              </RadioGroup>
            )}
            control={control}
          />
        </FormControl>
      )}
      {watchType === ListNewsTypes[1].value && !isVideoNews && (
        <FormControl label="ID khóa học" required>
          <TextField
            placeholder="Nhập hoặc tìm kiếm"
            sx={{ maxWidth: 600 }}
            disabled
            error={!!errors?.courseLink?.message}
            helperText={errors?.courseLink?.message}
            {...register('courseLink')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            onClick={toggleCourseModal}
          />
        </FormControl>
      )}
      <FormControl
        label={isVideoNews ? 'Tóm tắt nội dung' : 'Mô tả nội dung '}
        required={isVideoNews ? false : true}>
        <Controller
          name="textContent"
          render={({ field }) => (
            <>
              <QuillEditor
                value={field.value}
                onChange={(valueHTML, _, content) => {
                  field.onChange(valueHTML);
                  setTextContent(content?.trim());
                }}
                allowImage
                maxLength={5000}
                placeholder="Nhập nội dung chi tiết"
              />
              {!isVideoNews && (
                <TextHelperError>
                  {!isSubmitted
                    ? ''
                    : !textContent?.length
                    ? ValidationMessage.mixed.required
                    : !/\S/.test(textContent)
                    ? ValidationMessage.mixed.matches
                    : ''}
                </TextHelperError>
              )}
            </>
          )}
          control={control}
        />
      </FormControl>

      {newDetail ? (
        <DialogActions className="button-group" sx={{ justifyContent: 'center' }}>
          <Button
            variant="outlined"
            color="info"
            size="large"
            sx={{ color: 'black', borderColor: 'black' }}
            onClick={newDetail.status ? onCancelEdit : onSaveDraft}>
            {newDetail.status ? 'Hủy đăng' : 'Lưu nháp'}
          </Button>

          <LoadingButton color="secondary" size="large" onClick={onSaveToPost} variant="contained">
            Đăng
          </LoadingButton>
        </DialogActions>
      ) : (
        <Box sx={{ padding: 2, gap: 1, textAlign: 'right' }}>
          <Button
            variant="outlined"
            color="info"
            size="large"
            sx={{ color: 'black', borderColor: 'black' }}
            onClick={onCancelCreate}>
            Hủy
          </Button>
          <LoadingButton
            size="large"
            loading={isLoadingDraft}
            disabled={isLoadingPost}
            onClick={onSaveDraft}
            className="mx-2"
            variant="contained">
            Lưu nháp
          </LoadingButton>
          <LoadingButton
            color="secondary"
            size="large"
            disabled={isLoadingDraft}
            loading={isLoadingPost}
            onClick={onSaveToPost}
            variant="contained">
            Đăng
          </LoadingButton>
        </Box>
      )}
      <Modal isOpen={isOpenCourse} title="Tìm kiếm khóa học" onClose={toggleCourseModal}>
        <ChooseCourseModal onClose={closeCourseModal} />
      </Modal>
      <Modal isOpen={isOpenEvent} title="Tìm kiếm sự kiện" onClose={toggleEventModal}>
        <ChooseCourseModal />
      </Modal>
    </div>
  );
};
EditNewsForm.propTypes = {
  setIsCreateNew: PropTypes.func,
  refreshNews: PropTypes.func,
  onClose: PropTypes.func,
  newDetail: PropTypes.object,
  typeOfNews: PropTypes.string
};
export default EditNewsForm;
