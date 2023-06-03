import { Box, Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Modal } from 'components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import React from 'react';
import ModalExport from '../../ModalExport/ModalExport';

const CourseDetailCertificate = ({ previewCertificate }) => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = useCallback(() => setIsOpenModal((v) => !v), []);
  const handleDownload = () => {
    toggleModal();
  };

  return (
    <Box>
      <div style={{ fontWeight: '700', lineHeight: '150%', padding: '1rem 0 0.563rem 0' }}>
        Chứng nhận hoàn thành khóa học
      </div>
      <div style={{ lineHeight: '1.575rem', whiteSpace: 'pre-line' }}>
        Bạn sẽ nhận được chứng nhận hoàn thành khóa học sau khi hoàn thành tối thiểu 80% nội dung
        khóa học
      </div>
      {previewCertificate && (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <img
              style={{ width: '100%' }}
              src={previewCertificate?.myCertificateImageLink}
              alt="myCertificateImg"
            />
          </Box>
          <Box sx={{ textAlign: 'center', mt: '2rem' }}>
            <Button
              className="icon-btn"
              variant="contained"
              size="large"
              color="secondary"
              onClick={handleDownload}>
              <FileDownloadOutlinedIcon /> {t('translation:download')}
            </Button>
          </Box>
        </>
      )}
      <Modal
        isOpen={isOpenModal}
        title={t`certificate:export-file`}
        onClose={toggleModal}
        maxWidth={'xs'}
        PaperProps={{
          style: { borderRadius: '1.125rem' }
        }}>
        <ModalExport
          onClose={toggleModal}
          courseId={previewCertificate?.courseId}
          courseName={previewCertificate?.courseName}
        />
      </Modal>
    </Box>
  );
};

export default CourseDetailCertificate;
