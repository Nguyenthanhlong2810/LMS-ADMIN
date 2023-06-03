import httpClient from 'configs/axios/http-client';

const BASE_URL = '/course';
const SETTING_BASE_URL = '/course-setting';

export const CourseAPI = {
  getList: async (params) => {
    params.offset = params.pageNo - 1;
    params.limit = params.pageSize;
    delete params.pageNo;
    delete params.pageSize;
    // const param = { language: 'vn', limit: 10, offset: 1, name: 'a', status: true };
    const { data } = await httpClient.post('/course', params);
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  create: (value, files) => {
    const formData = new FormData();
    files.forEach((c) => formData.append('files', c));
    formData.append('metafiles', JSON.stringify(value));
    return httpClient.post(BASE_URL + '/create', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (value, files) => {
    const formData = new FormData();
    if (files) {
      files.forEach((c) => formData.append('files', c));
    }
    formData.append('metafiles', JSON.stringify(value));
    return httpClient.patch(BASE_URL + '/update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (ids) => {
    return httpClient.delete('/course/deleteMulti', { data: { ids } });
  },
  getById: (id) => {
    return httpClient.get(`${BASE_URL}/${id}`);
  },
  getCourseStructure: (courseId) => {
    return httpClient.get(BASE_URL + '/course-structure/' + courseId);
  }
};

export const CourseSettingApi = {
  get: (courseId) => {
    return httpClient.get(SETTING_BASE_URL + '/' + courseId);
  },
  updateCourseSetting: (data) => {
    return httpClient.post(SETTING_BASE_URL, data);
  },
  updateCourseStructureSetting: (data) => {
    return httpClient.post(SETTING_BASE_URL + '/activate-structure', data);
  }
};
