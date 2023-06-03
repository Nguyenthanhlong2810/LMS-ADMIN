import httpClient from 'configs/axios/http-client';

const BASE_URL = '/lesson-structure';

export const LessonStructureAPI = {
  sortStructure: (data) => {
    return httpClient.put(BASE_URL + '/sort-structure', data);
  },
  delete: (ids) => {
    let deleteIds = !Array.isArray(ids) ? [ids] : ids;
    return httpClient.put(BASE_URL + '/delete-multi', deleteIds);
  },

  create: (data) => {
    return httpClient.post(BASE_URL, data);
  },
  update: (data) => {
    return httpClient.put(BASE_URL, data);
  },
  getById: (id) => {
    return httpClient.get(BASE_URL + '/' + id);
  },
  getLessonById: (id) => {
    return httpClient.get(`/lesson-structure/${id}`);
  }
};
