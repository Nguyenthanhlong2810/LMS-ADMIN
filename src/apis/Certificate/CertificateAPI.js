import httpClient from 'configs/axios/http-client';

const BASE_URL = '/myCertificate';

export const CertificateAPI = {
  getList: (params) => {
    return httpClient.get(`${BASE_URL}`, { params });
  },
  getDetail: (params) => {
    return httpClient.get(`${BASE_URL}/detail`, { params });
  },
  download: (params) => {
    return httpClient.get(`${BASE_URL}/download/detail`, { params, responseType: 'arraybuffer' });
  },
  downloadMultiple: (params) => {
    return httpClient.get(`${BASE_URL}/download-multi`, { params, responseType: 'arraybuffer' });
  }
};
