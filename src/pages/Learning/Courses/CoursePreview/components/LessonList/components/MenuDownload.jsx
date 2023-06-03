import React, { useState } from 'react';
import { Menu, MenuItem, Button, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from 'components/ExpandMore/ExpandMore';
import { MyCourseAPI } from 'apis/MyCourse/MyCourseAPI';
import fileDownload from 'js-file-download';

const MenuDownload = ({ data, isEnable }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDownloadFile = async () => {
    const params = { fileURL: data?.linkFileContent };
    const res = await MyCourseAPI.downloadFile(params);
    if (res.data) {
      fileDownload(res.data, `${data?.nameContent}`);
    }
    return handleClose();
  };
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        size="small"
        disabled={!isEnable}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<FolderIcon sx={{ color: isEnable ? '#565771' : '#999' }} />}
        endIcon={
          <ExpandMore
            expand={open}
            aria-expanded={open}
            aria-label="show more"
            sx={{ color: '#565771' }}>
            <ExpandMoreIcon />
          </ExpandMore>
        }>
        <Typography sx={{ color: isEnable ? '#565771' : '#999' }}>Tài nguyên</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}>
        <MenuItem onClick={handleDownloadFile}>{data?.nameContent}</MenuItem>
      </Menu>
    </div>
  );
};
export default MenuDownload;
