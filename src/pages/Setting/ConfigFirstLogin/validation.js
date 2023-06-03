import * as yup from 'yup';
export const schema = yup.object({
  experiences: yup.array().of(yup.string().max(50, 'Mỗi từ khóa tối đa 50 ký tự')).min(1),
  skills: yup.array().of(yup.string().max(50, 'Mỗi từ khóa tối đa 50 ký tự')).min(1),
  skip: yup.bool()
});
