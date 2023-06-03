import httpClient from 'configs/axios/http-client';

const BASE_URL = '/admin/setFirstLogin';
const GET_CONFIG_URL = '/users/adminInfo';

export const ConfigFirstLoginAPI = {
  getConfigFirstLogin: () => {
    return httpClient.get('/admin/admin-setting-first-login');
  },
  createConfigFirstLogin: (params) => {
    return httpClient.post(BASE_URL, params);
  }
};
