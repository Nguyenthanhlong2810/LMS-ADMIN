import React, { useEffect, useRef } from 'react';
import { useLoading } from 'hooks/LoadingProvider';
import { useForm } from 'react-hook-form';
import { defaultValue, TitleImportContent } from '../config';
import { BackButton, Title } from 'components';
import { Flex, FlexCol } from 'components/Layout/Layout';
import { Box, Button, Divider } from '@mui/material';
import FormBody from './FormBody';
import { useNavigate, useParams } from 'react-router-dom';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { toast } from 'react-toastify';
import { ImportContentAPI } from 'apis/ImportContent';
import { HTTP_STATUS, messageCreate, messageUpdate, messageWarning } from 'consts';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../validation';

function ImportContentForm() {
  const { showLoading, hideLoading } = useLoading();

  const fileListRef = useRef([]);

  const navigate = useNavigate();

  const { id } = useParams();
  const isUpdate = Boolean(id);

  const confirm = useConfirmDialog();

  const form = useForm({
    defaultValues: { ...defaultValue },
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (isUpdate) {
      getContentById(id);
    }
  }, []);

  const getContentById = async (id) => {
    try {
      showLoading();
      const res = await ImportContentAPI.getById(id);
      if (res && res.status === HTTP_STATUS.StatusOK) {
        form.reset(res.data.data);
      }
      hideLoading();
    } catch (error) {
      toast.error('Có lỗi xảy ra !');
    }
  };

  const onChangeFile = (file, cb) => {
    fileListRef.current = file;
    cb(file?.name);
  };

  const clearUploadFiles = () => {
    fileListRef.current = undefined;
    form.setValue('nameContent', undefined);
  };

  const onCancel = () => {
    confirm({
      content: isUpdate
        ? 'Bạn có chắc chắn muốn hủy sửa nội dung này không?'
        : 'Bạn có chắc chắn muốn hủy thêm nội dung này không?',
      onConfirm: () => {
        navigate(-1);
      }
    });
  };

  const onSubmit = (data) => {
    if (isUpdate) {
      updateImportContent(data);
    } else {
      createImportContent(data);
    }
  };

  const createImportContent = async (data) => {
    try {
      showLoading();
      const res = await ImportContentAPI.create(data, [fileListRef.current]);
      hideLoading();
      if (res.status === HTTP_STATUS.StatusOK) {
        const newId = res.data?.data.length > 0 ? res.data?.data[0].id : null;
        if (newId) {
          toast.success(messageCreate.ImportContent);
          navigate('/content/import-content');
        } else {
          toast.error('Thêm nội dung không thành công');
        }
      }
    } catch (error) {
      hideLoading();
      toast.error(error?.response?.data?.message || messageWarning.networkError);
    }
  };

  const updateImportContent = async (data) => {
    try {
      showLoading();
      const res = await ImportContentAPI.update(data);
      hideLoading();
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success(messageUpdate.ImportContent);
        navigate('/content/import-content/');
      }
    } catch (error) {
      hideLoading();
      toast.error(error?.response?.data?.message || messageWarning.networkError);
    }
  };

  return (
    <>
      <FlexCol
        sx={{
          gap: 2
        }}>
        <BackButton />
        <Box
          sx={{
            background: '#fff',
            padding: 2
          }}>
          <Box sx={{ paddingX: 2 }}>
            <Title>
              {isUpdate ? TitleImportContent.editContent : TitleImportContent.addContent}
            </Title>
            <Divider />
          </Box>
          <form>
            <FormBody
              form={form}
              onChangeFile={onChangeFile}
              clearUploadFiles={clearUploadFiles}
              isUpdate={isUpdate}
            />
          </form>
        </Box>

        <Flex justifyContent="flex-end">
          <Button
            variant="contained"
            size="large"
            sx={{ color: '#fff', borderColor: 'black', background: '#66788A' }}
            onClick={onCancel}>
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            sx={{ ml: '15px' }}>
            Lưu
          </Button>
        </Flex>
      </FlexCol>
    </>
  );
}

ImportContentForm.propTypes = {};

export default ImportContentForm;
