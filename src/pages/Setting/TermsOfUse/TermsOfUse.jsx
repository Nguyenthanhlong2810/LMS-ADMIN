import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import Title from 'components/Title/Title';
import { TermsAPI } from 'apis/Terms';
import { toast } from 'react-toastify';
import { DEFAULT_ERROR_MESSAGE } from 'consts';
import QuillEditor from 'components/Quill/Quill';

const MAX_LENGTH = 10_000;

const TermsOfUse = () => {
  const [site] = useState('vn');
  const [termsValue, setTermsValue] = useState('');
  const [idTerms, setIdTerms] = useState('');
  const [disabledSubmit, setDisabledSubmit] = useState(true);

  useEffect(() => {
    getTermsOfUse();
  }, []);

  const getTermsOfUse = async () => {
    try {
      const res = await TermsAPI.getAllTerms({ key: site });
      setTermsValue(res.data?.value);
      setDisabledSubmit(!res?.data?.value);
      setIdTerms(res.data?.id);
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };

  const onSubmit = async () => {
    const submitForm = { key: site, value: termsValue?.trim() };
    try {
      if (idTerms) {
        await TermsAPI.updateTerms(idTerms, submitForm);
      } else {
        await TermsAPI.createTerms(submitForm);
      }
      toast.success('Lưu thành công');
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title>Điều khoản sử dụng</Title>
          <Box>
            {/* <ToggleButtonGroup
              color="primary"
              value={site}
              exclusive
              onChange={onChangeSite}
              size="small">
              <ToggleButton value="vn">Tiếng Việt</ToggleButton>
              <ToggleButton value="en">Tiếng Anh</ToggleButton>
            </ToggleButtonGroup> */}
          </Box>
        </Box>

        <hr style={{ opacity: '0.3' }} />
        <Box sx={{ py: 2 }}>
          <span>Nội dung</span>
          <span style={{ color: 'red' }}>*</span>
        </Box>
        <QuillEditor
          value={termsValue}
          onChange={(value, length, content) => {
            setTermsValue(value);
            setDisabledSubmit(!content?.trim().length);
          }}
          maxLength={MAX_LENGTH}
        />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ color: '#fff', borderColor: 'black', background: '#66788A' }}
          onClick={getTermsOfUse}>
          Hủy
        </Button>
        <Button
          variant="contained"
          disabled={disabledSubmit}
          color="primary"
          size="large"
          type="submit"
          onClick={onSubmit}>
          Lưu
        </Button>
      </Box>
    </Box>
  );
};

export default TermsOfUse;
