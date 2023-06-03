import httpClient from 'configs/axios/http-client';

const BASE_URL = '/flow-config';
export const ApprovalConfigurationAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get(BASE_URL, { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  create: (data) => {
    return httpClient.post(BASE_URL, data);
  },
  update: (data) => {
    return httpClient.put(`${BASE_URL}/update-survey`, data);
  },
  delete: (data) => {
    return httpClient.put(`${BASE_URL}/delete-multi`, data);
  },
  getById: (id) => {
    return httpClient.get(`${BASE_URL}/${id}`);
  }
};
