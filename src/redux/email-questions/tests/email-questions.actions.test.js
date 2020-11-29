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
  SET_EMAIL_QUESTION_CURRENT_PAGE
} from '../email-questions.types';

import {
  getAllEmailQuestions,
  setAllEmailQuestion,
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
  setEmailQuestionsPagesCount
} from '../email-questions.actions';

import {
  skip,
  filter,
  id,
  questions,
  question,
  answer,
  count
} from './email-questions.variables';

describe('email questions tests', () => {
  it('should get all email questions', () => {
    expect(getAllEmailQuestions({ filter, skip })).toEqual({
      type: GET_ALL_EMAIL_QUESTIONS,
      payload: { filter, skip }
    });
  });

  it('should get email question by id', () => {
    expect(getEmailQuestionById(id)).toEqual({
      type: GET_EMAIL_QUESTION_BY_ID,
      payload: id
    });
  });

  it('should set all email questions', () => {
    expect(setAllEmailQuestion(questions)).toEqual({
      type: SET_ALL_EMAIL_QUESTIONS,
      payload: questions
    });
  });

  it('should set current email question', () => {
    expect(setCurrentEmailQuestion(question)).toEqual({
      type: SET_CURRENT_EMAIL_QUESTION,
      payload: question
    });
  });

  it('should email question loading true', () => {
    expect(setEmailQuestionLoading(true)).toEqual({
      type: SET_EMAIL_QUESTIONS_LOADING,
      payload: true
    });
  });

  it('should email question loading false', () => {
    expect(setEmailQuestionLoading(false)).toEqual({
      type: SET_EMAIL_QUESTIONS_LOADING,
      payload: false
    });
  });

  it('should set email question error', () => {
    expect(setEmailQuestionsError(true)).toEqual({
      type: SET_EMAIL_QUESTIONS_ERROR,
      payload: true
    });
  });

  it('should move email question to spam', () => {
    expect(moveEmailQuestionsToSpam(question)).toEqual({
      type: MOVE_EMAIL_QUESTIONS_TO_SPAM,
      payload: question
    });
  });

  it('should delete email question', () => {
    expect(deleteEmailQuestions(question)).toEqual({
      type: DELETE_EMAIL_QUESTIONS,
      payload: question
    });
  });

  it('should set answer to email question', () => {
    expect(answerToEmailQuestion(answer)).toEqual({
      type: ANSWER_TO_EMAIL_QUESTION,
      payload: answer
    });
  });

  it('should set email question pending count', () => {
    expect(setEmailQuestionsPendingCount(count)).toEqual({
      type: SET_EMAIL_QUESTIONS_PENDING_COUNT,
      payload: count
    });
  });

  it('should set email question current page', () => {
    expect(setEmailQuestionsCurrentPage(count)).toEqual({
      type: SET_EMAIL_QUESTION_CURRENT_PAGE,
      payload: count
    });
  });

  it('should set email question pages count', () => {
    expect(setEmailQuestionsPagesCount(count)).toEqual({
      type: SET_EMAIL_QUESTIONS_PAGES_COUNT,
      payload: count
    });
  });

  it('should get email question pending count', () => {
    expect(getEmailQuestionsPendingCount()).toEqual({
      type: GET_EMAIL_QUESTIONS_PENDING_COUNT
    });
  });
});
