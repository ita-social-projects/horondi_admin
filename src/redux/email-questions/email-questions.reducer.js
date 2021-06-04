import {
  SET_ALL_EMAIL_QUESTIONS,
  SET_EMAIL_QUESTIONS_LOADING,
  SET_EMAIL_QUESTIONS_ERROR,
  SET_CURRENT_EMAIL_QUESTION,
  SET_EMAIL_QUESTIONS_PAGES_COUNT,
  SET_EMAIL_QUESTIONS_PENDING_COUNT,
  SET_EMAIL_QUESTION_CURRENT_PAGE,
  CLEAR_FILTERS,
  SET_FILTER
} from './email-questions.types';

const initialFilters = {
  show: [],
  dateFrom: '',
  dateTo: '',
  search: ''
};

export const initialState = {
  list: [],
  filters: initialFilters,
  pendingCount: 0,
  currentQuestion: null,
  loading: false,
  error: null
};

export const selectEmailQuestion = ({ EmailQuestions }) => ({
  list: EmailQuestions.list,
  filter: EmailQuestions.filters,
  loading: EmailQuestions.commentsLoading,
  comment: EmailQuestions.comment
});

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
      count: action.payload
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

export default emailQuestionsReducer;
