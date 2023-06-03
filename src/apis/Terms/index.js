import httpClient from 'configs/axios/http-client';

const BASE_URL = '/terms';

export const TermsAPI = {
  getAllTerms: (params) => {
    return httpClient.get(BASE_URL, { params });
  },
  createTerms: (params) => {
    return httpClient.post(BASE_URL, params);
  },
  updateTerms: (id, data) => {
    return httpClient.put(BASE_URL + `/${id}`, data);
  }
};
