import {
  LOGIN_ADMIN,
  SET_AUTH,
  LOGOUT_ADMIN,
  SET_ADMIN_ERROR,
  SET_ADMIN_LOADING,
  CHECK_ADMIN_BY_TOKEN
} from './admin.types';

const setAuth = (admin) => ({
  type: SET_AUTH,
  payload: admin
});

const loginAdmin = (payload) => ({
  type: LOGIN_ADMIN,
  payload
});

const setAdminError = (error) => ({
  type: SET_ADMIN_ERROR,
  payload: error
});

const logoutAdmin = () => ({
  type: LOGOUT_ADMIN
});

const setAdminLoading = (loading) => ({
  type: SET_ADMIN_LOADING,
  payload: loading
});

const checkAdminByToken = (token) => ({
  type: CHECK_ADMIN_BY_TOKEN,
  payload: token
});

export {
  loginAdmin,
  setAuth,
  setAdminError,
  setAdminLoading,
  logoutAdmin,
  checkAdminByToken
};
