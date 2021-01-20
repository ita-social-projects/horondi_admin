import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Avatar } from '@material-ui/core';
import * as Yup from 'yup';
import { Image } from '@material-ui/icons';
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import { useStyles } from './pattern-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addPattern,
  updatePattern
} from '../../../redux/pattern/pattern.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadContainer from '../../../containers/image-upload-container';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';

const map = require('lodash/map');

const {
  PATTERN_VALIDATION_ERROR,
  PATTERN_ERROR_MESSAGE,
  PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  PATTERN_EN_NAME_MESSAGE,
  PATTERN_UA_NAME_MESSAGE
} = config.patternErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const {
  languages,
  formRegExp: { enNameCreation, uaNameCreation, patternMaterial }
} = config;

const { patternDescription, patternName } = config.labels.pattern;

const PatternForm = ({ pattern, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    createPattern,
    setUpload,
    upload,
    patternImage,
    setPatternImage
  } = usePatternHandlers();

  const patternValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(enNameCreation, PATTERN_EN_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(enNameCreation, PATTERN_EN_NAME_MESSAGE),
    uaDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(uaNameCreation, PATTERN_UA_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE)
      .matches(uaNameCreation, PATTERN_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .matches(patternMaterial, PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(PATTERN_ERROR_MESSAGE)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: patternValidationSchema,
    initialValues: {
      patternImage: pattern.images.thumbnail || '',
      uaName: pattern.name[0].value || '',
      enName: pattern.name[1].value || '',
      uaDescription: pattern.description[0].value || '',
      enDescription: pattern.description[1].value || '',
      material: pattern.material || '',
      available: pattern.available || false,
      handmade: pattern.handmade || false
    },
    onSubmit: () => {
      const newPattern = createPattern(values);

      if (upload instanceof File || pattern.images.thumbnail) {
        if (isEdit && upload instanceof File) {
          dispatch(updatePattern({ id, pattern: newPattern, image: upload }));
          return;
        }
        if (isEdit) {
          dispatch(updatePattern({ id, pattern: newPattern }));
          return;
        }
        dispatch(addPattern({ pattern: newPattern, image: upload }));
        return;
      }
      dispatch(setSnackBarSeverity('error'));
      dispatch(setSnackBarMessage(PHOTO_NOT_PROVIDED));
      dispatch(setSnackBarStatus(true));
    }
  });

  const checkboxes = [
    {
      id: 'handmade',
      dataCy: 'handmade',
      value: values.handmade,
      checked: values.handmade,
      color: 'primary',
      label: config.labels.pattern.handmade,
      handler: (e) => setFieldValue('handmade', !values.handmade)
    },
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.pattern.available,
      handler: (e) => setFieldValue('available', !values.available)
    }
  ];

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('patternImage', event.target.result);
        setPatternImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  const inputs = [
    { label: patternName, name: 'name' },
    { label: patternDescription, name: 'description' }
  ];
  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CheckboxOptions options={checkboxes} />

        <Grid item xs={12}>
          <Paper className={styles.patternItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.pattern.avatarText}
            </span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer handler={handleImageLoad} />
              {patternImage && (
                <Avatar src={patternImage}>
                  <Image />
                </Avatar>
              )}
            </div>
            <TextField
              data-cy='material'
              id='material'
              className={styles.textField}
              variant='outlined'
              label={config.labels.pattern.material}
              value={values.material}
              onChange={handleChange}
              error={touched.material && !!errors.material}
            />
            {touched.material && errors.material && (
              <div data-cy='material-error' className={styles.inputError}>
                {errors.material}
              </div>
            )}
          </Paper>
        </Grid>
        {map(languages, (lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <BackButton />
        <SaveButton
          className={styles.saveButton}
          data-cy='save-btn'
          type='submit'
          title={SAVE_TITLE}
          values={values}
          errors={errors}
        />
      </form>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
PatternForm.propTypes = {
  id: PropTypes.string,
  pattern: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    description: PropTypes.arrayOf(valueShape),
    handmade: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  errors: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  touched: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  isEdit: PropTypes.bool
};
PatternForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  pattern: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    images: {
      thumbnail: ''
    },
    material: '',
    available: false,
    handmade: false
  },
  isEdit: false
};

export default PatternForm;
