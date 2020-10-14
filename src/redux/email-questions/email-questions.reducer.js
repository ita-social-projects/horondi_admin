import {
  SET_ALL_EMAIL_QUESTIONS,
  SET_EMAIL_QUESTIONS_LOADING,
  SET_EMAIL_QUESTIONS_ERROR,
  SET_CURRENT_EMAIL_QUESTION,
  SET_EMAIL_QUESTIONS_COUNT,
  SET_EMAIL_QUESTIONS_PENDING_COUNT
} from './email-questions.types';

export const initialState = {
  list: [],
  questionsCount: 0,
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
  case SET_EMAIL_QUESTIONS_COUNT:
    return {
      ...state,
      questionsCount: action.payload
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
