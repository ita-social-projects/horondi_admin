import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { noop } from 'lodash';
import { useStyles } from './delete-button.styles';

const DeleteButton = ({ children, onClickHandler, ...props }) => {
  const styles = useStyles();

  return (
    <div className={styles.button}>
      <Button variant='outlined' onClick={onClickHandler} {...props}>
        {children}
      </Button>
    </div>
  );
};

DeleteButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClickHandler: PropTypes.func,
  size: PropTypes.string
};

DeleteButton.defaultProps = {
  size: 'medium',
  onClickHandler: noop
};

export default DeleteButton;
