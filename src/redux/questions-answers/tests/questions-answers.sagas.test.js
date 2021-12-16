import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {
  handleQuestionsAnswersLoad,
  handleCurrentQuestionsAnswersLoad,
  handleAddQuestionsAnswers,
  handleQuestionsAnswersUpdate,
  handleQuestionsAnswersDelete,
  handleQuestionsAnswersError
} from '../questions-answers.sagas';
import {
  setQuestionsAnswers,
  setLoading,
  setCurrentQuestionsAnswers,
  setQuestionsAnswersError,
  removeQuestionsAnswersFromStore
} from '../questions-answers.actions';
import { config } from '../../../configs';

import {
  allQuestionsAnswers,
  questionsAnswersId,
  questionsAnswers,
  fakeQuestionsAnswers,
  questionsAnswersToUpdate,
  questionsAnswersToCreate,
  error
} from './questions-answers.variables';

import {
  getAllQuestionsAnswers,
  createQuestionsAnswers,
  deleteQuestionsAnswers,
  getQuestionsAnswersById,
  updateQuestionsAnswers
} from '../questions-answers.operations';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../../snackbar/snackbar.sagas';
import QuestionsAnswers from '../questions-answers.reducer';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

describe('questions answers sagas test', () => {
  it('must get all questions answers and set to store', () =>
    expectSaga(handleQuestionsAnswersLoad)
      .withReducer(QuestionsAnswers)
      .provide([[call(getAllQuestionsAnswers), allQuestionsAnswers]])
      .put(setLoading(true))
      .put(setQuestionsAnswers(allQuestionsAnswers))
      .put(setLoading(false))
      .hasFinalState({
        listQuestions: [...allQuestionsAnswers],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));
  it('must get one question and set to store', () =>
    expectSaga(handleCurrentQuestionsAnswersLoad, {
      payload: questionsAnswersId
    })
      .withReducer(QuestionsAnswers)
      .provide([
        [
          call(getQuestionsAnswersById, questionsAnswersId),
          fakeQuestionsAnswers
        ]
      ])
      .put(setLoading(true))
      .put(setCurrentQuestionsAnswers(fakeQuestionsAnswers))
      .put(setLoading(false))
      .hasFinalState({
        listQuestions: [],
        currentPage: fakeQuestionsAnswers,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('must to add questions answers', () =>
    expectSaga(handleAddQuestionsAnswers, { payload: questionsAnswersToCreate })
      .withReducer(QuestionsAnswers)
      .provide([
        [
          call(createQuestionsAnswers, questionsAnswersToCreate),
          { _id: questionsAnswers._id }
        ],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setLoading(true))
      .put(setLoading(false))
      .hasFinalState({
        listQuestions: [],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('must to update questions answers', () =>
    expectSaga(handleQuestionsAnswersUpdate, {
      payload: questionsAnswersToUpdate
    })
      .withReducer(QuestionsAnswers)
      .provide([
        [
          call(updateQuestionsAnswers, questionsAnswersToUpdate),
          {
            _id: questionsAnswersToUpdate.id,
            question: { value: questionsAnswersToUpdate.page.question.value }
          }
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(setLoading(true))
      .put(setLoading(false))
      .hasFinalState({
        listQuestions: [],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));
  it('must handle questions error', () => {
    expectSaga(handleQuestionsAnswersError, error)
      .withReducer(QuestionsAnswers)
      .provide([[call(handleErrorSnackbar, error.message)]])
      .put(setLoading(false))
      .put(setQuestionsAnswersError({ e: error }))
      .hasFinalState({
        listQuestions: [],
        currentPage: null,
        loading: false,
        error: { e: error }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      });
  });
});
