import React, { useEffect, useRef, useState } from 'react';

import { Box, Button } from '@mui/material';
import { FormControl, InputUpload, Modal } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { yupResolver } from '@hookform/resolvers/yup';
import { BannerAPI } from 'apis/Banner';
import { TextHelper } from 'components/Layout/Layout';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS, VIDEO_ACCEPT } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import { ACCEPT_VIDEO } from 'pages/Content/ImportContent/config';
import { MAX_SIZE_VIDEO } from 'pages/Learning/Courses/CourseForm/config';
import * as yup from 'yup';
import { BannerSlick } from './BannerSlick';
import _ from 'lodash';

export const schema = yup
  .object({
    attachmentName: yup.string().nullable().required()
  })
  .required();

const VideoForm = () => {
  const confirm = useConfirmDialog();
  const fileListRef = useRef(undefined);
  const { showLoading, hideLoading } = useLoading();
  const [openPreview, setOpenPreview] = useState(false);
  const [imageBanner, setImageBanner] = useState([]);
  const [imgTime, setImgTime] = useState(null);
  const [dataBanner, setDataBanner] = useState();
  const [checkUpdate, setCheckUpdate] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    getBanner();
  }, []);

  const initDataBanner = (data) => {
    reset(data);
    fileListRef.current = data?.attachmentLink;
  };
  const getBanner = async () => {
    try {
      showLoading();
      const res = await BannerAPI.getList({ type: 'VIDEO' });
      if (res && res.status === HTTP_STATUS.StatusOK) {
        const { data } = res;
        setDataBanner(_.cloneDeep(data));
        initDataBanner(data);

        setCheckUpdate(Boolean(data?.attachmentLink));
      }
      hideLoading();
    } catch (error) {
      hideLoading();
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };

  const submitForm = async (values) => {
    values.attachmentLink = fileListRef.current ?? values.attachmentName;
    values.type = 'VIDEO';
    showLoading();
    try {
      let res;
      if (checkUpdate) {
        res = await BannerAPI.update({ ...values });
      } else res = await BannerAPI.create({ ...values });
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Cấu hình banner thành công');
        setDataBanner(res.data);
      }
    } catch (error) {
      toast.error(error?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };

  const onSaveBanner = () => {
    handleSubmit(submitForm)();
  };

  const onChangeFile = (file, cb) => {
    fileListRef.current = file;
    cb(file?.name);
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
    setImageBanner(attachmentLink);
    setImgTime(null);
    setOpenPreview(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)} style={{ marginTop: 15 }}>
        <Box sx={{ backgroundColor: 'white' }}>
          <FormControl label="Tải video" required>
            <Controller
              name="attachmentName"
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputUpload
                  value={value}
                  onChange={(file) => onChangeFile(file, onChange)}
                  maxSize={MAX_SIZE_VIDEO}
                  accept={VIDEO_ACCEPT}
                  acceptText={['.mp4']}
                  error={!!errors.attachmentName}
                  helperText={errors.attachmentName?.message}
                />
              )}
            />
            <TextHelper>
              Hệ thống chỉ cho phép tải ảnh định dạng {ACCEPT_VIDEO.join(', ')}, dung lượng tối đa{' '}
              {MAX_SIZE_VIDEO}MB.
            </TextHelper>
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
          <BannerSlick bannerType={'VIDEO'} imageBanner={imageBanner} imgTime={imgTime} />
        </Modal>
      )}
    </>
  );
};

export default VideoForm;
