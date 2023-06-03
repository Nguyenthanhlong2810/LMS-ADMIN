import httpClient from 'configs/axios/http-client';
export const QuestionAPI = {
  getList: async (params) => {
    params.key = params.language;
    params.offset = params.pageNo;
    params.limit = params.pageSize;
    delete params.language;
    delete params.pageNo;
    delete params.pageSize;
    const { data } = await httpClient.get('/question', { params });
    return { data: data.content, totalRecords: data.totalElements };
  },
  getDetail: (id) => {
    return httpClient.get(`/question/${id}`);
  },
  create: (data) => {
    return httpClient.post('/question', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (data) => {
    return httpClient.put('/question', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (data) => {
    return httpClient.delete('/question', { data: data });
  }
};
