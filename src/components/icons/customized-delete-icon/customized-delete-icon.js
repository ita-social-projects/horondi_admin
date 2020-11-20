import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { config } from '../../../configs';

const { DELETE_TITLE } = config.buttonTitles;

const CustomizedDeleteIcon = (props) => {
  const { onClickHandler, size } = props;

  return (
    <Tooltip title={DELETE_TITLE}>
      <IconButton aria-label={DELETE_TITLE} onClick={onClickHandler} data-cy='delete-btn'>
        <DeleteIcon fontSize={size} color='error' />
      </IconButton>
    </Tooltip>
  );
};

CustomizedDeleteIcon.propTypes = {
  onClickHandler: PropTypes.func,
  size: PropTypes.string.isRequired
};

CustomizedDeleteIcon.defaultProps = {
  onClickHandler: () => {}
};

export default CustomizedDeleteIcon;
