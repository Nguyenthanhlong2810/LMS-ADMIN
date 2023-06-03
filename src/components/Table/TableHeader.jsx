import React from 'react';
import './TableHeader.scss';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';

export const TableHeader = ({
  selected,
  onDelete,
  onAdd,
  title,
  onDownload,
  deleteMessage,
  assignCourseBtn,
  downloadFileBtn,
  createTitle = 'Tạo mới',
  deleteTitle,
  hideAddBtn = false,
  downloadTitle = 'Tải tệp xuống'
}) => {
  const confirm = useConfirmDialog();

  const togglePopupConfirm = () => {
    confirm({
      content: deleteMessage,
      onConfirm: onConfirm
    });
  };

  const onConfirm = () => {
    onDelete();
  };

  return (
    <div className="table-label">
      <span>{title}</span>

      <div className="btn-area">
        {downloadFileBtn && (
          <Button
            className="btn-tittle"
            variant="contained"
            color="primary"
            onClick={onDownload}
            sx={{ marginLeft: '15px' }}>
            {downloadTitle}
          </Button>
        )}
        {selected?.length > 0 && (
          <Button
            className="btn-tittle"
            variant="contained"
            color="error"
            onClick={togglePopupConfirm}>
            {deleteTitle ? deleteTitle : <DeleteIcon />}
          </Button>
        )}
        {!hideAddBtn && (
          <Button
            className="btn-tittle"
            variant="contained"
            color="secondary"
            endIcon={!assignCourseBtn && <AddIcon />}
            onClick={onAdd}
            sx={{ marginLeft: '15px' }}>
            {createTitle}
          </Button>
        )}
      </div>
    </div>
  );
};
TableHeader.propTypes = {
  selected: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  // onAdd: PropTypes.func.isRequired,
  title: PropTypes.string,
  createTitle: PropTypes.string,
  deleteMessage: PropTypes.string.isRequired
};
