import { createSelector } from 'reselect';
import { selectEmailQuestion } from '../email-questions/email-questions.reducer';
import { selectPagination } from '../table/table.reducer';

export const selectEmailQuestionsList = ({ EmailQuestions }) =>
  EmailQuestions.list;

export const emailQuestionSelectorWithPagination = createSelector(
  selectEmailQuestion,
  selectPagination,
  (comment, table) => ({
    ...comment,
    ...table
  })
);
