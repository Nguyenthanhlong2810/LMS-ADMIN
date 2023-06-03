import httpClient from 'configs/axios/http-client';

const BASE_URL = '/note';

export const NoteAPI = {
  getList: async (params) => {
    // const data = await httpClient.get(BASE_URL, { params });
    // return { data, totalRecords: data.data?.totalRecords };
    return httpClient.get(BASE_URL, { params });
  },
  create: (data) => {
    return httpClient.post(BASE_URL, data);
  },
  update: (data) => {
    return httpClient.put(BASE_URL, data);
  },
  delete: (params) => {
    return httpClient.delete(BASE_URL, { params });
  }
};
