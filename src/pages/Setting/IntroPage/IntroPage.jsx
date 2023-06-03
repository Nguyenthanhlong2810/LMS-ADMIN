import { IMAGE_ACCEPT, MIN_DIMENSIONS_IMAGE } from 'consts/system.const';

import React, { useEffect, useRef, useState } from 'react';

import Add from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box, Button, styled, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { AdminAPI } from 'apis/Admin';

import Title from 'components/Title/Title';
import { toast } from 'react-toastify';
import { FormControl, InputUpload } from 'components';
import { DEFAULT_ERROR_MESSAGE } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import { cloneDeep } from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import ValidationMessage from 'consts/validation.const';

const FormControlContainer = styled('div')({
  padding: 1,
  background: '#F5F8FF',
  borderRadius: 7
});

const TipDescription = styled('div')({
  background: '#FBFBFB',
  padding: '10px 12px',
  borderRadius: 7,
  margin: '5px 0',
  color: '#565771',
  fontWeight: 300
});

const IntroPage = () => {
  const [fileList, setFileList] = useState([]);
  const [site, setSite] = useState('vn');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const defaultTitle = [
    {
      title: '',
      description: ''
    }
  ];
  const defaultFeedback = [
    {
      image: undefined,
      feedback: undefined,
      name: undefined
    }
  ];
  const defaultIntro = {
    formLoginName: undefined,
    systemPurposeName: undefined,
    introduceImageName1: undefined,
    introduceImageName2: undefined,
    feedbacks: [],
    titleLandingPages: []
  };
  const [form, setForm] = useState({
    vn: defaultIntro,
    en: defaultIntro
  });
  const initIntroForm = useRef({ vn: defaultIntro, en: defaultIntro });

  const loadDocument = () => {
    AdminAPI.getDocument('vn')
      .then((res) => {
        const vnForm = res.data.data;
        const newVnForm = {
          ...vnForm.landingPageSetting,
          feedbacks: vnForm.feedbacks || defaultFeedback,
          titleLandingPages: vnForm.titleLandingPages || defaultTitle
        };
        setForm((state) => {
          return {
            vn: newVnForm,
            en: state.en
          };
        });
        initIntroForm.current = {
          vn: cloneDeep(newVnForm),
          en: form.en
        };
      })
      .catch((error) => toast.error(error));
  };

  useEffect(() => {
    loadDocument();
  }, []);

  const onChangeUploadFile = (value, field, index) => {
    const newform = form[site];
    if (index !== undefined) {
      newform[field][index].imageLearnerName = value?.name;
    } else {
      newform[field] = value?.name;
    }
    if (value) {
      setFileList([...fileList, value]);
    }
    setForm({ ...form, [site]: newform });
  };

  const onChangeFormValue = (value, field, index, subField) => {
    const newform = form[site];
    if (index !== undefined) {
      newform[field][index][subField] = value;
    } else {
      newform[field] = value;
    }
    setForm({ ...form, [site]: newform });
  };

  const onAddFeedBack = () => {
    const newform = form[site];
    newform.feedbacks.push({
      image: undefined,
      feedback: undefined,
      name: undefined,
      id: uuidv4()
    });
    setForm({ ...form, [site]: newform });
  };

  const onAddPurpose = () => {
    const newform = form[site];
    newform.titleLandingPages.push({
      title: undefined,
      description: undefined,
      id: uuidv4()
    });
    setForm({ ...form, [site]: newform });
  };

  const onRemovePurpose = (index) => {
    const newform = form[site];
    newform.titleLandingPages.splice(index, 1);
    setForm({ ...form, [site]: newform });
  };
  const onRemoveFeedback = (index) => {
    const newform = form[site];
    newform.feedbacks.splice(index, 1);
    setForm({ ...form, [site]: newform });
  };

  const onChangeSite = (e) => setSite(e.target.value);

  const isFormValid = () => {
    const siteForm = form[site];
    siteForm.titleLandingPages = siteForm.titleLandingPages.map((title) => {
      delete title.id;
      return title;
    });
    siteForm.feedbacks = siteForm.feedbacks.map((feedback) => {
      delete feedback.id;
      return feedback;
    });
    return (
      siteForm.formLoginName &&
      siteForm.systemPurposeName &&
      siteForm.titleLandingPages.every((c) => c.title && c.description) &&
      siteForm.introduceImageName1 &&
      siteForm.introduceImageName2 &&
      siteForm.feedbacks.every((c) => c.imageLearnerName && c.learnerName && c.contentFeedback)
    );
  };

  const onSubmit = async () => {
    setIsSubmitted(true);
    if (isFormValid()) {
      const submitForm = { language: site, ...form[site] };
      showLoading();
      try {
        await AdminAPI.uploadAdminSetting(fileList, submitForm);
        toast.success('Lưu thành công');
      } catch (error) {
        toast.error(error.response.data.message || DEFAULT_ERROR_MESSAGE);
      } finally {
        hideLoading();
      }
    } else {
      setTimeout(() => {
        const errorEl = document.querySelector('.Mui-error');
        errorEl.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  };

  const onCancel = () => {
    setForm(cloneDeep(initIntroForm.current));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
      <Box
        sx={{
          background: '#fff',
          padding: 2
        }}>
        <Title>thông tin trang giới thiệu</Title>
        <hr />
        <Box sx={{ marginY: 3, display: 'flex', flexFlow: 'column', gap: 2 }}>
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <ToggleButtonGroup
              color="primary"
              value={site}
              exclusive
              onChange={onChangeSite}
              size="small">
              <ToggleButton value="vn">Tiếng Việt</ToggleButton>
              <ToggleButton value="en">Tiếng Anh</ToggleButton>
            </ToggleButtonGroup>
          </Box> */}
          <FormControlContainer>
            <FormControl label="Hình ảnh form login" required>
              <InputUpload
                error={isSubmitted && !form[site]?.formLoginName}
                accept={IMAGE_ACCEPT}
                maxSize={5}
                acceptDimensions={MIN_DIMENSIONS_IMAGE}
                value={form[site]?.formLoginName}
                onChange={(value) => onChangeUploadFile(value, 'formLoginName')}
                helperText={ValidationMessage.mixed.required}
              />
            </FormControl>
          </FormControlContainer>

          <Title>banner giới thiệu mục đích hệ thống</Title>
          <FormControlContainer>
            <FormControl label="Hình Ảnh Mục Đích Hệ Thống" required>
              <InputUpload
                error={isSubmitted && !form[site].systemPurposeName}
                accept={IMAGE_ACCEPT}
                maxSize={5}
                acceptDimensions={MIN_DIMENSIONS_IMAGE}
                value={form[site]?.systemPurposeName}
                onChange={(value) => onChangeUploadFile(value, 'systemPurposeName')}
                helperText={ValidationMessage.mixed.required}
              />
            </FormControl>
          </FormControlContainer>

          <TipDescription>
            Chọn ảnh có định dạng png, dạng hiển thị transparent và dung lượng tối đa 5MB.
          </TipDescription>

          <FormControlContainer>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end'
              }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={onAddPurpose}
                disabled={form[site]?.titleLandingPages?.length >= 3}
                sx={{ height: 40, width: 40, m: 2 }}>
                <Add />
              </Button>
            </Box>
            {form[site]?.titleLandingPages?.map((c, i, arr) => (
              <React.Fragment key={c.id}>
                {arr.length > 1 && (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => onRemovePurpose(i)}
                      sx={{ m: 2 }}>
                      <RemoveIcon />
                    </Button>
                  </Box>
                )}
                <FormControl label="Tiêu đề" required>
                  <TextField
                    inputProps={{
                      maxLength: 50
                    }}
                    value={c.title}
                    error={isSubmitted && !c.title}
                    onChange={(e) =>
                      onChangeFormValue(e.target.value, 'titleLandingPages', i, 'title')
                    }
                    helperText={isSubmitted && !c.title ? ValidationMessage.mixed.required : ''}
                  />
                </FormControl>
                <FormControl label="Mô tả" required>
                  <TextField
                    multiline
                    inputProps={{
                      maxLength: 150
                    }}
                    rows={4}
                    error={isSubmitted && !c.description}
                    value={c.description}
                    onChange={(e) =>
                      onChangeFormValue(e.target.value, 'titleLandingPages', i, 'description')
                    }
                    helperText={
                      isSubmitted && !c.description ? ValidationMessage.mixed.required : ''
                    }
                  />
                </FormControl>
              </React.Fragment>
            ))}
          </FormControlContainer>

          <FormControlContainer style={{ display: 'flex' }}>
            <Box sx={{ width: '50%' }}>
              <FormControl label="Hình ảnh giới thiệu 1" required>
                <InputUpload
                  error={isSubmitted && !form[site].introduceImageName1}
                  accept={IMAGE_ACCEPT}
                  maxSize={5}
                  acceptDimensions={MIN_DIMENSIONS_IMAGE}
                  value={form[site]?.introduceImageName1}
                  onChange={(value) => onChangeUploadFile(value, 'introduceImageName1')}
                  helperText={ValidationMessage.mixed.required}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '50%' }}>
              <FormControl label="Hình ảnh giới thiệu 2" required>
                <InputUpload
                  error={isSubmitted && !form[site].introduceImageName2}
                  accept={IMAGE_ACCEPT}
                  maxSize={5}
                  acceptDimensions={MIN_DIMENSIONS_IMAGE}
                  value={form[site]?.introduceImageName2}
                  onChange={(value) => onChangeUploadFile(value, 'introduceImageName2')}
                  helperText={ValidationMessage.mixed.required}
                />
              </FormControl>
            </Box>
          </FormControlContainer>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Title>Feedback học viên</Title>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={onAddFeedBack}
              disabled={form[site]?.feedbacks?.length >= 8}
              sx={{ height: 40, width: 40 }}>
              <Add />
            </Button>
          </Box>

          {form[site]?.feedbacks?.map((c, i, arr) => (
            <FormControlContainer key={c.id}>
              {arr?.length > 1 && (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => onRemoveFeedback(i)}
                    sx={{ m: 2 }}>
                    <RemoveIcon />
                  </Button>
                </Box>
              )}
              <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '50%' }}>
                  <FormControl label="Hình ảnh học viên" required>
                    <InputUpload
                      error={isSubmitted && !form[site].feedbacks[i].imageLearnerName}
                      accept={IMAGE_ACCEPT}
                      maxSize={5}
                      acceptDimensions={MIN_DIMENSIONS_IMAGE}
                      value={form[site].feedbacks[i].imageLearnerName}
                      onChange={(value) =>
                        onChangeUploadFile(value, 'feedbacks', i, 'imageLearnerName')
                      }
                      helperText={ValidationMessage.mixed.required}
                    />
                  </FormControl>
                </Box>
                <Box sx={{ width: '50%' }}>
                  <FormControl label="tên học viên" required>
                    <TextField
                      inputProps={{
                        maxLength: 50
                      }}
                      error={isSubmitted && !c.learnerName}
                      value={c.learnerName}
                      onChange={(e) =>
                        onChangeFormValue(e.target.value, 'feedbacks', i, 'learnerName')
                      }
                      helperText={
                        isSubmitted && !c.learnerName ? ValidationMessage.mixed.required : ''
                      }
                    />
                  </FormControl>
                </Box>
              </Box>

              <Box sx={{ width: '100%' }}>
                <FormControl label="Phản hồi" required>
                  <TextField
                    multiline
                    rows={3}
                    inputProps={{
                      maxLength: 150
                    }}
                    error={isSubmitted && !c.contentFeedback}
                    value={c.contentFeedback}
                    onChange={(e) =>
                      onChangeFormValue(e.target.value, 'feedbacks', i, 'contentFeedback')
                    }
                    helperText={
                      isSubmitted && !c.contentFeedback ? ValidationMessage.mixed.required : ''
                    }
                  />
                </FormControl>
              </Box>
            </FormControlContainer>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          onClick={onCancel}
          variant="contained"
          size="large"
          sx={{ color: '#fff', borderColor: 'black', background: '#66788A' }}>
          Hủy
        </Button>
        <Button variant="contained" color="primary" size="large" type="submit" onClick={onSubmit}>
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default IntroPage;
