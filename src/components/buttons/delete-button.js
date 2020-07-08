import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const DELETE_TITLE = 'Видалити';

const DeleteButton = (props) => {
  const { eventHandler, size } = props;

  return (
    <Tooltip title={DELETE_TITLE}>
      <IconButton aria-label={DELETE_TITLE} onClick={eventHandler}>
        <DeleteIcon fontSize={size} color='error' />
      </IconButton>
    </Tooltip>
  );
};

DeleteButton.propTypes = {
  eventHandler: PropTypes.func,
  size: PropTypes.string.isRequired
};

DeleteButton.defaultProps = {
  eventHandler: () => {}
};

export default DeleteButton;
