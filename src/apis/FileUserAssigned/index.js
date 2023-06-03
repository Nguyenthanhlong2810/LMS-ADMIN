import httpClient from 'configs/axios/http-client';

const BASE_URL = '/assign-course';

export const FileUserAssignedAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get(BASE_URL + '/file', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  }
};
