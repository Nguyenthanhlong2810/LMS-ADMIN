import { FormHelperText, IconButton, TextField } from '@mui/material';
import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { toLetters } from './helper';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import { Title } from 'components';
import ResponseAnswer from './ResponseAnswer';

const ListAnswer = ({ form, disabled }) => {
  const {
    control,
    register,
    formState: { errors }
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answers'
  });
  return (
    <div>
      {errors.answers?.message && (
        <FormHelperText className="mb-3 ml-4" error>
          {errors.answers?.message}
        </FormHelperText>
      )}
      {fields.map((field, index) => {
        const errorMes = errors?.answers && errors?.answers[index]?.contentOption?.message;
        return (
          <div className="d-flex mb-3 align-items-center" key={field.id}>
            <Title>{toLetters(index)}</Title>
            <TextField
              error={!!errorMes}
              helperText={errorMes}
              {...register(`answers[${index}].contentOption`)}
              sx={{ flex: 1 }}
              placeholder="Nhập câu trả lời"
              multiline
              minRows={2}
              className="mx-3"
            />
            {fields.length === index + 1 ? (
              <IconButton
                disabled={disabled}
                color="secondary"
                onClick={() => append({ option: toLetters(index), contentOption: '' })}>
                <AddIcon />
              </IconButton>
            ) : (
              <IconButton disabled={disabled} onClick={() => remove(index)}>
                <ClearIcon />
              </IconButton>
            )}
          </div>
        );
      })}
      <ResponseAnswer form={form} />
    </div>
  );
};

export default ListAnswer;
