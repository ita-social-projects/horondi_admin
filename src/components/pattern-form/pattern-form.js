import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  AppBar,
  Tabs,
  Avatar,
  Button
} from '@material-ui/core';
import { AttachFile, Image } from '@material-ui/icons';

import * as Yup from 'yup';
import usePatternHandlers from '../../utils/use-pattern-handlers';
import { useStyles } from './pattern-form.styles';
import { SaveButton } from '../buttons';
import TabPanel from '../tab-panel';
import { config } from '../../configs';
import { addPattern, updatePattern } from '../../redux/pattern/pattern.actions';
import CheckboxOptions from '../checkbox-options';

const {
  PATTERN_VALIDATION_ERROR,
  PATTERN_ERROR_MESSAGE,
  PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY
} = config.patternErrorMessages;

const { languages } = config;

const PatternForm = ({ pattern, id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    tabsValue,
    handleTabsChange,
    createPattern,
    setUpload,
    upload,
    patternImage,
    setPatternImage,
    imageName,
    setImageName
  } = usePatternHandlers();
  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => <Tab label={lang} key={lang} />)
      : null;

  const patternValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    enName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    ukDescription: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    ukName: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .required(PATTERN_ERROR_MESSAGE),
    material: Yup.string()
      .min(2, PATTERN_VALIDATION_ERROR)
      .matches(
        config.formRegExp.patternMaterial,
        PATTERN_ERROR_ENGLISH_AND_DIGITS_ONLY
      )
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
      ukName: pattern.name[0].value || '',
      enName: pattern.name[1].value || '',
      ukDescription: pattern.description[0].value || '',
      enDescription: pattern.description[1].value || '',
      material: pattern.material || '',
      available: pattern.available || false,
      handmade: pattern.handmade || false
    },
    onSubmit: () => {
      const newPattern = createPattern(values);

      if (pattern && pattern.material) {
        dispatch(updatePattern({ id, pattern: newPattern, image: upload }));
        return;
      }
      dispatch(addPattern({ pattern: newPattern, image: upload }));
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
      reader.onload = (e) => {
        setFieldValue('patternImage', e.target.result);
        setPatternImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
      setImageName(e.target.files[0].name);
    }
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
            <div className={styles.imageUploadContainer}>
              <label htmlFor='upload-photo'>
                <input
                  style={{ display: 'none' }}
                  accept='image/*'
                  id='upload-photo'
                  name='upload-photo'
                  type='file'
                  onChange={handleImageLoad}
                />
                <Button
                  id='add-contact'
                  variant='outlined'
                  color='primary'
                  component='span'
                >
                  <AttachFile className={styles.attachFile} />
                  Завантажити
                </Button>
              </label>
              <Avatar
                data-cy='ukCartImage'
                src={
                  patternImage ||
                  `${config.patternImageLink}${values.patternImage}`
                }
                className={styles.large}
              >
                <Image />
              </Avatar>
              <span className={styles.imageName}>{imageName}</span>
            </div>
            <TextField
              id='material'
              data-cy='material'
              className={styles.textField}
              variant='outlined'
              label={config.labels.pattern.material}
              value={values.material}
              onChange={handleChange}
              error={touched.material && !!errors.material}
            />
            {touched.material && errors.material && (
              <div className={styles.inputError}>{errors.material}</div>
            )}
          </Paper>
        </Grid>
        <AppBar position='static'>
          <Tabs
            className={styles.tabs}
            value={tabsValue}
            onChange={handleTabsChange}
            aria-label='simple tabs example'
          >
            {languageTabs}
          </Tabs>
        </AppBar>
        {languages.map((lang, index) => (
          <TabPanel key={index} value={tabsValue} index={index}>
            <Paper className={styles.patternItemUpdate}>
              <TextField
                data-cy='Name'
                id={`${lang}Name`}
                className={styles.textField}
                variant='outlined'
                label='Назва'
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
              />
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
              )}
              <TextField
                data-cy={`${lang}Description`}
                id={`${lang}Description`}
                className={styles.textField}
                variant='outlined'
                label='Опис'
                multiline
                value={values[`${lang}Description`]}
                onChange={handleChange}
                error={
                  touched[`${lang}Description`] &&
                  !!errors[`${lang}Description`]
                }
              />
              {touched[`${lang}Description`] &&
                errors[`${lang}Description`] && (
                <div className={styles.inputError}>
                  {errors[`${lang}Description`]}
                </div>
              )}
            </Paper>
          </TabPanel>
        ))}
        <div className={styles.controlsBlock}>
          <div />
          <SaveButton
            className={styles.saveButton}
            data-cy='save'
            type='submit'
            title='Зберегти'
          />
        </div>
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
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  errors: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  touched: PropTypes.shape({
    patternImage: PropTypes.string,
    material: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
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
  }
};

export default PatternForm;
