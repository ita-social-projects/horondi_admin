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
  disabled: idCondition,
  errors,
  values,
  ...props
}) => {
  const error = Boolean(Object.keys(errors).length);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (idCondition || error) {
      setDisabled(true);

      return;
    }

    setDisabled(false);
  }, [error, idCondition]);

  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { SAVE_MESSAGE, SAVE_CHANGES } = messages;

  return (
    <Button
      variant='contained'
      color={color}
      type={type}
      disabled={disabled}
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
  disabled: PropTypes.bool,
  values: PropTypes.objectOf(PropTypes.string),
  errors: PropTypes.objectOf(PropTypes.object)
};

SaveButton.defaultProps = {
  color: 'primary',
  errors: {},
  values: {},
  disabled: true,
  onClickHandler: noop,
  unblockFunction: () => null
};

export default SaveButton;
