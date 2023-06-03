import { Button, Radio } from '@mui/material';
import { CourseStatus, CustomTable } from 'components';
import React, { useState } from 'react';
import Title from 'components/Title/Title';
import { useTableState } from 'hooks/useTableState';
import { CourseAPI } from 'apis/Courses';
import SearchCourse, { defaultSearchCourseValues } from './SearchCourse';
import AddIcon from '@mui/icons-material/Add';
import { StatusLabel } from 'pages/Learning/Courses/CourseList/ListCourse';

const ChooseCourseModal = ({ onClose }) => {
  const { data, loading, rowCount, pagination, setSearchParams, onPageChange, onPageSizeChange } =
    useTableState(CourseAPI, defaultSearchCourseValues);

  const [selectionModel, setSelectionModel] = useState(undefined);

  const columns = [
    {
      field: 'radiobutton',
      headerName: '',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Radio
          checked={selectionModel?.id === params.id}
          value={params.id}
          onChange={() => setSelectionModel(params.row)}
        />
      )
    },
    {
      field: 'programCode',
      headerName: 'Mã khóa học',
      minWidth: 230,
      flex: 1,
      renderCell: (params) => {
        return params.row.program?.programCode;
      }
    },
    {
      field: 'name',
      headerName: 'Tên khóa học',
      minWidth: 250,
      flex: 1
    },
    {
      field: 'lastName',
      headerName: 'Loại khóa học',
      width: 250,
      renderCell: (params) => {
        return params.row.courseType?.name;
      }
    },
    {
      field: 'status',
      headerName: 'trạng thái',
      width: 150,
      renderCell: (params) => {
        return (
          <CourseStatus status={params.row.typeActiveCourseSetting} statusLabels={StatusLabel} />
        );
      }
    }
  ];
  const onSelectProgram = () => {
    onClose(selectionModel);
  };
  return (
    <div>
      <SearchCourse setSearchParams={setSearchParams} />
      <Title>kết quả tìm kiếm danh sách khóa học</Title>
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
        disableSelectionOnClick
        selectionModel={selectionModel}
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
    </div>
  );
};

export default ChooseCourseModal;
