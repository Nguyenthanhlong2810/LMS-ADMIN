import httpClient from 'configs/axios/http-client';

export const NewAPI = {
  getList: async (params) => {
    delete params.language;
    // delete params.keyword;
    const { data } = await httpClient.get('/news/list', { params });
    // return { data: data.content, totalRecords: data.totalElements };
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  getDetail: (id) => {
    return httpClient.get(`/news/${id}`);
  },
  create: (request) => {
    const formData = new FormData();
    formData.append('file', request.fileAttach);
    delete request.fileAttach;
    if (request.thumbnailImg) {
      formData.append('thumbnail', request.thumbnailImg);
      delete request.thumbnailImg;
    }
    formData.append('request', JSON.stringify(request));
    return httpClient.post('/news', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (request) => {
    const formData = new FormData();
    if (request.fileAttach) {
      formData.append('attachment', request.fileAttach);
      delete request.fileAttach;
    }
    if (request.thumbnailImg) {
      formData.append('thumbnail', request.thumbnailImg);
      delete request.thumbnailImg;
    }
    formData.append('request', JSON.stringify(request));
    return httpClient.put('/news', formData);
  },
  delete: (data) => {
    return httpClient.delete('/news/bulkDelete', { data: data });
  }
};
