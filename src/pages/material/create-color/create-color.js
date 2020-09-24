import React from 'react';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Paper,
  TextField,
  AppBar,
  Tabs,
  Grid,
  Tab,
  Avatar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Palette } from '@material-ui/icons';
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

function CreateColor({
  imagesToUpload,
  setImagesToUpload,
  colorImages,
  addNewColorImages
}) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading, colors } = useSelector(({ Material }) => ({
    loading: Material.colorLoading,
    colors: Material.colors
  }));

  const { createColor, tabsValue, handleTabsChange } = useColorHandlers();

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

    code: Yup.string()
      .min(1, colorErrorMessages.MIN_LENGTH_MESSAGE)
      .max(8, colorErrorMessages.MAX_CODE_LENGTH_MESSAGE)
      .matches(
        config.formRegExp.colorCode,
        colorErrorMessages.CODE_VALIDATION_ERROR
      )
      .required(colorErrorMessages.VALIDATION_ERROR)
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldError
  } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      ...formikValues,
      code: '',
      colorImage: '',
      image: '',
      available: false
    },
    onSubmit: (data) => {
      const { colorImage, image, ...rest } = data;
      const color = createColor(rest);

      const foundCode = colors.map((item) => item.code);
      if (!colorImage || !image) {
        return;
      }
      if (foundCode.includes(+rest.code)) {
        setFieldError('code', config.colorErrorMessages.CODE_NOT_UNIQUE_ERROR);
        return;
      }
      dispatch(setNewColorToStore(color));
      addNewColorImages(colorImage);
      dispatch(showColorDialogWindow(false));
      setImagesToUpload(image);
    }
  });

  const tabPanels = languages.map((lang, index) => (
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
          error={touched[`${lang}SimpleName`] && !!errors[`${lang}SimpleName`]}
          value={values[`${lang}SimpleName`]}
          onChange={handleChange}
        />
        {touched[`${lang}SimpleName`] && errors[`${lang}SimpleName`] && (
          <div className={styles.inputError}>{errors[`${lang}SimpleName`]}</div>
        )}
      </Paper>
    </TabPanel>
  ));

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
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.colors.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const filtered = [...colorImages].map((value) => value.toString());
        if (!filtered.includes(e.target.result.toString())) {
          setFieldValue('colorImage', e.target.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      const imagesNames = imagesToUpload.map(({ name }) => name);
      const newImages = Array.from(e.target.files).filter(
        ({ name }) => !imagesNames.includes(name)
      );
      setFieldValue('image', [...imagesToUpload, ...newImages]);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.controlsBlock}>
          <CheckboxOptions options={checkboxes} />
        </div>
        <Grid item xs={12}>
          <label htmlFor='colorImage'>
            <Avatar
              className={styles.colorImage}
              src={values.colorImage}
              alt='color'
            >
              <Palette />
            </Avatar>
          </label>
          <input
            className={styles.colorInputFile}
            type='file'
            id='colorImage'
            data-cy='colorImage'
            onChange={handleImageLoad}
            multiple={false}
          />
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
          {tabPanels}
        </div>
        <div>
          <SaveButton
            className={styles.saveButton}
            data-cy='open-dialog'
            type='submit'
            title={config.buttonTitles.CREATE_COLOR_TITLE}
          />
        </div>
      </form>
    </div>
  );
}
CreateColor.propTypes = {
  imagesToUpload: PropTypes.arrayOf(),
  setImagesToUpload: PropTypes.func,
  colorImages: PropTypes.arrayOf(),
  addNewColorImages: PropTypes.func
};
CreateColor.defaultProps = {
  imagesToUpload: [],
  colorImages: [],
  setImagesToUpload: () => {},
  addNewColorImages: () => {}
};
export default CreateColor;
