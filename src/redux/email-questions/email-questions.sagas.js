import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setAllEmailQuestion,
  setEmailQuestionLoading,
  setEmailQuestionsError,
  setCurrentEmailQuestion,
  setEmailQuestionsCount,
  setEmailQuestionsPendingCount
} from './email-questions.actions';
import {
  getAllEmailQuestions,
  getEmailQuestionById,
  makeEmailQuestionSpam,
  answerEmailQuestion,
  deleteEmailQuestion,
  getPendingEmailQuestionsCount
} from './email-questions.operations';
import {
  GET_ALL_EMAIL_QUESTIONS,
  GET_EMAIL_QUESTION_BY_ID,
  DELETE_EMAIL_QUESTION,
  MAKE_EMAIL_QUESTION_SPAM,
  GET_EMAIL_QUESTIONS_PENDING_COUNT,
  ANSWER_TO_EMAIL_QUESTION
} from './email-questions.types';

import { config } from '../../configs';

import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../snackbar/snackbar.actions';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

export function* handleEmailQuestionsLoad({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    const response = yield call(getAllEmailQuestions, payload);

    yield put(setEmailQuestionsCount(response.count));
    yield put(setAllEmailQuestion(response.questions));
    yield call(handlePendingEmailQuestionsCount);

    yield put(setEmailQuestionLoading(false));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handlePendingEmailQuestionsCount() {
  try {
    const count = yield call(getPendingEmailQuestionsCount);
    yield put(setEmailQuestionsPendingCount(count));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleCurrentEmailQuestionLoad({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));

    const question = yield call(getEmailQuestionById, payload);
    yield put(setCurrentEmailQuestion(question));

    yield put(setEmailQuestionLoading(false));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleMakeEmailQuestionSpam({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    yield call(makeEmailQuestionSpam, payload);

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));

    yield put(setEmailQuestionLoading(false));
    yield put(push('/email-questions'));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleAnswerEmailQuestion({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    yield call(answerEmailQuestion, payload);

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_UPDATE_STATUS));
    yield put(setSnackBarStatus(true));

    yield put(setEmailQuestionLoading(false));
    yield put(push('/email-questions'));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleEmailQuestionDelete({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    yield call(deleteEmailQuestion, payload);

    const emailQuestions = yield select(
      ({ EmailQuestions }) => EmailQuestions.list
    );
    yield put(
      setAllEmailQuestion(emailQuestions.filter((item) => item._id !== payload))
    );

    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_DELETE_STATUS));
    yield put(setSnackBarStatus(true));

    yield put(setEmailQuestionLoading(false));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleEmailQuestionError(e) {
  yield put(setEmailQuestionLoading(false));
  yield put(setEmailQuestionsError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export default function* emailQuestionSaga() {
  yield takeEvery(GET_ALL_EMAIL_QUESTIONS, handleEmailQuestionsLoad);
  yield takeEvery(GET_EMAIL_QUESTION_BY_ID, handleCurrentEmailQuestionLoad);
  yield takeEvery(DELETE_EMAIL_QUESTION, handleEmailQuestionDelete);
  yield takeEvery(MAKE_EMAIL_QUESTION_SPAM, handleMakeEmailQuestionSpam);
  yield takeEvery(ANSWER_TO_EMAIL_QUESTION, handleAnswerEmailQuestion);
  yield takeEvery(
    GET_EMAIL_QUESTIONS_PENDING_COUNT,
    handlePendingEmailQuestionsCount
  );
}
