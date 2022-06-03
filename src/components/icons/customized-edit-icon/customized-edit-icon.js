import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { config } from '../../../configs';

const { EDIT_TITLE } = config.buttonTitles;

const CustomizedEditIcon = ({ onClickHandler, size, testId }) => (
  <Tooltip title={EDIT_TITLE}>
    <IconButton
      data-testid={testId}
      aria-label={EDIT_TITLE}
      onClick={onClickHandler}
      color='secondary'
      data-cy='edit-btn'
      data-testid='edit-btn'
    >
      <EditIcon fontSize={size} />
    </IconButton>
  </Tooltip>
);

CustomizedEditIcon.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired
};

export default CustomizedEditIcon;
