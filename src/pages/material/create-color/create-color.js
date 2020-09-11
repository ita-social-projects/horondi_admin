import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Paper, TextField, AppBar, Tabs, Grid, Tab } from '@material-ui/core';
import { config } from '../../../configs';
import useColorHandlers from '../../../utils/use-color-handlers';
import LoadingBar from '../../../components/loading-bar';
import {
  setNewColorToStore,
  showColorDialogWindow
} from '../../../redux/material/material.actions';
import { useStyles } from './create-color.styles';
import TabPanel from '../../../components/tab-panel';
import CheckboxOptions from '../../../components/checkbox-options';
import { SaveButton } from '../../../components/buttons';

const { languages, materialErrorMessages, colorErrorMessages } = config;

function CreateColor() {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ Material }) => ({
    loading: Material.colorLoading
  }));

  const {
    setAvailable,
    available,
    code,
    createColor,
    tabsValue,
    handleTabsChange,
    colorImage
  } = useColorHandlers();

  const langValues = languages.map((lang) => ({
    [`${lang}Name`]: '',
    [`${lang}SimpleName`]: ''
  }));

  const formikValues = langValues !== null ? Object.assign(...langValues) : {};

  const formSchema = Yup.object().shape({
    ukName: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    enName: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    ukSimpleName: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    enSimpleName: Yup.string()
      .min(2, materialErrorMessages.MIN_LENGTH_MESSAGE)
      .max(100, materialErrorMessages.MAX_LENGTH_MESSAGE)
      .required(materialErrorMessages.VALIDATION_ERROR),

    code: Yup.number()
      .min(1, 'мінінум 1')
      .max(1000000, colorErrorMessages.MAX_LENGTH_MESSAGE)
      .required(colorErrorMessages.VALIDATION_ERROR),
    colorImage: Yup.string()
      .min(2, colorErrorMessages.MIN_LENGTH_MESSAGE)
      .required(colorErrorMessages.VALIDATION_ERROR)
  });

  const { values, handleChange, handleSubmit, errors, touched } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      ...formikValues,
      code,
      colorImage
    },
    onSubmit: () => {
      const color = createColor(values);
      dispatch(setNewColorToStore(color));
      dispatch(showColorDialogWindow(false));
    }
  });
  console.log(values);
  const TabPanels =
    languages.length > 0
      ? languages.map((lang, index) => (
          <TabPanel key={lang} value={tabsValue} index={index}>
            <Paper className={styles.materialItemAdd}>
              <TextField
                data-cy={`${lang}Name`}
                id={`${lang}Name`}
                className={styles.textfield}
                variant='outlined'
                label={config.labels.colors.name}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
              />
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
              )}
              <TextField
                data-cy={`${lang}SimpleName`}
                id={`${lang}SimpleName`}
                className={styles.textfield}
                variant='outlined'
                label={config.labels.colors.simpleName}
                multiline
                error={
                  touched[`${lang}SimpleName`] && !!errors[`${lang}SimpleName`]
                }
                value={values[`${lang}SimpleName`]}
                onChange={handleChange}
              />
              {touched[`${lang}SimpleName`] && errors[`${lang}SimpleName`] && (
                <div className={styles.inputError}>
                  {errors[`${lang}SimpleName`]}
                </div>
              )}
            </Paper>
          </TabPanel>
        ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => <Tab label={lang} key={index} />)
      : null;

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: available,
      checked: available,
      color: 'primary',
      label: config.labels.colors.available,
      handler: (e) => setAvailable(e.target.checked)
    }
  ];

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.controlsBlock}>
          <CheckboxOptions options={checkboxes} />
          <div>
            <SaveButton
              className={styles.saveButton}
              data-cy='open-dialog'
              type='submit'
              title={config.buttonTitles.CREATE_COLOR_TITLE}
            />
          </div>
        </div>
        <Grid item xs={12}>
          <Paper className={styles.materialItemAdd}>
            <TextField
              data-cy='colorImage'
              id='colorImage'
              className={styles.textfield}
              variant='outlined'
              label={config.labels.colors.image}
              value={values.colorImage}
              onChange={handleChange}
              error={touched.colorImage && !!errors.colorImage}
            />
            {touched.colorImage && errors.colorImage && (
              <div className={styles.inputError}>{errors.colorImage}</div>
            )}
          </Paper>
          <Paper className={styles.materialItemAdd}>
            <TextField
              data-cy='code'
              id='code'
              className={styles.textfield}
              variant='outlined'
              label={config.labels.colors.code}
              value={values.code}
              onChange={handleChange}
              error={touched.code && !!errors.code}
            />
            {touched.code && errors.code && (
              <div className={styles.inputError}>{errors.code}</div>
            )}
          </Paper>
        </Grid>
        {languages.length > 0 ? (
          <div>
            <AppBar position='static'>
              <Tabs
                className={styles.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='tabs'
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
}

export default CreateColor;
