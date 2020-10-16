import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import {
  FormControl,
  Paper,
  TextField,
  Grid,
  Button,
  Avatar
} from '@material-ui/core';

import AttachFileIcon from '@material-ui/icons/AttachFile';
import ImageIcon from '@material-ui/icons/Image';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { config } from '../../configs';
import { SaveButton } from '../buttons';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../redux/snackbar/snackbar.actions';
import { useStyles } from './contacts-form.style';

const {
  PHONE_NUMBER_LENGTH_MESSAGE,
  PHONE_NUMBER_TYPE_MESSAGE,
  ENTER_PHONE_NUMBER_MESSAGE,
  INPUT_LENGTH_MESSAGE,
  ENTER_UK_SCHEDULE_MESSAGE,
  ENTER_EN_SCHEDULE_MESSAGE,
  ENTER_UK_ADDRESS_MESSAGE,
  ENTER_EN_ADDRESS_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  ENTER_LINK_MESSAGE,
  SELECT_IMAGES_MESSAGE
} = config.contactErrorMessages;

const {
  INVALID_EMAIL_MESSAGE,
  ENTER_EMAIL_MESSAGE
} = config.loginErrorMessages;

const { enAddressRegex } = config.formRegExp;

const { GO_BACK_TITLE } = config.buttonTitles;

const pathToContactsPage = config.routes.pathToContacts;

const ContactsForm = ({ contactSaveHandler, initialValues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [ukMapImage, ukSetMapImage] = useState({
    name: '',
    imageUrl: ''
  });
  const [enMapImage, enSetMapImage] = useState({
    name: '',
    imageUrl: ''
  });

  const ukSelectImageHandler = ({ target }) => {
    if (target.files && target.files[0]) {
      ukSetMapImage({
        name: target.files[0].name,
        imageUrl: URL.createObjectURL(target.files[0])
      });

      [values.ukCartImage] = target.files;
    }
  };

  const enSelectImageHandler = ({ target }) => {
    if (target.files && target.files[0]) {
      enSetMapImage({
        name: target.files[0].name,
        imageUrl: URL.createObjectURL(target.files[0])
      });

      [values.enCartImage] = target.files;
    }
  };

  const formSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .min(12, PHONE_NUMBER_LENGTH_MESSAGE)
      .typeError(PHONE_NUMBER_TYPE_MESSAGE)
      .required(ENTER_PHONE_NUMBER_MESSAGE),
    ukSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_UK_SCHEDULE_MESSAGE),
    enSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_EN_SCHEDULE_MESSAGE),
    ukAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .required(ENTER_UK_ADDRESS_MESSAGE),
    enAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .matches(enAddressRegex, ENTER_EN_ADDRESS_MESSAGE)
      .required(ENTER_EN_ADDRESS_MESSAGE),
    email: Yup.string()
      .email(INVALID_EMAIL_MESSAGE)
      .required(ENTER_EMAIL_MESSAGE),
    cartLink: Yup.string()
      .url(IMAGE_FORMAT_MESSAGE)
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_LINK_MESSAGE)
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues,
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (
        values.ukCartImage &&
        values.enCartImage &&
        typeof values.ukCartImage === typeof values.enCartImage
      ) {
        contactSaveHandler(values);
      } else {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(SELECT_IMAGES_MESSAGE));
        dispatch(setSnackBarStatus(true));
      }
    }
  });

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl className={classes.contactDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.contactItemUpdate}>
                <span className={classes.imageUpload}>
                  Зображення карти (Укр.)
                </span>
                <div className={classes.imageUploadContainer}>
                  <label htmlFor='upload-photo'>
                    <input
                      style={{ display: 'none' }}
                      accept='image/*'
                      id='upload-photo'
                      name='upload-photo'
                      type='file'
                      onChange={ukSelectImageHandler}
                    />
                    <Button
                      id='add-contact'
                      variant='outlined'
                      color='primary'
                      component='span'
                    >
                      <AttachFileIcon className={classes.attachFile} />
                      Завантажити
                    </Button>
                  </label>
                  <Avatar
                    data-cy='ukCartImage'
                    src={ukMapImage.imageUrl || initialValues.ukCartImage}
                    className={classes.large}
                  >
                    <ImageIcon />
                  </Avatar>
                  <span className={classes.imageName}>{ukMapImage.name}</span>
                </div>
                <span className={classes.imageUpload}>
                  Зображення карти (Англ.)
                </span>
                <div className={classes.imageUploadContainer}>
                  <label>
                    <input
                      style={{ display: 'none' }}
                      accept='image/*'
                      id='upload-photo'
                      name='upload-photo'
                      type='file'
                      onChange={enSelectImageHandler}
                    />
                    <Button
                      id='add-contact'
                      variant='outlined'
                      color='primary'
                      component='span'
                    >
                      <AttachFileIcon className={classes.attachFile} />
                      Завантажити
                    </Button>
                  </label>
                  <Avatar
                    data-cy='enCartImage'
                    src={enMapImage.imageUrl || initialValues.enCartImage}
                    className={classes.large}
                  >
                    <ImageIcon />
                  </Avatar>
                  <span className={classes.imageName}>{enMapImage.name}</span>
                </div>
                <TextField
                  data-cy='mapLink'
                  id='cartLink'
                  className={classes.textField}
                  variant='outlined'
                  label='Google maps посилання'
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.cartLink}
                  onChange={handleChange}
                  error={touched.cartLink && !!errors.cartLink}
                  helperText={touched.cartLink && errors.cartLink}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.contactItemUpdate}>
                <TextField
                  data-cy='phoneNumber'
                  id='phoneNumber'
                  className={classes.textField}
                  variant='outlined'
                  label='Контактний номер'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField
                  data-cy='ukSchedule'
                  id='ukSchedule'
                  className={classes.textField}
                  variant='outlined'
                  label='Розклад (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.ukSchedule}
                  onChange={handleChange}
                  error={touched.ukSchedule && !!errors.ukSchedule}
                  helperText={touched.ukSchedule && errors.ukSchedule}
                />
                <TextField
                  data-cy='enSchedule'
                  id='enSchedule'
                  className={classes.textField}
                  variant='outlined'
                  label='Розклад (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.enSchedule}
                  onChange={handleChange}
                  error={touched.enSchedule && !!errors.enSchedule}
                  helperText={touched.enSchedule && errors.enSchedule}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.contactItemUpdate}>
                <TextField
                  data-cy='ukAddress'
                  id='ukAddress'
                  className={classes.textField}
                  variant='outlined'
                  label='Адреса (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.ukAddress}
                  onChange={handleChange}
                  error={touched.ukAddress && !!errors.ukAddress}
                  helperText={touched.ukAddress && errors.ukAddress}
                />
                <TextField
                  data-cy='enAddress'
                  id='enAddress'
                  className={classes.textField}
                  variant='outlined'
                  label='Адреса (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.enAddress}
                  onChange={handleChange}
                  error={touched.enAddress && !!errors.enAddress}
                  helperText={touched.enAddress && errors.enAddress}
                />
                <TextField
                  data-cy='email'
                  id='email'
                  className={classes.textField}
                  variant='outlined'
                  label='Email'
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
        <Button
          id='contactsBack'
          component={Link}
          to={pathToContactsPage}
          variant='outlined'
          color='primary'
          className={classes.returnButton}
          data-cy='goBackButton'
        >
          {GO_BACK_TITLE}
        </Button>
        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
        />
      </form>
    </div>
  );
};

ContactsForm.propTypes = {
  contactSaveHandler: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    ukSchedule: PropTypes.string.isRequired,
    enSchedule: PropTypes.string.isRequired,
    ukAddress: PropTypes.string.isRequired,
    enAddress: PropTypes.string.isRequired,
    ukCartImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    enCartImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    email: PropTypes.string.isRequired,
    cartLink: PropTypes.string.isRequired
  })
};

ContactsForm.defaultProps = {
  initialValues: {
    ukCartImage: null,
    enCartImage: null
  }
};

export default ContactsForm;
