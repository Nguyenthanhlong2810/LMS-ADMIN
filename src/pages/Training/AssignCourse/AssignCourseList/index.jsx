import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import { CustomTable, Modal, TableHeader, TitleAndLanguage } from 'components';
import { useTableState } from 'hooks/useTableState';
import SearchAssignCourse from './SearchAssignCourse';
import { AssignCourseAPI } from 'apis/AssignCourse';
import AssignCourseAction from '../AssignCourseForm';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { messageDelete } from 'consts';
import { Flex } from 'components/Layout/Layout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

export const AssignTitle = 'HOẠT ĐỘNG GÁN';
const AssignCourse = (props) => {
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
    onPageChange,
    onPageSizeChange,
    getListData,
    onCreateNewItem
  } = useTableState(AssignCourseAPI, {});
  const { isUseInModal } = props;

  const navigate = useNavigate();

  const columns = [
    {
      field: 'nameCourse',
      headerName: 'tên khóa học',
      minWidth: 190
    },
    { field: 'codeCourse', headerName: 'mã khóa học', minWidth: 160, flex: 1 },
    { field: 'description', headerName: 'mô tả về khóa học', minWidth: 260, flex: 1 },
    { field: 'createdBy', headerName: 'người thực hiện gán', minWidth: 160, flex: 1 },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 120,
      renderCell: (item) => {
        return (
          <Button
            className="btn-tittle"
            variant="contained"
            color="primary"
            onClick={() => editItem(item.row)}
            sx={{ marginLeft: '15px' }}>
            Sửa
          </Button>
        );
      }
    }
  ];

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage
          title="danh sách khóa học đã gán"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchAssignCourse largeSize={isUseInModal} setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        {!isUseInModal && (
          <TableHeader
            selected={selected}
            onDelete={onDelete}
            createTitle={'Hoạt động gán'}
            assignCourseBtn
            onAdd={onCreateNewItem}
            deleteMessage={messageDelete.CourseAssigned}
          />
        )}

        <CustomTable
          rows={data}
          columns={columns}
          loading={loading}
          checkboxSelection
          // onSelectionModelChange={onSelectRow}
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
            assignCourseId={detailItem?.id}
            courseId={detailItem?.courseId}
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

export default AssignCourse;
