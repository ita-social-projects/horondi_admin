import {
  comment,
  commentId,
  initialState,
  commentsCurrentPage,
  commentsPerPage,
  commentsPagesCount
} from './comments.variables';
import {
  setComments,
  setCommentsLoading,
  deleteCommentLocally,
  setCommentError,
  setCommentsCurrentPage,
  setCommentsPerPage,
  setCommentsPagesCount
} from '../comments.actions';

import commentsReducer from '../comments.reducer';

describe('Contacts reducer tests', () => {
  it('Should return default state', () => {
    expect(commentsReducer()).toEqual(initialState);
  });

  it('Should set contacts to store', () => {
    expect(commentsReducer(initialState, setComments(comment))).toEqual({
      ...initialState,
      list: comment
    });
  });

  it('Should set contact loading to true', () => {
    expect(commentsReducer(initialState, setCommentsLoading(true))).toEqual({
      ...initialState,
      commentsLoading: true
    });
  });

  it('Should set comments error to true', () => {
    expect(commentsReducer(initialState, setCommentError(true))).toEqual({
      ...initialState,
      commentsError: true
    });
  });

  it('Should delete comment locally', () => {
    expect(
      commentsReducer(initialState, deleteCommentLocally(commentId))
    ).toEqual({
      ...initialState,
      list: initialState.list.filter((item) => item._id !== commentId)
    });
  });

  it('Should set comments current page', () => {
    expect(
      commentsReducer(initialState, setCommentsCurrentPage(commentsCurrentPage))
    ).toEqual({
      ...initialState,
      pagination: {
        currentPage: commentsCurrentPage - 1,
        commentsPerPage: initialState.pagination.commentsPerPage,
        pagesCount: initialState.pagination.pagesCount
      }
    });
  });

  it('Should set comments pages count', () => {
    expect(
      commentsReducer(initialState, setCommentsPagesCount(commentsPagesCount))
    ).toEqual({
      ...initialState,
      pagination: {
        currentPage: initialState.pagination.currentPage,
        commentsPerPage: initialState.pagination.commentsPerPage,
        pagesCount: commentsPagesCount
      }
    });
  });

  it('Should set number of comments per page', () => {
    expect(
      commentsReducer(initialState, setCommentsPerPage(commentsPerPage))
    ).toEqual({
      ...initialState,
      pagination: {
        currentPage: initialState.pagination.currentPage,
        commentsPerPage,
        pagesCount: initialState.pagination.pagesCount
      }
    });
  });
});
