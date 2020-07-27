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

const loginAdmin = (payload) => ({
  type: LOGIN_USER,
  payload
});

const setAuthError = (error) => ({
  type: SET_AUTH_ERROR,
  payload: error
});

const logoutAdmin = () => ({
  type: LOGOUT_USER
});

const setAuthLoading = (loading) => ({
  type: SET_AUTH_LOADING,
  payload: loading
});

const checkAdminByToken = (token) => ({
  type: CHECK_USER_BY_TOKEN,
  payload: token
});

export {
  loginAdmin,
  setAuth,
  setAuthError,
  setAuthLoading,
  logoutAdmin,
  checkAdminByToken
};
