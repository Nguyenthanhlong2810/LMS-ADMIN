import React, { useCallback } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography, styled, Tooltip } from '@mui/material';
import { useTableState } from 'hooks/useTableState';
import SearchApprovalList from './SearchApprovalList';
import { TitleAndLanguage, CustomTable, TableHeader, Modal } from 'components';
import { ApprovalListAPI } from 'apis/ApprovalList';
import dayjs from 'dayjs';
import {
  messageCancelSave,
  DAY_FORMAT,
  APPROVE_STATUS,
  HTTP_STATUS,
  DEFAULT_ERROR_MESSAGE
} from 'consts';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReasonForm from '../ReasonForm';
import InfoIcon from '@mui/icons-material/Info';
import { toast } from 'react-toastify';

const ApprovalList = () => {
  const [isOpenReasonModal, setIsOpenReasonModal] = React.useState(false);
  const [isRefuse, setIsRefuse] = React.useState(false);
  const [idList, setIdList] = React.useState(null);
  const toggleReasonModal = useCallback(() => setIsOpenReasonModal((v) => !v), []);

  const {
    data,
    loading,
    rowCount,
    pagination,
    language,
    setSearchParams,
    onChangeLanguage,
    onSelectRow,
    getListData,
    selected,
    onPageChange,
    onPageSizeChange
  } = useTableState(ApprovalListAPI, {});
  const handleApprove = async (ids) => {
    const data = {
      approveHistoryIds: ids
    };
    try {
      const res = await ApprovalListAPI.approve(data);
      if (res.status === HTTP_STATUS.StatusOK) {
        getListData();
        toast.success('Gửi thành công');
      }
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
    // handleCloseMenuAction();
  };
  const handleRefuse = (ids) => {
    setIdList(ids);
    setIsRefuse(true);
    toggleReasonModal();
  };
  const handleReturn = (ids) => {
    setIsRefuse(false);
    setIdList(ids);
    toggleReasonModal();
  };
  const columns = [
    {
      field: 'username',
      headerName: 'LDAP',
      minWidth: 190,
      renderCell: (params) => {
        return <Typography>{params?.row?.assignCourse?.appUser?.username}</Typography>;
      }
    },
    {
      field: 'fullname',
      headerName: 'HỌ VÀ TÊN',
      minWidth: 190,
      renderCell: (params) => {
        return <Typography>{params?.row?.assignCourse?.appUser?.fullname}</Typography>;
      }
    },
    {
      field: 'position',
      headerName: 'CHỨC DANH',
      minWidth: 260,
      flex: 1,
      renderCell: (params) => {
        return <Typography>{params?.row?.assignCourse?.appUser?.position}</Typography>;
      }
    },
    {
      field: 'department',
      headerName: 'BỘ PHẬN',
      minWidth: 260,
      flex: 1,
      renderCell: (params) => {
        return <Typography>{params?.row?.assignCourse?.appUser?.department}</Typography>;
      }
    },
    {
      field: 'description',
      headerName: 'NỘI DUNG',
      minWidth: 260,
      flex: 1,
      renderCell: (params) => {
        return params?.row?.assignCourse?.course?.name;
      }
    },
    { field: 'reasonRegistry', headerName: 'LÝ DO ĐĂNG KÝ', minWidth: 260, flex: 1 },
    {
      field: 'duedateRegistry',
      headerName: 'HẠN ĐĂNG KÝ',
      minWidth: 130,
      renderCell: (params) => {
        if (!params.row.duedateRegistry) return '';
        return dayjs(params.row.duedateRegistry).format(DAY_FORMAT.ddMMYYYY);
      }
    },
    {
      field: 'status',
      headerName: 'TRẠNG THÁI',
      minWidth: 190,
      renderCell: (params) => {
        const status = APPROVE_STATUS.find((item) => item.value === params?.row?.statusApprove);
        return (
          <>
            <StyledApprovalStatus status={params?.row?.statusApprove}>
              {status?.label}
            </StyledApprovalStatus>
            {params?.row?.statusApprove === 'REJECT' && (
              <IconInformation title={params?.row?.reasonReject} />
            )}
            {params?.row?.statusApprove === 'RETURN' && (
              <IconInformation title={params?.row?.reasonReturn} />
            )}
          </>
        );
      }
    },
    {
      field: 'dateApprove',
      headerName: 'NGÀY PHÊ DUYỆT',
      minWidth: 130,
      renderCell: (params) => {
        if (!params.row.dateApprove) return '';
        return dayjs(params.row.dateApprove).format(DAY_FORMAT.ddMMYYYY);
      }
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      width: 120,
      align: 'right',
      renderCell: (item) => {
        return (
          <ActionMenu
            item={item?.row}
            handleApprove={handleApprove}
            handleRefuse={handleRefuse}
            handleReturn={handleReturn}
          />
        );
      }
    }
  ];

  return (
    <>
      <Box sx={{ p: 3, backgroundColor: 'white' }}>
        <TitleAndLanguage
          title="danh sách phê duyệt"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchApprovalList setSearchParams={setSearchParams} />
      </Box>
      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          createTitle="Chấp nhận"
          deleteTitle="Từ chối"
          selected={selected}
          onDelete={() => handleRefuse(selected)}
          onAdd={() => {
            handleApprove(selected);
          }}
          deleteMessage={messageCancelSave.ProgramConfig}
        />
        <CustomTable
          rows={data}
          columns={columns}
          loading={loading}
          checkboxSelection
          onSelectionModelChange={onSelectRow}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
          page={pagination.pageNo - 1}
          pageSize={pagination.pageSize}
          paginationMode="server"
        />
      </Box>
      <Modal
        isOpen={isOpenReasonModal}
        title={isRefuse ? 'Lý do từ chối' : 'Lý do gửi trả'}
        onClose={toggleReasonModal}>
        <ReasonForm
          onClose={toggleReasonModal}
          isRefuse={isRefuse}
          idList={idList}
          getListData={getListData}
        />
      </Modal>
    </>
  );
};
export default ApprovalList;
export const StyledApprovalStatus = styled(Typography)`
  color: ${(props) =>
    props.status === 'PENDING' ? '#1FBDF8' : props.status === 'APPROVAL' ? '#55C763' : '#FF647C'};
`;
const IconInformation = ({ title }) => {
  return (
    <Tooltip title={title ? title : ''}>
      <InfoIcon color="warning" fontSize="small" />
    </Tooltip>
  );
};
const ActionMenu = ({ item, handleApprove, handleRefuse, handleReturn }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCloseMenuAction = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <>
      <IconButton color="primary" component="div" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenuAction}>
        <MenuItem
          onClick={() => {
            handleApprove([item?.id]);
            handleCloseMenuAction();
          }}>
          Chấp thuận
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleRefuse([item?.id]);
            handleCloseMenuAction();
          }}>
          Từ chối
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleReturn([item?.id]);
            handleCloseMenuAction();
          }}>
          Gửi trả
        </MenuItem>
      </Menu>
    </>
  );
};
