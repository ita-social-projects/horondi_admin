import {
  SET_QUESTIONS_ANSWERS_LOADING,
  SET_QUESTIONS_ANSWERS,
  GET_ALL_QUESTIONS_ANSWERS,
  SET_QUESTIONS_ANSWERS_ERROR,
  ADD_QUESTIONS_ANSWERS,
  DELETE_QUESTIONS_ANSWERS,
  SET_CURRENT_QUESTIONS_ANSWERS,
  GET_QUESTIONS_ANSWERS_BY_ID,
  UPDATE_QUESTIONS_ANSWERS,
  REMOVE_QUESTIONS_ANSWERS_FROM_STORE
} from './questions-answers.types';

const setQuestionsAnswers = (questionsAnswers) => ({
  type: SET_QUESTIONS_ANSWERS,
  payload: questionsAnswers
});

const getAllQuestionsAnswers = () => ({
  type: GET_ALL_QUESTIONS_ANSWERS
});

const getQuestionsAnswersById = (payload) => ({
  type: GET_QUESTIONS_ANSWERS_BY_ID,
  payload
});

const setLoading = (loading) => ({
  type: SET_QUESTIONS_ANSWERS_LOADING,
  payload: loading
});

const setQuestionsAnswersError = (error) => ({
  type: SET_QUESTIONS_ANSWERS_ERROR,
  payload: error
});

const addQuestionsAnswers = (payload) => ({
  type: ADD_QUESTIONS_ANSWERS,
  payload
});

const deleteQuestionsAnswers = (payload) => ({
  type: DELETE_QUESTIONS_ANSWERS,
  payload
});

const updateQuestionsAnswers = (payload) => ({
  type: UPDATE_QUESTIONS_ANSWERS,
  payload
});

const setCurrentQuestionsAnswers = (currentQuestionsAnswers) => ({
  type: SET_CURRENT_QUESTIONS_ANSWERS,
  payload: currentQuestionsAnswers
});

const removeQuestionsAnswersFromStore = (payload) => ({
  type: REMOVE_QUESTIONS_ANSWERS_FROM_STORE,
  payload
});

export {
  setQuestionsAnswers,
  getAllQuestionsAnswers,
  getQuestionsAnswersById,
  setLoading,
  setQuestionsAnswersError,
  addQuestionsAnswers,
  deleteQuestionsAnswers,
  updateQuestionsAnswers,
  setCurrentQuestionsAnswers,
  removeQuestionsAnswersFromStore
};
