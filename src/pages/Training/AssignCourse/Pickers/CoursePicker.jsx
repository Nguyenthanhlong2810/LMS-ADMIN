import { Autocomplete, TextField, InputAdornment } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CourseAPI } from 'apis/Courses';
import SearchIcon from '@mui/icons-material/Search';
import { debounce } from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { useContext } from 'react';

export default function CoursePicker({
  value,
  onChange,
  error,
  helperText,
  placeholder,
  disabled,
  courseId
}) {
  const [courses, setCourses] = useState([]);
  const [courseVal, setCourseVal] = useState();
  const getCoursesById = async (id) => {
    try {
      const { data } = await CourseAPI.getById(id);
      setCourses([data.data]);
      setCourseVal(data.data);
    } catch (error) {
      setCourses([]);
    }
  };

  useEffect(() => {
    if (courseId) getCoursesById(courseId);
  }, [courseId]);

  // useEffect(() => {
  //   if (value) {
  //     if (getListTimeout.current) {
  //       clearTimeout(getListTimeout.current);
  //     }
  //     getCoursesById(value);
  //   } else {
  //     getListTimeout.current = setTimeout(() => {
  //       getListCourse();
  //     }, 500);
  //   }

  //   return () => {
  //     if (getListTimeout.current) {
  //       clearTimeout(getListTimeout.current);
  //     }
  //   };
  // }, [value]);

  const val = useMemo(() => courses.find((c) => c.id === value), [courses, value]);

  const getListCourse = async (searchPattern = '') => {
    try {
      const { data } = await CourseAPI.getList({
        pageSize: 50,
        pageNo: 1,
        language: 'vn',
        name: searchPattern,
        status: true
      });
      setCourses(data);
      setCourseVal({ name: searchPattern });
    } catch (error) {
      setCourses([]);
    }
  };

  const onSearchCourses = useCallback(debounce(getListCourse, 500), []);

  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={courses}
      getOptionLabel={(option) => option?.name}
      selectOnFocus
      clearOnBlur
      disabled={disabled}
      onOpen={() => {
        onSearchCourses();
      }}
      onInputChange={(_, val) => onSearchCourses(val)}
      value={courseVal || { name: '' }}
      placeholder={placeholder}
      onChange={(_, val) => onChange(val?.id)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={error}
          helperText={helperText}
          onChange={(e) => {
            onSearchCourses(e.target.value);
          }}
          InputProps={{
            ...params.InputProps,
            type: 'search',
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  );
}
