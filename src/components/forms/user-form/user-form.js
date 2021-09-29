import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { useStyles } from './user-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { updateUserById } from '../../../redux/users/users.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import {
  getUserInitialValues,
  userFormOnSubmit
} from '../../../utils/user-form';
import useUserHandlers from '../../../utils/use-user-handlers';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const labels = config.labels.userDetails;

const {
  USER_FIRSTNAME_MESSAGE,
  USER_FIRSTNAME_MIN_LENGTH_MESSAGE,
  USER_FIRSTNAME_MAX_LENGTH_MESSAGE,
  USER_LASTNAME_MESSAGE,
  USER_LASTNAME_MIN_LENGTH_MESSAGE,
  USER_LASTNAME_MAX_LENGTH_MESSAGE,
  USER_EMAIL_MESSAGE,
  USER_INVALID_EMAIL_MESSAGE,
  USER_PHONE_NUMBER_MESSAGE,
  USER_INVALID_PHONE_NUMBER_MESSAGE,
  USER_INVALID_ADDRESS_MESSAGE,
  USER_ERROR_MESSAGE
} = config.userErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { IMG_URL } = config;
const {
  firstName,
  lastName,
  email,
  phoneNumber,
  uaRegex,
  uaNameCreation,
  categoryCode,
  postCode
} = config.formRegExp;
const { pathToUsers } = config.routes;

const UserForm = ({ user, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createUser, setUserImage, setUpload, upload } = useUserHandlers();

  const userValidationSchema = Yup.object().shape({
    userFirstName: Yup.string()
      .min(2, USER_FIRSTNAME_MIN_LENGTH_MESSAGE)
      .max(30, USER_FIRSTNAME_MAX_LENGTH_MESSAGE)
      .required(USER_ERROR_MESSAGE)
      .matches(firstName, USER_FIRSTNAME_MESSAGE),
    userLastName: Yup.string()
      .min(2, USER_LASTNAME_MIN_LENGTH_MESSAGE)
      .max(30, USER_LASTNAME_MAX_LENGTH_MESSAGE)
      .required(USER_ERROR_MESSAGE)
      .matches(lastName, USER_LASTNAME_MESSAGE),
    email: Yup.string()
      .required(USER_EMAIL_MESSAGE)
      .matches(email, USER_INVALID_EMAIL_MESSAGE),
    phoneNumber: Yup.string()
      .required(USER_PHONE_NUMBER_MESSAGE)
      .matches(phoneNumber, USER_INVALID_PHONE_NUMBER_MESSAGE),
    country: Yup.string().matches(uaRegex, USER_INVALID_ADDRESS_MESSAGE),
    region: Yup.string().matches(uaRegex, USER_INVALID_ADDRESS_MESSAGE),
    city: Yup.string().matches(uaRegex, USER_INVALID_ADDRESS_MESSAGE),
    street: Yup.string().matches(uaRegex, USER_INVALID_ADDRESS_MESSAGE),
    buildingNumber: Yup.string().matches(
      uaNameCreation,
      USER_INVALID_ADDRESS_MESSAGE
    ),
    appartment: Yup.string().matches(
      categoryCode,
      USER_INVALID_ADDRESS_MESSAGE
    ),
    zipcode: Yup.string().matches(postCode, USER_INVALID_ADDRESS_MESSAGE),
    userImage: Yup.string()
  });

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: userValidationSchema,
    initialValues: getUserInitialValues(user, edit, IMG_URL),

    onSubmit: () => {
      const editedUser = createUser(values);
      const editAndUpload = edit && upload instanceof File;
      if (editAndUpload || edit) {
        userFormOnSubmit(
          editAndUpload,
          dispatch,
          updateUserById,
          {
            id,
            user: editedUser,
            image: upload
          },
          edit,
          {
            id,
            user: editedUser
          }
        );
        
      }
    }
  });

  const unblock = useUnsavedChangesHandler(values);
  const changed = useChangedValuesChecker(values, errors);

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (data) => {
        setFieldValue('userImage', data.target.result);
        setUserImage(data.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };
  const idCondition = id ? { disabled: !changed } : {};
  return (
    <div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton
                className={styles.returnButton}
                pathBack={pathToUsers}
              />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                className={styles.saveButton}
                data-cy='save'
                type='submit'
                title={SAVE_TITLE}
                values={values}
                errors={errors}
                onClickHandler={handleSubmit}
                {...idCondition}
                unblockFunction={unblock}
              />
            </Grid>
          </Grid>
        </div>

        <Paper className={styles.colorPaper}>
          <Grid item xs={12}>
            <Paper>
              <span className={styles.userImage}>{labels.userAvatar}</span>
              <div className={styles.userImage}>
                <ImageUploadContainer
                  handler={handleImageLoad}
                  src={values.userImage}
                />
              </div>
            </Paper>
          </Grid>
          <TextField
            id='userFirstName'
            data-cy='userFirstName'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.userFirstName}
            value={values.userFirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userFirstName && !!errors.userFirstName}
          />
          {touched.userFirstName && errors.userFirstName && (
            <div className={styles.inputError}>{errors.userFirstName}</div>
          )}
          <TextField
            id='userLastName'
            data-cy='userLastName'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.userLastName}
            value={values.userLastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.userLastName && !!errors.userLastName}
          />
          {touched.userLastName && errors.userLastName && (
            <div className={styles.inputError}>{errors.userLastName}</div>
          )}
          <TextField
            id='email'
            data-cy='email'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.email}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && !!errors.email}
          />
          {touched.email && errors.email && (
            <div className={styles.inputError}>{errors.email}</div>
          )}
          <TextField
            id='phoneNumber'
            data-cy='phoneNumber'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.phoneNumber}
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber && !!errors.phoneNumber}
          />
          {touched.phoneNumber && errors.phoneNumber && (
            <div className={styles.inputError}>{errors.phoneNumber}</div>
          )}
          <TextField
            id='country'
            data-cy='country'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.country}
            value={values.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.country && !!errors.country}
          />
          {touched.country && errors.country && (
            <div className={styles.inputError}>{errors.country}</div>
          )}
          <TextField
            id='region'
            data-cy='region'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.region}
            value={values.region}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.region && !!errors.region}
          />
          {touched.region && errors.region && (
            <div className={styles.inputError}>{errors.region}</div>
          )}
          <TextField
            id='city'
            data-cy='city'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.city}
            value={values.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city && !!errors.city}
          />
          {touched.city && errors.city && (
            <div className={styles.inputError}>{errors.city}</div>
          )}
          <TextField
            id='street'
            data-cy='street'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.street}
            value={values.street}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.street && !!errors.street}
          />
          {touched.street && errors.street && (
            <div className={styles.inputError}>{errors.street}</div>
          )}
          <TextField
            id='buildingNumber'
            data-cy='buildingNumber'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.house}
            value={values.buildingNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.buildingNumber && !!errors.buildingNumber}
          />
          {touched.buildingNumber && errors.buildingNumber && (
            <div className={styles.inputError}>{errors.buildingNumber}</div>
          )}
          <TextField
            id='appartment'
            data-cy='appartment'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.flat}
            value={values.appartment}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.appartment && !!errors.appartment}
          />
          {touched.appartment && errors.appartment && (
            <div className={styles.inputError}>{errors.appartment}</div>
          )}
          <TextField
            id='zipcode'
            data-cy='zipcode'
            className={styles.textField}
            variant='outlined'
            label={config.labels.userDetails.zipCode}
            value={values.zipcode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.zipcode && !!errors.zipcode}
          />
          {touched.zipcode && errors.zipcode && (
            <div className={styles.inputError}>{errors.zipcode}</div>
          )}
        </Paper>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  id: PropTypes.string,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.shape({
      country: PropTypes.string,
      region: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
      street: PropTypes.string,
      buildingNumber: PropTypes.string,
      appartment: PropTypes.string
    }),
    images: PropTypes.shape({
      large: PropTypes.string,
      medium: PropTypes.string,
      small: PropTypes.string,
      thumbnail: PropTypes.string
    })
  }),
  edit: PropTypes.bool
};

UserForm.defaultProps = {
  id: '',
  user: {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: {
      country: '',
      region: '',
      city: '',
      zipcode: '',
      street: '',
      buildingNumber: '',
      appartment: ''
    },
    images: {
      large: '',
      medium: '',
      small: '',
      thumbnail: ''
    }
  },
  edit: false
};

export default UserForm;
