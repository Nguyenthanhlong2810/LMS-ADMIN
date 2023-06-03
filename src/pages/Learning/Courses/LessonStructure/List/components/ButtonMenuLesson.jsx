import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';

export default function ButtonMenuLesson({ onDelete, onEdit, onMoveUp, onMoveDown }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}>
        <MenuItem onClick={onMoveUp}>Chuyển lên trên</MenuItem>
        <MenuItem onClick={onMoveDown}>Chuyển xuống dưới</MenuItem>
        <MenuItem onClick={onEdit}>Chỉnh sửa nội dung</MenuItem>
        <MenuItem onClick={onDelete}>Xóa</MenuItem>
      </Menu>
    </>
  );
}
