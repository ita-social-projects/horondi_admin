import {
  setQuestionsAnswers,
  getAllQuestionsAnswers,
  getQuestionsAnswersById,
  setLoading,
  setQuestionsAnswersError,
  addQuestionsAnswers,
  deleteQuestionsAnswers,
  updateQuestionsAnswers,
  setCurrentQuestionsAnswers
} from '../questions-answers.actions';
import {
  SET_QUESTIONS_ANSWERS,
  GET_QUESTIONS_ANSWERS_BY_ID,
  SET_QUESTIONS_ANSWERS_LOADING,
  SET_QUESTIONS_ANSWERS_ERROR,
  ADD_QUESTIONS_ANSWERS,
  DELETE_QUESTIONS_ANSWERS,
  UPDATE_QUESTIONS_ANSWERS,
  SET_CURRENT_QUESTIONS_ANSWERS,
  GET_ALL_QUESTIONS_ANSWERS
} from '../questions-answers.types';
import {
  questionsAnswers,
  questionsAnswersId,
  allQuestionsAnswers,
  questionsAnswersToRemoveId,
  questionsAnswersToUpdate
} from './questions-answers.variables';

describe('questions answers actions tests', () => {
  it('must get questions answers by id', () => {
    expect(getQuestionsAnswersById('61b37322cb6ee034545ffcc4')).toEqual({
      type: GET_QUESTIONS_ANSWERS_BY_ID,
      payload: questionsAnswersId
    });
  });
  it('must add questions answers', () => {
    expect(addQuestionsAnswers(questionsAnswers)).toEqual({
      type: ADD_QUESTIONS_ANSWERS,
      payload: questionsAnswers
    });
  });
  it('must set questions answers', () => {
    expect(setCurrentQuestionsAnswers(questionsAnswers)).toEqual({
      type: SET_CURRENT_QUESTIONS_ANSWERS,
      payload: questionsAnswers
    });
  });
  it('must get all questions answers', () => {
    expect(getAllQuestionsAnswers()).toEqual({
      type: GET_ALL_QUESTIONS_ANSWERS
    });
  });
  it('must set all questions answers', () => {
    expect(setQuestionsAnswers(allQuestionsAnswers)).toEqual({
      type: SET_QUESTIONS_ANSWERS,
      payload: allQuestionsAnswers
    });
  });
  it('must set questions answers error to true', () => {
    expect(setQuestionsAnswersError(true)).toEqual({
      type: SET_QUESTIONS_ANSWERS_ERROR,
      payload: true
    });
  });
  it('must set questions answers loading to true', () => {
    expect(setLoading(true)).toEqual({
      type: SET_QUESTIONS_ANSWERS_LOADING,
      payload: true
    });
  });
  it('must update questions answers', () => {
    expect(updateQuestionsAnswers(questionsAnswersToUpdate)).toEqual({
      type: UPDATE_QUESTIONS_ANSWERS,
      payload: questionsAnswersToUpdate
    });
  });
  it('must delete questions answers', () => {
    expect(deleteQuestionsAnswers(questionsAnswersToRemoveId)).toEqual({
      type: DELETE_QUESTIONS_ANSWERS,
      payload: questionsAnswersToRemoveId
    });
  });
});
