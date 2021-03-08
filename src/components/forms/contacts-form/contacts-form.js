import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';

import { FormControl, Paper, TextField, Grid, Avatar } from '@material-ui/core';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { Image } from '@material-ui/icons';
import { config } from '../../../configs';
import { BackButton, SaveButton } from '../../buttons';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../../redux/snackbar/snackbar.actions';
import { useStyles } from './contacts-form.style';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import { handleAvatar } from '../../../utils/handle-avatar';

const { languages } = config;
const { schedule, adress } = config.labels.contacts;

const {
  PHONE_NUMBER_LENGTH_MESSAGE,
  PHONE_NUMBER_TYPE_MESSAGE,
  ENTER_PHONE_NUMBER_MESSAGE,
  INPUT_LENGTH_MESSAGE,
  ENTER_UA_SCHEDULE_MESSAGE,
  ENTER_EN_SCHEDULE_MESSAGE,
  ENTER_UA_ADDRESS_MESSAGE,
  ENTER_EN_ADDRESS_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  ENTER_LINK_MESSAGE,
  SELECT_IMAGES_MESSAGE
} = config.contactErrorMessages;

const {
  INVALID_EMAIL_MESSAGE,
  ENTER_EMAIL_MESSAGE
} = config.loginErrorMessages;

const { enAddressRegex, uaRegex, enRegex } = config.formRegExp;

const ContactsForm = ({ contactSaveHandler, initialValues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [uaMapImage, uaSetMapImage] = useState({
    name: '',
    imageUrl: ''
  });
  const [enMapImage, enSetMapImage] = useState({
    name: '',
    imageUrl: ''
  });

  const uaSelectImageHandler = ({ target }) => {
    if (target.files && target.files[0]) {
      uaSetMapImage({
        name: target.files[0].name,
        imageUrl: URL.createObjectURL(target.files[0])
      });

      [values.uaCartImage] = target.files;
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
    uaSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .matches(uaRegex, ENTER_UA_SCHEDULE_MESSAGE)
      .required(ENTER_UA_SCHEDULE_MESSAGE),
    enSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .matches(enRegex, ENTER_EN_SCHEDULE_MESSAGE)
      .required(ENTER_EN_SCHEDULE_MESSAGE),
    uaAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .matches(uaRegex, ENTER_UA_ADDRESS_MESSAGE)
      .required(ENTER_UA_ADDRESS_MESSAGE),
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
    onSubmit: (formValues) => {
      if (
        formValues.uaCartImage &&
        formValues.enCartImage &&
        typeof formValues.uaCartImage === typeof formValues.enCartImage
      ) {
        contactSaveHandler(formValues);
      } else {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(SELECT_IMAGES_MESSAGE));
        dispatch(setSnackBarStatus(true));
      }
    }
  });

  const inputs = [
    { label: schedule, name: 'schedule' },
    { label: adress, name: 'address' }
  ];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

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
                <div className={classes.imageUploadAvatar}>
                  <ImageUploadContainer handler={uaSelectImageHandler} />
                  {uaMapImage.imageUrl ? (
                    <Avatar
                      data-cy='ua-cart-image'
                      src={uaMapImage.imageUrl}
                      className={classes.large}
                    >
                      <Image />
                    </Avatar>
                  ) : (
                    handleAvatar(
                      initialValues.uaCartImage,
                      'uaCartImage',
                      classes.large
                    )
                  )}
                </div>
                <span className={classes.imageUpload}>
                  Зображення карти (Англ.)
                </span>
                <div className={classes.imageUploadAvatar}>
                  <ImageUploadContainer handler={enSelectImageHandler} />
                  {enMapImage.imageUrl ? (
                    <Avatar
                      data-cy='en-cart-image'
                      src={enMapImage.imageUrl}
                      className={classes.large}
                    >
                      <Image />
                    </Avatar>
                  ) : (
                    handleAvatar(
                      initialValues.enCartImage,
                      'enCartImage',
                      classes.large
                    )
                  )}
                </div>
                <TextField
                  data-cy='map-link'
                  id='cartLink'
                  className={classes.textField}
                  variant='outlined'
                  label='Google maps посилання'
                  InputLabelProps={{
                    classes: {
                      shrink: 'shrink'
                    }
                  }}
                  value={values.cartLink}
                  onChange={handleChange}
                  error={touched.cartLink && !!errors.cartLink}
                  helperText={touched.cartLink && errors.cartLink}
                />
                <TextField
                  data-cy='phone-number'
                  id='phoneNumber'
                  className={classes.textField}
                  variant='outlined'
                  label='Контактний номер'
                  multiline
                  InputLabelProps={{
                    classes: {
                      shrink: 'shrink'
                    }
                  }}
                  value={values.phoneNumber}
                  onChange={handleChange}
                  error={touched.phoneNumber && !!errors.phoneNumber}
                  helperText={touched.phoneNumber && errors.phoneNumber}
                />
                <TextField
                  data-cy='email'
                  id='email'
                  className={classes.textField}
                  variant='outlined'
                  label='Email'
                  InputLabelProps={{
                    classes: {
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
            <Grid item xs={12}>
              {languages.map((lang) => (
                <LanguagePanel
                  lang={lang}
                  inputOptions={inputOptions}
                  key={lang}
                />
              ))}
            </Grid>
          </Grid>
        </FormControl>
        <BackButton data-cy='go-back-button' />

        <SaveButton
          id='save'
          type='submit'
          title='Зберегти'
          className={classes.saveButton}
          data-cy='save'
          values={values}
          errors={errors}
        />
      </form>
    </div>
  );
};

ContactsForm.propTypes = {
  contactSaveHandler: PropTypes.func.isRequired,
  initialValues: PropTypes.shape({
    phoneNumber: PropTypes.string.isRequired,
    uaSchedule: PropTypes.string.isRequired,
    enSchedule: PropTypes.string.isRequired,
    uaAddress: PropTypes.string.isRequired,
    enAddress: PropTypes.string.isRequired,
    uaCartImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    enCartImage: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    email: PropTypes.string.isRequired,
    cartLink: PropTypes.string.isRequired
  })
};

ContactsForm.defaultProps = {
  initialValues: {
    uaCartImage: null,
    enCartImage: null
  }
};

export default ContactsForm;
