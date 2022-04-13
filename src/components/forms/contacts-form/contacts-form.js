import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { FormControl, Paper, TextField, Grid } from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { config } from '../../../configs';
import { BackButton, SaveButton } from '../../buttons';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';
import { useStyles } from './contacts-form.style';
import LanguagePanel from '../language-panel';
import { setInputsContactHandler } from '../../../utils/contacts-form';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const { languages } = config;
const { schedule, adress } = config.labels.contacts;

const {
  ENTER_PHONE_NUMBER_MESSAGE,
  INPUT_LENGTH_MESSAGE,
  ENTER_UA_SCHEDULE_MESSAGE,
  ENTER_EN_SCHEDULE_MESSAGE,
  ENTER_UA_ADDRESS_MESSAGE,
  ENTER_EN_ADDRESS_MESSAGE,
  CONTACT_ERROR_MESSAGE,
  INVALID_PHONE_MESSAGE
} = config.contactErrorMessages;

const { INVALID_EMAIL_MESSAGE, ENTER_EMAIL_MESSAGE } =
  config.loginErrorMessages;

const { enAddressRegex, uaRegex, enRegex, phoneNumber } = config.formRegExp;

const ContactsForm = ({ contactSaveHandler, initialValues }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pathToContacts } = config.routes;

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
      .required(ENTER_EMAIL_MESSAGE)
  });

  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues,
      validationSchema: formSchema,
      validateOnBlur: true,
      onSubmit: (formValues) => {
        if (initialValues) {
          formValues.cartLink = cartLink;
          contactSaveHandler(formValues);
        } else {
          dispatch(showErrorSnackbar(CONTACT_ERROR_MESSAGE));
        }
      }
    });

  const unblock = useUnsavedChangesHandler(values);

  const inputs = setInputsContactHandler(schedule, adress);

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const [cartLink, setcartLink] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const q = values.uaAddress.trim();

      const url = `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_MAP_API_KEY}&limit=1&accept-language=ua&q=${q}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setcartLink({ lat: data[0].lat, lon: data[0].lon });
        })
        .catch((err) => console.error(err));
    }, 1000);
    return () => clearTimeout(timer);
  }, [values.uaAddress]);

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className={classes.detailsContainer}>
      <form className={classes.form} onSubmit={(e) => eventPreventHandler(e)}>
        <div className={classes.buttonContainer}>
          <Grid container spacing={2} className={classes.fixedButtons}>
            <Grid item className={classes.button}>
              <BackButton data-cy='go-back-button' pathBack={pathToContacts} />
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
                unblockFunction={unblock}
              />
            </Grid>
          </Grid>
        </div>
        <FormControl className={classes.contactDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper className={classes.contactItemUpdate}>
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
    email: PropTypes.string.isRequired,
    cartLink: PropTypes.shape({
      lat: PropTypes.string.isRequired,
      lon: PropTypes.string.isRequired
    })
  })
};

ContactsForm.defaultProps = {
  initialValues: {
    phoneNumber: '',
    uaSchedule: '',
    enSchedule: '',
    uaAddress: '',
    enAddress: '',
    email: '',
    cartLink: {
      lat: '',
      lon: ''
    }
  }
};

export default ContactsForm;
