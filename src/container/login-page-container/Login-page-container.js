import React from 'react';
import { useStyles } from './Login-page-container-styles';

import LoginPage from '../../components/login-page';

const LoginPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <LoginPage />
    </div>
  );
};

export default LoginPageContainer;
