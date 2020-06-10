import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

const barStyle = { margin: '50px 0', paddingTop: '10px' };

const LoadingBar = () => <LinearProgress style={barStyle} />;

export default LoadingBar;
