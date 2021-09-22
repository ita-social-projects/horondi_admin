import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import PropTypes from 'prop-types';

const TooltipTitle = ({ text }) => (
  <>
    {text.split('\n').map((message) => (
      <>
        <span>{message}</span>
        <br />
      </>
    ))}
  </>
);

const TooltipButton = ({ title }) => (
  <Tooltip title={<TooltipTitle text={title} />} arrow>
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

TooltipTitle.propTypes = {
  text: PropTypes.string
};

TooltipTitle.defaultProps = {
  text: ''
};

export default TooltipButton;
