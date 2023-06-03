import { Box, IconButton } from '@mui/material';
import { QuestionBankAPI } from 'apis/QuestionBank';
import { CustomTable, Status, TableHeader, TitleAndLanguage } from 'components';
import { useTableState } from 'hooks/useTableState';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import React from 'react';
import { APPLY_LABEL, createTitle, messageDelete, ROUTE_PATH } from 'consts';
import SearchQuestionBank from './SearchQuestionBank';
import { Link, useNavigate } from 'react-router-dom';
import { QUESTION_TYPES } from './questionBank.const';
import { toast } from 'react-toastify';

const QuestionBank = () => {
  const navigate = useNavigate();
  const {
    data,
    loading,
    rowCount,
    pagination,
    setSearchParams,
    onSelectRow,
    onDelete,
    selected,
    onPageChange,
    onPageSizeChange
  } = useTableState(QuestionBankAPI, {});
  const columns = [
    {
      field: 'codeManage',
      headerName: 'Mã câu hỏi quản lý',
      minWidth: 190,
      flex: 1,
      renderCell: (params) => {
        return (
          <Link to={`${ROUTE_PATH.QUESTION_BANK_DETAIL}/${params.row.id}`} state={params.row}>
            {params.row.codeManage}
          </Link>
        );
      }
    },
    {
      field: 'type',
      headerName: 'loại câu hỏi',
      sortable: false,
      minWidth: 260,
      valueGetter: (params) => QUESTION_TYPES[params.row.type].label,
      renderCell: (params) => <p>{QUESTION_TYPES[params.row.type].label} </p>
    },
    {
      field: 'active',
      headerName: 'trạng thái hoạt động',
      minWidth: 260,
      sortable: false,
      renderCell: (params) => {
        return <Status status={params.row.active} statusLabels={APPLY_LABEL} />;
      }
    },
    { field: 'description', headerName: 'mô tả', width: 140 },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 120,
      sortable: false,
      renderCell: (item) => {
        return (
          <IconButton
            color="primary"
            component="div"
            onClick={() =>
              navigate(ROUTE_PATH.QUESTION_BANK_UPDATE + '/' + item.row.id, { state: item.row })
            }>
            <BorderColorOutlinedIcon />
          </IconButton>
        );
      }
    }
  ];
  const onCreate = () => {
    navigate(ROUTE_PATH.QUESTION_BANK_ADD);
  };
  const handleDelete = () => {
    const selectedModel = data.filter((c) => selected.includes(c.id));
    const includeActive = selectedModel.some((c) => c.active);
    if (includeActive) {
      toast.error('Bạn không thể xóa câu hỏi đang được sử dụng');
    } else {
      onDelete();
    }
  };

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage title="ngân hàng câu hỏi" />
        <SearchQuestionBank setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          selected={selected}
          onDelete={handleDelete}
          onAdd={onCreate}
          createTitle={createTitle.QuestionBank}
          deleteMessage={messageDelete.QuestionBank}
        />
        <CustomTable
          rows={data}
          columns={columns}
          loading={loading}
          checkboxSelection
          selectionModel={selected}
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

export default QuestionBank;
