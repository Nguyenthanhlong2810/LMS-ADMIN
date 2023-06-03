import * as yup from 'yup';

export const schema = yup.object({
  nameContent: yup.string().nullable().trim().required(),
  contentUploads: yup.array().required().min(1, 'Yêu cầu ít nhất 1 nội dung'),
  surveySettings: yup.array().of(
    yup.object().shape({
      assignAfter: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive()
        .integer()
        .required(),
      allowNumberDay: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .positive()
        .integer()
        .required()
    })
  )
});
