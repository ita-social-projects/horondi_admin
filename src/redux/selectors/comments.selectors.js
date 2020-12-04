export const selectCommentsListLoadingPages = ({ Comments }) => ({
  list: Comments.list,
  loading: Comments.commentsLoading,
  pagesCount: Comments.pagination.pagesCount,
  currentPage: Comments.pagination.currentPage,
  commentsPerPage: Comments.pagination.commentsPerPage
});
