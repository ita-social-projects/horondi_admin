import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useStyles } from './Login-page-styles';
import LoginInput from '../login-input';
import wrapWithAdminService from '../wrappers';
import {
  setAdmin,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';

const LoginPage = (props) => {
  const {
    setAdmin,
    adminService,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage
  } = props;
  const { usersService } = adminService;

  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const admin = await usersService.loginAdmin({ email, password });
      setAdmin(admin);

      localStorage.setItem('accessToken', admin.accessToken);
      localStorage.setItem('refreshToken', admin.refreshToken);
      localStorage.setItem('adminId', admin.user._id);

      setSnackBarSeverity('success');
      setSnackBarMessage('Succesfully logged in');
      setSnackBarStatus(true);
    } catch (err) {
      const errorMessage = err.response.data.msg;
      setSnackBarSeverity('error');
      setSnackBarMessage(errorMessage);
      setSnackBarStatus(true);
    }
  };

  return (
    <form onSubmit={submitHandler} className={classes.login}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component='h1' variant='h5'>
        Sign in
      </Typography>
      <LoginInput name='email' lable='Email Address' focus />
      <LoginInput name='password' lable='Password' />
      <Button
        type='submit'
        variant='contained'
        color='primary'
        size='large'
        className={classes.submit}
      >
        Sign In
      </Button>
    </form>
  );
};

const mapDispatchToProps = {
  setAdmin,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(null, mapDispatchToProps)(LoginPage)
);
