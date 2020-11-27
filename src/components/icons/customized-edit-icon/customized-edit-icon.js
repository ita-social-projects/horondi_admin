import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { config } from '../../../configs';

const { EDIT_TITLE } = config.buttonTitles;

const CustomizedEditIcon = (props) => {
  const { onClickHandler, size } = props;

  return (
    <Tooltip title={EDIT_TITLE}>
      <IconButton
        aria-label={EDIT_TITLE}
        onClick={onClickHandler}
        color='secondary'
        data-cy='edit-btn'
      >
        <EditIcon fontSize={size} />
      </IconButton>
    </Tooltip>
  );
};

CustomizedEditIcon.propTypes = {
  onClickHandler: PropTypes.func.isRequired,
  size: PropTypes.string.isRequired
};

export default CustomizedEditIcon;
