import httpClient from 'configs/axios/http-client';

export const TopicAPI = {
  getList: async (params) => {
    params.key = params.language;
    params.offset = params.pageNo;
    params.limit = params.pageSize;
    delete params.language;
    delete params.pageNo;
    delete params.pageSize;

    const { data } = await httpClient.get('/topic', { params });
    return { data: data.content, totalRecords: data.totalElements };
  },
  create: (data) => {
    return httpClient.post('/topic', data);
  },
  update: (data) => {
    return httpClient.put(`/topic/${data.id}`, data);
  },
  delete: (data) => {
    return httpClient.delete('/topic', { data: data });
  }
};
