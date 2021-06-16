import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import buttonTitles from '../../../configs/button-titles';
import messages from '../../../configs/messages';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import materialUiConstants from '../../../configs/material-ui-constants';

const {
  primary,
  outlined,
  types: { button }
} = materialUiConstants;

const BackButton = ({ type, variant, color, initial, pathBack, ...props }) => {
  const { GO_BACK_TITLE, EXIT_WITHOUT_SAVING } = buttonTitles;
  const { BACK_BUTTON_WARNING_MESSAGE } = messages;
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const history = useHistory();
  const dispatch = useDispatch();

  const backButtonHandler = () => {
    const backAction = () => {
      dispatch(closeDialog());
      history.push(pathBack);
    };
    if (initial) {
      openSuccessSnackbar(
        backAction,
        BACK_BUTTON_WARNING_MESSAGE,
        EXIT_WITHOUT_SAVING
      );
    } else {
      history.push(pathBack);
    }
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
  initial: PropTypes.bool,
  color: PropTypes.string,
  type: PropTypes.string,
  variant: PropTypes.string,
  pathBack: PropTypes.string
};
BackButton.defaultProps = {
  initial: false,
  color: primary,
  type: button,
  variant: outlined,
  pathBack: ''
};

export default BackButton;
