import { default as ExpandMore, default as ExpandMoreIcon } from '@mui/icons-material/ExpandMore';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { NoteAPI } from 'apis/Note';
import { FormControl } from 'components';
import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TextFieldStyled } from '../../../style';
import NoteInputField from './NoteInputField';

const CourseDetailNote = ({ inputRef, time, setFocusNote }) => {
  const [lecture, setLecture] = useState('all');
  const { hideLoading, showLoading } = useLoading();
  const [note, setNote] = useState();
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 5
  });
  const confirm = useConfirmDialog();
  const selectedLecture = useSelector((state) => state.courseDetail.selectedLecture);

  useEffect(() => {
    getListNote();
  }, [pagination, lecture]);
  const getListNote = async () => {
    try {
      showLoading();
      let req = {
        courseId: id,
        pageNo: pagination.pageNo,
        pageSize: pagination.pageSize,
        lessonContentUploadId: lecture === 'all' ? '' : selectedLecture?.lessonContentUploadId
      };
      const data = await NoteAPI.getList(req);
      if (data.data) {
        let newNote = note;
        newNote = data.data?.data?.items;
        setNote(newNote);
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };
  const handleChange = (event) => {
    setLecture(event.target.value);
  };
  const onKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.value && onSubmitNote(e.target.value);
    }
  };
  const togglePopupConfirm = (idNote) => {
    confirm({
      content: 'Bạn có chắc chắn muốn xoá ghi chú này không',
      onConfirm: () => onDeleteNote(idNote)
    });
  };
  const onDeleteNote = async (idNote) => {
    showLoading();
    try {
      let res = await NoteAPI.delete({ id: idNote });
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Xóa ghi chú thành công');
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
  const onSubmitNote = async (data) => {
    showLoading();
    try {
      let reqCreate = {
        content: data,
        lessonContentUploadId: selectedLecture?.lessonContentUploadId,
        time: time
      };
      const res = await NoteAPI.create(reqCreate);
      if (res.status === HTTP_STATUS.StatusOK) {
        toast.success('Thêm ghi chú thành công');
        const newPagination = {
          pageNo: 1,
          pageSize: 5
        };
        setPagination(newPagination);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideLoading();
    }
  };

  const handleShowMore = () => {
    const newPagination = {
      pageNo: 1,
      pageSize: pagination.pageSize + 5
    };
    setPagination(newPagination);
  };

  const handleFocus = () => {
    setFocusNote(true);
  };
  return (
    <Box sx={{ mt: '2.125rem' }}>
      <TextFieldStyled
        multiline
        rows={2}
        inputRef={inputRef}
        onKeyPress={(e) => onKeyPress(e)}
        onFocus={handleFocus}
        onBlur={() => setFocusNote(false)}
        placeholder="Thêm ghi chú (Nhấn shift+enter để xuống dòng)"
      />
      <FormControl padding={0} mt="1.25rem" width="12.5rem">
        <Select value={lecture} onChange={handleChange}>
          <MenuItem value="all">Tất cả bài học</MenuItem>
          <MenuItem value="current">Bài học hiện tại</MenuItem>
        </Select>
      </FormControl>
      {!!note &&
        note?.map((item, index) => (
          <NoteInputField
            data={item}
            key={index}
            togglePopupConfirm={togglePopupConfirm}
            onSubmitNote={onSubmitNote}
            onDeleteNote={onDeleteNote}
            setPagination={setPagination}
          />
        ))}
      <Button onClick={handleShowMore} sx={{ width: '100%', mt: '2.5rem' }}>
        Xem thêm
        <ExpandMore aria-label="show more" color="primary" sx={{ m: 0 }}>
          <ExpandMoreIcon />
        </ExpandMore>
      </Button>
    </Box>
  );
};

export default CourseDetailNote;
