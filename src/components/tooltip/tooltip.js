import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import PropTypes from 'prop-types';

const TooltipButton = ({ title }) => (
    <Tooltip title={title}>
      <IconButton>
        <HelpIcon />
      </IconButton>
    </Tooltip>
  );

TooltipButton.propTypes = {
  title: PropTypes.string
};

TooltipButton.defaultProps = {
  title: ''
};

export default TooltipButton;
