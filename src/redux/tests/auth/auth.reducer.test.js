import authReducer, { initialState } from '../../auth/auth.reducer';

import {
  setAuth,
  logoutUser,
  setAuthError,
  setAuthLoading
} from '../../auth/auth.actions';

describe('authReducer tests', () => {
  it('Should return default state', () => {
    expect(authReducer()).toEqual(initialState);
  });

  it('Should set loading to true', () => {
    expect(authReducer(initialState, setAuthLoading(true))).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('Should set auth to true', () => {
    expect(authReducer(initialState, setAuth(true))).toEqual({
      ...initialState,
      isAuth: true
    });
  });

  it('Should set auth  error to true', () => {
    expect(authReducer(initialState, setAuthError(true))).toEqual({
      ...initialState,
      error: true
    });
  });

  it('Should logout', () => {
    expect(authReducer(initialState, logoutUser())).toEqual({
      ...initialState,
      isAuth: false
    });
  });
});
