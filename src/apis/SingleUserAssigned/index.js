import httpClient from 'configs/axios/http-client';

const BASE_URL = '/assign-course';

export const SingleUserAssignedAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get(BASE_URL + '/user/assigned', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  }
};
