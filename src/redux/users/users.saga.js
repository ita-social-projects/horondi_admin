import { takeEvery, call, put } from 'redux-saga/effects';

import { getAllUsers } from './users.operations';

import { setUsers } from './users.actions';

import { GET_USERS } from './users.types';

function* handleUsersLoad() {
  try {
    const users = yield call(getAllUsers, null);
    yield put(setUsers(users));
  } catch (err) {
    console.log(err);
  }
}

export default function* usersSaga() {
  yield takeEvery(GET_USERS, handleUsersLoad);
}
