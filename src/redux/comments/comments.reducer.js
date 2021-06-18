import {
  SET_COMMENTS_LOADING,
  SET_COMMENTS,
  REMOVE_COMMENT_FROM_STORE,
  SET_COMMENTS_ERROR,
  SET_COMMENT,
  SET_FILTER,
  CLEAR_FILTERS,
  SET_RECENT_COMMENTS
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
  commentsError: null
};

export const selectComment = ({ Comments }) => ({
  list: Comments.list,
  recentComments: Comments.recentComments,
  filter: Comments.filters,
  loading: Comments.commentsLoading,
  comment: Comments.comment
});

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
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

    case SET_COMMENTS_ERROR:
      return {
        ...state,
        commentsError: action.payload
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
