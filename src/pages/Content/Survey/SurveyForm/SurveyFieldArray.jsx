import React from 'react';
import { useFieldArray } from 'react-hook-form';
import SurveyNestedFiledArray from './SurveyNestedFieldArray';
import { Button, TextField } from '@mui/material';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { FormControl } from 'components';

export default function SurveyFieldArray({ control, register, isCreateUpdate }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: 'listContent'
  });

  return (
    <>
      {fields?.map((item, index) => {
        return (
          <div style={{ borderBottom: '10px solid #fff' }} key={item.id}>
            <FormControl label={`Mô tả khái quát nội dung ${index + 1}`}>
              <div className="d-flex align-items-center">
                <TextField
                  multiline
                  rows={3}
                  {...register(`listContent.${index}.contentDescription`)}
                  className="flex-1"
                  inputProps={{
                    maxLength: 500
                  }}
                  disabled={!isCreateUpdate}
                />
                {isCreateUpdate && (
                  <Button
                    color="error"
                    onClick={() => remove(index)}
                    sx={{ height: 30, width: 30 }}>
                    <DeleteTwoToneIcon fontSize={'large'} />
                  </Button>
                )}
              </div>
            </FormControl>
            <SurveyNestedFiledArray
              nestIndex={index}
              {...{ control, register }}
              isCreateUpdate={isCreateUpdate}
            />
          </div>
        );
      })}
    </>
  );
}
