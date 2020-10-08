import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './danger-button.styles';

const DangerButton = ({
  onClickHandler,
  title,
  type = 'button',
  color = 'secondary',
  ...props
}) => {
  const styles = useStyles();
  return (
    <Button
      className={styles.root}
      type={type}
      color={color}
      variant='contained'
      onClick={onClickHandler}
      {...props}
    >
      {title}
    </Button>
  );
};

DangerButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

export default DangerButton;
