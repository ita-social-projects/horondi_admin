import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import messages from '../../../configs/messages';

export const saveButtonHandler = (
  unblockFunction,
  onClickHandler,
  dispatch,
  openSuccessSnackbar,
  saveMessage,
  saveChanges
) => {
  const backAction = () => {
    if (unblockFunction) {
      unblockFunction();
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
  unblockFunction,
  ...props
}) => {
  const error = !!Object.keys(errors).length;
  const changed = useChangedValuesChecker(values, errors);

  const disable = Object.values(values).every((el) => {
    if (typeof el === 'boolean' && !error) {
      return true;
    }

    return !error && changed;
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
          unblockFunction,
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
  values: PropTypes.objectOf(PropTypes.any),
  errors: PropTypes.objectOf(PropTypes.object)
};

SaveButton.defaultProps = {
  color: 'primary',
  errors: {},
  values: {},
  onClickHandler: noop,
  unblockFunction: noop
};

export default SaveButton;
