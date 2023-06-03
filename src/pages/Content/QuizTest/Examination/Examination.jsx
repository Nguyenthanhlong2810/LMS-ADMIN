import React, { useEffect } from 'react';
import { Box } from '@mui/system';
import SearchExamination from './SearchExamination';
import { CustomTable, Status, TableHeader, TitleAndLanguage } from 'components';
import { Button, IconButton } from '@mui/material';
import { useTableState } from 'hooks/useTableState';
import { APPLY_LABEL, createTitle, messageDelete, messageInfoDelete, ROUTE_PATH } from 'consts';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ExamAPI } from 'apis/Examination';
import AddIcon from '@mui/icons-material/Add';

function Examination(props) {
  const {
    data,
    loading,
    rowCount,
    pagination,
    setSearchParams,
    onSelectRow,
    onDelete,
    selected,
    onPageChange,
    onPageSizeChange
  } = useTableState(ExamAPI, {});

  const navigate = useNavigate();
  const { isUseInModal, onClose, selectedIds = [], disabledSelected = false } = props;

  useEffect(() => {
    onSelectRow(selectedIds);
  }, []);

  const columns = [
    {
      field: 'examCode',
      headerName: 'mã bài kiểm tra',
      width: 160,
      renderCell: (params) => {
        return (
          <Link to={`${ROUTE_PATH.EXAMINATION_DETAIL}/${params.row.id}`} state={params.row}>
            {params.row.examCode}
          </Link>
        );
      }
    },
    { field: 'examTitle', headerName: 'tiêu đề', minWidth: 180 },
    { field: 'examType', headerName: 'loại', width: 140, sortable: false },
    {
      field: 'ordinalNumber',
      headerName: 'trạng thái sử dụng',
      sortable: false,
      width: 200,
      renderCell: (item) => {
        return <Status status={item?.row?.statusUsed || false} statusLabels={APPLY_LABEL} />;
      }
    },
    { field: 'description', headerName: 'mô tả', minWidth: 190, flex: 1 },
    {
      field: 'action',
      headerName: 'Thao tác',
      sortable: false,
      width: 120,
      renderCell: (item) => {
        return (
          <IconButton
            color="primary"
            component="div"
            onClick={() =>
              navigate(ROUTE_PATH.EXAMINATION_UPDATE + '/' + item.row.id, { state: item.row })
            }>
            <BorderColorOutlinedIcon />
          </IconButton>
        );
      }
    }
  ];

  const handleDelete = () => {
    const selectedModel = data.filter((c) => selected.includes(c.id));
    const includeActive = selectedModel.some((c) => c.statusUsed);
    if (includeActive) {
      toast.error(messageInfoDelete.Examination);
    } else {
      onDelete();
    }
  };

  const onSelectExamination = () => {
    const selectedRowsModal = data?.filter((row) => selected.includes(row.id));
    onClose(selectedRowsModal);
  };

  const isRowSelectable = (params) => {
    if (selectedIds && disabledSelected) {
      return !selectedIds.includes(params.row.id);
    }
    return true;
  };
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage title="bài kiểm tra" />
        <SearchExamination largeSize={isUseInModal} setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        {!isUseInModal && (
          <TableHeader
            selected={selected || []}
            onDelete={handleDelete}
            onAdd={() => navigate('new')}
            deleteMessage={messageDelete.Examination}
            createTitle={createTitle.Examination}
          />
        )}
        <CustomTable
          isRowSelectable={isRowSelectable}
          rows={data}
          columns={isUseInModal ? columns.slice(0, columns.length - 1) : columns}
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

        {isUseInModal && (
          <div className="d-flex justify-content-end">
            <Button
              className="btn-tittle"
              variant="contained"
              color="secondary"
              sx={{ marginTop: '15px' }}
              onClick={onSelectExamination}>
              <AddIcon /> Thêm
            </Button>
          </div>
        )}
      </Box>
    </>
  );
}

Examination.propTypes = {};

export default Examination;
