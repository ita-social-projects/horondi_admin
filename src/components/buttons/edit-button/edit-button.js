import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { config } from '../../../configs';

const { EDIT_TITLE } = config.buttonTitles;

const EditButton = (props) => {
  const { onClickHandler, size } = props;

  return (
    <Tooltip title={EDIT_TITLE}>
      <IconButton
        aria-label={EDIT_TITLE}
        onClick={onClickHandler}
        color='secondary'
      >
        <EditIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

EditButton.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
};

export default EditButton;
