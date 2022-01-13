import {
  SET_QUESTIONS_ANSWERS,
  SET_QUESTIONS_ANSWERS_LOADING,
  SET_QUESTIONS_ANSWERS_ERROR,
  SET_CURRENT_QUESTIONS_ANSWERS,
  REMOVE_QUESTIONS_ANSWERS_FROM_STORE
} from './questions-answers.types';

export const initialState = {
  listQuestions: [],
  currentPage: null,
  loading: false,
  error: null
};

const QuestionsAnswers = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_QUESTIONS_ANSWERS:
      return {
        ...state,
        listQuestions: action.payload
      };
    case SET_QUESTIONS_ANSWERS_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_QUESTIONS_ANSWERS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case SET_CURRENT_QUESTIONS_ANSWERS:
      return {
        ...state,
        currentPage: action.payload
      };
    case REMOVE_QUESTIONS_ANSWERS_FROM_STORE: {
      const pages = state.listQuestions.items.filter(
        (page) => page._id !== action.payload
      );
      return {
        ...state,
        listQuestions: { items: pages }
      };
    }
    default:
      return state;
  }
};

export default QuestionsAnswers;
