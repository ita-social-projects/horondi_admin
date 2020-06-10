const setSnackBarStatus = (newSnackBarStatus) => ({
  type: 'SET_SNACKBAR_STATUS',
  payload: newSnackBarStatus
});

const setSnackBarSeverity = (newSnackBarSeverity) => ({
  type: 'SET_SNACKBAR_SEVERITY',
  payload: newSnackBarSeverity
});

const setSnackBarMessage = (newSnackBarMessage) => ({
  type: 'SET_SNACKBAR_MESSAGE',
  payload: newSnackBarMessage
});

export { setSnackBarStatus, setSnackBarSeverity, setSnackBarMessage };
