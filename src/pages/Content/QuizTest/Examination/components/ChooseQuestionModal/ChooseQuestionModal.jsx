import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { CustomTable, Modal, Status } from 'components';
import { useTableState } from 'hooks/useTableState';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { APPLY_LABEL, ROUTE_PATH } from 'consts';
import SearchQuestion from './SearchQuestion';
import { QuestionBankAPI } from 'apis/QuestionBank';
import { QUESTION_TYPES } from 'pages/Content/QuizTest/QuestionBank/questionBank.const';

const columns = [
  {
    field: 'codeManage',
    headerName: 'mã câu hỏi',
    width: 160,
    flex: 1,
    renderCell: (item) => {
      return (
        <Link
          to={`${ROUTE_PATH.QUESTION_BANK_DETAIL}/${item.row.id}?onlyView=true`}
          target="_blank">
          {item.row?.codeManage}
        </Link>
      );
    }
  },
  {
    field: 'type',
    headerName: 'loại câu hỏi',
    minWidth: 200,
    renderCell: (params) => <p>{QUESTION_TYPES[params.row.type].label} </p>
  },
  {
    field: 'active',
    headerName: 'trạng thái sử dụng',
    width: 200,
    renderCell: (item) => {
      return <Status status={item.row.active} statusLabels={APPLY_LABEL} />;
    }
  },
  { field: 'description', headerName: 'mô tả', minWidth: 190, flex: 1 }
];

function ChooseQuestionModal({ onClose, isOpen, onAddQuestion, selectedDefault }) {
  const {
    data,
    loading,
    rowCount,
    pagination,
    selected,
    onSelectRow,
    setSearchParams,
    onPageChange,
    onPageSizeChange
  } = useTableState(QuestionBankAPI, {});

  useEffect(() => {
    onSelectRow(selectedDefault);
  }, []);
  const onSelectQuestion = () => {
    const selectedRowData = data.filter((row) => selected.includes(row.id));
    const finalSelectedRowData = selectedRowData.filter(
      (row) => !selectedDefault.includes(row?.id)
    );
    onAddQuestion(finalSelectedRowData);
    onClose();
  };
  const isRowSelectable = (params) => {
    if (selectedDefault) {
      return !selectedDefault.includes(params.row.id);
    }
    return true;
  };
  return (
    <Modal isOpen={isOpen} title={'Tìm kiếm câu hỏi'} onClose={onClose}>
      <SearchQuestion setSearchParams={setSearchParams} />
      <CustomTable
        height={350}
        isRowSelectable={isRowSelectable}
        rows={data}
        columns={columns}
        loading={loading}
        checkboxSelection
        keepNonExistentRowsSelected
        selectionModel={selected}
        onSelectionModelChange={onSelectRow}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        rowCount={rowCount}
        page={pagination.pageNo - 1}
        pageSize={pagination.pageSize}
        paginationMode="server"
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          size="large"
          color="secondary"
          variant="contained"
          endIcon={<AddIcon />}
          onClick={onSelectQuestion}>
          Thêm
        </Button>
      </Box>
    </Modal>
  );
}

ChooseQuestionModal.propTypes = {
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  onAddQuestion: PropTypes.func
};

export default ChooseQuestionModal;
