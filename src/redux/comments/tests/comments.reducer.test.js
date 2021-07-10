import commentsReducer, { initialState } from '../comments.reducer';
import {
  setComments,
  setComment,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setFilter,
  clearFilters,
  setRecentComments,
  setReplyComments,
  removeReplyCommentFromStore,
  clearComment,
  setCommentsCurrentPage
} from '../comments.actions';
import {
  comments,
  singleComment,
  commentsLoadingStatus,
  commentsErrorExample,
  filter,
  mockInitialFilters,
  replyCommentsData,
  replyItem,
  replyCommentId,
  currentPage
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
  it('should set recent comments', () => {
    expect(
      commentsReducer(initialState, setRecentComments(comments.list))
    ).toEqual({
      ...initialState,
      recentComments: comments.list
    });
  });
  it('should set reply comments', () => {
    expect(
      commentsReducer(initialState, setReplyComments(replyCommentsData))
    ).toEqual({
      ...initialState,
      replyComments: replyCommentsData
    });
  });
  it('should clear comment', () => {
    expect(
      commentsReducer(
        { ...initialState, comment: comments.list },
        clearComment()
      )
    ).toEqual({
      ...initialState,
      comment: null
    });
  });
  it('should remove reply coment from the list', () => {
    expect(
      commentsReducer(
        { ...initialState, replyComments: replyCommentsData },
        removeReplyCommentFromStore(replyCommentId)
      )
    ).toEqual({
      ...initialState,
      replyComments: [replyItem]
    });
  });

  it('should add current page', () => {
    expect(
      commentsReducer({ ...initialState }, setCommentsCurrentPage(currentPage))
    ).toEqual({
      ...initialState,
      currentPageForComments: currentPage
    });
  });
});
