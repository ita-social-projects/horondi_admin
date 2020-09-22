import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  TextField,
  Grid,
  FormControl,
  Paper,
  Typography,
  FormHelperText
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useStyles } from './confirm-user.styles';
import { SaveButton } from '../../../components/buttons';
import {
  confirmAdmin,
  validateToken
} from '../../../redux/users/users.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const { formRegExp, loginErrorMessages } = config;

const ConfirmUser = ({ match }) => {
  const { token } = match.params;

  const styles = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector(({ Users }) => ({
    loading: Users.userLoading
  }));
  useEffect(() => {
    dispatch(validateToken(token));
  }, [dispatch, token]);

  const formSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, loginErrorMessages.FIRSTNAME_MIN_LENGTH_MESSAGE)
      .max(30, loginErrorMessages.FIRSTNAME_MAX_LENGTH_MESSAGE)
      .required(loginErrorMessages.ENTER_FIRSTNAME_MESSAGE),
    lastName: Yup.string()
      .min(2, loginErrorMessages.LASTNAME_MIN_LENGTH_MESSAGE)
      .max(30, loginErrorMessages.LASTNAME_MAX_LENGTH_MESSAGE)
      .required(loginErrorMessages.ENTER_LASTNAME_MESSAGE),
    password: Yup.string()
      .min(8, loginErrorMessages.PASSWORD_MIN_LENGTH_MESSAGE)
      .max(20, loginErrorMessages.PASSWORD_MAX_LENGTH_MESSAGE)
      .matches(formRegExp.password, loginErrorMessages.PASSWORD_LANG_MESSAGE)
      .required(loginErrorMessages.ENTER_PASSWORD_MESSAGE)
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: ''
    },
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: (user) => {
      dispatch(confirmAdmin({ user, token }));
    }
  });

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <Grid className={styles.detailsContainer}>
      <Grid className={styles.userDetails}>
        <Typography variant='h2' className={styles.registrationTitle}>
          Продовжити реєстрацію адміністратора
        </Typography>
        <form onSubmit={handleSubmit}>
          <Paper className={styles.userInputPanel}>
            <FormControl
              className={styles.formControl}
              error={touched.firstName && !!errors.firstName}
            >
              <TextField
                onChange={handleChange}
                value={values.firstName}
                id='firstName'
                variant='outlined'
                label="Ім'я"
                name='firstName'
                type='text'
                onBlur={handleChange}
                error={touched.firstName && !!errors.firstName}
              />
              <FormHelperText>
                {touched.firstName && errors.firstName}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={styles.formControl}
              error={touched.lastName && !!errors.lastName}
            >
              <TextField
                onChange={handleChange}
                value={values.lastName}
                id='lastName'
                variant='outlined'
                label='Прізвище'
                name='lastName'
                type='text'
                onBlur={handleChange}
                error={touched.lastName && !!errors.lastName}
              />
              <FormHelperText>
                {touched.lastName && errors.lastName}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={styles.formControl}
              error={touched.password && !!errors.password}
            >
              <TextField
                onChange={handleChange}
                value={values.password}
                id='password'
                variant='outlined'
                label='Пароль'
                name='password'
                type='password'
                onBlur={handleChange}
                error={touched.password && !!errors.password}
              />
              <FormHelperText>
                {touched.password && errors.password}
              </FormHelperText>
            </FormControl>
            <FormControl className={styles.formControl}>
              <SaveButton
                type='submit'
                title='Створити'
                className={styles.saveButton}
              />
            </FormControl>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

ConfirmUser.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(ConfirmUser);
