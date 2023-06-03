export const defaultValue = {
  id: undefined,
  name: '',
  language: 'vn',
  categoryTrainingName: undefined,
  programName: undefined,
  programYear: undefined,
  programKey: undefined,
  type: 'offer',
  fileNameOfferBy: undefined,
  fileNameProvideBy1: undefined,
  fileNameProvideBy2: undefined,
  fileNameProvideBy3: undefined,
  courseTypeName: undefined,
  trainingTypeName: undefined,
  passStatusName: undefined,
  tagsList: [],
  summary: undefined,
  detail: undefined,
  fileNamePreview: undefined,
  requirementCoursesName: [{ value: '' }],
  securityAreaName: undefined,
  skillName: undefined,
  experienceName: undefined,
  selfRegister: true,
  managerRegister: false,
  requireApproval: 'true',
  approveName: undefined,
  requireCancel: 'true',
  cancelName: undefined,
  rate: true,
  status: true,
  hadLearnerStudying: true
  // assignTypeName: 'optional',
  // assignDoneName: undefined,
  // assignNum: undefined,
  // assignBaseName: undefined,
  // assignAgainName: undefined,
  // assignNumAgain: undefined,
  // assignBaseAgainName: undefined
};

export const ASSIGN_CONFIG = {
  TIME_METRICS: [
    {
      name: 'Ngày gán',
      value: 'Ngày'
    },
    {
      name: 'Ngày bắt đầu khóa học',
      value: 'Ngày bắt đầu khóa học'
    }
  ],
  TIME_UNITS: [
    {
      name: 'Ngày',
      value: 'Ngày'
    },
    {
      name: 'Tháng',
      value: 'Tháng'
    },
    {
      name: 'Năm',
      value: 'Năm'
    }
  ]
};

export const COURSE_TYPE = {
  OFFER: 'offer',
  PROVIDE: 'provide'
};

export const LEVELS = {
  vn: ['Mới bắt đầu', 'Trung cấp', 'Nâng cao', 'Tất cả các cấp độ'],
  en: ['Beginner', 'Intermediate', 'Advanced', 'All level']
};

export const ACCEPT_IMAGES = ['jpg', 'png', 'jpeg'];
export const MAX_SIZE_IMAGE = 15; //MB
export const ACCEPT_VIDEO = ['mp4'];
export const MAX_SIZE_VIDEO = 200; //MB
export const MAX_LENGTH = {
  name: 140,
  tagsList: 5,
  summary: 300,
  detail: 5000,
  requirements: 6,
  requirementItem: 100
};
