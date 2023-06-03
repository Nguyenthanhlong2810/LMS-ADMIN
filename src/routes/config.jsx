import { ROUTE_PATH } from 'consts';
import React from 'react';

const AboutPage = React.lazy(() => import('../pages/About/About'));
const NotFoundPage = React.lazy(() => import('../pages/NotFound/NotFound'));
const Home = React.lazy(() => import('../pages/Home/Home'));
const SettingIntroPage = React.lazy(() => import('../pages/Setting/IntroPage/IntroPage'));
const QuestionsFAQ = React.lazy(() => import('../pages/Setting/FAQ/Questions/ListQuestion'));
const ListTopic = React.lazy(() => import('../pages/Setting/FAQ/Topic/ListTopic'));
const Login = React.lazy(() => import('../pages/Login/Login'));
const TermsOfUse = React.lazy(() => import('../pages/Setting/TermsOfUse/TermsOfUse'));
const ContactInfo = React.lazy(() => import('../pages/Setting/ContactInfo/ContactInfo'));
const Banner = React.lazy(() => import('../pages/Setting/Banner'));
const News = React.lazy(() => import('../pages/News/News'));
const ConfigFirstLogin = React.lazy(() =>
  import('../pages/Setting/ConfigFirstLogin/ConfigFirstLogin')
);
const CourseForm = React.lazy(() => import('../pages/Learning/Courses/CourseForm/CourseForm'));
const ProgramCodeScreen = React.lazy(() => import('../pages/Learning/ProgramCode/ProgramCode'));
const CategoryTraining = React.lazy(() =>
  import('../pages/Learning/CategoryTraining/CategoryTraining')
);
const ListCourse = React.lazy(() => import('../pages/Learning/Courses/CourseList/ListCourse'));
const CourseOverview = React.lazy(() => import('../pages/Learning/CourseOverview/CourseOverview'));
const CourseDetail = React.lazy(() =>
  import('../pages/Learning/Courses/CourseDetail/CourseDetail')
);
const Survey = React.lazy(() => import('../pages/Content/Survey/SurveyList'));
const CreateUpdateSurvey = React.lazy(() =>
  import('./../pages/Content/Survey/SurveyForm/CreateUpdateSurvey')
);
const LessonContentForm = React.lazy(() =>
  import('../pages/Learning/Courses/LessonStructure/Form')
);
// const UpdateLessonContent = React.lazy(() => import('../pages/Content/Survey/LessonContentForm'));
const CreateUpdateQuestion = React.lazy(() =>
  import('../pages/Content/QuizTest/QuestionBank/CreateUpdateQuestion')
);
const ExaminationForm = React.lazy(() =>
  import('../pages/Content/QuizTest/Examination/CreateUpdateExamination')
);
const ExaminationOverview = React.lazy(() =>
  import('../pages/Content/QuizTest/Examination/ExaminationOverview')
);
const ImportContentList = React.lazy(() =>
  import('../pages/Content/ImportContent/ImportContentList/ImportContentList')
);
const ImportContentForm = React.lazy(() =>
  import('../pages/Content/ImportContent/ImportContentForm/ImportContentForm')
);
const LessonStructure = React.lazy(() =>
  import('pages/Learning/Courses/LessonStructure/List/LessonStructure')
);
const ActivationAndSetting = React.lazy(() =>
  import('../pages/Learning/Courses/ActivationAndSetting/ActivationAndSetting')
);
const ApprovalCourseInternal = React.lazy(() =>
  import('../pages/Learning/ApproveCourse/ApprovalConfiguaration/Internal')
);
const ApprovalListInternal = React.lazy(() =>
  import('../pages/Learning/ApproveCourse/ApprovalList/Internal')
);
const ApprovalCourseAddNew = React.lazy(() =>
  import('../pages/Learning/ApproveCourse/AddNewProgram')
);
const AssignCourse = React.lazy(() => import('../pages/Training/AssignCourse/AssignCourseList'));
const AssignCourseAction = React.lazy(() =>
  import('../pages/Training/AssignCourse/AssignCourseForm')
);
const UserAssigned = React.lazy(() => import('../pages/Learning/Courses/UserAssigned'));
// const Profile = React.lazy(() => import('pages/Profile/Profile'));
const CoursePreview = React.lazy(() => import('../pages/Learning/Courses/CoursePreview/index'));
const QuestionBank = React.lazy(() =>
  import('../pages/Content/QuizTest/QuestionBank/QuestionBank')
);
const Examination = React.lazy(() => import('../pages/Content/QuizTest/Examination/Examination'));

export const routesList = [
  { component: NotFoundPage, path: '*', isProtected: false },
  { component: Login, path: 'admin/login', isProtected: false }
];
export const commonLayoutRoutesList = [
  { component: Home, path: '/', isProtected: true },
  { component: AboutPage, path: '/about', isProtected: true },
  { component: SettingIntroPage, path: '/setting/intro-page', isProtected: true },
  { component: QuestionsFAQ, path: '/setting/faq-question', isProtected: true },
  { component: TermsOfUse, path: '/setting/terms-of-use', isProtected: true },
  { component: ContactInfo, path: 'setting/contact-info', isProtected: true },
  { component: ListTopic, path: 'setting/faq-topic', isProtected: true },
  { component: ConfigFirstLogin, path: 'setting/config-first-login', isProtected: true },
  { component: Banner, path: 'setting/banner', isProtected: true },
  { component: ListCourse, path: 'learning/courses', isProtected: true },
  { component: CourseForm, path: 'learning/courses/new', isProtected: true },
  { component: CourseForm, path: 'learning/courses/update/:id', isProtected: true },
  { component: ProgramCodeScreen, path: 'learning/program-code', isProtected: true },
  { component: CategoryTraining, path: 'learning/category-training', isProtected: true },
  { component: CourseOverview, path: '/learning/courses-overview/:id', isProtected: true },
  { component: CourseDetail, path: `${ROUTE_PATH.COURSE_DETAIL}/:id`, isProtected: true },
  { component: UserAssigned, path: '/learning/user-assigned', isProtected: true },
  { component: News, path: 'news', isProtected: true },
  { component: Survey, path: '/content/survey', isProtected: true },
  { component: CreateUpdateSurvey, path: '/content/survey/detail/:id', isProtected: true },
  { component: CreateUpdateSurvey, path: '/content/survey/new', isProtected: true },
  { component: CreateUpdateSurvey, path: '/content/survey/update/:id', isProtected: true },
  {
    component: LessonContentForm,
    path: `${ROUTE_PATH.LESSON_CONTENT_ADD}`,
    isProtected: true
  },
  {
    component: LessonContentForm,
    path: `${ROUTE_PATH.LESSON_CONTENT_UPDATE}/:id`,
    isProtected: true
  },
  // {
  //   component: UpdateLessonContent,
  //   path: '/learning/courses/lesson-content/update/1097',
  //   isProtected: true
  // },
  // {
  //   component: UpdateLessonContent,
  //   path: '/learning/courses/lesson-content/update/:id',
  //   isProtected: true
  // },
  // {
  //   component: UpdateLessonContent,
  //   path: '/learning/courses/lesson-content/update/:id',
  //   isProtected: true
  // },
  { component: QuestionBank, path: ROUTE_PATH.QUESTION_BANK, isProtected: true },
  { component: Examination, path: ROUTE_PATH.EXAMINATION, isProtected: true },
  { component: CreateUpdateQuestion, path: ROUTE_PATH.QUESTION_BANK_ADD, isProtected: true },
  {
    component: CreateUpdateQuestion,
    path: `${ROUTE_PATH.QUESTION_BANK_UPDATE}/:id`,
    isProtected: true
  },
  {
    component: CreateUpdateQuestion,
    path: `${ROUTE_PATH.QUESTION_BANK_DETAIL}/:id`,
    isProtected: true
  },
  { component: ExaminationForm, path: ROUTE_PATH.EXAMINATION_ADD, isProtected: true },
  { component: ExaminationForm, path: `${ROUTE_PATH.EXAMINATION_UPDATE}/:id`, isProtected: true },
  {
    component: ExaminationOverview,
    path: `${ROUTE_PATH.EXAMINATION_DETAIL}/:id`,
    isProtected: true
  },

  { component: ImportContentList, path: '/content/import-content', isProtected: true },
  { component: ImportContentForm, path: '/content/import-content/new', isProtected: true },
  { component: ImportContentForm, path: '/content/import-content/update/:id', isProtected: true },
  { component: News, path: 'news', isProtected: true },
  {
    component: LessonStructure,
    path: `${ROUTE_PATH.LESSON_STRUCTURE}/:id`
  },
  {
    component: ActivationAndSetting,
    path: `${ROUTE_PATH.ACTIVATION_SETTING}/:id`,
    isProtected: true
  },
  {
    component: ApprovalCourseInternal,
    path: `${ROUTE_PATH.APPROVAL_COURSE}`,
    isProtected: true
  },
  {
    component: ApprovalListInternal,
    path: `${ROUTE_PATH.APPROVAL_LIST_INTERNAL}`,
    isProtected: true
  },
  {
    component: ApprovalCourseAddNew,
    path: `${ROUTE_PATH.APPROVAL_COURSE_ADD}`,
    isProtected: true
  },
  {
    component: AssignCourse,
    path: ROUTE_PATH.ASSIGN_COURSE,
    isProtected: true
  },
  {
    component: AssignCourseAction,
    path: `${ROUTE_PATH.ASSIGN_COURSE}/:id`,
    isProtected: true
  },
  // {
  //   component: Profile,
  //   path: '/profile',
  //   isProtected: true
  // },
  {
    component: CoursePreview,
    path: `${ROUTE_PATH.PREVIEW_COURSE}/:id`,
    isProtected: true
  }
];
