import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './delete-button.styles';

const DeleteButton = ({ children, showIcon, onClickHandler, ...props }) => {
  const styles = useStyles();

  return (
    <div className={styles.button}>
      <Button
        variant='outlined'
        startIcon={showIcon && <DeleteIcon />}
        onClick={onClickHandler}
        {...props}
      >
        {children}
      </Button>
    </div>
  );
};

DeleteButton.propTypes = {
  children: PropTypes.node.isRequired,
  showIcon: PropTypes.bool,
  onClickHandler: PropTypes.func,
  size: PropTypes.string
};

DeleteButton.defaultProps = {
  showIcon: true,
  size: 'medium',
  onClickHandler: () => {}
};

export default DeleteButton;
