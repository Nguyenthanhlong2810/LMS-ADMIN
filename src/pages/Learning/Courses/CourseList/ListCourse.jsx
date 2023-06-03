import { Box, IconButton } from '@mui/material';
import {
  CustomTable,
  LightTooltip,
  CourseStatus,
  Switch,
  TableHeader,
  TitleAndLanguage,
  SecurityArea
} from 'components';
import React, { useEffect } from 'react';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';

import { useTableState } from 'hooks/useTableState';
import { CourseAPI } from 'apis/Courses';
import SearchCourse from './SearchCourse';
import { useNavigate, Link } from 'react-router-dom';
import { DEFAULT_ERROR_MESSAGE, messageDelete } from 'consts';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecurityArea } from 'store/reducers/SecurityAreaSlice';

export const StatusLabel = {
  ACTIVE: 'Đang hoạt động',
  INACTIVE: 'Không hoạt động',
  DRAFT: 'Lưu nháp'
};
const ListCourse = () => {
  const {
    data,
    loading,
    rowCount,
    pagination,
    language,
    setSearchParams,
    onChangeLanguage,
    onSelectRow,
    selected,
    onPageChange,
    onPageSizeChange,
    onDelete
  } = useTableState(CourseAPI, { name: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { securityAreas } = useSelector((state) => state.SecurityArea);
  useEffect(() => {
    if (securityAreas.length === 0) {
      dispatch(fetchSecurityArea());
    }
  }, []);
  const editItem = (item) => {
    navigate('update/' + item.id);
  };
  const updateStatusHotCourse = async (e, data) => {
    try {
      const submitData = { ...data, hot: e.target.checked };
      await CourseAPI.update(submitData);
    } catch (error) {
      toast.error(DEFAULT_ERROR_MESSAGE);
    }
  };
  const handleDelete = () => {
    const selectedModel = data.filter((c) => selected.includes(c.id));
    const includeActive = selectedModel.some((c) => c.typeActiveCourseSetting === 'ACTIVE');
    if (includeActive) {
      toast.error('Bạn không thể xóa khóa học đang hoạt động');
    } else {
      onDelete();
    }
  };

  const columns = [
    { field: 'name', headerName: 'TÊN khóa học', minWidth: 250, flex: 1 },

    {
      field: 'programCode',
      headerName: 'Mã khóa học',
      minWidth: 230,
      flex: 1,
      renderCell: (params) => {
        return (
          <LightTooltip title={params.row?.programCode}>
            <Link to={`/learning/courses-overview/${params.row.id}`}>
              {params.row?.programCode}
            </Link>
          </LightTooltip>
        );
      }
    },
    {
      field: 'status',
      headerName: 'trạng thái',
      sortable: false,
      width: 140,
      renderCell: (params) => {
        return (
          <CourseStatus status={params.row.typeActiveCourseSetting} statusLabels={StatusLabel} />
        );
      }
    },
    {
      field: 'securityAreaName',
      headerName: 'miền bảo mật',
      sortable: false,

      width: 150,
      renderCell: (item) => {
        return <SecurityArea securityCode={item?.row?.securityAreaName} />;
      }
    },
    {
      field: 'passStatus',
      headerName: 'KHÓA HỌC NỔI BẬT',
      sortable: false,

      minWidth: 170,
      renderCell: (params) => {
        if (params.row.status)
          return (
            <Switch
              defaultChecked={params.row.hot}
              onChange={(e) => updateStatusHotCourse(e, params.row)}
            />
          );
        return '';
      }
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      sortable: false,
      width: 120,
      renderCell: (item) => {
        if (item.row?.hadLearnerStudying) return null;
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
          title="DANH SÁCH KHÓA HỌC"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchCourse setSearchParams={setSearchParams} />
      </Box>

      <Box sx={{ p: 3, marginTop: 3, backgroundColor: 'white' }}>
        <TableHeader
          selected={selected}
          onDelete={handleDelete}
          onAdd={() => navigate('new')}
          deleteMessage={messageDelete.Course}
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
    </>
  );
};

export default ListCourse;
