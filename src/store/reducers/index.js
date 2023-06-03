import FAQQuestionsSlice from './FAQQuestionsSlice';
import sidebarReducer from './sidebarSlice';
import UserSlice from './UserSlice';
import SecurityAreaSlice from './SecurityAreaSlice';
import courseDetailSlice from './courseDetailSlice';

const rootReducers = {
  sidebar: sidebarReducer,
  FAQQuestions: FAQQuestionsSlice,
  SecurityArea: SecurityAreaSlice,
  user: UserSlice,
  courseDetail: courseDetailSlice
};

export default rootReducers;
