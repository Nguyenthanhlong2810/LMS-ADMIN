import { messageWarning } from 'consts';
import * as yup from 'yup';
import { MAX_LENGTH } from './config';

export const schema = yup.object({
  name: yup.string().trim().required().max(MAX_LENGTH.name),
  categoryTrainingName: yup.string().nullable().required(),
  programName: yup.string().nullable().required(),
  courseTypeName: yup.string().nullable().required(),
  trainingTypeName: yup.string().nullable().required(),
  passStatusName: yup.string().nullable().required(),
  tagsList: yup
    .array()
    .of(yup.string())
    .required()
    .max(MAX_LENGTH.tagsList)
    .min(1, 'Tối thiểu 1 thẻ và tối đa 5 thẻ'),
  summary: yup.string().trim().max(MAX_LENGTH.summary).required(),
  detail: yup.string().trim().max(MAX_LENGTH.detail),
  // fileNamePreview: yup.string().required(),
  requirementCoursesName: yup.array().required().max(MAX_LENGTH.requirements),
  securityAreaName: yup.string().nullable().required(),
  skillName: yup.array().min(1, 'Trường này không thể bỏ trống').required(),
  experienceName: yup.string().nullable().required(),
  requireApproval: yup.boolean(),
  requireCancel: yup.boolean(),
  approveName: yup
    .string()
    .nullable()
    .when('requireApproval', {
      is: true,
      then: yup.string().nullable().required('Bạn cần chọn người phê duyệt')
    }),
  cancelName: yup
    .string()
    .nullable()
    .when('requireCancel', {
      is: true,
      then: yup.string().nullable().required('Bạn cần chọn người phê duyệt')
    })
});
