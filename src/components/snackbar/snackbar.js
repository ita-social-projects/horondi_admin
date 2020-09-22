import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { setSnackBarStatus } from '../../redux/snackbar/snackbar.actions';
import { config } from '../../configs';

const { snackBarDuration } = config.app;

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const SnackbarItem = () => {
  const dispatch = useDispatch();

  const { snackBarStatus, snackBarSeverity, snackBarMessage } = useSelector(
    ({ Snackbar: snackbar }) => ({
      snackBarStatus: snackbar.snackBarStatus,
      snackBarSeverity: snackbar.snackBarSeverity,
      snackBarMessage: snackbar.snackBarMessage
    })
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setSnackBarStatus(false));
  };

  return (
    <Snackbar
      id='snack-bar'
      open={snackBarStatus}
      autoHideDuration={snackBarDuration}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={snackBarSeverity}
        data-cy='snack-bar-message'
      >
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarItem;
