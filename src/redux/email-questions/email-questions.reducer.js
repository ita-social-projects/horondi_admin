import {
  SET_ALL_EMAIL_QUESTIONS,
  SET_EMAIL_QUESTIONS_LOADING,
  SET_EMAIL_QUESTIONS_ERROR,
  SET_CURRENT_EMAIL_QUESTION,
  SET_EMAIL_QUESTIONS_PAGES_COUNT,
  SET_EMAIL_QUESTIONS_PENDING_COUNT,
  SET_EMAIL_QUESTION_CURRENT_PAGE
} from './email-questions.types';

export const initialState = {
  list: [],
  pagination: {
    currentPage: 0,
    questionsPerPage: 10,
    pagesCount: 1
  },
  pendingCount: 0,
  currentQuestion: null,
  loading: false,
  error: null
};

const emailQuestionsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_ALL_EMAIL_QUESTIONS:
      return {
        ...state,
        list: action.payload
      };
    case SET_EMAIL_QUESTIONS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_EMAIL_QUESTIONS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT_EMAIL_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload
      };
    case SET_EMAIL_QUESTIONS_PAGES_COUNT:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          pagesCount: action.payload
        }
      };
    case SET_EMAIL_QUESTION_CURRENT_PAGE:
      return {
        ...state,
        pagination: {
          ...state.pagination,
          currentPage: action.payload - 1
        }
      };
    case SET_EMAIL_QUESTIONS_PENDING_COUNT:
      return {
        ...state,
        pendingCount: action.payload
      };
    default:
      return state;
  }
};

export default emailQuestionsReducer;
