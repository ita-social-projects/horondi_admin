import { takeEvery, call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setAllEmailQuestion,
  setEmailQuestionLoading,
  setEmailQuestionsError,
  setCurrentEmailQuestion,
  setEmailQuestionsPagesCount,
  setEmailQuestionsPendingCount
} from './email-questions.actions';
import {
  getAllEmailQuestions,
  getEmailQuestionById,
  makeEmailQuestionsSpam,
  answerEmailQuestion,
  deleteEmailQuestions,
  getPendingEmailQuestionsCount
} from './email-questions.operations';
import {
  GET_ALL_EMAIL_QUESTIONS,
  GET_EMAIL_QUESTION_BY_ID,
  DELETE_EMAIL_QUESTIONS,
  MOVE_EMAIL_QUESTIONS_TO_SPAM,
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

    yield put(setEmailQuestionsPagesCount(Math.ceil(response.count / 10)));
    yield put(setAllEmailQuestion(response.questions));

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

export function* handleMoveEmailQuestionsToSpam({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));

    const updatedQuestions = yield call(makeEmailQuestionsSpam, payload);
    const emailQuestions = yield call(handleGettingQuestionFromStore);
    const newQuestionsToStore = emailQuestions.map((item) => {
      const spammedQuestion = updatedQuestions.find(
        (val) => val._id === item._id
      );
      return spammedQuestion || item;
    });

    yield call(handleSuccessSnackBar, SUCCESS_UPDATE_STATUS);
    yield put(setAllEmailQuestion(newQuestionsToStore));

    yield put(setEmailQuestionLoading(false));
    yield put(push('/email-questions'));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleAnswerEmailQuestion({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    const answeredQuestion = yield call(answerEmailQuestion, payload);

    const emailQuestions = yield call(handleGettingQuestionFromStore);
    yield call(handleSuccessSnackBar, SUCCESS_UPDATE_STATUS);

    yield put(
      setAllEmailQuestion(
        emailQuestions.map((item) => {
          if (item._id === answeredQuestion._id) {
            return answeredQuestion;
          }
          return item;
        })
      )
    );

    yield call(handleReloadingPendingQuestionsCount, emailQuestions);

    yield put(setEmailQuestionLoading(false));
    yield put(push('/email-questions'));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleEmailQuestionsDelete({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    yield call(deleteEmailQuestions, payload);

    const emailQuestions = yield call(handleGettingQuestionFromStore);

    yield put(
      setAllEmailQuestion(
        emailQuestions.filter(
          (item) => !payload.find((val) => val === item._id)
        )
      )
    );

    yield call(handleSuccessSnackBar, SUCCESS_DELETE_STATUS);
    yield put(setEmailQuestionLoading(false));
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleReloadingPendingQuestionsCount(list) {
  const count = list.filter((item) => item.status === 'PENDING').length;
  yield put(setEmailQuestionsPendingCount(count - 1));
}

export function* handleGettingQuestionFromStore() {
  return yield select(({ EmailQuestions }) => EmailQuestions.list);
}

export function* handleEmailQuestionError(e) {
  yield put(setEmailQuestionLoading(false));
  yield put(setEmailQuestionsError({ e }));
  yield put(setSnackBarSeverity('error'));
  yield put(setSnackBarMessage(e.message));
  yield put(setSnackBarStatus(true));
}

export function* handleSuccessSnackBar(message) {
  yield put(setSnackBarSeverity('success'));
  yield put(setSnackBarMessage(message));
  yield put(setSnackBarStatus(true));
}

export default function* emailQuestionSaga() {
  yield takeEvery(GET_ALL_EMAIL_QUESTIONS, handleEmailQuestionsLoad);
  yield takeEvery(GET_EMAIL_QUESTION_BY_ID, handleCurrentEmailQuestionLoad);
  yield takeEvery(DELETE_EMAIL_QUESTIONS, handleEmailQuestionsDelete);
  yield takeEvery(MOVE_EMAIL_QUESTIONS_TO_SPAM, handleMoveEmailQuestionsToSpam);
  yield takeEvery(ANSWER_TO_EMAIL_QUESTION, handleAnswerEmailQuestion);
  yield takeEvery(
    GET_EMAIL_QUESTIONS_PENDING_COUNT,
    handlePendingEmailQuestionsCount
  );
}
