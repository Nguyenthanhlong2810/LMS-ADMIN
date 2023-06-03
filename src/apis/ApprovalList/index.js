import httpClient from 'configs/axios/http-client';

const BASE_URL = '/flow-config';
export const ApprovalListAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get(`${BASE_URL}/approve-list`, { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  approve: (data) => {
    return httpClient.post(`${BASE_URL}/approve`, data);
  },
  refuse: (data) => {
    return httpClient.post(`${BASE_URL}/cancel`, data);
  },
  return: (data) => {
    return httpClient.post(`${BASE_URL}/return`, data);
  }
};
