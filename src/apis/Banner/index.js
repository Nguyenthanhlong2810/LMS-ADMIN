import httpClient from 'configs/axios/http-client';

const BASE_URL = '/banner';
export const BannerAPI = {
  getList: async (params) => {
    const data = await httpClient.get(BASE_URL, { params });
    return data;
  },
  create: (data) => {
    let formData = new FormData();
    try {
      if (data?.attachmentLink) formData.append('attachmentLink', data.attachmentLink);
      if (data?.imgTime) formData.append('imgTime', data.imgTime);
      if (data?.thumbnails) {
        for (let i = 0; i < data?.thumbnails.length; i++) {
          data.thumbnails[i] && data.thumbnails[i] instanceof File
            ? formData.append(`thumbnails[${i}]`, data.thumbnails[i])
            : formData.append(`thumbnails[${i}]`, JSON.stringify(data.thumbnails[i]));
        }
      }
      if (data?.type) formData.append('type', data.type);
    } catch (e) {
      console.log(e);
    }

    return httpClient.post(BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  update: (data) => {
    let formData = new FormData();
    try {
      if (data?.attachmentLink) formData.append('attachmentLink', data.attachmentLink);
      if (data?.attachmentName) formData.append('attachmentName', data.attachmentName);
      if (data?.imgTime) formData.append('imgTime', data.imgTime);
      if (data?.thumbnails) {
        // for (let i = 0; i < data?.thumbnails.length; i++) {
        //   data.thumbnails[i] && data.thumbnails[i] instanceof File
        //     ? formData.append(`thumbnails[${i}]`, data.thumbnails[i])
        //     : formData.append(`thumbnails[${i}]`, JSON.stringify(data.thumbnails[i]));
        // }
        let num = 0;
        data.thumbnails.reduce((prev, cur) => {
          if (cur) {
            const a = [
              ...prev,
              cur instanceof File
                ? formData.append(`thumbnails[${num}]`, cur)
                : formData.append(`thumbnails[${num}]`, JSON.stringify(cur))
            ];
            ++num;
            return a;
          }

          return prev;
        }, []);
      }

      if (data?.type) formData.append('type', data.type);
    } catch (e) {
      console.log(e);
    }

    return httpClient.put(BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (ids) => {
    return httpClient.delete(BASE_URL, { data: ids });
  }
};
