import {
  SET_COMMENTS_LOADING,
  SET_COMMENTS,
  REMOVE_COMMENT_FROM_STORE,
  SET_COMMENTS_ERROR,
  SET_COMMENT,
  SET_FILTER,
  CLEAR_FILTERS,
  SET_RECENT_COMMENTS,
  SET_REPLY_COMMENT,
  REMOVE_REPLY_COMMENT_FROM_STORE,
  CLEAR_COMMENT,
  SET_COMMENTS_CURRENT_PAGE
} from './comments.types';

const initialFilters = {
  show: [],
  dateFrom: '',
  dateTo: '',
  search: ''
};

export const initialState = {
  list: [],
  recentComments: [],
  filters: initialFilters,
  comments: null,
  commentsLoading: false,
  commentsError: null,
  replyComments: [],
  currentPageForComments: 1
};

export const selectComment = ({ Comments }) => ({
  list: Comments.list,
  recentComments: Comments.recentComments,
  filter: Comments.filters,
  loading: Comments.commentsLoading,
  comment: Comments.comment,
  replyComments: Comments.replyComments,
  currentPageForComments: Comments.currentPageForComments
});

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_COMMENTS_CURRENT_PAGE:
      return {
        ...state,
        currentPageForComments: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        list: action.payload
      };
    case SET_RECENT_COMMENTS:
      return {
        ...state,
        recentComments: action.payload
      };

    case SET_COMMENT:
      return {
        ...state,
        comment: action.payload
      };
    case SET_COMMENTS_LOADING:
      return {
        ...state,
        commentsLoading: action.payload
      };

    case REMOVE_COMMENT_FROM_STORE:
      return {
        ...state,
        list: state.list.filter((item) => item._id !== action.payload)
      };
    case SET_REPLY_COMMENT:
      return {
        ...state,
        replyComments: action.payload
      };
    case REMOVE_REPLY_COMMENT_FROM_STORE:
      return {
        ...state,
        replyComments: state.replyComments.filter(
          (item) => item._id !== action.payload
        )
      };
    case SET_COMMENTS_ERROR:
      return {
        ...state,
        commentsError: action.payload
      };
    case CLEAR_COMMENT:
      return {
        ...state,
        comment: null
      };

    case SET_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: initialFilters
      };

    default:
      return state;
  }
};

export default commentsReducer;
