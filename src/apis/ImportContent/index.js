import httpClient from 'configs/axios/http-client';

const BASE_URL = '/content-upload';

export const ImportContentAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get(BASE_URL, { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  create: async (value, files) => {
    const formData = new FormData();
    files.forEach((c) => formData.append('file', c));
    formData.append('request', JSON.stringify(value));
    return httpClient.post(BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getById: async (id) => {
    return await httpClient.get(BASE_URL + `/${id}`);
  },
  update: (data) => {
    return httpClient.put(BASE_URL, data);
  },
  delete: (ids) => {
    return httpClient.put(BASE_URL + '/delete-multi', ids);
  }
};
