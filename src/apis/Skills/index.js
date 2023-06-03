import httpClient from 'configs/axios/http-client';

export const SkillsAPI = {
  getAll: (name) => {
    return httpClient.get('/skills/all', { params: { name } });
  },
  getByName: (name) => {
    return httpClient.get('/skills/findByNameAndOffsetAndLimit', {
      params: { name, offset: 1, limit: 100 }
    });
  }
};
