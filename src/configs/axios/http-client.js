import config from 'configs/axios/config.const';
import { LOCAL_STORE } from 'consts/system.const';

import axios from 'axios';
import { localStorageHelper } from 'helpers';

import { DEFAULT_ERROR_MESSAGE, HTTP_STATUS } from 'consts';

const configAxios = {
  baseURL: config.HOST_API,
  headers: {
    'Content-Type': 'application/json'
  }
};
const httpClient = axios.create(configAxios);

httpClient.interceptors.request.use(
  async (config) => {
    if (localStorageHelper.isLogin()) {
      config.headers['Authorization'] = `Bearer ${localStorageHelper.getItem(LOCAL_STORE.TOKEN)}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalConfig = error.config;
    if (error.response) {
      switch (error.response.status) {
        case HTTP_STATUS.StatusUnauthorized:
        case HTTP_STATUS.StatusForbidden:
          await localStorageHelper.removeItem(LOCAL_STORE.TOKEN);
          window.location.href = '/';
          return Promise.reject(error);
        // case HTTP_STATUS.StatusNotFound:
        // case HTTP_STATUS.StatusUnprocessableEntity:
        //   return Promise.resolve({ data: null });
        default:
          return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
