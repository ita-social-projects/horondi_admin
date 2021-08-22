import commentsReducer, { initialState } from '../comments.reducer';
import {
  setComments,
  setCommentsUser,
  setRepliesCommentsUser,
  setComment,
  setCommentsLoading,
  setCommentError,
  removeCommentFromStore,
  setFilter,
  setFilterUser,
  setFilterReplyUser,
  clearFilters,
  clearFiltersUser,
  clearFiltersReplyUser,
  setRecentComments,
  setReplyComments,
  removeReplyCommentFromStore,
  clearComment,
  setCommentsCurrentPage,
  setSort,
  setSortLabel
} from '../comments.actions';
import {
  comments,
  singleComment,
  commentsLoadingStatus,
  commentsErrorExample,
  filter,
  mockInitialFilters,
  mockInitialFiltersUser,
  replyCommentsData,
  replyItem,
  replyCommentId,
  currentPage,
  sortDataLabel,
  sortData
} from './comments.variables';

describe('comments reducer tests', () => {
  it('should return default state', () => {
    expect(commentsReducer()).toEqual(initialState);
  });
  it('should set comments to the store', () => {
    expect(commentsReducer(initialState, setComments(comments.list))).toEqual({
      ...initialState,
      list: comments.list
    });
  });
  it('should set user comments to the store', () => {
    expect(
      commentsReducer(initialState, setCommentsUser(comments.list))
    ).toEqual({
      ...initialState,
      listUser: comments.list
    });
  });
  it('should set user replies to the store', () => {
    expect(
      commentsReducer(initialState, setRepliesCommentsUser(replyCommentsData))
    ).toEqual({
      ...initialState,
      listRepliesUser: replyCommentsData
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
  it('should set filter for user comments', () => {
    expect(commentsReducer(initialState, setFilterUser(filter))).toEqual({
      ...initialState,
      filtersUser: {
        ...mockInitialFiltersUser,
        ...filter
      }
    });
  });
  it('should set filter for user replies', () => {
    expect(commentsReducer(initialState, setFilterReplyUser(filter))).toEqual({
      ...initialState,
      filtersReplyUser: {
        ...mockInitialFilters,
        ...filter
      }
    });
  });
  it('should clear all comment filters', () => {
    expect(commentsReducer(initialState, clearFilters())).toEqual({
      ...initialState,
      filters: mockInitialFilters,
      sort: { date: -1 },
      sortLabel: ''
    });
  });
  it('should clear all user comment filters', () => {
    expect(commentsReducer(initialState, clearFiltersUser())).toEqual({
      ...initialState,
      filtersUser: mockInitialFiltersUser,
      sort: { date: -1 },
      sortLabel: ''
    });
  });
  it('should clear all user reply filters', () => {
    expect(commentsReducer(initialState, clearFiltersReplyUser())).toEqual({
      ...initialState,
      filtersReplyUser: mockInitialFilters,
      replySort: { date: -1 },
      replySortLabel: ''
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

  it('should add filter to comments', () => {
    expect(commentsReducer({ ...initialState }, setSort(sortData))).toEqual({
      ...initialState,
      sort: sortData
    });
  });

  it('should add filter label to comments', () => {
    expect(
      commentsReducer({ ...initialState }, setSortLabel(sortDataLabel))
    ).toEqual({
      ...initialState,
      sortLabel: sortDataLabel
    });
  });
});
