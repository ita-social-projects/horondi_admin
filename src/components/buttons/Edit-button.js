import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const EDIT_TITLE = 'Edit';

const EditButton = (props) => {
  const { eventHandler, size } = props;

  return (
    <Tooltip title={EDIT_TITLE}>
      <IconButton
        aria-label={EDIT_TITLE}
        onClick={eventHandler}
        color='secondary'
      >
        <EditIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

export default EditButton;
