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
import DeleteButton from '../buttons/delete-button';

const { CANCEL_TITLE } = config.buttonTitles;

const DialogWindow = () => {
  const {
    isOpen,
    dialogTitle,
    dialogContent,
    buttonTitle,
    showCancelButton,
    onClickHandler
  } = useSelector(({ DialogWindow: dialogWindow }) => ({
    isOpen: dialogWindow.isOpen,
    dialogTitle: dialogWindow.dialogTitle,
    dialogContent: dialogWindow.dialogContent,
    buttonTitle: dialogWindow.buttonTitle,
    showCancelButton: dialogWindow.showCancelButton,
    onClickHandler: dialogWindow.onClickHandler
  }));

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeDialog());
  };

  return (
    <Dialog id='dialog-window' onClose={handleClose} open={isOpen}>
      <DialogTitle onClose={handleClose}>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>{dialogContent}</Typography>
      </DialogContent>
      <DialogActions>
        {showCancelButton && (
          <StandardButton
            variant='outlined'
            title={CANCEL_TITLE}
            onClickHandler={handleClose}
          />
        )}
        <DeleteButton onClick={onClickHandler}>{buttonTitle}</DeleteButton>
      </DialogActions>
    </Dialog>
  );
};

export default DialogWindow;
