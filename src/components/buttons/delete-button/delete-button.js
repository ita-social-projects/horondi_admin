import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import { config } from '../../../configs';

const { DELETE_TITLE } = config.buttonTitles;

const DeleteButton = (props) => {
  const { onClickHandler, size } = props;

  return (
    <Tooltip title={DELETE_TITLE}>
      <IconButton aria-label={DELETE_TITLE} onClick={onClickHandler}>
        <DeleteIcon fontSize={size} color='error' />
      </IconButton>
    </Tooltip>
  );
};

DeleteButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
};

export default DeleteButton;
