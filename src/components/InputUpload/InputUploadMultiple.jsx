import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton, Input, Stack, Box, styled, Typography, Button } from '@mui/material';
import './InputUpload.scss';
import React from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { toast } from 'react-toastify';
import { isFileAccepted, isFileSizeValid } from './utils';
import { TextHelper } from 'components/Layout/Layout';
import { TextHelperError } from './InputUploadSingle';

const FileItemContainer = styled('div')({
  padding: '1rem',
  marginBottom: 5,
  background: '#FAFAFA',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

export function InputUploadMultiple({
  onChange = () => {},
  value = [],
  accept = [],
  error,
  placeholder,
  disabled,
  maxSize
}) {
  const handleOnChange = (e) => {
    if (e.target.files?.length) {
      const fileList = [...e.target.files];
      const isAllFilesValid = fileList.every(
        (file) => isFileSizeValid(file, maxSize) && isFileAccepted(file, accept)
      );
      if (isAllFilesValid) {
        const newFiles = [...value, ...fileList];
        onChange(newFiles);
      } else {
        toast.error(
          'Ảnh/video vượt quá dung lượng tối đa hoặc sai định dạng. Xin vui lòng kiểm tra lại'
        );
      }
    }
  };

  const handleRemoveFile = (index) => (e) => {
    e.preventDefault();
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  const clearAll = () => {
    onChange([]);
  };

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        className={error ? 'Mui-error' : ''}
        sx={{
          border: `1px solid ${error ? 'red' : '#ccc'}`,
          borderRadius: '4px',
          width: '100%',
          background: '#fff',
          minHeight: 56
        }}>
        <label className="label-upload">
          <Box sx={{ width: '80%', display: 'block', color: !value ? '#ccc' : 'normal' }}>
            {placeholder ?? ''}
          </Box>
          <Input
            accept={accept.toString()}
            id="contained-button-file"
            multiple
            type="file"
            sx={{ display: 'none' }}
            // error={error}
            onChange={handleOnChange}
            disabled={disabled}
            inputProps={{
              multiple: true
            }}
          />
          <IconButton
            disabled={disabled}
            component="span"
            color="primary"
            sx={{ float: 'right', background: 'transparent' }}>
            <FileUploadIcon />
          </IconButton>
        </label>
      </Stack>

      {value.length > 0 && (
        <Stack spacing={1}>
          {value.map((c, index) => (
            <FileItemContainer key={`${c.name}_${index}`}>
              <Typography>{c.name}</Typography>
              <IconButton
                onClick={handleRemoveFile(index)}
                disabled={disabled}
                component="span"
                color="error"
                sx={{ float: 'right', background: 'transparent' }}>
                <HighlightOffIcon />
              </IconButton>
            </FileItemContainer>
          ))}
          <Button
            onClick={clearAll}
            sx={{ float: 'right', width: 'max-content', alignSelf: 'end', color: 'red' }}>
            Xóa hết
          </Button>
        </Stack>
      )}
    </>
  );
}
