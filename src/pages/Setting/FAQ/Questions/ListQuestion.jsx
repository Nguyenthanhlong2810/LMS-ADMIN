import React from 'react';

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Box, IconButton } from '@mui/material';
import { CustomTable, StatusFAQ, TableHeader, TitleAndLanguage } from 'components';
import * as dayjs from 'dayjs';

import AddQuestionModal from './QuestionModal';
import { useTableState } from 'hooks/useTableState';
import { QuestionAPI } from 'apis/FQA/questionApi';
import Filter from './SearchQuestion';
import { messageDelete } from 'consts';
import { DAY_FORMAT } from 'consts/date.const';

const ListQuestion = () => {
  const {
    data,
    isOpen,
    toggleModal,
    loading,
    rowCount,
    pagination,
    language,
    setSearchParams,
    onChangeLanguage,
    detailItem,
    onSelectRow,
    onDelete,
    selected,
    editItem,
    onCreateNewItem,
    onPageChange,
    onPageSizeChange,
    getListData
  } = useTableState(QuestionAPI, {});

  const columns = [
    { field: 'id', headerName: 'STT', width: 70 },
    {
      field: 'topic',
      headerName: 'Chủ đề',
      valueGetter: (params) => params.row.managerTopic.name,
      minWidth: 150,
      renderCell: (params) => {
        return params.row.managerTopic.name;
      }
    },
    {
      field: 'question',
      headerName: 'Câu hỏi',
      minWidth: 180,
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return <StatusFAQ status={params.row.statusQuestion} />;
      }
    },
    {
      field: 'lastUpdatedBy',
      headerName: 'Người cập nhật',
      width: 150
    },
    {
      field: 'lastUpdated',
      headerName: 'Ngày cập nhật',
      width: 170,
      renderCell: (params) => {
        return dayjs(params.row.lastUpdated).format(DAY_FORMAT.ddMMYYYY);
      }
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      sortable: false,
      width: 100,
      renderCell: (item) => {
        return (
          <IconButton color="primary" onClick={() => editItem(item.row)}>
            <BorderColorOutlinedIcon />
          </IconButton>
        );
      }
    }
  ];
  const changeLanguage = (e) => {
    setSearchParams({});
    onChangeLanguage(e);
  };
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage
          title="câu hỏi thường gặp"
          language={language}
          onChangeLanguage={changeLanguage}
        />
        <Filter language={language} setSearchParams={setSearchParams} />
      </Box>
      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          selected={selected}
          onDelete={onDelete}
          onAdd={onCreateNewItem}
          title="Danh sách câu hỏi thường gặp"
          deleteMessage={messageDelete.QuestionBank}
        />
        <CustomTable
          initialState={{
            sorting: {
              sortModel: [{ field: 'lastUpdated', sort: 'desc' }]
            }
          }}
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
        {isOpen && (
          <AddQuestionModal
            isOpen={isOpen}
            onClose={toggleModal}
            item={detailItem}
            language={language}
            refreshTopic={getListData}
          />
        )}
      </Box>
    </>
  );
};

export default ListQuestion;
