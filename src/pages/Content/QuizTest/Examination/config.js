import dayjs from 'dayjs';

export const limitCharacter = 200;
export const EXAM_TYPES = ['Bài kiểm tra ngắn', 'Bài thi'];
export const EXAM_RESULT_DISPLAY = [
  { value: 'displayResult', label: 'Hiển thị kết quả' },
  { value: 'displayResultAnswer', label: 'Hiển thị kết quả và đáp án' },
  { value: 'displayNothing', label: 'Không hiển thị gì' }
];
export const defaultValue = {
  examType: EXAM_TYPES[1],
  resultDisplay: EXAM_RESULT_DISPLAY[0].value,
  examQuizId: [],
  domain: '',
  markPass: 90,
  timeWork: dayjs().hour(0).minute(0).second(0)
};
