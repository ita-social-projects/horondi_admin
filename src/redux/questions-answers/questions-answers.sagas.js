import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setQuestionsAnswers,
  setLoading,
  setQuestionsAnswersError,
  setCurrentQuestionsAnswers,
  removeQuestionsAnswersFromStore
} from './questions-answers.actions';
import {
  getAllQuestionsAnswers,
  getQuestionsAnswersById,
  createQuestionsAnswers,
  deleteQuestionsAnswers,
  updateQuestionsAnswers
} from './questions-answers.operations';
import {
  ADD_QUESTIONS_ANSWERS,
  DELETE_QUESTIONS_ANSWERS,
  GET_ALL_QUESTIONS_ANSWERS,
  GET_QUESTIONS_ANSWERS_BY_ID,
  UPDATE_QUESTIONS_ANSWERS
} from './questions-answers.types';

import { config } from '../../configs';

import {
  handleSuccessSnackbar,
  handleErrorSnackbar
} from '../snackbar/snackbar.sagas';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  config.statuses;

const { routes } = config;

export function* handleQuestionsAnswersLoad() {
  try {
    yield put(setLoading(true));
    const questionsAnswers = yield call(getAllQuestionsAnswers);
    yield put(setQuestionsAnswers(questionsAnswers));
    yield put(setLoading(false));
  } catch (error) {
    yield call(handleQuestionsAnswersError, error);
  }
}

export function* handleCurrentQuestionsAnswersLoad({ payload }) {
  try {
    yield put(setLoading(true));
    const questionsAnswers = yield call(getQuestionsAnswersById, payload);
    yield put(setCurrentQuestionsAnswers(questionsAnswers));
    yield put(setLoading(false));
  } catch (error) {
    yield call(handleQuestionsAnswersError, error);
  }
}

export function* handleAddQuestionsAnswers({ payload }) {
  try {
    yield put(setLoading(true));
    const questionsAnswers = yield call(createQuestionsAnswers, payload);

    if (questionsAnswers) {
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(setLoading(false));
      yield put(push(routes.pathToBusinessPages));
    }
  } catch (error) {
    yield call(handleQuestionsAnswersError, error);
  }
}

export function* handleQuestionsAnswersDelete({ payload }) {
  try {
    yield put(setLoading(true));
    const questionsAnswers = yield call(deleteQuestionsAnswers, payload);

    if (questionsAnswers) {
      yield put(removeQuestionsAnswersFromStore(payload));
      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
      yield put(setLoading(false));
    }
  } catch (error) {
    yield call(handleQuestionsAnswersError, error);
  }
}

export function* handleQuestionsAnswersUpdate({ payload }) {
  try {
    yield put(setLoading(true));
    const questionsAnswers = yield call(updateQuestionsAnswers, payload);

    if (questionsAnswers) {
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(setLoading(false));
      yield put(push(routes.pathToBusinessPages));
    }
  } catch (error) {
    yield call(handleQuestionsAnswersError, error);
  }
}

export function* handleQuestionsAnswersError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setLoading(false));
    yield put(setQuestionsAnswersError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
}

export default function* questionsAnswersSaga() {
  yield takeEvery(GET_ALL_QUESTIONS_ANSWERS, handleQuestionsAnswersLoad);
  yield takeEvery(ADD_QUESTIONS_ANSWERS, handleAddQuestionsAnswers);
  yield takeEvery(DELETE_QUESTIONS_ANSWERS, handleQuestionsAnswersDelete);
  yield takeEvery(
    GET_QUESTIONS_ANSWERS_BY_ID,
    handleCurrentQuestionsAnswersLoad
  );
  yield takeEvery(UPDATE_QUESTIONS_ANSWERS, handleQuestionsAnswersUpdate);
}
