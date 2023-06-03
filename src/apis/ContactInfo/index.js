import httpClient from 'configs/axios/http-client';

const BASE_URL = '/contactInfo';

export const ContactInfoAPI = {
  getContactInfo: (params) => {
    return httpClient.get(BASE_URL, { params });
  },
  getContactInfoById: (id, params) => {
    return httpClient.get(`${BASE_URL}/${id}`, { params });
  },
  createContactInfo: (params) => {
    return httpClient.post(BASE_URL, params);
  },
  updateContactInfo: (id, data) => {
    return httpClient.put(BASE_URL + `/${id}`, data);
  }
};
