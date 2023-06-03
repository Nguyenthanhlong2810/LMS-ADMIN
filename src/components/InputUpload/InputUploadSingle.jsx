import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton, Stack, Box, styled } from '@mui/material';
import './InputUpload.scss';
import React, { useRef } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import { isFileAccepted, isFileSizeValid, isDimensionsValid } from './utils';
import { TextHelper } from 'components/Layout/Layout';

export const TextHelperError = styled('p')({
  color: '#FF647C',
  fontWeight: 400,
  fontSize: '0.75rem',
  margin: '3px 14px 0'
});

export function InputUploadSingle({
  onChange = () => {},
  value,
  accept = [],
  error,
  placeholder,
  disabled,
  maxSize,
  helperText,
  textCondition,
  acceptDimensions = {},
  acceptText = []
}) {
  const inputRef = useRef(null);
  const handleOnChange = async (e) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const isDimensions = await isDimensionsValid(file, acceptDimensions);
      if (!isFileSizeValid(file, maxSize) || !isFileAccepted(file, accept)) {
        toast.error(
          `Hệ thống chỉ cho phép tải file với định dạng ${
            acceptText.join('/ ') || '.jpg/.png/.jpeg'
          } ${maxSize ? `, dung lượng tối đa ${maxSize} MB` : ''}`
        );
        inputRef.current.value = '';
        return;
      }
      if (!isDimensions) {
        toast.error(
          `Ảnh phải có kích cỡ tối thiểu ${acceptDimensions.width}x${acceptDimensions.height}`
        );
        inputRef.current.value = '';
        return;
      }

      onChange(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.preventDefault();
    onChange(null);
    inputRef.current.value = '';
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        className={error ? 'Mui-error' : ''}
        justifyContent="space-between"
        sx={{
          border: `1px solid ${error ? 'red' : '#ccc'}`,
          borderRadius: '4px',
          width: '100%',
          background: '#fff'
        }}>
        <label className="label-upload">
          <Box
            sx={{
              width: '80%',
              display: 'block',
              color: !value ? '#ccc' : 'normal',
              wordBreak: 'break-all'
            }}>
            {value || placeholder}
          </Box>
          <input
            accept={accept.join(',')}
            id="contained-button-file"
            type="file"
            style={{ display: 'none' }}
            // error={error}
            onChange={handleOnChange}
            disabled={disabled}
            ref={inputRef}
          />
          {value ? (
            <IconButton
              onClick={handleRemoveFile}
              disabled={disabled}
              component="span"
              color="error"
              sx={{ float: 'right', background: 'transparent' }}>
              <HighlightOffIcon />
            </IconButton>
          ) : (
            <IconButton
              disabled={disabled}
              component="span"
              color="primary"
              sx={{ float: 'right', background: 'transparent' }}>
              <FileUploadIcon />
            </IconButton>
          )}
        </label>
      </Stack>

      <Box sx={{ display: 'flex', justifyContent: helperText ? 'space-between' : 'flex-end' }}>
        {error && helperText && <TextHelperError>{helperText}</TextHelperError>}
        {textCondition && <TextHelper>{textCondition}</TextHelper>}
      </Box>
    </>
  );
}
