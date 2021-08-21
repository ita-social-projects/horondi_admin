import emailQuestionsReducer, {
  initialState
} from '../../email-questions/email-questions.reducer';

import {
  setAllEmailQuestion,
  setCurrentEmailQuestion,
  setEmailQuestionLoading,
  setEmailQuestionsError,
  setEmailQuestionsPendingCount,
  setEmailQuestionsCurrentPage,
  setEmailQuestionsPagesCount
} from '../../email-questions/email-questions.actions';

import {
  mockQuestions,
  mockQuestion,
  count
} from './email-questions.variables';

describe('Email questions reducer tests', () => {
  it('should return default state', () => {
    expect(emailQuestionsReducer()).toEqual(initialState);
  });

  it('should set all questions', () => {
    expect(
      emailQuestionsReducer(initialState, setAllEmailQuestion(mockQuestions))
    ).toEqual({
      ...initialState,
      list: mockQuestions
    });
  });

  it('should set one question', () => {
    expect(
      emailQuestionsReducer(initialState, setCurrentEmailQuestion(mockQuestion))
    ).toEqual({
      ...initialState,
      currentQuestion: mockQuestion
    });
  });

  it('should set email loading to true', () => {
    expect(
      emailQuestionsReducer(initialState, setEmailQuestionLoading(true))
    ).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should set email loading to false', () => {
    expect(
      emailQuestionsReducer(initialState, setEmailQuestionLoading(false))
    ).toEqual({
      ...initialState,
      loading: false
    });
  });

  it('should set email error to true', () => {
    expect(
      emailQuestionsReducer(initialState, setEmailQuestionsError(true))
    ).toEqual({
      ...initialState,
      error: true
    });
  });

  it('should set email questions pending count', () => {
    expect(
      emailQuestionsReducer(initialState, setEmailQuestionsPendingCount(count))
    ).toEqual({
      ...initialState,
      pendingCount: count
    });
  });

  it('should set email questions current page', () => {
    expect(
      emailQuestionsReducer(initialState, setEmailQuestionsCurrentPage(count))
    ).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        currentPage: count - 1
      }
    });
  });

  it('should set email questions pages count', () => {
    expect(
      emailQuestionsReducer(initialState, setEmailQuestionsPagesCount(count))
    ).toEqual({
      ...initialState,
      pagination: {
        ...initialState.pagination,
        pagesCount: count
      }
    });
  });
});
