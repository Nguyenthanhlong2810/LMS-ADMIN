import { Box, FormHelperText, styled } from '@mui/material';
import { FormControl } from 'components';
import RichEditor from 'components/RichEditor/RichEditor';
import React from 'react';
import { Controller } from 'react-hook-form';
import QuillEditor from 'components/Quill/Quill';

const QuestionField = ({ form, disabled }) => {
  const {
    control,
    setValue,
    formState: { errors }
  } = form;
  const onClearTextQuestion = () => {
    if (disabled) return;
    setValue('contentQuestion', '');
  };
  return (
    <FormControl label="Câu hỏi" required>
      <Controller
        name="contentQuestion"
        render={({ field }) => (
          <Box sx={{ wordBreak: 'break-word' }}>
            <QuillEditor
              disabled={disabled}
              value={field.value}
              onChange={(valueHTML, _, content) => {
                field.onChange(valueHTML);
                // setTextContent(content?.trim());
              }}
              allowImage
              maxLength={1000}
              placeholder="Nhập câu hỏi"
            />
            <div className="d-flex justify-content-space-between" style={{ marginTop: 16 }}>
              <FormHelperText error> {errors?.contentQuestion?.message}</FormHelperText>
              <TextClear onClick={onClearTextQuestion}>Xoá</TextClear>
            </div>
          </Box>
        )}
        control={control}
      />
    </FormControl>
  );
};

export default QuestionField;
const TextClear = styled('div')({
  color: 'red',
  textAlign: 'right',
  fontWeight: 500,
  paddingTop: '0.5rem',
  cursor: 'pointer'
});
