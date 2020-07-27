import React from 'react';
import { useStyles } from './error-page.styles';
import { config } from '../../configs';

const { ERROR_PAGE_STATUS } = config.statuses;

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>404</h1>
      <h3>{ERROR_PAGE_STATUS}</h3>
    </div>
  );
};

export default ErrorPage;
