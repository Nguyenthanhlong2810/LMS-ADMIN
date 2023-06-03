import httpClient from 'configs/axios/http-client';

export const ExamAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get('/exam/list-exam', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  getDetail: (id) => {
    return httpClient.get('/exam', { params: { id } });
  },
  create: (data) => {
    return httpClient.post('/exam', data);
  },
  update: (data) => {
    return httpClient.put('/exam', data);
  },
  delete: (ids) => {
    return httpClient.delete('/exam/bulkDelete', { data: ids });
  }
};
