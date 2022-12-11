import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Paper,
  FormHelperText,
  Typography
} from '@material-ui/core';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import { useStyles } from './register-user.styles';
import { config } from '../../../configs';
import { SaveButton } from '../../../components/buttons';
import {
  registerAdmin,
  confirmSuperadmin
} from '../../../redux/users/users.actions';
import LoadingBar from '../../../components/loading-bar';

const {
  messages: {
    SEND_CONFIRMATION_CODE,
    INVITE_ADMIN_MESSAGE,
    INVITE_ADMIN_TITLE
  },
  userRoles,
  titles: { registerUserTitles },
  allowedforRegistrationRoles,
  loginErrorMessages: {
    ENTER_EMAIL_MESSAGE,
    INVALID_EMAIL_MESSAGE,
    SELECT_ROLE_MESSAGE,
    ENTER_CODE
  },
  buttonTitles: { SEND_CODE },
  userRole: { admin, superadmin },
  materialUiConstants: {
    primary,
    outlined,
    contained,
    types: { text, submit }
  }
} = config;

const RegisterUser = ({ handleClose }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ Users }) => ({
    loading: Users.adminLoading
  }));

  const { adminId } = useSelector(({ Auth }) => ({
    adminId: Auth.adminId
  }));

  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required(ENTER_EMAIL_MESSAGE)
      .email(INVALID_EMAIL_MESSAGE),
    role: Yup.string().required(SELECT_ROLE_MESSAGE),
    otp_code: Yup.string().when('role', {
      is: superadmin,
      then: Yup.string().required(ENTER_CODE)
    })
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        role: admin,
        email: '',
        otp_code: ''
      },
      validationSchema: formSchema,
      validateOnBlur: true,
      onSubmit: (data) => {
        dispatch(registerAdmin(data));
        handleClose();
      }
    });
  const roles = userRoles.filter((item) =>
    allowedforRegistrationRoles.includes(item.role)
  );

  if (loading) {
    return <LoadingBar />;
  }

  const rolesList = roles.map((item, idx) => (
    <MenuItem key={idx} id={item.role} data-cy={item.role} value={item.role}>
      {item.label}
    </MenuItem>
  ));

  const handleSendCode = () => {
    dispatch(confirmSuperadmin({ _id: adminId }));
  };

  return (
    <Grid className={styles.detailsContainer}>
      <Grid className={styles.userDetails}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Paper className={styles.userInputPanel}>
            <FormControl
              className={styles.formControl}
              error={touched.email && !!errors.email}
            >
              <TextField
                onChange={handleChange}
                value={values.email}
                id='email'
                variant={outlined}
                label='Пошта'
                name='email'
                data-cy='email'
                type={text}
                onBlur={handleBlur}
                error={touched.email && !!errors.email}
              />
              <FormHelperText data-cy='email-error-label'>
                {touched.email && errors.email}
              </FormHelperText>
            </FormControl>
            <FormControl
              className={styles.formControl}
              error={touched.role && !!errors.role}
            >
              <InputLabel id='role-label'>{registerUserTitles.role}</InputLabel>
              <Select
                labelId='role-label'
                id='role'
                name='role'
                type={text}
                onBlur={handleChange}
                value={values.role}
                onChange={handleChange}
                className={styles.formSelect}
                data-cy='role'
                error={touched.role && !!errors.role}
              >
                {rolesList}
              </Select>
              <FormHelperText data-cy='role-error-label'>
                {touched.role && errors.role}
              </FormHelperText>
            </FormControl>
            {values.role !== admin && (
              <FormControl
                className={styles.formControl}
                error={touched.otp_code && !!errors.otp_code}
              >
                <Typography>{SEND_CONFIRMATION_CODE}</Typography>
                <Button
                  id='send-otp_code-button'
                  data-cy='add-user-admin-button'
                  onClick={handleSendCode}
                  variant={contained}
                  className={styles.sendButton}
                  color={primary}
                >
                  {SEND_CODE}
                </Button>
                <TextField
                  onChange={handleChange}
                  value={values.otp_code}
                  id='otp_code'
                  variant={outlined}
                  label={registerUserTitles.code}
                  name='otp_code'
                  data-cy='otp_code'
                  type={text}
                  onBlur={handleBlur}
                  error={touched.otp_code && !!errors.otp_code}
                />
                <FormHelperText data-cy='otp_code-error-label'>
                  {touched.otp_code && errors.otp_code}
                </FormHelperText>
              </FormControl>
            )}
            <FormControl className={styles.formControl}>
              <SaveButton
                type={submit}
                values={values}
                onClickHandler={handleSubmit}
                title='Створити'
                data-cy='submit-admin-register'
                className={styles.saveButton}
                errors={errors}
                saveMessage={INVITE_ADMIN_MESSAGE(values.email)}
                saveChanges={INVITE_ADMIN_TITLE}
              />
            </FormControl>
          </Paper>
        </form>
      </Grid>
    </Grid>
  );
};

RegisterUser.propTypes = {
  handleClose: PropTypes.func.isRequired
};

export default RegisterUser;
