import httpClient from 'configs/axios/http-client';

export const UserAPI = {
  signin: async (body) => {
    return httpClient.post('/users/signin', body);
  },
  getCurrentUser: () => {
    return httpClient.get('/users/user/me');
  },
  uploadSingleFile: async (body) => {
    return httpClient.post('/upload', body);
  }
};
