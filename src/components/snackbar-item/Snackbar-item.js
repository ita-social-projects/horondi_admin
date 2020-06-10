import React from 'react';
import { connect } from 'react-redux';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { setSnackBarStatus } from '../../actions';

import { config } from '../../config';

const { snackBarDuration } = config.app;

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const SnackbarItem = ({
  snackBarStatus,
  snackBarSeverity,
  snackBarMessage,
  setSnackBarStatus
}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarStatus(false);
  };

  return (
    <Snackbar
      id='snack-bar'
      open={snackBarStatus}
      autoHideDuration={snackBarDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={snackBarSeverity}>
        {snackBarMessage}
      </Alert>
    </Snackbar>
  );
};

const mapStateToProps = ({
  snackbarState: { snackBarStatus, snackBarSeverity, snackBarMessage }
}) => ({ snackBarStatus, snackBarSeverity, snackBarMessage });

const mapDispatchToProps = { setSnackBarStatus };

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarItem);
