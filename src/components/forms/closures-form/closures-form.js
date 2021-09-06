import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';

import useClosuresHandlers from '../../../utils/use-closures-handlers';
import { useStyles } from './closures-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addClosures,
  updateClosure
} from '../../../redux/closures/closures.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import LanguagePanel from '../language-panel';
import { getClosuresInitialValues } from '../../../utils/closures-form';
import CheckboxOptions from '../../checkbox-options';
import { checkInitialValue } from '../../../utils/check-initial-values';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const labels = config.labels.closuresPageLabel;

const {
  CLOSURES_ERROR_MESSAGE,
  CLOSURES_UA_NAME_MESSAGE,
  CLOSURES_EN_NAME_MESSAGE,
  PHOTO_NOT_PROVIDED,
  CLOSURES_MAX_LENGTH_MESSAGE,
  CLOSURES_MIN_LENGTH_MESSAGE,
  CLOSURES_PRICE_ERROR
} = config.closuresErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages, IMG_URL, materialUiConstants } = config;

const { enNameCreation, uaNameCreation, additionalPriceRegExp } =
  config.formRegExp;

const ClosuresForm = ({ closure, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { createClosures, setUpload, upload, closuresImage, setClosuresImage } =
    useClosuresHandlers();

  const { pathToClosures } = config.routes;

  const closuresValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, CLOSURES_MIN_LENGTH_MESSAGE)
      .max(50, CLOSURES_MAX_LENGTH_MESSAGE)
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(uaNameCreation, CLOSURES_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, CLOSURES_MIN_LENGTH_MESSAGE)
      .max(50, CLOSURES_MAX_LENGTH_MESSAGE)
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(enNameCreation, CLOSURES_EN_NAME_MESSAGE),
    additionalPrice: Yup.string()
      .required(CLOSURES_ERROR_MESSAGE)
      .matches(additionalPriceRegExp, CLOSURES_PRICE_ERROR)
      .nullable(),
    available: Yup.boolean(),
    closureImage: Yup.string().required(PHOTO_NOT_PROVIDED)
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
    validationSchema: closuresValidationSchema,
    initialValues: getClosuresInitialValues(edit, IMG_URL, closure),
    onSubmit: (data) => {
      const newClosure = createClosures(data);
      const editAndUpload = edit && upload instanceof File;

      if (editAndUpload || edit) {
        dispatch(
          updateClosure({
            id,
            closure: newClosure,
            upload
          })
        );
        return;
      }
      dispatch(addClosures({ closure: newClosure, upload }));
    }
  });

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (data) => {
        setFieldValue('closureImage', data.target.result);
        setClosuresImage(data.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.closuresPageLabel.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const inputs = [{ label: labels.closuresName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  useUnsavedChangesHandler(values);

  const valueEquality = checkInitialValue(
    getClosuresInitialValues(edit, IMG_URL, closure),
    values
  );

  const eventPreventDefaultHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={(e) => eventPreventDefaultHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton initial={!valueEquality} pathBack={pathToClosures} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy='save-btn'
                type='submit'
                title={SAVE_TITLE}
                values={values}
                errors={errors}
                onClickHandler={handleSubmit}
              />
            </Grid>
          </Grid>
        </div>
        <CheckboxOptions options={checkboxes} />
        <Grid item xs={12}>
          <Paper>
            <span className={styles.imageUpload}>{labels.avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={edit ? values.closureImage : closuresImage}
              />
            </div>
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        <div>
          {languages.map((lang) => (
            <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
          ))}
        </div>
        <>
          <Paper className={styles.additionalPrice}>
            <Box>
              <Typography>{labels.enterPrice}</Typography>
            </Box>
            <TextField
              type={materialUiConstants.types.number}
              label={labels.additionalPrice}
              value={values.additionalPrice}
              data-cy='additionalPrice'
              id='additionalPrice'
              className={styles.textField}
              variant={materialUiConstants.outlined}
              inputProps={{ min: 0 }}
              error={touched.additionalPrice && !!errors.additionalPrice}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div
                className={styles.error}
                data-cy={materialUiConstants.codeError}
              >
                {errors.additionalPrice}
              </div>
            )}
          </Paper>
        </>
      </form>
    </div>
  );
};

ClosuresForm.propTypes = {
  id: PropTypes.string,
  closure: PropTypes.shape({
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    })
  }),
  values: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    available: PropTypes.bool
  }),
  errors: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    available: PropTypes.bool
  }),
  touched: PropTypes.shape({
    closuresImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    available: PropTypes.bool
  }),
  edit: PropTypes.bool
};

ClosuresForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  closure: {
    _id: '',
    name: [
      {
        lang: '',
        value: ''
      },
      {
        lang: '',
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    available: false,
    optionType: null,
    additionalPrice: [
      { value: null, currency: '' },
      { value: null, currency: '' }
    ]
  },
  edit: false
};

export default ClosuresForm;
