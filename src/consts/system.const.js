export const LOCAL_STORE = {
  TOKEN: '@@TOKEN'
};

export const IMAGE_ACCEPT = ['image/jpg', 'image/jpeg', 'image/png'];
export const VIDEO_ACCEPT = ['video/mp4', 'video/x-m4v', 'video/*'];
// export const VIDEO_ACCEPT = 'video/mp4,video/x-m4v,video/*';
export const DEFAULT_PAGESIZE = 25;
export const PAGESIZE_OPTIONS = [10, 25, 50, 100];
export const FAQ_STATUS = [
  { value: 'APPLY', label: 'Áp dụng' },
  { value: 'NOT_APPLY', label: 'Không áp dụng' }
];
export const COURSE_STATUS = [
  { value: 'ACTIVE', label: 'Đang hoạt động' },
  { value: 'INACTIVE', label: 'Không hoạt động' },
  { value: 'DRAFT', label: 'Lưu nháp' }
];
export const PROGRAM_TYPE = [
  { value: 'COURSE', label: 'Khoá học' },
  { value: 'EVENT', label: 'Sự kiện' }
];
export const APPROVE_STATUS = [
  { value: 'PENDING', label: 'Chờ phê duyệt' },
  { value: 'APPROVAL', label: 'Chấp thuận' },
  { value: 'REJECT', label: 'Từ chối' },
  { value: 'RETURN', label: 'Gửi trả' }
];
export const TOPIC_STATUS = {
  apply: 'APPLY',
  notApply: 'NOT_APPLY'
};
export const ASSIGN_TYPE = [
  { value: 'COMPULSORY', label: 'Bắt buộc' },
  { value: 'VOLUNTARY', label: 'Tùy chọn' }
];
export const UNIT_TIME = [
  { value: 'DAY', label: 'Ngày' },
  { value: 'WEEK', label: 'Tuần' },
  { value: 'MONTH', label: 'Tháng' },
  { value: 'YEAR', label: 'Năm' }
];
export const UNIT_TRAINING_TIME = [
  { value: 'DAY', label: 'Ngày' },
  { value: 'MONTH', label: 'Tháng' },
  { value: 'YEAR', label: 'Năm' }
];
export const TRAINING_AGAIN_TYPE = [
  { value: 'ASSIGN_TIME', label: 'Ngày gán' },
  { value: 'START_COURSE_TIME', label: 'Ngày bắt đầu khóa học' }
];
export const URL_TEMPLATE =
  'https://cmcglobalcompany.sharepoint.com/:x:/s/DU21/ESphhKByuGROqu23VgNOh74BiCFASea1bkTwxCsPkCE9LA?e=8GqG7C';

export const NO_CORRESPONDING_DATA = 'Không tồn tại dữ liệu tương ứng';
export const NO_EMPTY_DATA = 'Không được để trống';
export const APPLY_LABEL = {
  apply: 'Đã sử dụng',
  notApply: 'Chưa sử dụng'
};
export const FORMAT = ['PDF', 'jpeg', 'png', 'jpg'];

export const MIN_DIMENSIONS_IMAGE = {
  width: 1440,
  height: 580
};
