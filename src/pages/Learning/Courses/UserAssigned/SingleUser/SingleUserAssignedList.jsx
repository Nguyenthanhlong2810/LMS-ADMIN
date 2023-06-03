import React from 'react';
import { Box } from '@mui/material';
import { CustomTable, Modal, TableHeader } from 'components';
import { messageDelete } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useTableState } from 'hooks/useTableState';
import AssignCourseAction from 'pages/Training/AssignCourse/AssignCourseForm';
import { AssignTitle } from 'pages/Training/AssignCourse/AssignCourseList';
import { useNavigate } from 'react-router-dom';
import SearchSingleUser from './SearchSingleUser';
import { SingleUserAssignedAPI } from 'apis/SingleUserAssigned';

const SingleUserAssignedList = () => {
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
    onCreateNewItem
  } = useTableState(SingleUserAssignedAPI, { name: '' });
  const navigate = useNavigate();
  const confirm = useConfirmDialog();

  const columns = [
    { field: 'code', headerName: 'Mã học viên', minWidth: 150, flex: 1 },
    { field: 'fullname', headerName: 'họ tên', minWidth: 150 },
    { field: 'email', headerName: 'email ldap', minWidth: 150 },
    { field: 'department', headerName: 'bộ phận', minWidth: 150 },
    { field: 'position', headerName: 'vị trí công việc', minWidth: 150 },
    { field: 'createdBy', headerName: 'người thực hiện gán', minWidth: 200 }
  ];

  return (
    <>
      <SearchSingleUser setSearchParams={setSearchParams} />
      <Box sx={{ marginTop: 3 }}>
        <TableHeader
          selected={selected}
          onDelete={onDelete}
          assignCourseBtn
          deleteMessage={messageDelete.UserAssigned}
          onAdd={onCreateNewItem}
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

export default SingleUserAssignedList;
