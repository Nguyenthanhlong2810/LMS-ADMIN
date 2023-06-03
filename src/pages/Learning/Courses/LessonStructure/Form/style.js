import { Button, styled } from '@mui/material';

export const StyledRangePoint = styled('div')({
  padding: '0 15px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  gridColumnGap: '10px',
  marginBottom: '20px'
});

export const StyledRangePointItem = styled(Button)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5px 0',
  border: '1px solid #55c763',
  borderRadius: '4px',

  p: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#212121'
  },

  span: {
    fontSize: '14px',
    color: '#212121'
  }
});

export const StyledFormSurveyContent = styled('div')({
  background: '#F5F8FF',
  borderRadius: '4px'
});

export const StyledFormSurveyContentItem = styled('div')({
  background: '#E7EEFF',
  margin: '16px',
  borderRadius: '4px'
});

export const StyledButtonAddContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

export const StyledFileLesson = styled('div')({
  padding: '0 16px',
  '.file-delete-all-btn': {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

export const StyledFileLessonItem = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 15px',
  gap: '10px',
  width: '100%',
  height: '47px',
  background: ' #FAFAFA',
  marginBottom: '5px',
  '.file-name': {
    width: '70%',
    color: '#818181',
    wordBreak: 'break-all',
    display: '-webkit-box',
    '-webkit-line-clamp': '1',
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  '.file-size': {
    fontWeight: '300',
    color: '#ADABAB',
    width: '20%'
  },
  '.file-delete-btn': {
    ' &:hover': {
      color: '#FF647C',
      cursor: 'context-menu'
    }
  }
});

export const StyledHorizonLine = styled('hr')({
  border: '1px solid #E9E9E9',
  paddingRight: '16px'
});
