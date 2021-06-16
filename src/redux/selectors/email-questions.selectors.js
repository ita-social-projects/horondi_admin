import { createSelector } from 'reselect';
import { selectQuestion } from '../email-questions/email-questions.reducer';

export const selectEmailQuestionsList = ({ EmailQuestions }) =>
  EmailQuestions.list;
export const questionSelector = createSelector(
  selectQuestion,
  (question) => question
);
