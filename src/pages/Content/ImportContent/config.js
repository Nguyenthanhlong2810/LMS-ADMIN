export const TitleImportContent = {
  addContent: 'Thêm nội dung mới',
  editContent: 'Chỉnh sửa nội dung'
};

export const CONTENT_TYPE = {
  DOCUMENT: 'DOCUMENT',
  VIDEO: 'VIDEO',
  AICC: 'AICC',
  SCROM: 'SCROM'
};

export const LIST_TYPE_CONTENT = [
  { label: 'Document', value: CONTENT_TYPE.DOCUMENT },
  { label: 'Video', value: CONTENT_TYPE.VIDEO },
  { label: 'AICC', value: CONTENT_TYPE.AICC },
  { label: 'SCROM', value: CONTENT_TYPE.SCROM }
];

export const defaultValue = {
  type: 'DOCUMENT',
  nameContent: '',
  timeLong: '',
  code: '',
  nameSecurityArea: ''
};

export const MAX_SIZE = 200; //MB

export const ACCEPT_DOCUMENT = [
  '.pdf',
  '.docx',
  '.doc',
  '.rtf',
  '.html',
  '.htm',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx'
];
export const ACCEPT_VIDEO = ['.mp4'];
export const ACCEPT_AICC_SCROM = ['.zip', '.rar'];

export const DOCUMENT_ACCEPT = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
  'application/rtf',
  'text/html',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation'
];
export const VIDEO_ACCEPT = ['video/mp4'];
export const AICC_SCROM_ACCEPT = [
  'application/zip',
  'application/x-zip-compressed',
  'application/vnd.rar',
  ''
];

export const EXAMPLE_PAGE = 'Trang';
export const EXAMPLE_TIME = '(eg, 3h 4m 23s)';
