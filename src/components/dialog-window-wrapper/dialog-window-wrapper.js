import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, Tooltip } from '@material-ui/core';
import { useStyles } from './dialog-window-wrapper.styles';
import { config } from '../../configs';

const DialogWindowWrapper = ({ isOpen, handleClose, title, children }) => {
  const styles = useStyles();

  return (
    <Dialog
      className={styles.dialogComponent}
      id='dialog-window'
      onClose={handleClose}
      open={isOpen}
    >
      <div className={styles.dialogTitleWrapper}>
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
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
};

DialogWindowWrapper.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.element
};

DialogWindowWrapper.defaultProps = {
  children: null
};

export default DialogWindowWrapper;
