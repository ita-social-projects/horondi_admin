import {
  SET_COMMENTS,
  DELETE_COMMENT_LOCALLY,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR,
  SET_COMMENTS_CURRENT_PAGE,
  SET_COMMENTS_PER_PAGE,
  SET_COMMENTS_PAGES_COUNT
} from './comments.types';

const initialState = {
  list: [],
  comments: null,
  commentsLoading: false,
  commentsError: null,
  pagination: {
    currentPage: 0,
    commentsPerPage: 20,
    pagesCount: 1
  }
};

const commentsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
  case SET_COMMENTS:
    return {
      ...state,
      list: action.payload
    };

  case SET_COMMENTS_LOADING:
    return {
      ...state,
      commentsLoading: action.payload
    };

  case SET_COMMENTS_ERROR:
    return {
      ...state,
      commentsError: action.payload
    };

  case DELETE_COMMENT_LOCALLY:
    return {
      ...state,
      list: state.list.filter((item) => item._id !== action.payload)
    };

  case SET_COMMENTS_CURRENT_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        currentPage: action.payload - 1
      }
    };

  case SET_COMMENTS_PER_PAGE:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        commentsPerPage: action.payload
      }
    };

  case SET_COMMENTS_PAGES_COUNT:
    return {
      ...state,
      pagination: {
        ...state.pagination,
        pagesCount: action.payload
      }
    };

  default:
    return state;
  }
};

export default commentsReducer;
