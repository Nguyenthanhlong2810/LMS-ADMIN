import httpClient from 'configs/axios/http-client';

export const QuestionBankAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get('/quiz', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  getDetail: (id) => {
    return httpClient.get(`/quiz/${id}`);
  },
  create: (data) => {
    return httpClient.post('/quiz', data);
  },
  update: (data) => {
    return httpClient.put('/quiz', data);
  },
  delete: (ids) => {
    return httpClient.put('/quiz/delete-multi', ids);
  }
};
