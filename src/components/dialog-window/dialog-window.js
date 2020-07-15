import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../configs';
import { setDialogStatus } from '../../redux/dialog-window/dialog-window.actions';
import { StandardButton } from '../buttons';

const { CANCEL_TITLE } = config.buttonTitles;
const { ACCEPT_BUTTON_STYLE } = config.buttonStyles;

const DialogWindow = () => {
  const {
    dialogStatus,
    dialogTitle,
    dialogContent,
    buttonTitle,
    eventHandler
  } = useSelector(({ DialogWindow: dialogWindow }) => ({
    dialogStatus: dialogWindow.dialogStatus,
    dialogTitle: dialogWindow.dialogTitle,
    dialogContent: dialogWindow.dialogContent,
    buttonTitle: dialogWindow.buttonTitle,
    eventHandler: dialogWindow.eventHandler
  }));

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setDialogStatus(false));
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

export default DialogWindow;
