import { Box, Select, Tooltip } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

export function EllipsisSelect({ children, ...props }) {
  const anchorEl = useRef();

  return (
    <Select
      ref={anchorEl}
      {...props}
      MenuProps={{
        sx: {
          width: anchorEl.current && anchorEl.current.offsetWidth
        }
      }}>
      {children}
    </Select>
  );
}

export function EllipsisMenuItemText({ children }) {
  const ref = useRef();
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    setIsOverflow(isEllipsisActive(ref.current));
  }, []);

  const isEllipsisActive = (e) => {
    return e.offsetHeight < e.scrollHeight || e.offsetWidth < e.scrollWidth;
  };

  return (
    <Tooltip title={isOverflow ? children : ''} placement="right">
      <Box
        ref={ref}
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
        {children}
      </Box>
    </Tooltip>
  );
}
