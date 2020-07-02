import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';

const EDIT_TITLE = 'Редагувати';

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

EditButton.propTypes = {
  eventHandler: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
};

export default EditButton;
