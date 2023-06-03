import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { StyledFormSurveyContentItem } from '../style';
import { FormControl } from 'components';
import { Button, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';

const SurveyNestedFieldArray = ({ nestIndex, control, register, isCreateUpdate }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `listContent[${nestIndex}].listQuestion`
  });

  return (
    <div>
      {fields?.map((item, k) => {
        return (
          <div key={item.id}>
            <StyledFormSurveyContentItem>
              <FormControl label={`Câu hỏi ${k + 1}`}>
                <div className="d-flex">
                  <div className="d-flex flex-1 flex-direction-column">
                    <TextField
                      {...register(`listContent[${nestIndex}].listQuestion[${k}].question`)}
                      inputProps={{
                        maxLength: 500
                      }}
                      disabled={!isCreateUpdate}
                    />
                    {fields.length !== 1 && isCreateUpdate && (
                      <Button color="error" onClick={() => remove(k)} sx={{ alignSelf: 'end' }}>
                        Xoá
                      </Button>
                    )}
                  </div>

                  {k === fields.length - 1 && isCreateUpdate && (
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() =>
                          append({
                            question: ''
                          })
                        }
                        sx={{ marginLeft: '15px' }}>
                        <Add />
                      </Button>
                    </div>
                  )}
                </div>
              </FormControl>
            </StyledFormSurveyContentItem>
          </div>
        );
      })}
    </div>
  );
};
export default SurveyNestedFieldArray;
