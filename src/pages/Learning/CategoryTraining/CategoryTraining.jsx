import { Box, IconButton } from '@mui/material';
import { CustomTable, Modal, TableHeader, TitleAndLanguage } from 'components';
import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CreateUpdateProgram from './components/CreateUpdateCategoryTraining';
import { useTableState } from 'hooks/useTableState';
import SearchProgramCode from './components/SearchCategoryTraining';
import { CategoryTrainingAPI } from 'apis/CategoryTraining';
import { messageDelete } from 'consts';
import { DAY_FORMAT } from 'consts/date.const';
import dayjs from 'dayjs';

const AddTitle = 'Thêm hạng mục mới';
const EditTitle = 'Chỉnh sửa hạng mục';
const CategoryTraining = () => {
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
  } = useTableState(CategoryTrainingAPI, {});
  const columns = [
    { field: 'name', headerName: 'tên hạng mục', minWidth: 190, flex: 1 },
    { field: 'parentName', headerName: 'hạng mục cha', minWidth: 260 },
    { field: 'no', headerName: 'thứ tự', width: 140 },
    { field: 'createdBy', headerName: 'người tạo', width: 150 },
    {
      field: 'createdDate',
      headerName: 'ngày tạo',
      minWidth: 130,
      renderCell: (params) => {
        if (!params.row.createdDate) return '';
        return dayjs(params.row.createdDate).format(DAY_FORMAT.ddMMYYYY);
      }
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 120,
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
          title="hạng mục đào tạo"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchProgramCode setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          selected={selected}
          onDelete={onDelete}
          onAdd={onCreateNewItem}
          deleteMessage={messageDelete.CategoryTraining}
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
        <Modal isOpen={isOpen} title={detailItem ? EditTitle : AddTitle} onClose={toggleModal}>
          <CreateUpdateProgram
            detailCategory={detailItem}
            onClose={toggleModal}
            getListData={getListData}
            language={language}
          />
        </Modal>
      )}
    </>
  );
};

export default CategoryTraining;
