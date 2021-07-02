import { createSelector } from 'reselect';
import { selectQuestion } from '../email-questions/email-questions.reducer';
import { selectPagination } from '../table/table.reducer';

export const selectEmailQuestionsList = ({ EmailQuestions }) =>
  EmailQuestions.list;
export const questionSelector = createSelector(
  selectQuestion,
  (question) => question
);

export const questionSelectorWithPagination = createSelector(
  selectQuestion,
  selectPagination,
  (question, table) => ({
    ...question,
    ...table
  })
);
