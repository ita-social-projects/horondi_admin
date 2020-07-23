import {
  LOGIN_ADMIN,
  SET_ADMIN,
  LOGOUT_ADMIN,
  SET_ADMIN_ERROR,
  SET_ADMIN_LOADING
} from './admin.types';

const setAdmin = (admin) => ({
  type: SET_ADMIN,
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

const setAdminLoading = () => ({
  type: SET_ADMIN_LOADING
});

export { loginAdmin, setAdmin, setAdminError, setAdminLoading, logoutAdmin };
