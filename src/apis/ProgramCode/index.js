import httpClient from 'configs/axios/http-client';

export const ProgramAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get('/program', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  getListKey: () => {
    return httpClient.get('/program/get-list-key');
  },
  create: (data) => {
    return httpClient.post('/program/create-program', data);
  },
  update: (data) => {
    return httpClient.put('/program/update-program', data);
  },
  delete: (ids) => {
    return httpClient.delete('/program/delete-program', { data: ids });
  },
  autoComplete: async (params) => {
    const { data } = await httpClient.get('/program/auto-complete', { params });
    return data;
  },
  downloadTemplate: () => {
    return httpClient.post('/program/download-form', undefined, {
      responseType: 'arraybuffer'
    });
  },
  downloadExcel: (params) => {
    return httpClient.get('/program/download/excel', {
      params,
      responseType: 'arraybuffer'
    });
  },
  uploadExcel: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return httpClient.post('/program/import/excel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  }
};
