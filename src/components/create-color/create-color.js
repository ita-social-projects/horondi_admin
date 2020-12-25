import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { TextField, AppBar, Tabs, Tab } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ChromePicker } from 'react-color';
import ColorCircle from '../color-circle';
import { addColor } from '../../redux/color/color.actions';
import { useStyles } from './create-color.styles';
import TabPanel from '../tab-panel';
import LoadingBar from '../loading-bar';
import { SaveButton } from '../buttons';
import { config } from '../../configs';
import useColorHandlers from '../../utils/use-color-handlers';
import { selectColorLoading } from '../../redux/selectors/color.selectors';

const { languages, colorErrorMessages, buttonTitles } = config;
const {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  COLOR_VALIDATION_ERROR,
  VALIDATION_ERROR
} = colorErrorMessages;
const { CREATE_COLOR_TITLE } = buttonTitles;

const { DEFAULT_CIRCLE } = config.colorCircleSizes;

const CreateColor = () => {
  const [colorPicker, setColorPicker] = useState(false);
  const { createColor, tabsValue, handleTabsChange } = useColorHandlers();

  const { loading } = useSelector(selectColorLoading);

  const dispatch = useDispatch();
  const styles = useStyles();

  const formSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    uaSimpleName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    enSimpleName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    colorHex: Yup.string()
      .matches(config.formRegExp.hexString, COLOR_VALIDATION_ERROR)
      .required(VALIDATION_ERROR)
  });

  const langValues = languages.map((lang) => ({
    [`${lang}Name`]: '',
    [`${lang}SimpleName`]: ''
  }));

  const formikValues = langValues !== null ? Object.assign(...langValues) : {};

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    resetForm
  } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      ...formikValues,
      colorHex: ''
    },
    onSubmit: (data) => {
      const newColor = createColor(data);
      dispatch(addColor(newColor));
    }
  });

  useEffect(
    () => () => {
      resetForm();
      handleTabsChange(null, 0);
    },
    []
  );

  const tabPanels = languages.map((lang, index) => (
    <TabPanel key={lang} value={tabsValue} index={index}>
      <div className={styles.materialItemAdd}>
        <TextField
          data-cy={`${lang}-Name`}
          id={`${lang}Name`}
          className={styles.textField}
          variant='outlined'
          label={config.labels.color.name}
          error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
          multiline
          value={values[`${lang}Name`]}
          onChange={handleChange}
        />
        {touched[`${lang}Name`] && errors[`${lang}Name`] && (
          <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
        )}
        <TextField
          data-cy={`${lang}-SimpleName`}
          id={`${lang}SimpleName`}
          className={styles.textField}
          variant='outlined'
          label={config.labels.color.simpleName}
          multiline
          error={touched[`${lang}SimpleName`] && !!errors[`${lang}SimpleName`]}
          value={values[`${lang}SimpleName`]}
          onChange={handleChange}
        />
        {touched[`${lang}SimpleName`] && errors[`${lang}SimpleName`] && (
          <div className={styles.inputError}>{errors[`${lang}SimpleName`]}</div>
        )}
      </div>
    </TabPanel>
  ));

  const languageTabs =
    languages.length > 0
      ? languages.map((lang) => (
        <Tab
          className={
            (touched[`${lang}SimpleName`] && errors[`${lang}SimpleName`]) ||
              (touched[`${lang}Name`] && errors[`${lang}Name`])
              ? styles.errorTab
              : styles.tabs
          }
          label={lang}
          key={lang}
        />
      ))
      : null;

  return (
    <div className={styles.container}>
      {!loading ? (
        <form onSubmit={handleSubmit}>
          <div className={styles.colorPickerBlock}>
            <TextField
              autoComplete='off'
              variant='outlined'
              label={config.labels.color.colorHex}
              id='colorHex'
              value={values.colorHex}
              className={styles.textField}
              error={touched.colorHex && !!errors.colorHex}
              onFocus={() => {
                setColorPicker(true);
              }}
              onChange={handleChange}
            />
            <ColorCircle color={values.colorHex} size={DEFAULT_CIRCLE} />
          </div>
          {touched.colorHex && errors.colorHex && (
            <div className={styles.inputError}>{errors.colorHex}</div>
          )}
          {colorPicker && (
            <div className={styles.popover}>
              <div
                className={styles.cover}
                onClick={() => {
                  setColorPicker(false);
                }}
              />
              <ChromePicker
                color={values.colorHex}
                disableAlpha
                onChange={(colorObj) => {
                  setFieldValue('colorHex', colorObj.hex);
                }}
              />
            </div>
          )}
          <div>
            <AppBar position='static'>
              <Tabs
                indicatorColor='primary'
                textColor='primary'
                className={styles.tabs}
                value={tabsValue}
                onChange={handleTabsChange}
                aria-label='tabs'
              >
                {languageTabs}
              </Tabs>
            </AppBar>
            {tabPanels}
          </div>

          <div>
            <SaveButton
              className={styles.saveButton}
              data-cy='open-dialog'
              type='submit'
              title={CREATE_COLOR_TITLE}
            />
          </div>
        </form>
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default CreateColor;
