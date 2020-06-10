import React from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core/';

import { setDialogStatus } from '../../actions';
import { StandardButton } from '../buttons';

const CANCEL_TITLE = 'Cancel';
const ACCEPT_BUTTON_STYLE = 'secondary';

const DialogWindow = ({
  setDialogStatus,
  dialogStatus,
  dialogTitle,
  dialogContent,
  buttonTitle,
  eventHandler
}) => {
  const handleClose = () => {
    setDialogStatus(false);
  };

  return (
    <Dialog id='dialog-window' onClose={handleClose} open={dialogStatus}>
      <DialogTitle onClose={handleClose}>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{dialogContent}</Typography>
      </DialogContent>
      <DialogActions>
        <StandardButton title={CANCEL_TITLE} eventHandler={handleClose} />
        <StandardButton
          title={buttonTitle}
          eventHandler={eventHandler}
          color={ACCEPT_BUTTON_STYLE}
        />
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = ({
  dialogWindowState: {
    dialogStatus,
    dialogTitle,
    dialogContent,
    buttonTitle,
    eventHandler
  }
}) => ({ dialogStatus, dialogTitle, dialogContent, buttonTitle, eventHandler });

const mapDispatchToProps = { setDialogStatus };

export default connect(mapStateToProps, mapDispatchToProps)(DialogWindow);
