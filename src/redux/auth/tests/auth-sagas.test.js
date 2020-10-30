import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { LOGIN_USER } from '../auth.types';
import { handleAdminLoad } from '../auth.sagas';

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
