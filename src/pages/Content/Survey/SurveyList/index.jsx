import React, { useEffect } from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Box, Button, IconButton } from '@mui/material';
import { CustomTable, Status, TableHeader, TitleAndLanguage } from 'components';
import { DAY_FORMAT } from 'consts/date.const';
import dayjs from 'dayjs';
import { useTableState } from 'hooks/useTableState';
import { Link, useNavigate } from 'react-router-dom';
import { SurveyAPI } from '../../../../apis/Survey';
import { APPLY_LABEL, messageDelete, messageInfoDelete } from '../../../../consts';
import SearchSurvey from './SearchSurvey';
import AddIcon from '@mui/icons-material/Add';
import { toast } from 'react-toastify';

const Survey = (props) => {
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
  } = useTableState(SurveyAPI, {});
  const { isUseInModal, onClose, selectedIds = [], disabledSelected = false } = props;
  const navigate = useNavigate();

  useEffect(() => {
    onSelectRow(selectedIds);
  }, []);

  const editItem = (item) => {
    navigate('update/' + item.id);
  };
  const columns = [
    {
      field: 'surveyName',
      headerName: 'tên khảo sát',
      minWidth: 190,
      renderCell: (params) => {
        return <Link to={`/content/survey/detail/${params.row.id}`}>{params.row.surveyName}</Link>;
      }
    },
    { field: 'description', headerName: 'mô tả khái quát về khảo sát', minWidth: 260, flex: 1 },
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
      field: 'status',
      headerName: 'trạng thái sử dụng',
      minWidth: 190,
      sortable: false,
      renderCell: (params) => <Status status={params.row.statusUsed} statusLabels={APPLY_LABEL} />
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 120,
      sortable: false,
      renderCell: (item) => {
        return (
          <IconButton color="primary" component="div" onClick={() => editItem(item.row)}>
            <BorderColorOutlinedIcon />
          </IconButton>
        );
      }
    }
  ];

  const onSelectSurvey = () => {
    onClose(data?.filter((row) => selected?.includes(row.id)));
  };

  const isRowSelectable = (params) => {
    if (selectedIds && disabledSelected) {
      return !selectedIds.includes(params.row.id);
    }
    return true;
  };
  const handleDelete = () => {
    const selectedModel = data.filter((c) => selected.includes(c.id));
    const includeActive = selectedModel.some((c) => c.statusUsed);
    if (includeActive) {
      toast.error(messageInfoDelete.Survey);
    } else {
      onDelete();
    }
  };
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        {!isUseInModal && (
          <TitleAndLanguage
            title="khảo sát"
            language={language}
            onChangeLanguage={onChangeLanguage}
          />
        )}

        <SearchSurvey largeSize={isUseInModal} setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        {!isUseInModal && (
          <TableHeader
            selected={selected}
            onDelete={handleDelete}
            createTitle="Tạo khảo sát mới"
            onAdd={() => navigate('new')}
            deleteMessage={messageDelete.Survey}
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
              onClick={onSelectSurvey}>
              <AddIcon /> Thêm
            </Button>
          </div>
        )}
      </Box>
    </>
  );
};

export default Survey;
