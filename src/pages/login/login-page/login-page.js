import React, { useState, useEffect } from 'react';
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
import { loginUser } from '../../../redux/auth/auth.actions';
import LoadingBar from '../../../components/loading-bar';

import { config } from '../../../configs';

const { formRegExp } = config;

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

  const [shouldValidate, setShouldValidate] = useState(false);
  const [emailValidated, setEmailValidated] = useState(false);
  const [passwordValidated, setPasswordValidated] = useState(false);
  const [allFieldsValidated, setAllFieldsValidated] = useState(false);

  const { email, password } = adminValues;

  useEffect(() => {
    if (emailValidated && passwordValidated) {
      setAllFieldsValidated(true);
    } else {
      setAllFieldsValidated(false);
    }
  }, [emailValidated, passwordValidated]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setShouldValidate(true);
    if (allFieldsValidated) {
      dispatch(loginUser({ email, password }));
    }
  };
  const handleChange = (event, setValid, regExp) => {
    const input = event.target.value;
    const inputName = event.target.name;
    setAdminValues({ ...adminValues, [inputName]: input });
    if (input.match(regExp)) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleClickShowPassword = () => {
    setAdminValues({ ...adminValues, showPassword: !adminValues.showPassword });
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
          error={!emailValidated && shouldValidate}
          name='email'
          autoFocus
          type='text'
          onChange={(e) => handleChange(e, setEmailValidated, formRegExp.email)}
        />
        <FormControl className={classes.input} variant='outlined'>
          <InputLabel
            htmlFor='outlined-adornment-password'
            error={!passwordValidated && shouldValidate}
          >
            Password
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={adminValues.showPassword ? 'text' : 'password'}
            value={password}
            error={!passwordValidated && shouldValidate}
            name='password'
            onChange={(e) =>
              handleChange(e, setPasswordValidated, formRegExp.password)
            }
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
