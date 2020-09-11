import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { config } from '../../configs';
import { StandardButton } from '../buttons';
import { showColorDialogWindow } from '../../redux/material/material.actions';

const { ACCEPT_BUTTON_STYLE } = config.buttonStyles;

const DialogWindowForComponent = ({
  dialogTitle,
  buttonTitle,
  component,
  buttonType
}) => {
  const { isOpen } = useSelector(({ Material }) => ({
    isOpen: Material.showColorDialogWindow
  }));
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(showColorDialogWindow(false));
  };

  return (
    <Dialog
      style={{ alignContent: 'start' }}
      id='dialog-window'
      onClose={handleClose}
      open={isOpen}
    >
      <DialogTitle onClose={handleClose}>{dialogTitle}</DialogTitle>
      <DialogContent dividers>
        <div>{component}</div>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <StandardButton
          type={buttonType}
          title={buttonTitle}
          onClickHandler={handleClose}
          color={ACCEPT_BUTTON_STYLE}
        />
      </DialogActions>
    </Dialog>
  );
};
DialogWindowForComponent.propTypes = {
  dialogTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  component: PropTypes.shape({}).isRequired,
  buttonType: PropTypes.string.isRequired
};

export default DialogWindowForComponent;
