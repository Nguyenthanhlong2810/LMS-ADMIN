import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Grid } from '@mui/material';
import { NoteAPI } from 'apis/Note';
import { HTTP_STATUS } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import { AvatarStyled, CourseDetailLessonNameStyled, TextFieldStyled } from '../../../style';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { secondConvert } from 'utils';
import { setCurrentTimeToSeek } from 'store/reducers/courseDetailSlice';
import { useDispatch } from 'react-redux';
import { FlexAlignCenterJustifySpaceBetween } from 'components/Layout/Layout';

const NoteInputField = ({ data, togglePopupConfirm, setPagination }) => {
  const [enableEdit, setEnableEdit] = useState(true);
  const [inputValue, setInputValue] = useState();

  const { hideLoading, showLoading } = useLoading();
  const dispatch = useDispatch();

  useEffect(() => {
    data && setInputValue(data?.content);
  }, [data]);
  const onKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.value && onEditNote(e.target.value);
    }
  };
  const onEditNote = async () => {
    showLoading();
    try {
      let reqUpdate = {
        id: data.id,
        content: inputValue
      };
      const res = await NoteAPI.update(reqUpdate);
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Sửa ghi chú thành công');
        const newPagination = {
          pageNo: 1,
          pageSize: 5
        };
        setPagination(newPagination);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideLoading();
    }
  };

  const handleChooseTime = () => {
    dispatch(setCurrentTimeToSeek(data?.time));
  };

  return (
    <Grid container sx={{ mt: '2rem' }} key={data.id}>
      <Grid item xs={1} />
      <Grid item xs={11} sx={{ mb: '0.625rem' }}>
        <FlexAlignCenterJustifySpaceBetween>
          <CourseDetailLessonNameStyled>{data?.lessonName}</CourseDetailLessonNameStyled>
          <div style={{ color: '#818181' }}>
            <DriveFileRenameOutlineIcon
              fontSize="small"
              sx={[{ mr: '1rem', cursor: 'pointer' }, { '&:hover': { color: '#457EFF' } }]}
              onClick={() => setEnableEdit(!enableEdit)}
            />
            <DeleteOutlineIcon
              onClick={() => togglePopupConfirm(data?.id)}
              fontSize="small"
              sx={[{ '&:hover': { color: 'red' } }, { cursor: 'pointer' }]}
            />
          </div>
        </FlexAlignCenterJustifySpaceBetween>
      </Grid>
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item xs={1}>
          <AvatarStyled onClick={handleChooseTime}>{secondConvert(data?.time)}</AvatarStyled>
        </Grid>
        <Grid item xs={11} sx={{ pt: '0 !important' }}>
          <TextFieldStyled
            multiline
            disabled={enableEdit}
            value={inputValue}
            onKeyPress={(e) => onKeyPress(e)}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoteInputField;
