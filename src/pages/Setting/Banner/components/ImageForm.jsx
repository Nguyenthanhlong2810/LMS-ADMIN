import { yupResolver } from '@hookform/resolvers/yup';
import { Add } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { BannerAPI } from 'apis/Banner';
import { FormControl, InputNumber, InputUpload, Modal } from 'components';
import { Flex, FlexAlignItemsCenter, TextHelper } from 'components/Layout/Layout';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS, IMAGE_ACCEPT } from 'consts';
import ValidationMessage from 'consts/validation.const';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import _ from 'lodash';
import { ACCEPT_IMAGES, MAX_SIZE_IMAGE } from 'pages/Learning/Courses/CourseForm/config';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { BannerSlick } from './BannerSlick';

export const schema = yup
  .object({
    attachmentName: yup.string().nullable().required(),
    imgTime: yup.number().min(1).integer().typeError(ValidationMessage.number.integer)
  })
  .required();

const MIN_DIMENSIONS_IMAGE = {
  width: 1320,
  height: 467
};
const ImageForm = () => {
  const confirm = useConfirmDialog();
  const fileListRef = useRef(undefined);
  const thumbnailRef = useRef([]);
  const { showLoading, hideLoading } = useLoading();
  const [openPreview, setOpenPreview] = useState(false);
  const [imageBanner, setImageBanner] = useState([]);
  const [imgTime, setImgTime] = useState(null);
  const [dataBanner, setDataBanner] = useState();

  const defaultImageForm = {
    thumbnails: [{ thumbnailName: '' }]
  };
  const {
    handleSubmit,
    control,
    register,
    reset,
    getValues,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: defaultImageForm,
    resolver: yupResolver(schema)
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'thumbnails'
  });

  useEffect(() => {
    getBanner();
  }, []);

  const [checkUpdate, setCheckUpdate] = useState(false);

  const initDataBanner = (data) => {
    data.thumbnails ||= [{ thumbnailName: '' }];
    reset(data);
    fileListRef.current = data?.attachmentLink;
    thumbnailRef.current = data?.thumbnails ? [...data.thumbnails] : [];
  };
  const getBanner = async () => {
    try {
      showLoading();
      const res = await BannerAPI.getList({ type: 'IMAGE' });
      if (res && res.status === HTTP_STATUS.StatusOK) {
        const { data } = res;
        setDataBanner(_.cloneDeep(data));
        initDataBanner(data);
        setCheckUpdate(Boolean(data?.id));
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };
  const submitForm = async (values) => {
    values.attachmentLink = fileListRef.current ?? values.attachmentName;
    values.type = 'IMAGE';
    if (thumbnailRef.current.length) {
      values.thumbnails = thumbnailRef.current.filter((thumb) => thumb?.thumbnailName !== '');
    }
    showLoading();
    try {
      let res;
      if (checkUpdate) res = await BannerAPI.update({ ...values });
      else res = await BannerAPI.create({ ...values });
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Cấu hình banner thành công');
        setDataBanner(res.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const onSaveBanner = () => {
    handleSubmit(submitForm)();
  };

  const onChangeAttachmentLink = (file, cb) => {
    fileListRef.current = file;
    cb(file?.name);
  };

  const onChangeThumbnail = (field, file, cb) => {
    thumbnailRef.current[field] = file;
    cb(file?.name || '');
  };

  const onCancel = () => {
    confirm({
      content: 'Bạn có chắc chắn muốn hủy cấu hình banner không?',
      onConfirm: () => {
        initDataBanner(dataBanner);
      }
    });
  };

  const onPreview = () => {
    const attachmentLink =
      fileListRef.current instanceof File
        ? URL.createObjectURL(fileListRef.current)
        : fileListRef.current;
    const thumb = thumbnailRef.current.reduce((prev, cur) => {
      if (cur && cur?.thumbnailName !== '') {
        return [...prev, cur instanceof File ? URL.createObjectURL(cur) : cur?.thumbnailLink];
      }
      return prev;
    }, []);
    const imgList = [attachmentLink].concat(thumb);
    setImgTime(getValues('imgTime') * 1000);
    setImageBanner(imgList);
    setOpenPreview(true);
  };

  const onRemoveImage = (index) => {
    remove(index);
    thumbnailRef.current.splice(index, 1);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 15 }}>
        <Box sx={{ backgroundColor: 'white' }}>
          <FormControl label="Hình ảnh chính" required>
            <Controller
              name="attachmentName"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputUpload
                  placeholder="Tải ảnh"
                  value={value}
                  accept={IMAGE_ACCEPT}
                  onChange={(file) => onChangeAttachmentLink(file, onChange)}
                  maxSize={MAX_SIZE_IMAGE}
                  error={!!errors.attachmentName}
                  helperText={errors.attachmentName?.message}
                  acceptDimensions={MIN_DIMENSIONS_IMAGE}
                />
              )}
            />
            <TextHelper>
              Hệ thống chỉ cho phép tải ảnh định dạng {ACCEPT_IMAGES.join(', ')}, dung lượng tối đa{' '}
              {MAX_SIZE_IMAGE}MB.
            </TextHelper>
          </FormControl>
          {fields?.map((item, index) => {
            return (
              <FormControl key={item.id} label="Hình ảnh phụ">
                <FlexAlignItemsCenter>
                  <div className="flex-1">
                    <Controller
                      name={`thumbnails[${index}].thumbnailName`}
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <InputUpload
                          placeholder="Tải ảnh"
                          value={value ?? ''}
                          accept={IMAGE_ACCEPT}
                          onChange={(file) => onChangeThumbnail(index, file, onChange)}
                          maxSize={MAX_SIZE_IMAGE}
                          error={!!errors.thumbnails}
                          helperText={errors.thumbnails?.message}
                          acceptDimensions={MIN_DIMENSIONS_IMAGE}
                        />
                      )}
                    />
                    {fields.length !== 1 && (
                      <Button
                        color="error"
                        onClick={() => onRemoveImage(index)}
                        sx={{ alignSelf: 'end' }}>
                        Xoá file
                      </Button>
                    )}
                    <TextHelper sx={{ marginTop: '15px' }}>
                      Hệ thống chỉ cho phép tải ảnh định dạng {ACCEPT_IMAGES.join(', ')}, dung lượng
                      tối đa {MAX_SIZE_IMAGE}MB.
                    </TextHelper>
                  </div>

                  {index === fields.length - 1 && index !== 3 && (
                    <Button
                      color="secondary"
                      size="large"
                      onClick={() => append({})}
                      sx={{ height: 40, width: 40, padding: '28px 0', marginBottom: '30px' }}>
                      <Add />
                    </Button>
                  )}
                </FlexAlignItemsCenter>
              </FormControl>
            );
          })}
          {fields?.length === 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Button
                color="secondary"
                variant="contained"
                size="large"
                onClick={() => append({})}
                sx={{
                  height: 40,
                  width: 40,
                  padding: '28px 0',
                  marginBottom: '30px',
                  textAlign: 'center'
                }}>
                <Add />
              </Button>
            </div>
          )}

          <FormControl label="Thời gian chuyển ảnh">
            <Flex>
              <InputNumber
                {...register('imgTime', {
                  onChange: (e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                })}
                sx={{ width: 120 }}
                error={Boolean(errors?.imgTime)}
                helperText={errors?.imgTime?.message}
              />
              <div style={{ color: '#ADABAB', marginLeft: 10, marginTop: 10 }}>Giây</div>
            </Flex>
          </FormControl>

          <Box sx={{ padding: 2, gap: 1, textAlign: 'right' }}>
            <Button
              color="primary"
              size="large"
              variant="contained"
              onClick={onPreview}
              disabled={!watch('attachmentName')}>
              Xem trước
            </Button>
            <Button
              variant="outlined"
              color="info"
              size="large"
              sx={{ color: 'black', borderColor: 'black', margin: '0 8px' }}
              onClick={onCancel}>
              Hủy
            </Button>

            <Button color="secondary" size="large" variant="contained" onClick={onSaveBanner}>
              Áp dụng
            </Button>
          </Box>
        </Box>
      </form>

      {openPreview && (
        <Modal isOpen={openPreview} onClose={() => setOpenPreview(false)}>
          <BannerSlick bannerType={'IMAGE'} imageBanner={imageBanner} imgTime={imgTime ?? 3000} />
        </Modal>
      )}
    </>
  );
};

export default ImageForm;
