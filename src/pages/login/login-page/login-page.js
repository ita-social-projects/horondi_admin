import React, { useState } from 'react';
import { Avatar, Typography, Button, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './login-page.styles';
import { loginAdmin } from '../../../redux/admin/admin.actions';
import LoadingBar from '../../../components/loading-bar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loading } = useSelector(({ Admin }) => ({
    loading: Admin.adminLoading
  }));
  const dispatch = useDispatch();

  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler} className={classes.login}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Увійти
        </Typography>
        <TextField
          className={classes.input}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email'
          value={email}
          name='email'
          autoFocus
          type='text'
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.input}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='password'
          label='Пароль'
          value={password}
          name='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />

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
