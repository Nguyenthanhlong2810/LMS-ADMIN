import React from 'react';

import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Box, IconButton } from '@mui/material';
import { CustomTable, StatusFAQ, TableHeader, TitleAndLanguage } from 'components';

import TopicModal from './addTopicModal';
import Filter from './SearchTopic';
import { useTableState } from 'hooks/useTableState';
import { TopicAPI } from 'apis/FQA/topicApi';
import { messageDelete } from 'consts';

const ListTopic = () => {
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
  } = useTableState(TopicAPI, {});

  const columns = [
    { field: 'id', headerName: 'STT', width: 90 },
    { field: 'name', headerName: 'Chủ đề', minWidth: 150, flex: 1 },
    {
      field: 'status',
      headerName: 'Trạng thái',
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return <StatusFAQ status={params.row.statusTopic} />;
      }
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      sortable: false,
      width: 150,
      renderCell: (item) => {
        return (
          <IconButton color="primary" component="div" onClick={() => editItem(item.row)}>
            <BorderColorOutlinedIcon />
          </IconButton>
        );
      }
    }
  ];

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage
          title="Chủ đề câu hỏi thường gặp"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <Filter setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          selected={selected}
          onDelete={onDelete}
          onAdd={onCreateNewItem}
          title="DANH SÁCH Chủ đề câu hỏi thường gặp"
          deleteMessage={messageDelete.FAQTopic}
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
        {isOpen && (
          <TopicModal
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

export default ListTopic;
