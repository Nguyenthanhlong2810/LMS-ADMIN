import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTableState } from 'hooks/useTableState';
import SearchApprovalConfig from './SearchApprovalConfig';
import { TitleAndLanguage, CustomTable, TableHeader } from 'components';
import { ApprovalConfigurationAPI } from 'apis/ApprovalConfiguration';
import dayjs from 'dayjs';
import { messageCancelSave, DAY_FORMAT, PROGRAM_TYPE } from 'consts';
const ApprovalConfig = () => {
  const {
    data,
    loading,
    rowCount,
    pagination,
    language,
    setSearchParams,
    onChangeLanguage,
    onSelectRow,
    onDelete,
    selected,
    onPageChange,
    onPageSizeChange
  } = useTableState(ApprovalConfigurationAPI, {});
  const columns = [
    {
      field: 'type',
      headerName: 'LOẠI',
      minWidth: 190,
      renderCell: (params) => {
        const item = PROGRAM_TYPE.find((item) => item.value === params?.row?.type);
        return <Typography>{item?.label}</Typography>;
      }
    },
    {
      field: 'course',
      headerName: 'NỘI DUNG',
      minWidth: 190,
      renderCell: (params) => {
        return <Typography>{params?.row?.course?.name}</Typography>;
      }
    },
    { field: 'approveRequest', headerName: 'YÊU CẦU PHÊ DUYỆT', minWidth: 260, flex: 1 },
    { field: 'cancelRequest', headerName: 'YÊU CẦU HUỶ PHÊ DUYỆT', minWidth: 260, flex: 1 },
    {
      field: 'createdBy',
      headerName: 'NGƯỜI THIẾT LẬP',
      minWidth: 190
    },
    {
      field: 'createDate',
      headerName: 'NGÀY THIẾT LẬP',
      minWidth: 190,
      renderCell: (params) => {
        if (!params.row.createDate) return '';
        return dayjs(params.row.createDate).format(DAY_FORMAT.ddMMYYYY);
      }
    }
  ];
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage
          title="chương trình yêu cầu phê duyệt"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchApprovalConfig setSearchParams={setSearchParams} />
      </Box>
      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          deleteTitle="Huỷ thiết lập"
          selected={selected}
          onDelete={onDelete}
          deleteMessage={messageCancelSave.CancelConfig}
          hideAddBtn={true}
        />
        <CustomTable
          rows={data}
          columns={columns}
          loading={loading}
          checkboxSelection
          onSelectionModelChange={onSelectRow}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
          page={pagination.pageNo - 1}
          pageSize={pagination.pageSize}
          paginationMode="server"
        />
      </Box>
    </>
  );
};
export default ApprovalConfig;
