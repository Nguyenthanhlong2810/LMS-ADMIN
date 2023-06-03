import * as yup from 'yup';

export const schema = yup.object({
  examCode: yup.string().required().matches(/\S/),
  examType: yup.string().required(),
  domain: yup.string().required(),
  examTitle: yup.string().max(200).required().matches(/\S/),
  description: yup.string().max(200),
  resultDisplay: yup.string(),
  markPass: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .required()
});
