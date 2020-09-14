import React from 'react';
import {
  TextField,
  Paper,
  Grid,
  Tabs,
  Tab,
  AppBar,
  Avatar
} from '@material-ui/core';

import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import TabPanel from '../../../components/tab-panel';
import { SaveButton } from '../../../components/buttons';
import LoadingBar from '../../../components/loading-bar';
import usePatternHandlers from '../../../utils/use-pattern-handlers';
import { useStyles } from './pattern-add.styles';
import { addPattern } from '../../../redux/pattern/pattern.actions';
import { config } from '../../../configs';
import CheckboxOptions from '../../../components/checkbox-options';

const { languages } = config;
const {
  PATTERN_VALIDATION_ERROR,
  PATTERN_ERROR_MESSAGE
} = config.patternErrorMessages;

const PatternAdd = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector(({ Pattern }) => Pattern.patternLoading);
  const {
    patternImage,
    setPatternImage,
    material,
    tabsValue,
    handleTabsChange,
    createPattern,
    upload,
    setUpload
  } = usePatternHandlers();

  const langValues = languages.map((lang) => ({
    [`${lang}Name`]: '',
    [`${lang}Description`]: ''
  }));

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
      .required(PATTERN_ERROR_MESSAGE)
  });
  const formikValues =
    langValues !== null ? Object.assign(...langValues) : null;

  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    handleSubmit
  } = useFormik({
    initialValues: {
      ...formikValues,
      material,
      available: false,
      handmade: false
    },
    validationSchema: patternValidationSchema,
    validateOnBlur: true,
    onSubmit: (values) => {
      const pattern = createPattern(values);
      dispatch(addPattern({ pattern, upload }));
    }
  });
  const TabPanels =
    languages.length > 0
      ? languages.map((lang, index) => (
        <TabPanel key={index} value={tabsValue} index={index}>
          <Paper className={styles.patternItemAdd}>
            <TextField
              data-cy={`${lang}Name`}
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
      ))
      : null;

  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => (
        <Tab data-cy={lang} label={lang} key={index} />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

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
        setPatternImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.controlsBlock}>
          <div>
            <CheckboxOptions options={checkboxes} />
          </div>
          <SaveButton
            className={styles.saveButton}
            data-cy='save'
            type='submit'
            title='Зберегти'
          />
        </div>
        {languages.length > 0 ? (
          <div>
            <Grid item xs={12}>
              <Paper className={styles.patternItemAdd}>
                <label htmlFor='patternImage'>
                  <Avatar
                    className={styles.patternImage}
                    variant='square'
                    src={patternImage}
                    alt='pattern'
                  >
                    {config.labels.pattern.avatarText}
                  </Avatar>
                </label>
                <input
                  className={styles.patternInputFile}
                  type='file'
                  id='patternImage'
                  data-cy='patternImage'
                  onChange={handleImageLoad}
                />
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
            {TabPanels}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default PatternAdd;
