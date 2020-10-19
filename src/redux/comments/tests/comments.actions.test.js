import {
  getCommentsByType,
  getRecentComments,
  setComments,
  setCommentsLoading,
  deleteComment,
  deleteCommentLocally,
  setCommentError,
  setCommentsCurrentPage,
  setCommentsPerPage,
  setCommentsPagesCount
} from '../comments.actions';
import {
  GET_COMMENTS_BY_TYPE,
  GET_RECENT_COMMENTS,
  SET_COMMENTS,
  DELETE_COMMENT,
  DELETE_COMMENT_LOCALLY,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENTS_PER_PAGE,
  SET_COMMENTS_PAGES_COUNT
} from '../comments.types';
import {
  comment,
  commentsType,
  commentsCurrentPage,
  commentsPagesCount,
  commentId,
  commentsPerPage
} from './comments.variables';

describe('Comments actions tests', () => {
  it('Should get comment by type', () => {
    expect(getCommentsByType(comment, commentsType)).toEqual({
      type: GET_COMMENTS_BY_TYPE,
      payload: {
        comment,
        commentsType
      }
    });
  });

  it('Should get all recent comments', () => {
    expect(getRecentComments(comment)).toEqual({
      type: GET_RECENT_COMMENTS,
      payload: comment
    });
  });

  it('Should set comments', () => {
    expect(setComments(comment)).toEqual({
      type: SET_COMMENTS,
      payload: comment
    });
  });

  it('Should set comments loading to true', () => {
    expect(setCommentsLoading(true)).toEqual({
      type: SET_COMMENTS_LOADING,
      payload: true
    });
  });

  it('Should set comments error to true', () => {
    expect(setCommentError(true)).toEqual({
      type: SET_COMMENTS_ERROR,
      payload: true
    });
  });

  it('Should delete comment', () => {
    expect(deleteComment(commentId)).toEqual({
      type: DELETE_COMMENT,
      payload: commentId
    });
  });

  it('Should set comments current page', () => {
    expect(setCommentsCurrentPage(commentsCurrentPage)).toEqual({
      type: SET_COMMENTS_CURRENT_PAGE,
      payload: commentsCurrentPage
    });
  });

  it('Should set number of comments per page', () => {
    expect(setCommentsPerPage(commentsPerPage)).toEqual({
      type: SET_COMMENTS_PER_PAGE,
      payload: commentsPerPage
    });
  });

  it('Should set comments pages count', () => {
    expect(setCommentsPagesCount(commentsPagesCount)).toEqual({
      type: SET_COMMENTS_PAGES_COUNT,
      payload: commentsPagesCount
    });
  });

  it('Should delete comment locally', () => {
    expect(deleteCommentLocally(commentId)).toEqual({
      type: DELETE_COMMENT_LOCALLY,
      payload: commentId
    });
  });
});
