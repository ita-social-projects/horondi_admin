import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { LOGOUT_USER } from '../auth.types';
import {
  handleAdminLoad,
  handleAdminCheckByToken,
  handleAdminLogout
} from '../auth.sagas';
import { loginAdmin, getUserByToken } from '../auth.operations';
import { email, password, token, userId } from './auth.variables';

import { setAuth, setAuthLoading, setAdminId } from '../auth.actions';

import authReducer, { initialState } from '../auth.reducer';

jest.mock('../../../services/local-storage.service');

describe('auth sagas tests', () => {
  it('should login', () =>
    expectSaga(handleAdminLoad, {
      payload: { loginInput: { email, password } }
    })
      .withReducer(authReducer)
      .provide([
        [
          call(loginAdmin, { loginInput: { email, password } }),
          { token, _id: userId }
        ]
      ])
      .put(setAuthLoading(true))
      .put(setAdminId(userId))
      .put(setAuth(true))
      .put(setAuthLoading(false))
      .hasFinalState({
        ...initialState,
        adminId: userId,
        isAuth: true
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(6);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(1);
      }));

  it('shouls check admin by token', () =>
    expectSaga(handleAdminCheckByToken)
      .withReducer(authReducer)
      .provide([[call(getUserByToken, token), { _id: userId, email }]])
      .put(setAuthLoading(true))
      .put(setAdminId(userId))
      .put(setAuth(true))
      .put(setAuthLoading(false))
      .hasFinalState({
        ...initialState,
        adminId: userId,
        isAuth: true
      })
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        expect(analysis).toHaveLength(5);
        const analysisPut = analysis.filter((el) => el.type === 'PUT');
        const analysisCall = analysis.filter((el) => el.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      }));

  it('should handle admin logout', () =>
    expectSaga(handleAdminLogout, LOGOUT_USER)
      .withReducer(authReducer)
      .put(setAuth(false))
      .hasFinalState({
        ...initialState,
        isAuth: false
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(2);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      }));
});
