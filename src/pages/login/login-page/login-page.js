import React from 'react';
import { Avatar, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LoginInput from '../login-input';
import { useStyles } from './login-page.styles';

const LoginPage = () => {
  const classes = useStyles();
  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.login}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Увійти
        </Typography>
        <LoginInput name='email' lable='Email' focus />
        <LoginInput name='password' lable='Пароль' />
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          className={classes.submit}
        >
          Увійти
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
