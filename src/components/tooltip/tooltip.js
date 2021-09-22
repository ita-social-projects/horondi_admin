import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import PropTypes from 'prop-types';

const placementCases = ['left', 'top', 'bottom', 'right'];

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

const TooltipButton = ({ title, placement }) => (
  <Tooltip
    title={<TooltipTitle text={title} />}
    arrow
    placement={placementCases.includes(placement) ? placement : 'bottom'}
  >
    <IconButton>
      <HelpIcon />
    </IconButton>
  </Tooltip>
);

TooltipButton.propTypes = {
  title: PropTypes.string,
  placement: PropTypes.string
};

TooltipButton.defaultProps = {
  title: '',
  placement: ''
};

TooltipTitle.propTypes = {
  text: PropTypes.string
};

TooltipTitle.defaultProps = {
  text: ''
};

export default TooltipButton;
