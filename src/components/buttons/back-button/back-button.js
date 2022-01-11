import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import buttonTitles from '../../../configs/button-titles';
import materialUiConstants from '../../../configs/material-ui-constants';

const {
  primary,
  outlined,
  types: { button }
} = materialUiConstants;

const BackButton = ({ type, variant, color, pathBack, ...props }) => {
  const { GO_BACK_TITLE } = buttonTitles;

  const history = useHistory();

  const backButtonHandler = () => {
    history.push(pathBack);
  };

  return (
    <Button
      type={type}
      color={color}
      variant={variant}
      onClick={backButtonHandler}
      data-cy='back-btn'
      {...props}
    >
      {GO_BACK_TITLE}
    </Button>
  );
};

BackButton.propTypes = {
  initial: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  pathBack: PropTypes.string
};
BackButton.defaultProps = {
  initial: '',
  color: primary,
  type: button,
  variant: outlined,
  pathBack: ''
};

export default BackButton;
