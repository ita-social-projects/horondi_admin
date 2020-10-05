import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import DialogTitle from './components/dialog-title';
import DialogContent from './components/dialog-content';

const FormDialog = (props) => {
  const { isOpen, handleClose, children, title, ...other } = props;

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      data-cy='form-dialog-window'
      {...other}
    >
      <DialogTitle data-cy='form-dialog-title'>{title}</DialogTitle>
      <DialogContent data-cy='form-dialog-content'>{children}</DialogContent>
    </Dialog>
  );
};

FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired
};

export default FormDialog;
