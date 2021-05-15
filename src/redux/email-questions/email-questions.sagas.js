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

import { selectEmailQuestionsList } from '../selectors/email-questions.selectors';
import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';
import routes from '../../configs/routes';
import { AUTH_ERRORS } from '../../error-messages/auth';
import { handleAdminLogout } from '../auth/auth.sagas';

const { SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

export function* handleEmailQuestionsLoad({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    const response = yield call(getAllEmailQuestions, payload);

    if (response) {
      yield put(setEmailQuestionsPagesCount(Math.ceil(response?.count / 10)));
      yield put(setAllEmailQuestion(response?.questions));
      yield put(setEmailQuestionLoading(false));
    }
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handlePendingEmailQuestionsCount() {
  try {
    const count = yield call(getPendingEmailQuestionsCount);

    if (count) {
      yield put(setEmailQuestionsPendingCount(count));
    }
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleCurrentEmailQuestionLoad({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));

    const question = yield call(getEmailQuestionById, payload);

    if (question) {
      yield put(setCurrentEmailQuestion(question));
      yield put(setEmailQuestionLoading(false));
    }
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleMoveEmailQuestionsToSpam({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));

    const updatedQuestions = yield call(makeEmailQuestionsSpam, payload);

    if (updatedQuestions) {
      const emailQuestions = yield call(handleGettingQuestionFromStore);
      const newQuestionsToStore = emailQuestions.map((item) => {
        const spammedQuestion = updatedQuestions.find(
          (val) => val._id === item._id
        );
        return spammedQuestion || item;
      });

      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);
      yield put(setAllEmailQuestion(newQuestionsToStore));

      yield put(setEmailQuestionLoading(false));
      yield put(push(routes.pathToEmailQuestions));
    }
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleAnswerEmailQuestion({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    const answeredQuestion = yield call(answerEmailQuestion, payload);

    if (answeredQuestion) {
      const emailQuestions = yield call(handleGettingQuestionFromStore);
      yield call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS);

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
      yield put(push(routes.pathToEmailQuestions));
    }
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleEmailQuestionsDelete({ payload }) {
  try {
    yield put(setEmailQuestionLoading(true));
    const question = yield call(deleteEmailQuestions, payload);

    if (question) {
      const emailQuestions = yield call(handleGettingQuestionFromStore);

      yield put(
        setAllEmailQuestion(
          emailQuestions.filter(
            (item) => !payload.find((val) => val === item._id)
          )
        )
      );

      yield call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS);
      yield put(setEmailQuestionLoading(false));
    }
  } catch (error) {
    yield call(handleEmailQuestionError, error);
  }
}

export function* handleReloadingPendingQuestionsCount(list) {
  const count = list.filter((item) => item.status === 'PENDING').length;
  yield put(setEmailQuestionsPendingCount(count - 1));
}

export function* handleGettingQuestionFromStore() {
  return yield select(selectEmailQuestionsList);
}

export function* handleEmailQuestionError(e) {
  if (
    e.message === AUTH_ERRORS.REFRESH_TOKEN_IS_NOT_VALID ||
    e.message === AUTH_ERRORS.USER_IS_BLOCKED
  ) {
    yield call(handleAdminLogout);
  } else {
    yield put(setEmailQuestionLoading(false));
    yield put(setEmailQuestionsError({ e }));
    yield call(handleErrorSnackbar, e.message);
  }
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
