import httpClient from 'configs/axios/http-client';

export const AdminAPI = {
  uploadAdminSetting: async (files, formValue) => {
    const {
      id,
      language,
      formLoginName,
      systemPurposeName,
      titleLandingPages,
      introduceImageName1,
      introduceImageName2,
      feedbacks
    } = formValue;
    const formData = new FormData();
    files.forEach((c) => formData.append('images', c));
    titleLandingPages.forEach((c, i) =>
      formData.append(`titleLandingPages[${i}]`, JSON.stringify(c))
    );
    feedbacks.forEach((c, i) => formData.append(`feedbacks[${i}]`, JSON.stringify(c)));
    formData.append('language', language);
    formData.append('formLoginName', formLoginName);
    formData.append('systemPurposeName', systemPurposeName);
    formData.append('introduceImageName1', introduceImageName1);
    formData.append('introduceImageName2', introduceImageName2);
    if (id) {
      formData.append('id', id);
      return httpClient.put('/admin/setting', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
    return httpClient.post('/admin/setting', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  getDocument: async (language) => {
    return httpClient.get('/admin/landing-page', { params: { language } });
  },
  getCourseCategory: (language, limit = 100, offset = 1) => {
    return httpClient.get('/admin/getCourseCategory', {
      params: { language, limit, offset }
    });
  },
  getSecurityArea: (limit = 100, offset = 1) => {
    return httpClient.get('/admin/getSecurityArea', {
      params: { limit, offset }
    });
  }
};
