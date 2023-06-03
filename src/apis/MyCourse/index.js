import httpClient from 'configs/axios/http-client';

const BASE_URL = '/my-course';

export const MyCourseAPI = {
  getMyCourseDetail: async (params) => {
    return httpClient.get(BASE_URL, { params });
  }
};
