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
  zipcode
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
    zipcode: Yup.string().matches(zipcode, USER_INVALID_ADDRESS_MESSAGE),
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
                unblockFunction={unblock}
              />
            </Grid>
          </Grid>
        </div>

        <Paper className={styles.colorPaper}>
          <Grid item xs={12}>
            <Paper>
              <span className={styles.userImage}>Фото користувача</span>
              <div className={styles.userImage}>
                <ImageUploadContainer
                  handler={handleImageLoad}
                  src={values.userImage}
                />
              </div>
            </Paper>
          </Grid>
          {Object.keys(labels).map((fieldName) => (
            <React.Fragment key={fieldName}>
              <TextField
                id={fieldName}
                data-cy={fieldName}
                className={styles.textField}
                variant='outlined'
                label={labels[fieldName]}
                value={values[fieldName]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[fieldName] && !!errors[fieldName]}
              />
              {touched[fieldName] && errors[fieldName] && (
                <div className={styles.inputError}>{errors[fieldName]}</div>
              )}
            </React.Fragment>
          ))}
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
