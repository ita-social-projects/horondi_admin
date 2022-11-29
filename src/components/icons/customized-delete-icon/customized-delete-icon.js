import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { noop } from 'lodash';
import { config } from '../../../configs';

const { DELETE_TITLE } = config.buttonTitles;

const CustomizedDeleteIcon = (props) => {
  const { onClickHandler, size, testId, disabled } = props;

  return (
    <Tooltip title={!disabled ? DELETE_TITLE : ''}>
      <IconButton
        aria-label={DELETE_TITLE}
        onClick={onClickHandler}
        data-cy='delete-btn'
        data-testid={testId}
        disabled={disabled}
      >
        <DeleteIcon fontSize={size} color={!disabled ? 'error' : 'disabled'} />
      </IconButton>
    </Tooltip>
  );
};

CustomizedDeleteIcon.propTypes = {
  onClickHandler: PropTypes.func,
  size: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};

CustomizedDeleteIcon.defaultProps = {
  onClickHandler: noop,
  disabled: false
};

export default CustomizedDeleteIcon;
