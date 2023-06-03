import { Avatar, Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const CourseDetailLessonNameStyled = styled('div')({
  fontWeight: '700',
  color: '#201B40',
  fontSize: '14px',
  lineHeight: '150%'
});
export const AvatarStyled = styled(Avatar)({
  background: '#fff',
  color: '#565771',
  border: '1px solid #e9e9e9',
  width: '3.5rem',
  height: '3.5rem',
  fontSize: '0.875rem'
});
export const TextFieldStyled = styled(TextField)({
  width: '100%',
  '.MuiInputBase-input': {
    padding: '0 !important'
  }
});
export const BoxContainerStyled = styled(Box)({
  height: '100%',
  margin: '2rem auto 4rem',

  borderRadius: '10px'
});
