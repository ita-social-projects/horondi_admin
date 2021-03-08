import commentsReducer, { initialState } from '../comments.reducer';
import {
  setComments,
  setComment,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setFilter,
  clearFilters
} from '../comments.actions';
import {
  comments,
  singleComment,
  commentsLoadingStatus,
  commentsErrorExample,
  filter,
  mockInitialFilters
} from './comments.variables';

describe('comments reducer tests', () => {
  it('should return default state', () => {
    expect(commentsReducer()).toEqual(initialState);
  });
  it('should set comments to the store', () => {
    expect(commentsReducer(initialState, setComments(comments))).toEqual({
      ...initialState,
      list: comments
    });
  });
  it('should set comment to the store', () => {
    expect(commentsReducer(initialState, setComment(singleComment))).toEqual({
      ...initialState,
      comment: singleComment
    });
  });
  it('should handle comments loading', () => {
    expect(
      commentsReducer(initialState, setCommentsLoading(commentsLoadingStatus))
    ).toEqual({
      ...initialState,
      commentsLoading: commentsLoadingStatus
    });
  });
  it('should set comments error', () => {
    expect(
      commentsReducer(initialState, setCommentError(commentsErrorExample))
    ).toEqual({
      ...initialState,
      commentsError: commentsErrorExample
    });
  });
  it('should remove comment from the store', () => {
    initialState.list = [singleComment];
    expect(
      commentsReducer(initialState, removeCommentFromStore(singleComment._id))
    ).toEqual({
      ...initialState,
      list: []
    });
  });
  it('should set filter for comments', () => {
    expect(commentsReducer(initialState, setFilter(filter))).toEqual({
      ...initialState,
      filters: {
        ...mockInitialFilters,
        ...filter
      }
    });
  });
  it('should clear all comments filters', () => {
    expect(commentsReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filters: mockInitialFilters
    });
  });
});
