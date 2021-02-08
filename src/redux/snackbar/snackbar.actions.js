import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_STATUS,
  SHOW_ERROR_SNACKBAR,
  SHOW_SUCCESS_SNACKBAR
} from './snackbar.types';

const setSnackBarStatus = (newSnackBarStatus) => ({
  type: SET_SNACKBAR_STATUS,
  payload: newSnackBarStatus
});

const setSnackBarSeverity = (newSnackBarSeverity) => ({
  type: SET_SNACKBAR_SEVERITY,
  payload: newSnackBarSeverity
});

const setSnackBarMessage = (newSnackBarMessage) => ({
  type: SET_SNACKBAR_MESSAGE,
  payload: newSnackBarMessage
});

const showSuccessSnackbar = (message) => ({
  type: SHOW_SUCCESS_SNACKBAR,
  payload: message
});

const showErrorSnackbar = (message) => ({
  type: SHOW_ERROR_SNACKBAR,
  payload: message
});

export {
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  showSuccessSnackbar,
  showErrorSnackbar
};
