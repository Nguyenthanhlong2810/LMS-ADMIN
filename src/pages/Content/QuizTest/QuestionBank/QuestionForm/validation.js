import * as yup from 'yup';
import { multiAnswerInQuestion } from '../questionBank.const';

export const schema = yup.object({
  codeManage: yup.string().required().matches(/\S/),
  type: yup.string().required(),
  mark: yup
    .number()
    .nullable()
    .transform((value) => (isNaN(value) ? undefined : value))
    .positive()
    .integer()
    .required(),
  nameSecurityArea: yup.string().required(),
  description: yup.string().trim().max(200),
  contentQuestion: yup.string().required().matches(/\S/),
  mixAnswers: yup.bool(),
  responseCorrect: yup.string().nullable(),
  // .test({
  //   name: 'checkIncorrect',
  //   message:
  //     'Phản hồi cầu trả lời chính xác và phản hồi câu trả lời không chính xác phải khác nhau',
  //   test: function (value, testContext) {
  //     if (value === testContext.parent.responseIncorrect) {
  //       return false;
  //     }
  //     return true;
  //   }
  // })
  responseIncorrect: yup.string().nullable(),
  // .test({
  //   name: 'checkcorrect',
  //   message:
  //     'Phản hồi cầu trả lời chính xác và phản hồi câu trả lời không chính xác phải khác nhau',
  //   test: function (value, testContext) {
  //     if (value === testContext.parent.responseCorrect) {
  //       return false;
  //     }
  //     return true;
  //   }
  // })
  correctAnswers: yup.string().max(500).required().matches(/\S/),
  answers: yup
    .array()
    .when('type', {
      is: (val) => multiAnswerInQuestion.includes(val),
      then: (schema) => schema.min(2, 'Tối thiểu 2 câu trả lời')
    })
    .of(
      yup.object().shape({
        option: yup.string(),
        contentOption: yup.string().ensure().max(1000).required().matches(/\S/)
      })
    )
});
