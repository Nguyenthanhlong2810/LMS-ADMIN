import React, { useEffect, useState } from 'react';
// import RichEditor from 'components/RichEditor/RichEditor';
import { Box, Button } from '@mui/material';
import Title from 'components/Title/Title';
import { toast } from 'react-toastify';
import { ContactInfoAPI } from 'apis/ContactInfo';
import { DEFAULT_ERROR_MESSAGE } from 'consts';
import QuillEditor from 'components/Quill/Quill';

const ContactInfo = () => {
  const [site, setSite] = useState('vn');
  const [idContactInfo, setIdContactInfo] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);

  // const onChangeSite = (e) => setSite(e.target.value);

  useEffect(() => {
    getContact();
  }, []);

  const getContact = async () => {
    try {
      const res = await ContactInfoAPI.getContactInfo({ key: site });
      setContactValue(res?.data?.valueContact);
      setDisableSubmit(!res?.data?.valueContact);
      setIdContactInfo(res?.data?.id);
    } catch (error) {
      toast.error('Something error !');
    }
  };
  const onSubmit = async () => {
    const submitForm = { key: site, valueContact: contactValue?.trim() };
    try {
      if (idContactInfo) {
        await ContactInfoAPI.updateContactInfo(idContactInfo, submitForm);
      } else {
        await ContactInfoAPI.createContactInfo(submitForm);
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
          <Title>Thông tin liên hệ</Title>
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
          value={contactValue}
          onChange={(value, length, content) => {
            setContactValue(value);
            setDisableSubmit(!content?.trim().length);
          }}
          maxLength={500}
        />
        {/* <RichEditor value={contactValue} onChange={setContactValue} /> */}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          sx={{ color: '#fff', borderColor: 'black', background: '#66788A' }}
          onClick={getContact}>
          Hủy
        </Button>
        <Button
          disabled={disableSubmit}
          variant="contained"
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

export default ContactInfo;
