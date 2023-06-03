import httpClient from 'configs/axios/http-client';

export const CategoryTrainingAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get('/category', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  getCategoryParent: (parentName) => {
    return httpClient.get('/category/auto-complete', { params: { parentName } });
  },
  create: (data) => {
    return httpClient.post('/category/create-category-training', data);
  },
  update: (data) => {
    return httpClient.put('/category/update-category-training', data);
  },
  delete: (ids) => {
    return httpClient.delete('/category/delete-category-training', { data: ids });
  },
  getAll: () => {
    return httpClient.get('/category/list');
  }
};
