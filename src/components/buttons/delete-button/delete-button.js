import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './delete-button.styles';

const DeleteButton = ({ children, ...props }) => {
  const styles = useStyles();

  return (
    <div className={styles.button}>
      <Button variant='outlined' startIcon={<DeleteIcon />} {...props}>
        {children}
      </Button>
    </div>
  );
};

DeleteButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default DeleteButton;
