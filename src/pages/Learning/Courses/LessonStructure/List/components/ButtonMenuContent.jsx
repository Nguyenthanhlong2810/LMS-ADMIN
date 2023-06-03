import { IconButton, Menu, MenuItem } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import React from 'react';

export default function ButtonMenuContent({ onMoveToTop, onMoveToBottom, onMoveUp, onMoveDown }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectMenu = (cb) => () => {
    cb();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <SwapHorizIcon />
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
        <MenuItem onClick={handleSelectMenu(onMoveToTop)}>Chuyển lên trên cùng</MenuItem>
        <MenuItem onClick={handleSelectMenu(onMoveToBottom)}>Chuyển xuống dưới cùng</MenuItem>
        <MenuItem onClick={handleSelectMenu(onMoveDown)}>Chuyển xuống kế tiếp</MenuItem>
        <MenuItem onClick={handleSelectMenu(onMoveUp)}>Chuyển lên kế tiếp</MenuItem>
      </Menu>
    </>
  );
}
