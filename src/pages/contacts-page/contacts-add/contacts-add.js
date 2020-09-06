import React, { useState } from 'react';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { useStyles } from './contacts-add.style';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

import { addContact } from '../../../redux/contact/contact.actions';

const { languages } = config;
const {
  PHONE_NUMBER_LENGTH_MESSAGE,
  PHONE_NUMBER_TYPE_MESSAGE,
  PHONE_NUMBER_FORMAT_MESSAGE,
  ENTER_PHONE_NUMBER_MESSAGE,
  INPUT_LENGTH_MESSAGE,
  ENTER_SCHEDULE_MESSAGE,
  ENTER_ADDRESS_MESSAGE,
  IMAGE_FORMAT_MESSAGE,
  ENTER_LINK_MESSAGE
} = config.contactErrorMessages;
const {
  INVALID_EMAIL_MESSAGE,
  ENTER_EMAIL_MESSAGE
} = config.loginErrorMessages;

const ContactsAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ News }) => News.newsLoading);

  const [contactFormValues, setcontactFormValues] = useState({
    phoneNumber: '',
    ukSchedule: '',
    enSchedule: '',
    ukAddress: '',
    enAddress: '',
    email: '',
    ukCartImage: '',
    enCartImage: '',
    cartLink: ''
  });

  const contactSaveHandler = async ({
    phoneNumber,
    ukSchedule,
    enSchedule,
    ukAddress,
    enAddress,
    ukCartImage,
    enCartImage,
    cartLink,
    email
  }) => {
    const newContact = {
      phoneNumber,
      openHours: [
        { lang: languages[0], value: ukSchedule },
        { lang: languages[1], value: enSchedule }
      ],
      address: [
        { lang: languages[0], value: ukAddress },
        { lang: languages[1], value: enAddress }
      ],
      email,
      images: [
        { lang: languages[0], value: { medium: ukCartImage } },
        { lang: languages[1], value: { medium: enCartImage } }
      ],
      link: cartLink
    };
    dispatch(addContact(newContact));
  };

  const formSchema = Yup.object().shape({
    phoneNumber: Yup.number()
      .min(12, PHONE_NUMBER_LENGTH_MESSAGE)
      .typeError(PHONE_NUMBER_TYPE_MESSAGE)
      .required(ENTER_PHONE_NUMBER_MESSAGE),
    ukSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_SCHEDULE_MESSAGE),
    enSchedule: Yup.string()
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_SCHEDULE_MESSAGE),
    ukAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .required(ENTER_ADDRESS_MESSAGE),
    enAddress: Yup.string()
      .min(8, INPUT_LENGTH_MESSAGE)
      .required(ENTER_ADDRESS_MESSAGE),
    email: Yup.string()
      .email(INVALID_EMAIL_MESSAGE)
      .required(ENTER_EMAIL_MESSAGE),
    ukCartImage: Yup.string()
      .url(IMAGE_FORMAT_MESSAGE)
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_LINK_MESSAGE),
    enCartImage: Yup.string()
      .url(IMAGE_FORMAT_MESSAGE)
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_LINK_MESSAGE),
    cartLink: Yup.string()
      .url(IMAGE_FORMAT_MESSAGE)
      .min(10, INPUT_LENGTH_MESSAGE)
      .required(ENTER_LINK_MESSAGE)
  });

  const { handleSubmit, handleChange, values, touched, errors } = useFormik({
    initialValues: contactFormValues,
    validationSchema: formSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      contactSaveHandler(values);
    }
  });

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <FormControl className={classes.newsDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
                  id='ukCartImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото карти (укр.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.ukCartImage}
                  onChange={handleChange}
                  error={touched.ukCartImage && !!errors.ukCartImage}
                  helperText={errors.ukCartImage}
                  required
                />
                <TextField
                  id='enCartImage'
                  className={classes.textField}
                  variant='outlined'
                  label='Фото карти (англ.)'
                  multiline
                  InputLabelProps={{
                    classes: {
                      root: classes.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  value={values.enCartImage}
                  onChange={handleChange}
                  error={touched.enCartImage && !!errors.enCartImage}
                  helperText={errors.enCartImage}
                  required
                />
                <TextField
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
                  helperText={errors.cartLink}
                  required
                />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
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
                  helperText={errors.phoneNumber}
                  required
                />
                <TextField
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
                  helperText={errors.ukSchedule}
                  required
                />
                <TextField
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
                  helperText={errors.enSchedule}
                  required
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.newsItemUpdate}>
                <TextField
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
                  helperText={errors.ukAddress}
                  required
                />
                <TextField
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
                  helperText={errors.enAddress}
                  required
                />
                <TextField
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
                  helperText={errors.email}
                  required
                />
              </Paper>
            </Grid>
          </Grid>
        </FormControl>
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

export default ContactsAdd;
