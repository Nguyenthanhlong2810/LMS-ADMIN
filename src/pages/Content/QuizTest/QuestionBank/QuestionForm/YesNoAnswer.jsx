import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material';
import { FormControl, Title } from 'components';
import React from 'react';
import { Controller } from 'react-hook-form';
import { YES_NO_ANSWER } from '../questionBank.const';

const YesNoAnswer = ({
  form: {
    control,
    register,
    formState: { errors }
  }
}) => {
  return (
    <>
      <FormControl label="Câu trả lời đúng" required>
        <Controller
          name="correctAnswers"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RadioGroup row value={value} onChange={onChange}>
              {YES_NO_ANSWER.map((singleOption) => (
                <>
                  <Title>{singleOption.option}</Title>
                  <div className="mr-2"></div>
                  <FormControlLabel
                    value={singleOption.option}
                    label={singleOption.contentOption}
                    control={<Radio />}
                    key={singleOption.option}
                  />
                </>
              ))}
            </RadioGroup>
          )}
        />
      </FormControl>
      <Grid container>
        <Grid item xs={6}>
          <FormControl label="Phản hồi câu trả lời chính xác">
            <TextField
              error={!!errors?.responseCorrect?.message}
              helperText={errors?.responseCorrect?.message}
              {...register('responseCorrect')}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl label="Phản hồi câu trả lời không chính xác">
            <TextField
              error={!!errors?.responseIncorrect?.message}
              helperText={errors?.responseIncorrect?.message}
              {...register('responseIncorrect')}
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};

export default YesNoAnswer;
