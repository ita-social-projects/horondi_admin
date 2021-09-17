import {
  SET_COMMENTS,
  GET_COMMENTS,
  SET_COMMENTS_USER,
  SET_REPLIES_COMMENTS_USER,
  GET_COMMENTS_USER,
  GET_REPLIES_COMMENTS_USER,
  DELETE_COMMENT,
  GET_COMMENTS_BY_PRODUCTS,
  GET_COMMENTS_BY_TYPE,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  REMOVE_COMMENT_FROM_STORE,
  UPDATE_COMMENT,
  SET_COMMENT,
  GET_COMMENT,
  GET_USER_COMMENTS,
  GET_PRODUCT_COMMENTS,
  SET_FILTER,
  SET_FILTER_USER,
  SET_FILTER_REPLY_USER,
  CLEAR_FILTERS,
  CLEAR_FILTERS_USER,
  CLEAR_FILTERS_REPLY_USER,
  GET_RECENT_COMMENTS,
  SET_RECENT_COMMENTS,
  SET_REPLY_COMMENTS,
  GET_REPLY_COMMENTS,
  DELETE_REPLY_COMMENT,
  REMOVE_REPLY_COMMENT_FROM_STORE,
  CLEAR_COMMENT,
  ADD_REPLY_COMMENT,
  SET_COMMENT_SORT,
  SET_COMMENT_SORT_LABEL,
  SET_REPLY_FILTER,
  SET_REPLY_SORT,
  SET_REPLY_SORT_LABEL,
  CLEAR_REPLY_FILTERS,
  UPDATE_REPLY,
  GET_REPLY,
  SET_REPLY,
  SET_REPLY_LOADING
} from './comments.types';

const setComments = (comments) => ({
  type: SET_COMMENTS,
  payload: comments
});

const setCommentsUser = (comments) => ({
  type: SET_COMMENTS_USER,
  payload: comments
});

const setRepliesCommentsUser = (replies) => ({
  type: SET_REPLIES_COMMENTS_USER,
  payload: replies
});

const setRecentComments = (comments) => ({
  type: SET_RECENT_COMMENTS,
  payload: comments
});

const setComment = (payload) => ({
  type: SET_COMMENT,
  payload
});

const getComment = (payload) => ({
  type: GET_COMMENT,
  payload
});

const getComments = (payload) => ({
  type: GET_COMMENTS,
  payload
});

const getCommentsByUser = (payload) => ({
  type: GET_COMMENTS_USER,
  payload
});

const getRepliesCommentsByUser = (payload) => ({
  type: GET_REPLIES_COMMENTS_USER,
  payload
});

const getRecentComments = (payload) => ({
  type: GET_RECENT_COMMENTS,
  payload
});

const deleteComment = (payload) => ({
  type: DELETE_COMMENT,
  payload
});

const getCommentsByProduct = (payload) => ({
  type: GET_COMMENTS_BY_PRODUCTS,
  payload
});

const getUserComments = (payload) => ({
  type: GET_USER_COMMENTS,
  payload
});

const getProductComments = (payload) => ({
  type: GET_PRODUCT_COMMENTS,
  payload
});

const getCommentsByType = (payload) => ({
  type: GET_COMMENTS_BY_TYPE,
  payload
});

const setCommentsCurrentPage = (payload) => ({
  type: SET_COMMENTS_CURRENT_PAGE,
  payload
});

const setCommentsLoading = (payload) => ({
  type: SET_COMMENTS_LOADING,
  payload
});

const setCommentError = (payload) => ({
  type: SET_COMMENTS_ERROR,
  payload
});

const removeCommentFromStore = (payload) => ({
  type: REMOVE_COMMENT_FROM_STORE,
  payload
});

const updateComment = (payload) => ({
  type: UPDATE_COMMENT,
  payload
});

const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

const setFilterUser = (filter) => ({
  type: SET_FILTER_USER,
  payload: filter
});

const setFilterReplyUser = (filter) => ({
  type: SET_FILTER_REPLY_USER,
  payload: filter
});

const clearFilters = () => ({
  type: CLEAR_FILTERS
});

const clearFiltersUser = () => ({
  type: CLEAR_FILTERS_USER
});

const clearFiltersReplyUser = () => ({
  type: CLEAR_FILTERS_REPLY_USER
});

const setReplyComments = (replyComments) => ({
  type: SET_REPLY_COMMENTS,
  payload: replyComments
});

const getReplyComments = (payload) => ({
  type: GET_REPLY_COMMENTS,
  payload
});

const deleteReplyComment = (payload) => ({
  type: DELETE_REPLY_COMMENT,
  payload
});

const removeReplyCommentFromStore = (payload) => ({
  type: REMOVE_REPLY_COMMENT_FROM_STORE,
  payload
});

const clearComment = () => ({
  type: CLEAR_COMMENT
});

const addReplyComment = (payload) => ({
  type: ADD_REPLY_COMMENT,
  payload
});

const setSort = (payload) => ({
  type: SET_COMMENT_SORT,
  payload
});

const setSortLabel = (payload) => ({
  type: SET_COMMENT_SORT_LABEL,
  payload
});

const setReplyFilter = (payload) => ({
  type: SET_REPLY_FILTER,
  payload
});

const setReplySort = (payload) => ({
  type: SET_REPLY_SORT,
  payload
});

const setReplySortLabel = (payload) => ({
  type: SET_REPLY_SORT_LABEL,
  payload
});

const clearReplyFilters = () => ({
  type: CLEAR_REPLY_FILTERS
});

const updateReply = (payload) => ({
  type: UPDATE_REPLY,
  payload
});

const getReply = (payload) => ({
  type: GET_REPLY,
  payload
});

const setReply = (payload) => ({
  type: SET_REPLY,
  payload
});

const setReplyLoading = (payload) => ({
  type: SET_REPLY_LOADING,
  payload
});

export {
  setComments,
  getComments,
  setCommentsUser,
  getCommentsByUser,
  setRepliesCommentsUser,
  getRepliesCommentsByUser,
  getCommentsByType,
  removeCommentFromStore,
  setCommentsLoading,
  deleteComment,
  setCommentError,
  setCommentsCurrentPage,
  getCommentsByProduct,
  updateComment,
  setComment,
  getComment,
  getUserComments,
  getProductComments,
  setFilter,
  setFilterUser,
  setFilterReplyUser,
  clearFilters,
  clearFiltersReplyUser,
  clearFiltersUser,
  setRecentComments,
  getRecentComments,
  setReplyComments,
  getReplyComments,
  deleteReplyComment,
  removeReplyCommentFromStore,
  clearComment,
  addReplyComment,
  setSort,
  setSortLabel,
  setReplyFilter,
  setReplySort,
  setReplySortLabel,
  clearReplyFilters,
  updateReply,
  getReply,
  setReply,
  setReplyLoading
};
