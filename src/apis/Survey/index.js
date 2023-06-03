import httpClient from 'configs/axios/http-client';

export const SurveyAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get('/survey', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  create: (data) => {
    return httpClient.post('/survey', data);
  },
  update: (data) => {
    return httpClient.put('/survey/update-survey', data);
  },
  delete: (ids) => {
    return httpClient.delete('/survey', { data: ids });
  },
  getById: (id) => {
    return httpClient.get(`/survey/${id}`);
  }
};
