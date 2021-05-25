import {
  GET_ALL_EMAIL_QUESTIONS,
  SET_ALL_EMAIL_QUESTIONS,
  GET_EMAIL_QUESTION_BY_ID,
  SET_CURRENT_EMAIL_QUESTION,
  MOVE_EMAIL_QUESTIONS_TO_SPAM,
  ANSWER_TO_EMAIL_QUESTION,
  DELETE_EMAIL_QUESTIONS,
  SET_EMAIL_QUESTIONS_LOADING,
  SET_EMAIL_QUESTIONS_ERROR,
  SET_EMAIL_QUESTIONS_PENDING_COUNT,
  GET_EMAIL_QUESTIONS_PENDING_COUNT,
  SET_EMAIL_QUESTIONS_PAGES_COUNT,
  SET_EMAIL_QUESTION_CURRENT_PAGE,
  CLEAR_FILTERS,
  SET_FILTER
} from './email-questions.types';

const setAllEmailQuestion = (questionsList) => ({
  type: SET_ALL_EMAIL_QUESTIONS,
  payload: questionsList
});

const getAllEmailQuestions = (filterData) => ({
  type: GET_ALL_EMAIL_QUESTIONS,
  payload: filterData
});

const getEmailQuestionById = (id) => ({
  type: GET_EMAIL_QUESTION_BY_ID,
  payload: id
});

const setCurrentEmailQuestion = (question) => ({
  type: SET_CURRENT_EMAIL_QUESTION,
  payload: question
});

const setEmailQuestionLoading = (loading) => ({
  type: SET_EMAIL_QUESTIONS_LOADING,
  payload: loading
});

const setEmailQuestionsError = (error) => ({
  type: SET_EMAIL_QUESTIONS_ERROR,
  payload: error
});

const moveEmailQuestionsToSpam = (data) => ({
  type: MOVE_EMAIL_QUESTIONS_TO_SPAM,
  payload: data
});

const deleteEmailQuestions = (data) => ({
  type: DELETE_EMAIL_QUESTIONS,
  payload: data
});

const answerToEmailQuestion = (payload) => ({
  type: ANSWER_TO_EMAIL_QUESTION,
  payload
});

const setEmailQuestionsPagesCount = (count) => ({
  type: SET_EMAIL_QUESTIONS_PAGES_COUNT,
  payload: count
});

const setEmailQuestionsCurrentPage = (pageNumber) => ({
  type: SET_EMAIL_QUESTION_CURRENT_PAGE,
  payload: pageNumber
});

const getEmailQuestionsPendingCount = () => ({
  type: GET_EMAIL_QUESTIONS_PENDING_COUNT
});

const setEmailQuestionsPendingCount = (count) => ({
  type: SET_EMAIL_QUESTIONS_PENDING_COUNT,
  payload: count
});

const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter
});

const clearFilters = () => ({
  type: CLEAR_FILTERS
});

export {
  setAllEmailQuestion,
  getAllEmailQuestions,
  getEmailQuestionById,
  setCurrentEmailQuestion,
  setEmailQuestionLoading,
  setEmailQuestionsError,
  moveEmailQuestionsToSpam,
  deleteEmailQuestions,
  answerToEmailQuestion,
  setEmailQuestionsPendingCount,
  getEmailQuestionsPendingCount,
  setEmailQuestionsCurrentPage,
  setEmailQuestionsPagesCount,
  setFilter,
  clearFilters
};
