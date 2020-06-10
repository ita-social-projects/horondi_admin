import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const DELETE_TITLE = 'Delete';

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

export default DeleteButton;
