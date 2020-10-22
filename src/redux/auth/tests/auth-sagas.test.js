import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  SET_AUTH,
  LOGIN_USER,
  LOGOUT_USER,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  CHECK_USER_BY_TOKEN
} from '../auth.types';
import {
  handleAdminCheckByToken,
  handleAdminLoad,
  handleAdminLogout
} from '../auth.sagas';

import { loginAdmin } from '../auth.operations';
import { email, password } from './auth.variables';
import { setAuth, setAuthLoading } from '../auth.actions';

describe('auth sagas tests', () => {
  it('should login', () => {
    expectSaga(handleAdminLoad, LOGIN_USER)
      .provide([[matchers.call.fn(loginAdmin), { email, password }]])
      .put(setAuthLoading(true))
      .put(setAuth(true))
      .put(setAuthLoading(false))
      .run();
  });
});
