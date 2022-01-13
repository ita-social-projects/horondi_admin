import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import messages from '../../../configs/messages';

export const saveButtonHandler = (
  props,
  onClickHandler,
  dispatch,
  openSuccessSnackbar,
  saveMessage,
  saveChanges
) => {
  const backAction = () => {
    if (props.unblockFunction) {
      props.unblockFunction();
    }
    onClickHandler();
    dispatch(closeDialog());
  };
  openSuccessSnackbar(backAction, saveMessage, saveChanges);
  return backAction;
};

const SaveButton = ({
  title,
  type,
  onClickHandler,
  color,
  errors,
  values,
  ...props
}) => {
  const error = !!Object.keys(errors).length;
  const disable = Object.values(values).every((el) => {
    if (typeof el === 'boolean' && !error) {
      return true;
    }
    if ((el || el === 0) && !error) {
      return true;
    }
    return false;
  });

  const [disabled, setDisabled] = useState(!disable);
  useEffect(() => {
    setDisabled(!disable);
  }, [disable, values, error]);

  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { SAVE_MESSAGE, SAVE_CHANGES } = messages;

  return (
    <Button
      variant='contained'
      color={color}
      type={type}
      onClick={() => {
        saveButtonHandler(
          props,
          onClickHandler,
          dispatch,
          openSuccessSnackbar,
          SAVE_MESSAGE,
          SAVE_CHANGES
        );
        setTimeout(() => {
          if (!error) {
            setDisabled(true);
          }
        }, 10);
      }}
      disabled={disabled}
      {...props}
    >
      {title}
    </Button>
  );
};

SaveButton.propTypes = {
  onClickHandler: PropTypes.func,
  unblockFunction: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.string),
  errors: PropTypes.objectOf(PropTypes.object)
};

SaveButton.defaultProps = {
  color: 'primary',
  errors: {},
  values: {},
  onClickHandler: noop,
  unblockFunction: () => null
};

export default SaveButton;
