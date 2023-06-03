import React from 'react';
import './CustomTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { DEFAULT_PAGESIZE, NO_CORRESPONDING_DATA, PAGESIZE_OPTIONS } from 'consts';
import { Stack } from '@mui/material';

export const CustomTable = (props) => {
  return (
    <div style={{ height: props?.height || 500, width: '100%' }}>
      <DataGrid
        disableSelectionOnClick
        localeText={{
          footerRowSelected: (count) => `Đã chọn ${count} bản ghi`,
          noRowsLabel: 'Không có dữ liệu'
        }}
        keepNonExistentRowsSelected
        pageSize={DEFAULT_PAGESIZE}
        rowsPerPageOptions={PAGESIZE_OPTIONS}
        componentsProps={{
          pagination: {
            labelRowsPerPage: 'Số bản ghi mỗi trang'
          }
        }}
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              {NO_CORRESPONDING_DATA}
            </Stack>
          )
        }}
        disableColumnFilter
        disableColumnMenu
        {...props}
      />
    </div>
  );
};
