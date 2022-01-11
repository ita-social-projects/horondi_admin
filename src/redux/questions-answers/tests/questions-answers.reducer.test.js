import {
  questionsAnswers,
  allQuestionsAnswers
} from './questions-answers.variables';
import {
  setQuestionsAnswersError,
  setLoading,
  setQuestionsAnswers,
  setCurrentQuestionsAnswers
} from '../questions-answers.actions';

import QuestionsAnswers, { initialState } from '../questions-answers.reducer';

describe('questions and answers tests', () => {
  it('must return initial state', () => {
    expect(QuestionsAnswers()).toEqual(initialState);
  });
  it('must set all questions and answers to store', () => {
    expect(
      QuestionsAnswers(initialState, setQuestionsAnswers(allQuestionsAnswers))
    ).toEqual({
      ...initialState,
      listQuestions: allQuestionsAnswers
    });
  });
  it('must set questions and answers to store', () => {
    expect(
      QuestionsAnswers(
        initialState,
        setCurrentQuestionsAnswers(questionsAnswers)
      )
    ).toEqual({
      ...initialState,
      currentPage: questionsAnswers
    });
  });
  it('must set questions and answers loading to true', () => {
    expect(QuestionsAnswers(initialState, setLoading(true))).toEqual({
      ...initialState,
      loading: true
    });
  });
  it('must set questions and answers error to true', () => {
    expect(
      QuestionsAnswers(initialState, setQuestionsAnswersError(true))
    ).toEqual({
      ...initialState,
      error: true
    });
  });
});
