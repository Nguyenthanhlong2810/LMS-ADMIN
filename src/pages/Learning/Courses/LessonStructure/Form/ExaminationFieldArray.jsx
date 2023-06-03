import React from 'react';
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  styled,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useFieldArray } from 'react-hook-form';
import { StyledHorizonLine } from './style';
import { FormControl } from 'components';
import SearchIcon from '@mui/icons-material/Search';
import { Flex, HalfBox } from '../../../../../components/Layout/Layout';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const ExamItemContainer = styled('div')({
  padding: '1rem',
  marginBottom: 5,
  background: '#FAFAFA',
  alignItems: 'center'
});

export default function ExaminationFieldArray({
  control,
  register,
  watch,
  onOpenExaminationModal
}) {
  const { fields, remove } = useFieldArray({
    control,
    name: 'examSettings'
  });
  const watchExamSettings = watch('examSettings');

  return (
    <>
      <StyledHorizonLine />
      <FormControl label="" padding={'1rem 0'}>
        <div className="d-flex">
          <TextField
            placeholder="Tìm kiếm bài kiểm tra"
            disabled
            className="flex-1"
            onClick={onOpenExaminationModal}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </div>

        {fields?.map((item, index) => {
          return (
            <ExamItemContainer key={item.id}>
              <Flex justifyContent="space-between" flexWrap="wrap">
                <Grid item lg={7} xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography fontWeight="bold">{watchExamSettings[index]?.examTitle}</Typography>
                </Grid>
                <Grid item lg={5} xs={12}>
                  <Flex justifyContent="space-between">
                    <Flex alignItems="center">
                      <Typography>{watchExamSettings[index]?.markPass}%</Typography>&nbsp;
                      <TrackChangesIcon />
                    </Flex>
                    <Flex alignItems="center">
                      <Typography>{watchExamSettings[index]?.timeWork}</Typography>&nbsp;
                      <AccessTimeIcon />
                    </Flex>
                    <IconButton
                      onClick={() => remove(index)}
                      component="span"
                      color="error"
                      sx={{ float: 'right', background: 'transparent' }}>
                      <HighlightOffIcon />
                    </IconButton>
                  </Flex>
                </Grid>
              </Flex>
              <Box>
                <span>Khoá các nội dung khác khi đang làm bài</span>
                <Switch defaultChecked={true} {...register(`examSettings.${index}.blockContent`)} />
              </Box>
            </ExamItemContainer>
          );
        })}
      </FormControl>
    </>
  );
}
