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

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './login-page.styles';
import { loginUser } from '../../../redux/auth/auth.actions';
import LoadingBar from '../../../components/loading-bar';
// import useSuccessSnackbar from '../../../utils/use-success-snackbar';

// import {
//   setSnackBarSeverity,
//   setSnackBarStatus,
//   setSnackBarMessage
// } from '../../../redux/snackbar/snackbar.actions';

import { config } from '../../../configs';

const { formRegExp } = config;

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const { openSuccessSnackbar } = useSuccessSnackbar();
  const { loading } = useSelector(({ Auth }) => ({
    loading: Auth.loading
  }));

  const [adminValues, setAdminValues] = useState({
    password: '',
    email: '',
    showPassword: false
  });

  // const [shouldValidate, setShouldValidate] = useState(false);
  // const [emailValidated, setEmailValidated] = useState(false);
  // const [passwordValidated, setPasswordValidated] = useState(false);
  // const [allFieldsValidated, setAllFieldsValidated] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');

  // const { email, password } = adminValues;

  // useEffect(() => {
  //   if (emailValidated && passwordValidated) {
  //     setAllFieldsValidated(true);
  //   } else {
  //     setAllFieldsValidated(false);
  //     console.log(formSchema);
  //   }
  // }, [emailValidated, passwordValidated]);

  // const submitHandler = async (e) => {
  //   console.log('ASDASD');
  //   e.preventDefault();
  //      dispatch(setSnackBarSeverity('error'));
  //       errors.email
  //         ? dispatch(setSnackBarMessage(errors.email))
  //         : dispatch(setSnackBarMessage(errors.password));
  //       dispatch(setSnackBarStatus(true));
  // };

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .email('Некоректна email адреса')
      .required('Введіть email'),
    password: Yup.string()
      .min(8, 'Пароль повинен містити не менше 8 символів')
      .matches(
        formRegExp.password,
        'Використовуйте латиницю різних регістрів та цифри'
      )
      .required('Введіть пароль')
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: adminValues,
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: ({ email, password }) => {
      dispatch(loginUser({ email, password }));

      // dispatch(setSnackBarSeverity('error'));
      // errors.email
      //   ? dispatch(setSnackBarMessage(errors.email))
      //   : dispatch(setSnackBarMessage(errors.password));
      // dispatch(setSnackBarStatus(true));
    }
  });

  // const handleChange = (event, setValid, regExp) => {
  //   const input = event.target.value;
  //   const inputName = event.target.name;
  //   setAdminValues({ ...adminValues, [inputName]: input });
  //   if (input.match(regExp)) {
  //     setValid(true);
  //   } else {
  //     setValid(false);
  //   }
  // };

  const handleClickShowPassword = () => {
    setAdminValues({ ...adminValues, showPassword: !adminValues.showPassword });
  };

  if (loading) {
    return <LoadingBar />;
  }
  // {handleSubmit, handleChange, values, touched, errors}
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
          // {(e) => handleChange(e, setEmailValidated, formRegExp.email)}
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
            // {(e) =>
            //   handleChange(e, setPasswordValidated, formRegExp.password)
            // }
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
