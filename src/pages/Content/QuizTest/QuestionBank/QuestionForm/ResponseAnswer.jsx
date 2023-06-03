import { Grid, TextField } from '@mui/material';
import { FormControl } from 'components';
import React from 'react';

const ResponseAnswer = ({ form }) => {
  const {
    register,
    setValue,
    formState: { errors }
  } = form;
  const formatCorrectAnswer = (e) => {
    setValue('correctAnswers', e.target.value.toUpperCase());
  };
  return (
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

      <Grid item xs={12}>
        <FormControl label="Câu trả lời đúng" required>
          <TextField
            error={!!errors?.correctAnswers?.message}
            helperText={errors?.correctAnswers?.message}
            {...register('correctAnswers')}
            onChange={formatCorrectAnswer}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default ResponseAnswer;
