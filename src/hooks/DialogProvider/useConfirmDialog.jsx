import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { useDialog } from '.';

export default function useConfirmDialog() {
  const { createDialog, closeDialog } = useDialog();

  const confirm = ({ title, content, onClose, onConfirm }) => {
    const handleClose = () => {
      closeDialog();
      onClose && onClose();
    };
    const handleConfirm = () => {
      closeDialog();
      onConfirm && onConfirm();
    };

    createDialog({
      children: (
        <>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent sx={{ fontSize: 14, lineHeight: 1.5 }}>{content}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="cancel" variant="outlined">
              Không
            </Button>
            <Button onClick={handleConfirm} autoFocus variant="contained" color="secondary">
              Có
            </Button>
          </DialogActions>
        </>
      )
    });
  };
  return confirm;
}
