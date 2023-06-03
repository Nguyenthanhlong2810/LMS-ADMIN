import { Box, Button, IconButton } from '@mui/material';
import { CustomTable, Modal, TableHeader, TitleAndLanguage } from 'components';
import React, { useRef } from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ProgramAPI } from 'apis/ProgramCode';
import CreateUpdateProgram from './components/CreateUpdateProgram';
import { useTableState } from 'hooks/useTableState';
import SearchProgramCode from './components/SearchProgramCode';
import { ExportIcon, ImportIcon } from 'assets/icon';
import { DEFAULT_ERROR_MESSAGE, messageDelete, URL_TEMPLATE } from 'consts';
import { DAY_FORMAT } from 'consts/date.const';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { useLoading } from 'hooks/LoadingProvider';

const AddTitle = 'Thêm mã mới';
const EditTitle = 'Chỉnh sửa mã chương trình';
const ProgramCodeScreen = () => {
  const {
    data,
    isOpen,
    toggleModal,
    loading,
    rowCount,
    pagination,
    searchParams,
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
    onCreateNewItem,
    getListData
  } = useTableState(ProgramAPI, {
    year: new Date().getFullYear()
  });
  const inputRef = useRef(null);

  const { showLoading, hideLoading } = useLoading();

  const columns = [
    { field: 'groupCode', headerName: 'nhóm chương trình', width: 190 },
    { field: 'firstGroupCode', headerName: 'mã nhóm 1', minWidth: 140 },
    { field: 'secondGroupCode', headerName: 'mã nhóm 2', width: 140 },
    { field: 'ordinalNumber', headerName: 'thứ tự', width: 90 },
    { field: 'programName', headerName: 'chương trình ', minWidth: 270, flex: 1 },
    { field: 'shortProgramName', headerName: 'tên chương trình viết tắt', width: 250 },
    { field: 'key', headerName: 'khóa', width: 90 },
    { field: 'year', headerName: 'năm', width: 90 },
    { field: 'programCode', headerName: 'mã chương trình', width: 350 },

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
  const downloadFile = (data, fileName) => {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };
  const getTemplate = async () => {
    try {
      const response = await ProgramAPI.downloadTemplate();
      downloadFile(response.data, `Program_Template.${'xlsx'}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };
  const onDownloadProgram = async () => {
    try {
      const response = await ProgramAPI.downloadExcel({
        ...searchParams,
        isExportAll: true,
        language
      });
      downloadFile(response.data, `Program_${dayjs().format(DAY_FORMAT.ddMMYYYY)}.${'xlsx'}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    }
  };
  const onUploadProgram = async (e) => {
    if (e.target.files?.length) {
      try {
        const file = e.target.files[0];
        showLoading();
        await ProgramAPI.uploadExcel(file);
        getListData();
      } catch (error) {
        toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
      } finally {
        inputRef.current.value = '';
        hideLoading();
      }
    }
  };
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage
          title="Mã chương trình"
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
          deleteMessage={messageDelete.ProgramCode}
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
            detailProgram={detailItem}
            onClose={toggleModal}
            getListData={getListData}
            language={language}
          />
        </Modal>
      )}
      <div className="d-flex justify-content-space-between mt-3">
        <div>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className="mr-3"
            component="label"
            endIcon={<ImportIcon />}>
            <input
              ref={inputRef}
              hidden
              accept=".xlsx, .xls, .csv"
              type="file"
              onChange={onUploadProgram}
            />
            Nhập dữ liệu
          </Button>
          <Button
            variant="contained"
            size="large"
            endIcon={<FileDownloadOutlinedIcon />}
            onClick={getTemplate}>
            Tải biểu mẫu
          </Button>
        </div>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ExportIcon />}
          onClick={onDownloadProgram}>
          Xuất dữ liệu
        </Button>
      </div>
    </>
  );
};

export default ProgramCodeScreen;
