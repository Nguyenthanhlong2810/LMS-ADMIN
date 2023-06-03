import httpClient from 'configs/axios/http-client';

const BASE_URL = '/assign-course';

export const AssignCourseAPI = {
  getList: async (params) => {
    const { data } = await httpClient.get(BASE_URL + '/course/assigned', { params });
    return { data: data.data.items, totalRecords: data.data.totalRecords };
  },
  create: (data) => {
    let formData = new FormData();
    try {
      if (data?.courseId) formData.append('courseId', data.courseId);
      if (data?.appUserIds) formData.append('appUserIds', data.appUserIds);
      if (data?.typeAssign) formData.append('typeAssign', data.typeAssign);
      if (data?.assignDate) formData.append('assignDate', data.assignDate.toISOString());
      if (data?.time) formData.append('time', data.time);
      if (data?.unitTime) formData.append('unitTime', data.unitTime);
      if (data?.typeTrainAgain) formData.append('typeTrainAgain', data.typeTrainAgain);
      if (data?.fromTime) formData.append('fromTime', data.fromTime.toISOString());
      if (data?.toTime) formData.append('toTime', data.toTime.toISOString());
      if (data?.trainAgainTime) formData.append('trainAgainTime', data.trainAgainTime);
      if (data?.unitTrainTime) formData.append('unitTrainTime', data.unitTrainTime);
      if (data?.file) formData.append('file', data?.file);
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
      if (data?.courseId) formData.append('courseId', data.courseId);
      if (data?.appUserIds) formData.append('appUserIds', data.appUserIds);
      if (data?.typeAssign) formData.append('typeAssign', data.typeAssign);
      if (data?.assignDate) formData.append('assignDate', data.assignDate.toISOString());
      if (data?.time) formData.append('time', data.time);
      if (data?.unitTime) formData.append('unitTime', data.unitTime);
      if (data?.typeTrainAgain) formData.append('typeTrainAgain', data.typeTrainAgain);
      if (data?.fromTime) formData.append('fromTime', data.fromTime.toISOString());
      if (data?.toTime) formData.append('toTime', data.toTime.toISOString());
      if (data?.trainAgainTime) formData.append('trainAgainTime', data.trainAgainTime);
      if (data?.unitTrainTime) formData.append('unitTrainTime', data.unitTrainTime);
      if (data?.file) formData.append('file', data?.file);
    } catch (e) {
      console.log(e);
    }
    return httpClient.put(BASE_URL, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  delete: (ids) => {
    return httpClient.put(BASE_URL + '/delete-multi', ids);
  },
  getById: (id) => {
    return httpClient.get(BASE_URL + '/' + id);
  },
  getAssignCourseById: (id) => {
    return httpClient.get(BASE_URL + '/course/' + id);
  }
};
