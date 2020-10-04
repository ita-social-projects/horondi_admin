import React from 'react';
import { Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import DialogTitle from './components/dialog-title';
import DialogContent from './components/dialog-content';

const FormDialog = (props) => {
  const { isOpen, handleClose, children, title, id } = props;

  return (
    <Dialog open={isOpen} onClose={handleClose} aria-labelledby={id}>
      <DialogTitle id={id}>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

FormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export default FormDialog;
