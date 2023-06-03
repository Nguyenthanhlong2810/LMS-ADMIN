import { Box, Chip, IconButton } from '@mui/material';
import { NewAPI } from 'apis/News';
import { CustomTable, Modal, Switch, TableHeader, Title } from 'components';
import React from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { Status } from 'components';
import StarIcon from '@mui/icons-material/Star';
import SearchNews from './SearchNews';
import EditNewsForm from './components/EditNewsForm';
import { useTableState } from 'hooks/useTableState';
import { DEFAULT_ERROR_MESSAGE, messageDelete } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import { toast } from 'react-toastify';
import { NEWS_TYPE } from './const';

const StatusNewsLabel = {
  apply: 'Đã đăng',
  notApply: 'Bản nháp'
};
const ListNew = ({ setIsCreateNew }) => {
  const {
    data,
    isOpen,
    toggleModal,
    loading,
    rowCount,
    pagination,
    setSearchParams,
    detailItem,
    onSelectRow,
    onDelete,
    selected,
    editItem,
    onPageChange,
    onPageSizeChange,
    getListData
  } = useTableState(NewAPI, {
    keyword: ''
  });
  const { showLoading, hideLoading } = useLoading();

  const columns = [
    { field: 'id', headerName: 'STT', width: 70 },
    { field: 'subject', headerName: 'tiêu đề', minWidth: 200, flex: 1 },
    {
      field: 'lmsNewsLabels',
      headerName: 'Từ khóa',
      sortable: false,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            {params.row.lmsNewsLabels.map((label, index) => (
              <Chip label={label} key={index} className="mr-2" />
            ))}
          </>
        );
      }
    },
    {
      field: 'contentType',
      headerName: 'loại tin',
      width: 150,
      renderCell: (params) => {
        return NEWS_TYPE.map((item) => {
          if (item.value === params.row.contentType) return item.label;
        });
      }
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      sortable: false,
      width: 110,
      renderCell: (params) => {
        return <Status status={params.row.status} statusLabels={StatusNewsLabel} />;
      }
    },
    { field: 'createdBy', headerName: 'người tạo', width: 150 },
    {
      field: 'isHotNews',
      headerName: 'tin nổi bật',
      sortable: false,
      width: 110,
      renderCell: (params) => {
        if (params.row.isHotNews) return <StarIcon color="yellow" />;
        return '';
      }
    },
    {
      field: 'isPinned',
      headerName: 'Ghim tin',
      sortable: false,
      width: 90,
      renderCell: (params) => {
        const { isHotNews, isPinned, status } = params.row;
        // updatePin(e);
        if (isHotNews && status)
          return (
            <Switch
              defaultChecked={isPinned}
              checked={isPinned}
              onChange={(e) => updatePin(e, params.row)}
            />
          );
        return '';
      }
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 100,
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

  const onCreateNew = () => {
    setIsCreateNew(true);
  };
  const updatePin = async (e, params) => {
    params.isPinned = e.target.checked;
    try {
      showLoading();
      await NewAPI.update({ ...params, isPinned: e.target.checked });
    } catch (error) {
      params.isPinned = !e.target.checked;
      toast.error(error?.response?.data?.message || DEFAULT_ERROR_MESSAGE);
    } finally {
      hideLoading();
    }
  };
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <Title>Tin tức </Title>
        <SearchNews setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          selected={selected}
          onDelete={onDelete}
          onAdd={onCreateNew}
          title="danh sách tin tức"
          deleteMessage={messageDelete.News}
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
        <Modal isOpen={isOpen} title="Chỉnh sửa tin tức" onClose={toggleModal}>
          <EditNewsForm
            newDetail={detailItem}
            typeOfNews={detailItem.contentType}
            onClose={toggleModal}
            refreshNews={getListData}
            setIsCreateNew={setIsCreateNew}
          />
        </Modal>
      )}
    </>
  );
};

export default ListNew;
