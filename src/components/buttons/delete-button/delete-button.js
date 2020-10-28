import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './delete-button.styles';

const DeleteButton = ({ children, onClickHandler, ...props }) => {
  const styles = useStyles();

  return (
    <div className={styles.button}>
      <Button
        variant='outlined'
        startIcon={<DeleteIcon />}
        onClick={onClickHandler}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

DeleteButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  size: PropTypes.string,
  children: PropTypes.node.isRequired
};

DeleteButton.defaultProps = {
  size: 'medium'
};

export default DeleteButton;
