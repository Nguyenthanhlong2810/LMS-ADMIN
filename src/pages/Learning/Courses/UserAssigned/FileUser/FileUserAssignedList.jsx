import React from 'react';
import { Box } from '@mui/material';
import { CustomTable, Modal, TableHeader } from 'components';
import { messageDelete } from 'consts';
import { useTableState } from 'hooks/useTableState';
import AssignCourseAction from 'pages/Training/AssignCourse/AssignCourseForm';
import { AssignTitle } from 'pages/Training/AssignCourse/AssignCourseList';
import SearchFileUser from './SearchFileUser';
import { FileUserAssignedAPI } from 'apis/FileUserAssigned';

const FileUserAssignedList = () => {
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
    onPageChange,
    onPageSizeChange,
    getListData,
    onDownload,
    onCreateNewItem
  } = useTableState(FileUserAssignedAPI, { name: '' });

  const columns = [
    { field: 'userFile', headerName: 'Tên tệp', minWidth: 300 },
    { field: 'code', headerName: 'Mã tệp', minWidth: 300 },
    { field: 'createdBy', headerName: 'người thực hiện gán', minWidth: 300 }
  ];

  return (
    <>
      <SearchFileUser setSearchParams={setSearchParams} />
      <Box sx={{ marginTop: 3 }}>
        <TableHeader
          selected={selected}
          assignCourseBtn
          downloadFileBtn
          deleteMessage={messageDelete.UserAssigned}
          onAdd={onCreateNewItem}
          onDelete={onDelete}
          onDownload={onDownload}
          createTitle={'Hoạt động gán'}
          deleteTitle={'Hủy gán'}
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
      {isOpen && (
        <Modal isOpen={isOpen} title={AssignTitle} onClose={toggleModal}>
          <AssignCourseAction
            // assignCourseId={detailItem?.id}
            // courseId={detailItem?.courseId}
            isOpenModal
            onClose={toggleModal}
            getListData={getListData}
            language={language}
          />
        </Modal>
      )}
    </>
  );
};

export default FileUserAssignedList;
