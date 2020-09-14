import {
  SET_COMMENTS,
  DELETE_COMMENT_LOCALLY,
  SET_COMMENTS_LOADING,
  SET_COMMENTS_ERROR
} from './comments.types';

const initialState = {
  list: [],
  comments: null,
  commentsLoading: false,
  commentsError: null
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

  default:
    return state;
  }
};

export default commentsReducer;
