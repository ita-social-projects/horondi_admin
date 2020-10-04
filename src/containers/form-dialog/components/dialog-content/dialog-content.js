import React from 'react';
import MuiDialogContent from '@material-ui/core/DialogContent';
import PropTypes from 'prop-types';
import { useStyles } from './dialog-content.styles';

const DialogContent = (props) => {
  const { children, ...other } = props;

  const styles = useStyles();

  return (
    <MuiDialogContent className={styles.root} {...other}>
      {children}
    </MuiDialogContent>
  );
};

DialogContent.propTypes = {
  children: PropTypes.element.isRequired
};

export default DialogContent;
