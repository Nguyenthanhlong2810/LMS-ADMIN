export const QUIZ_TYPE_VALUE = {
  oneChoice: 'TRAC_NGHIEM_MOT_DAP_AN',
  multiChoice: 'TRAC_NGHIEM_NHIEU_DAP_AN',
  yesNo: 'DUNG_SAI',
  order: 'SAP_XEP_THEO_THU_TU',
  fill: 'DIEN_VAO_CHO_TRONG'
};
const { oneChoice, multiChoice, yesNo, order, fill } = QUIZ_TYPE_VALUE;
export const QUESTION_TYPES = {
  [oneChoice]: { value: oneChoice, label: 'Trắc nghiệm một đáp án' },
  [multiChoice]: { value: multiChoice, label: 'Trắc nghiệm nhiều đáp án' },
  [yesNo]: { value: yesNo, label: 'Trắc nghiệm đúng sai' },
  [order]: { value: order, label: 'Sắp xếp theo thứ tự' },
  [fill]: { value: fill, label: 'Điền vào chỗ trống' }
};
export const YES_NO_ANSWER = [
  { option: 'A', contentOption: 'Đúng' },
  { option: 'B', contentOption: 'Sai' }
];
export const LIST_ANSWER_DEFAULT = [
  { option: 'A' },
  { option: 'B' },
  { option: 'C' },
  { option: 'D' }
];
export const multiAnswerInQuestion = [
  QUIZ_TYPE_VALUE.multiChoice,
  QUIZ_TYPE_VALUE.oneChoice,
  QUIZ_TYPE_VALUE.order
];
