import httpClient from 'configs/axios/http-client';

const BASE_URL = '/course';

export const CourseAPI = {
  getSuggestCourses: (params) => {
    return httpClient.get(`${BASE_URL}/suggest-courses`, { params });
  },
  getCourse: (id) => {
    return httpClient.get(`${BASE_URL}/${id}`);
  },
  getCourseOverallData: (id) => {
    return httpClient.get(`${BASE_URL}/course-overall/${id}`);
  },
  getListLessonStructure: (id) => {
    return httpClient.get(`${BASE_URL}/course-information-structure/${id}`);
  },
  getListHistoryFilter: (params) => {
    return httpClient.get(`${BASE_URL}/course-history`, { params });
  },
  search: (params) => {
    return httpClient.post(`${BASE_URL}`, params);
  },
  getUserLearning: (params) => {
    return httpClient.get(`${BASE_URL}/user-learning`, { params });
  },
  getProcessUserCourses: (params) => {
    return httpClient.get(`${BASE_URL}/process-user-courses`, { params });
  },
  getCourseFilter: async (params) => {
    const data = await httpClient.get(`${BASE_URL}/course-filter`, { params });
    return { data: { data }, totalRecords: data.data.data.totalRecords };
  },
  getProcessCoursesUser: async (params) => {
    return httpClient.get(`${BASE_URL}/progress-courses-user`, { params });
  },
  setCompletedCourse: async (params) => {
    return httpClient.post('/assign-course/set-completed-course', { params });
  }
};
