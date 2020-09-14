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
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { StandardButton } from '../buttons';

const { CANCEL_TITLE } = config.buttonTitles;
const { ACCEPT_BUTTON_STYLE } = config.buttonStyles;

const DialogWindow = () => {
  const {
    isOpen,
    dialogTitle,
    dialogContent,
    buttonTitle,
    onClickHandler
  } = useSelector(({ DialogWindow: dialogWindow }) => ({
    isOpen: dialogWindow.isOpen,
    dialogTitle: dialogWindow.dialogTitle,
    dialogContent: dialogWindow.dialogContent,
    buttonTitle: dialogWindow.buttonTitle,
    onClickHandler: dialogWindow.onClickHandler
  }));

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog id='dialog-window' onClose={handleClose} open={isOpen}>
      <DialogTitle onClose={handleClose}>
        <Typography variant='h4'>{dialogTitle}</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{dialogContent}</Typography>
      </DialogContent>
      <DialogActions>
        <StandardButton
          variant='outlined'
          title={CANCEL_TITLE}
          onClickHandler={handleClose}
        />
        <StandardButton
          title={buttonTitle}
          onClickHandler={onClickHandler}
          color={ACCEPT_BUTTON_STYLE}
        />
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
