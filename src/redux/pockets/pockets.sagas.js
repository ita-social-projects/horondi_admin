import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createPockets } from './pockets.operations';
import { config } from '../../configs';
import { ADD_POCKET } from './pockets.types';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../snackbar/snackbar.sagas';

const { SUCCESS_ADD_STATUS } = config.statuses;

export function* handlePocketsAdd({ payload }) {
  try {
    const pocket = yield call(createPockets, payload);
    if (pocket) {
      yield call(handleSuccessSnackbar, SUCCESS_ADD_STATUS);
      yield put(push(config.routes.pathToSidePockets));
    }
  } catch (e) {
    yield call(handlePocketsError, e);
  }
}

export function* handlePocketsError(e) {
  yield call(handleErrorSnackbar, e.message);
}

export default function* pocketsSaga() {
  yield takeEvery(ADD_POCKET, handlePocketsAdd);
}
