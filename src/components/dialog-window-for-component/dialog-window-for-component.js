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
import { useStyles } from './dialog-window-for-component.style';

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
  const styles = useStyles();
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
      <DialogContent className={styles.dialogComponent} dividers>
        {component}
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
