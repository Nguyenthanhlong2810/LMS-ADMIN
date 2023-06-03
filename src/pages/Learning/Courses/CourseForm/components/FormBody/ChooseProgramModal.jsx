import { Button, Radio } from '@mui/material';
import { ProgramAPI } from 'apis/ProgramCode';
import { CustomTable, Modal } from 'components';
import { useTableState } from 'hooks/useTableState';
import SearchProgramCode from 'pages/Learning/ProgramCode/components/SearchProgramCode';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const ChooseProgramModal = ({ onClose, courseLanguage = 'vn', selectedDefault }) => {
  const { data, loading, rowCount, pagination, setSearchParams, onPageChange, onPageSizeChange } =
    useTableState(
      ProgramAPI,
      {
        year: new Date().getFullYear()
      },
      courseLanguage
    );

  const [selectionModel, setSelectionModel] = useState();

  const columns = [
    {
      field: 'radiobutton',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        return (
          <Radio
            checked={
              selectionModel?.id === params.id ||
              selectionModel?.programName === params.row.programName
            }
            value={params.id}
            onChange={() => setSelectionModel(params.row)}
          />
        );
      }
    },
    { field: 'groupCode', headerName: 'nhóm chương trình', width: 190 },
    { field: 'firstGroupCode', headerName: 'mã nhóm 1', minWidth: 140 },
    { field: 'secondGroupCode', headerName: 'mã nhóm 2', width: 140 },
    { field: 'ordinalNumber', headerName: 'thứ tự', width: 90 },
    { field: 'programName', headerName: 'chương trình ', minWidth: 170, flex: 1 },
    { field: 'shortProgramName', headerName: 'tên chương trình viết tắt', width: 250 },
    { field: 'key', headerName: 'khóa', width: 90 },
    { field: 'year', headerName: 'năm', width: 90 },
    { field: 'programCode', headerName: 'mã chương trình', width: 350 }
  ];
  const onSelectProgram = () => {
    onClose(selectionModel);
  };
  useEffect(() => {
    if (selectedDefault?.programName) {
      setSelectionModel(selectedDefault);
    }
  }, []);
  return (
    <Modal title="Tìm kiếm mã chương trình" isOpen={true} onClose={onClose}>
      <SearchProgramCode setSearchParams={setSearchParams} />
      <div className="mb-5" />
      <CustomTable
        rows={data}
        columns={columns}
        loading={loading}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        rowCount={rowCount}
        page={pagination.pageNo - 1}
        pageSize={pagination.pageSize}
        paginationMode="server"
        disableSelectionOnClick={false}
        selectionModel={selectionModel ? [selectionModel?.id] : []}
        keepNonExistentRowsSelected
      />
      <div className="mt-3 text-right">
        <Button
          size="large"
          color="secondary"
          variant="contained"
          endIcon={<AddIcon />}
          onClick={onSelectProgram}>
          Thêm
        </Button>
      </div>
    </Modal>
  );
};

export default ChooseProgramModal;
