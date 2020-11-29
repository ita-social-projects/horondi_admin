import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { combineReducers } from 'redux';

import {
  handleCurrentEmailQuestionLoad,
  handleEmailQuestionsLoad,
  handleGettingQuestionFromStore,
  handleMoveEmailQuestionsToSpam,
  handlePendingEmailQuestionsCount,
  handleSuccessSnackBar
} from '../email-questions.sagas';

import {
  answerEmailQuestion,
  deleteEmailQuestions,
  getAllEmailQuestions,
  getEmailQuestionById,
  getPendingEmailQuestionsCount,
  makeEmailQuestionsSpam
} from '../email-questions.operations';

import {
  count,
  emailQuestionsPayload,
  emailQuestionsState,
  id,
  mockDeletedQuestion,
  mockMoveQuestionToSpam,
  mockMoveQuestionToSpamPayload,
  mockQuestion,
  mockQuestions
} from './email-questions.variables';

import emailQuestionsReducer from '../email-questions.reducer';

import {
  setAllEmailQuestion,
  setCurrentEmailQuestion,
  setEmailQuestionLoading,
  setEmailQuestionsPagesCount,
  setEmailQuestionsPendingCount
} from '../email-questions.actions';

import { config } from '../../../configs';

const { SUCCESS_UPDATE_STATUS } = config.statuses;

describe('email questions sagas test', () => {
  it(' should not throw error', () => {
    expect(getAllEmailQuestions).not.toThrow();
    expect(getEmailQuestionById).not.toThrow();
    expect(deleteEmailQuestions).not.toThrow();
    expect(makeEmailQuestionsSpam).not.toThrow();
    expect(answerEmailQuestion).not.toThrow();
    expect(getPendingEmailQuestionsCount).not.toThrow();
  });

  it('should load all email questions', () => {
    expectSaga(handleEmailQuestionsLoad, { payload: emailQuestionsPayload })
      .withReducer(combineReducers({ emailQuestionsReducer }), {
        emailQuestionsReducer: emailQuestionsState
      })
      .put(setEmailQuestionLoading(true))
      .provide([
        [call(getAllEmailQuestions, emailQuestionsPayload), mockQuestions]
      ])
      .put(setEmailQuestionsPagesCount(mockQuestions.count))
      .put(setAllEmailQuestion(mockQuestions.questions))
      .put(setEmailQuestionLoading(false))
      .hasFinalState({
        emailQuestionsReducer: {
          ...emailQuestionsState,
          pagination: {
            ...emailQuestionsState.pagination
          },
          list: mockQuestions.questions
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      });
  });

  it('should handle pending email questions count', () => {
    expectSaga(handlePendingEmailQuestionsCount)
      .withReducer(combineReducers({ emailQuestionsReducer }), {
        emailQuestionsReducer: emailQuestionsState
      })
      .provide([[call(getPendingEmailQuestionsCount), count]])
      .put(setEmailQuestionsPendingCount(count))
      .hasFinalState({
        emailQuestionsReducer: {
          ...emailQuestionsState,
          pagination: {
            ...emailQuestionsState.pagination
          },
          pendingCount: count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(1);
      });
  });

  it('should handle current email question load', () => {
    expectSaga(handleCurrentEmailQuestionLoad, { payload: id })
      .withReducer(combineReducers({ emailQuestionsReducer }), {
        emailQuestionsReducer: emailQuestionsState
      })
      .put(setEmailQuestionLoading(true))
      .provide([[call(getEmailQuestionById, id), mockQuestion]])
      .put(setCurrentEmailQuestion(mockQuestion))
      .put(setEmailQuestionLoading(false))
      .hasFinalState({
        emailQuestionsReducer: {
          ...emailQuestionsState,
          currentQuestion: mockQuestion
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      });
  });

  it('should move email questions to spam', () => {
    expectSaga(handleMoveEmailQuestionsToSpam, {
      payload: mockMoveQuestionToSpamPayload
    })
      .withReducer(combineReducers({ emailQuestionsReducer }), {
        emailQuestionsReducer: emailQuestionsState
      })
      .put(setEmailQuestionLoading(true))
      .provide([
        [
          call(makeEmailQuestionsSpam, mockMoveQuestionToSpamPayload),
          mockMoveQuestionToSpam
        ],
        [call(handleGettingQuestionFromStore), mockMoveQuestionToSpam],
        [call(handleSuccessSnackBar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(setAllEmailQuestion(mockMoveQuestionToSpam))
      .put(setEmailQuestionLoading(false))
      .hasFinalState({
        emailQuestionsReducer: {
          ...emailQuestionsState,
          pagination: {
            ...emailQuestionsState.pagination
          },
          list: mockMoveQuestionToSpam
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(4);
      });
  });
});
