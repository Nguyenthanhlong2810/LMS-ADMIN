import React, { useEffect } from 'react';
import { useTableState } from 'hooks/useTableState';
import { Box, Button, IconButton } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { CustomTable, SecurityArea, Status, TableHeader, TitleAndLanguage } from 'components';
import { APPLY_LABEL, HTTP_STATUS, messageDelete, NO_EMPTY_DATA } from 'consts';
import SearchImportContent from '../SearchImportContent';
import { useNavigate } from 'react-router-dom';
import { ImportContentAPI } from 'apis/ImportContent';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';
import { cloneDeep } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecurityArea } from 'store/reducers/SecurityAreaSlice';
function ImportContentList(props) {
  const {
    data,
    loading,
    rowCount,
    pagination,
    language,
    setSearchParams,
    onChangeLanguage,
    onSelectRow,
    onDelete,
    selected,
    onPageChange,
    onPageSizeChange
  } = useTableState(ImportContentAPI, {});

  const navigate = useNavigate();
  const { isUseInModal, onClose, selectedDefault = [], disabledSelected = false } = props;
  const dispatch = useDispatch();
  const { securityAreas } = useSelector((state) => state.SecurityArea);
  useEffect(() => {
    if (securityAreas.length === 0) {
      dispatch(fetchSecurityArea());
    }
  }, []);
  const columns = [
    { field: 'nameContent', headerName: 'tên nội dung', width: 180 },
    { field: 'code', headerName: 'mã nội dung quản lý', editable: true, minWidth: 220 },
    { field: 'type', headerName: 'loại nội dung', width: 140 },
    { field: 'timeLong', headerName: 'thời lượng', width: 120 },
    {
      field: 'nameSecurityArea',
      headerName: 'miền bảo mật',
      sortable: false,
      minWidth: 140,
      renderCell: (item) => {
        return <SecurityArea securityCode={item?.row?.nameSecurityArea} />;
      }
    },
    {
      field: 'statusUsed',
      headerName: 'trạng thái sử dụng',
      sortable: false,
      width: 200,
      renderCell: (item) => {
        return <Status status={item?.row?.statusUsed || false} statusLabels={APPLY_LABEL} />;
      }
    },
    {
      field: 'action',
      headerName: 'thao tác',
      sortable: false,
      width: 120,
      renderCell: (item) => {
        return (
          <IconButton
            color="primary"
            component="div"
            onClick={() => navigate('update/' + item.row.id)}>
            <BorderColorOutlinedIcon />
          </IconButton>
        );
      }
    }
  ];
  useEffect(() => {
    onSelectRow(selectedDefault);
  }, []);

  const onSelectImportContent = () => {
    onClose(data?.filter((row) => selected.includes(row.id)));
  };

  const updateCodeManage = async (params) => {
    try {
      let submitData = cloneDeep(params.row);
      const codeManage = params.value;
      if (codeManage === '') {
        toast.error(NO_EMPTY_DATA);
      } else if (codeManage && submitData && codeManage !== submitData?.code) {
        submitData.code = codeManage;
        const res = await ImportContentAPI.update(submitData);
        if (res.status !== HTTP_STATUS.StatusOK) {
          toast.error(NO_EMPTY_DATA);
        }
      } else if (codeManage && submitData === undefined) {
        const row = data.find((item) => item.id === params.id);
        if (row && codeManage !== row.code) {
          row.code = codeManage;
          const res = await ImportContentAPI.update(row);
          if (res.status !== HTTP_STATUS.StatusOK) {
            toast.error(NO_EMPTY_DATA);
          }
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra !');
    }
  };

  const isRowSelectable = (params) => {
    if (selectedDefault && disabledSelected) {
      return !selectedDefault.includes(params.row.id);
    }
    return true;
  };
  const handleDelete = () => {
    const selectedModel = data.filter((c) => selected.includes(c.id));
    const includeActive = selectedModel.some((c) => c.statusUsed);
    if (includeActive) {
      toast.error('Không thể xóa nội dung đã được sử dụng cho khóa học');
    } else {
      onDelete();
    }
  };
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        {!isUseInModal && (
          <TitleAndLanguage
            title="Nội dung tải lên"
            language={language}
            onChangeLanguage={onChangeLanguage}
          />
        )}
        <SearchImportContent largeSize={isUseInModal} setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        {!isUseInModal && (
          <TableHeader
            selected={selected || []}
            onDelete={handleDelete}
            onAdd={() => navigate('new')}
            createTitle="Thêm nội dung mới"
            deleteMessage={messageDelete.ImportContent}
          />
        )}
        <CustomTable
          isRowSelectable={isRowSelectable}
          rows={data}
          columns={columns}
          loading={loading}
          checkboxSelection
          keepNonExistentRowsSelected
          onSelectionModelChange={onSelectRow}
          selectionModel={selected}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
          page={pagination.pageNo - 1}
          pageSize={pagination.pageSize}
          paginationMode="server"
          onCellEditCommit={updateCodeManage}
        />
        {isUseInModal && (
          <div className="d-flex justify-content-end">
            <Button
              className="btn-tittle"
              variant="contained"
              color="secondary"
              sx={{ marginTop: '15px' }}
              disabled={selected.length === 0}
              onClick={onSelectImportContent}>
              <AddIcon /> Thêm
            </Button>
          </div>
        )}
      </Box>
    </>
  );
}

ImportContentList.propTypes = {};

export default ImportContentList;
