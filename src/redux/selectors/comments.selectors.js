import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectComment } from '../comments/comments.reducer';

export const commentSelector = createSelector(
  selectComment,
  (comment) => comment
);

export const commentSelectorWithPagination = createSelector(
  selectComment,
  selectPagination,
  (comment, table) => ({
    ...comment,
    ...table
  })
);
