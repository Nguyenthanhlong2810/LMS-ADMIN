import httpClient from 'configs/axios/http-client';

const BASE_URL = '/my-course';

export const MyCourseAPI = {
  getCourseDetail: (params) => {
    return httpClient.get(`${BASE_URL}`, { params });
  },
  addLearningHistory: (data) => {
    return httpClient.post(`${BASE_URL}/add-history`, data);
  },
  downloadFile: (params) => {
    return httpClient.get(`${BASE_URL}/server/download`, { params, responseType: 'arraybuffer' });
  }
};
