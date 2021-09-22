import React from 'react';

import { Tooltip, IconButton } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';

import PropTypes from 'prop-types';

import { useStyles } from './tooltip.styles';

const placementCases = ['left', 'top', 'bottom', 'right'];

const TooltipTitle = ({ text, children }) => {
  const classes = useStyles();

  return (
    <>
      {text.split('\n').map((message) => (
        <>
          <span>{message}</span>
          <br />
        </>
      ))}
      {children && <div className={classes.description}>{children}</div>}
    </>
  );
};

const TooltipButton = ({ title, placement, children }) => (
  <Tooltip
    title={<TooltipTitle text={title}>{children}</TooltipTitle>}
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
  placement: PropTypes.string,
  children: PropTypes.node
};

TooltipButton.defaultProps = {
  title: '',
  placement: '',
  children: undefined
};

TooltipTitle.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node
};

TooltipTitle.defaultProps = {
  text: '',
  children: undefined
};

export default TooltipButton;
