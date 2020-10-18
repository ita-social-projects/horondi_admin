import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../configs';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { StandardButton, DangerButton } from '../buttons';
import { useStyles } from './dialog-window.styles';

const { CANCEL_TITLE } = config.buttonTitles;
const { ACCEPT_BUTTON_STYLE } = config.buttonStyles;

const DialogWindow = () => {
  const {
    isOpen,
    dialogTitle,
    dialogContent,
    buttonTitle,
    onClickHandler,
    buttonStyle
  } = useSelector(({ DialogWindow: dialogWindow }) => ({
    isOpen: dialogWindow.isOpen,
    dialogTitle: dialogWindow.dialogTitle,
    dialogContent: dialogWindow.dialogContent,
    buttonTitle: dialogWindow.buttonTitle,
    onClickHandler: dialogWindow.onClickHandler,
    buttonStyle: dialogWindow.buttonStyle
  }));
  const styles = useStyles();
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  };
  return (
    <Dialog id='dialog-window' onClose={handleClose} open={isOpen}>
      <DialogTitle className={styles.dialogTitle} onClose={handleClose}>
        {dialogTitle}
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
        {buttonStyle === 'danger' ? (
          <DangerButton title={buttonTitle} onClickHandler={onClickHandler} />
        ) : (
          <StandardButton
            title={buttonTitle}
            onClickHandler={onClickHandler}
            color={ACCEPT_BUTTON_STYLE}
          />
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
