import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const barStyle = { margin: '90px 0', paddingTop: '10px', width: '100%' };

const LoadingBar = () => (
  <LinearProgress style={barStyle} data-testid='loader' />
);

export default LoadingBar;
