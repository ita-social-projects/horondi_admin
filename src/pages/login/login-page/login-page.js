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

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { useStyles } from './login-page.styles';
import { loginUser } from '../../../redux/auth/auth.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const { formRegExp, loginErrorMessages } = config;

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ Auth }) => ({
    loading: Auth.loading
  }));

  const [adminValues, setAdminValues] = useState({
    password: '',
    email: '',
    showPassword: false
  });

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email(loginErrorMessages.INVALID_EMAIL_MESSAGE)
      .required(loginErrorMessages.ENTER_EMAIL_MESSAGE),
    password: Yup.string()
      .min(8, loginErrorMessages.PASSWORD_MIN_LENGTH_MESSAGE)
      .matches(formRegExp.password, loginErrorMessages.PASSWORD_LANG_MESSAGE)
      .required(loginErrorMessages.ENTER_PASSWORD_MESSAGE)
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: adminValues,
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: ({ email, password }) => {
      dispatch(loginUser({ email, password }));
    }
  });

  const handleClickShowPassword = () => {
    setAdminValues({ ...adminValues, showPassword: !adminValues.showPassword });
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.login}>
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
          value={values.email}
          error={touched.email && !!errors.email}
          name='email'
          autoFocus
          type='text'
          onChange={handleChange}
          onBlur={handleChange}
        />
        {touched.email && errors.email ? (
          <div className={classes.inputError}>{errors.email}</div>
        ) : (
          ''
        )}
        <FormControl className={classes.input} variant='outlined'>
          <InputLabel
            htmlFor='outlined-adornment-password'
            error={touched.password && !!errors.password}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={adminValues.showPassword ? 'text' : 'password'}
            value={values.password}
            error={touched.password && !!errors.password}
            name='password'
            required
            onChange={handleChange}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  edge='end'
                >
                  {adminValues.showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        {touched.password && errors.password ? (
          <div className={classes.inputError}>{errors.password}</div>
        ) : (
          ''
        )}
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
