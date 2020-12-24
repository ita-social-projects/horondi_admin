import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip
} from '@material-ui/core';
import { useStyles } from './dialog-window-wrapper.styles';
import { config } from '../../configs';

const DialogWindowWrapper = ({ isOpen, handleClose, title, children }) => {
  const styles = useStyles();

  return (
    <Dialog
      style={{ alignContent: 'start' }}
      id='dialog-window'
      onClose={handleClose}
      open={isOpen}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle className={styles.dialogTitle} onClose={handleClose}>
          {title}
        </DialogTitle>
        <Tooltip
          title={config.buttonTitles.CLOSE_DIALOG_TITLE}
          placement='bottom'
        >
          <span className={styles.closeButton} onClick={handleClose}>
            &#215;
          </span>
        </Tooltip>
      </div>
      <DialogContent className={styles.dialogComponent} dividers>
        {children}
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }} />
    </Dialog>
  );
};

DialogWindowWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired
};

export default DialogWindowWrapper;
