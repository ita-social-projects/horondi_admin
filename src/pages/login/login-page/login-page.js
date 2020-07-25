import React, { useState } from 'react';
import {
  Avatar,
  Typography,
  Button,
  TextField,
  FormControl
} from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './login-page.styles';
import { loginAdmin } from '../../../redux/admin/admin.actions';
import LoadingBar from '../../../components/loading-bar';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false
  });

  const { loading } = useSelector(({ Admin }) => ({
    loading: Admin.adminLoading
  }));
  const dispatch = useDispatch();

  const classes = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
        <FormControl className={classes.input} variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

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
