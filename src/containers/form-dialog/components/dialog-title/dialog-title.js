import React from 'react';
import { Typography } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

const DialogTitle = (props) => {
  const { children, ...other } = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant='h2'>{children}</Typography>
    </MuiDialogTitle>
  );
};

DialogTitle.propTypes = {
  children: PropTypes.string.isRequired
};

export default DialogTitle;
