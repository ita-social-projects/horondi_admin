import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createNewsItem } from '../../../utils/client';
import { ADD_NEWS_ITEM } from './news-add.types';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

const SUCCESS_STATUS = 'Успішно додано!';

function* handleAddNews({ payload }) {
  try {
    yield call(createNewsItem, payload);
    yield put(push('/'));
    yield put(setSnackBarSeverity('success'));
    yield put(setSnackBarMessage(SUCCESS_STATUS));
    yield put(setSnackBarStatus(true));
  } catch (err) {
    console.log(err);
  }
}

export default function* newsAddSaga() {
  yield takeEvery(ADD_NEWS_ITEM, handleAddNews);
}
