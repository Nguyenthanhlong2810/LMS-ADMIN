import ValidationMessage from 'consts/validation.const';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: ValidationMessage.mixed.required
  }
});

export const schema = yup.object({
  type: yup.string().required().matches(/\S/),
  nameContent: yup.string().required(),
  timeLong: yup.string().trim().required(),
  code: yup.string().trim().required().max(20),
  nameSecurityArea: yup.string().required()
});
