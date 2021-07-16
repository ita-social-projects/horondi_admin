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
import {
  setMapImageHandler,
  setInputsContactHandler
} from '../../../utils/contacts-form';
import { handleAvatar } from '../../../utils/handle-avatar';
import { checkInitialValue } from '../../../utils/check-initial-values';

const { languages, materialUiConstants } = config;
const { schedule, adress } = config.labels.contacts;

const {
  ENTER_PHONE_NUMBER_MESSAGE,
  INPUT_LENGTH_MESSAGE,
  ENTER_UA_SCHEDULE_MESSAGE,
  ENTER_EN_SCHEDULE_MESSAGE,
  ENTER_UA_ADDRESS_MESSAGE,
  ENTER_EN_ADDRESS_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  ENTER_LINK_MESSAGE,
  SELECT_IMAGES_MESSAGE,
  INVALID_PHONE_MESSAGE
} = config.contactErrorMessages;

const { INVALID_EMAIL_MESSAGE, ENTER_EMAIL_MESSAGE } =
  config.loginErrorMessages;

const { enAddressRegex, uaRegex, enRegex, phoneNumber } = config.formRegExp;

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

  const { pathToContacts } = config.routes;

  const uaCartImageText = 'uaCartImage';
  const enCartImageText = 'enCartImage';
  const uaSelectImageHandler = (files) => {
    setMapImageHandler(files, uaSetMapImage, values, uaCartImageText);
  };

  const enSelectImageHandler = (files) => {
    setMapImageHandler(files, enSetMapImage, values, enCartImageText);
  };

  const formSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(phoneNumber, INVALID_PHONE_MESSAGE)
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
      .min(10, INPUT_LENGTH_MESSAGE)
      .matches(uaRegex, ENTER_UA_ADDRESS_MESSAGE)
      .required(ENTER_UA_ADDRESS_MESSAGE),
    enAddress: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
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

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
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
          dispatch(setSnackBarSeverity(materialUiConstants.styleError));
          dispatch(setSnackBarMessage(SELECT_IMAGES_MESSAGE));
          dispatch(setSnackBarStatus(true));
        }
      }
    });

  const inputs = setInputsContactHandler(schedule, adress);

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const valueEquality = checkInitialValue(initialValues, values);

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={(e) => eventPreventHandler(e)}>
        <div className={classes.buttonContainer}>
          <Grid container spacing={2} className={classes.fixedButtons}>
            <Grid item className={classes.button}>
              <BackButton
                data-cy='go-back-button'
                initial={!valueEquality}
                pathBack={pathToContacts}
              />
            </Grid>
            <Grid item className={classes.button}>
              <SaveButton
                id='save'
                type='submit'
                title='Зберегти'
                onClickHandler={handleSubmit}
                data-cy='save'
                values={values}
                errors={errors}
              />
            </Grid>
          </Grid>
        </div>
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
                  onBlur={handleBlur}
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
