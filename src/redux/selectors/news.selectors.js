import { createSelector } from 'reselect';
import { selectPagination } from '../table/table.reducer';
import { selectNews } from '../news/news.reducer';

export const newsSelector = createSelector(selectNews, (news) => news);

export const newsSelectorWithPagination = createSelector(
  selectNews,
  selectPagination,
  (news, table) => ({
    ...news,
    ...table
  })
);
