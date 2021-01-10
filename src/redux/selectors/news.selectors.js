export const selectNewsAndTable = ({ News, Table }) => ({
  list: News.list,
  loading: News.newsLoading,
  currentPage: Table.pagination.currentPage,
  rowsPerPage: Table.pagination.rowsPerPage,
  itemsCount: Table.itemsCount
});

export const selectNews = ({ News }) => ({
  loading: News.newsLoading,
  newsArticle: News.newsArticle
});
