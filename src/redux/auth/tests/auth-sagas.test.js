import { expectSaga } from 'redux-saga-test-plan';
import { call, put } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  LOGIN_USER,
  SET_AUTH,
  SET_AUTH_LOADING,
  SET_ADMIN_ID,
  LOGOUT_USER,
  CHECK_USER_BY_TOKEN
} from '../auth.types';
import {
  handleAdminLoad,
  handleAdminCheckByToken,
  handleAdminLogout
} from '../auth.sagas';
import { getFromLocalStorage } from '../../../services/local-storage.service';
import { loginAdmin, getUserByToken } from '../auth.operations';
import { email, password, token, userId, loginData } from './auth.variables';

import { setAuth, setAuthLoading, setAdminId } from '../auth.actions';

jest.mock('../../../services/local-storage.service');

describe('auth sagas tests', () => {
  it('should login', () =>
    expectSaga(handleAdminLoad, {
      payload: { loginInput: { email, password } }
    })
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
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(6);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(5);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_AUTH_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_ADMIN_ID, payload: userId })
        );
        expect(analysisPut[2]).toEqual(put({ type: SET_AUTH, payload: true }));
        expect(analysisPut[3]).toEqual(
          put({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/stats'] }
          })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_AUTH_LOADING, payload: false })
        );
      }));

  it('shouls check admin by token', () =>
    expectSaga(handleAdminCheckByToken)
      .provide([[call(getUserByToken, token), { _id: userId, email }]])
      .put(setAuthLoading(true))
      .put(setAdminId(userId))
      .put(setAuth(true))
      .put(setAuthLoading(false))
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        expect(analysis).toHaveLength(5);
        const analysisPut = analysis.filter((el) => el.type === 'PUT');
        const analysisCall = analysis.filter((el) => el.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_AUTH_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ payload: userId, type: SET_ADMIN_ID })
        );
        expect(analysisPut[2]).toEqual(put({ payload: true, type: SET_AUTH }));
        expect(analysisPut[3]).toEqual(
          put({ type: SET_AUTH_LOADING, payload: false })
        );
      }));

  it('should handle admin logout', () =>
    expectSaga(handleAdminLogout, LOGOUT_USER)
      .put(setAuth(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(2);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
        expect(analysisPut[0]).toEqual(put({ type: SET_AUTH, payload: false }));
        expect(analysisPut[1]).toEqual(
          put({
            type: '@@router/CALL_HISTORY_METHOD',
            payload: { method: 'push', args: ['/'] }
          })
        );
      }));
});
