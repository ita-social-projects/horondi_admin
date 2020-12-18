import {
  SET_AUTH,
  LOGIN_USER,
  LOGOUT_USER,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  CHECK_USER_BY_TOKEN
} from '../auth.types';

import {
  setAuth,
  loginUser,
  logoutUser,
  setAuthError,
  setAuthLoading,
  checkUserByToken
} from '../auth.actions';
import { email, pass, token } from './auth.variables';

describe('authorization actions tests', () => {
  it('should login user', () => {
    expect(loginUser({ email, pass })).toEqual({
      type: LOGIN_USER,
      payload: { email, pass }
    });
  });
  it('should logout user', () => {
    expect(logoutUser()).toEqual({
      type: LOGOUT_USER
    });
  });
  it('should set admin is authorized to false', () => {
    expect(setAuth(false)).toEqual({
      type: SET_AUTH,
      payload: false
    });
  });
  it('should set authorization error to true', () => {
    expect(setAuthError(true)).toEqual({
      type: SET_AUTH_ERROR,
      payload: true
    });
  });
  it('should set authorization loading to true', () => {
    expect(setAuthLoading(true)).toEqual({
      type: SET_AUTH_LOADING,
      payload: true
    });
  });
  it('Should check user by token', () => {
    expect(checkUserByToken(token)).toEqual({
      type: CHECK_USER_BY_TOKEN,
      payload: token
    });
  });
});
