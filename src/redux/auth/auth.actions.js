import {
  LOGIN_USER,
  SET_AUTH,
  LOGOUT_USER,
  SET_AUTH_ERROR,
  SET_AUTH_LOADING,
  CHECK_USER_BY_TOKEN
} from './auth.types';

const setAuth = (admin) => ({
  type: SET_AUTH,
  payload: admin
});

const loginUser = (payload) => ({
  type: LOGIN_USER,
  payload
});

const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  payload: error
});

const logoutUser = () => ({
  type: LOGOUT_USER
});

const setAuthLoading = (loading) => ({
  type: SET_AUTH_LOADING,
  payload: loading
});

const checkUserByToken = (token) => ({
  type: CHECK_USER_BY_TOKEN,
  payload: token
});

export {
  loginUser,
  setAuth,
  setAuthError,
  setAuthLoading,
  logoutUser,
  checkUserByToken
};
