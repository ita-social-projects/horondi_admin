import React from 'react';

import {
  TextField,
  Grid,
  Tabs,
  Tab,
  AppBar,
  Avatar,
  Button,
  Paper
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import TabPanel from '../tab-panel';
import { SaveButton } from '../buttons';
import LoadingBar from '../loading-bar';
import useMaterialHandlers from '../../utils/use-material-handlers';
import { useStyles } from './material-form.styles';
import {
  addMaterial,
  updateMaterial,
  showColorDialogWindow,
  setMaterialColor,
  setEditMaterialId
} from '../../redux/material/material.actions';
import { config } from '../../configs';
import CheckboxOptions from '../checkbox-options';
import CreateColor from '../../pages/material/create-color';
import DialogWindowWrapper from '../dialog-window-wrapper';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../redux/snackbar/snackbar.actions';

const { languages } = config;
const {
  VALIDATION_ERROR,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  PRICE_VALIDATION_ERROR
} = config.materialErrorMessages;
function MaterialForm({ material, id }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading, colors } = useSelector(({ Material }) => ({
    loading: Material.materialLoading,
    colors: Material.colors
  }));

  const {
    createMaterial,
    tabsValue,
    handleTabsChange,
    colorImagesToUpload,
    setColorImagesToUpload,
    colorImages,
    addNewColorImages
  } = useMaterialHandlers();

  const formSchema = Yup.object().shape({
    ukName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    ukDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    enDescription: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(300, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    purpose: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    additionalPrice: Yup.string()
      .matches(config.formRegExp.onlyPositiveDigits, PRICE_VALIDATION_ERROR)
      .required(VALIDATION_ERROR)
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    validationSchema: formSchema,
    validateOnBlur: true,
    initialValues: {
      ukName: material.name[0].value || '',
      enName: material.name[1].value || '',
      ukDescription: material.description[0].value || '',
      enDescription: material.description[1].value || '',
      purpose: material.purpose || '',
      available: material.available || false,
      additionalPrice: +material.additionalPrice[1].value / 100 || 0
    },
    onSubmit: (data) => {
      const newMaterial = createMaterial(data);
      if (!colors.length && !id) {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(config.errorMessages.NO_COLORS));
        dispatch(setSnackBarStatus(true));
        return;
      }
      if (id) {
        dispatch(
          updateMaterial({
            id,
            material: { ...newMaterial }
          })
        );
        return;
      }
      dispatch(
        addMaterial({
          material: { ...newMaterial, colors },
          images: colorImagesToUpload
        })
      );
    }
  });

  const tabPanels = languages.map((lang, index) => (
    <TabPanel key={lang} value={tabsValue} index={index}>
      <Paper className={styles.materialItemAdd}>
        <TextField
          data-cy={`${lang}Name`}
          id={`${lang}Name`}
          className={styles.textField}
          variant='outlined'
          label={config.labels.material.name[tabsValue].value}
          error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
          multiline
          value={values[`${lang}Name`]}
          onChange={handleChange}
        />
        {touched[`${lang}Name`] && errors[`${lang}Name`] && (
          <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
        )}
        <TextField
          data-cy={`${lang}Description`}
          id={`${lang}Description`}
          className={styles.textField}
          variant='outlined'
          label={config.labels.material.description[tabsValue].value}
          multiline
          error={
            touched[`${lang}Description`] && !!errors[`${lang}Description`]
          }
          value={values[`${lang}Description`]}
          onChange={handleChange}
        />
        {touched[`${lang}Description`] && errors[`${lang}Description`] && (
          <div className={styles.inputError}>
            {errors[`${lang}Description`]}
          </div>
        )}
      </Paper>
    </TabPanel>
  ));

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.material.available[0].value,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const languageTabs = languages.map((lang) => (
    <Tab
      className={
        (touched[`${lang}Description`] && errors[`${lang}Description`]) ||
        (touched[`${lang}Name`] && errors[`${lang}Name`])
          ? styles.errorTab
          : styles.tabs
      }
      label={lang}
      key={lang}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  const colorClickHandler = () => {
    dispatch(showColorDialogWindow(true));
    dispatch(setMaterialColor(''));
    dispatch(setEditMaterialId(id));
  };
  const colorPaletteClickHandler = () => {
    dispatch(push(`/materials/${id}/colors`));
  };

  const materialColorPaletteButton = id ? (
    <SaveButton
      className={styles.colorPaletteButton}
      data-cy='go-to-color-palette'
      type='button'
      color='secondary'
      title={config.buttonTitles.GO_TO_MATERIAL_COLOR_PALLET}
      onClickHandler={colorPaletteClickHandler}
    />
  ) : null;

  const createColorButton = !id ? (
    <SaveButton
      className={styles.saveButton}
      data-cy='open-dialog'
      type='button'
      color='secondary'
      title={config.buttonTitles.CREATE_COLOR_TITLE}
      onClickHandler={colorClickHandler}
    />
  ) : null;

  return (
    <div className={styles.container}>
      <form className={styles.materialForm} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <CheckboxOptions options={checkboxes} />
          <div className={styles.colorImages}>
            {colorImages
              ? colorImages.map((image, index) => (
                <Avatar key={index} src={image} />
              ))
              : null}
          </div>
          <Paper className={styles.materialItemAdd}>
            <TextField
              data-cy='purpose'
              id='purpose'
              className={styles.textField}
              variant='outlined'
              label={config.labels.material.purpose[0].value}
              value={values.purpose}
              onChange={handleChange}
              error={touched.purpose && !!errors.purpose}
            />
            {touched.purpose && errors.purpose && (
              <div className={styles.inputError}>{errors.purpose}</div>
            )}
            <TextField
              data-cy='additionalPrice'
              id='additionalPrice'
              className={styles.textField}
              variant='outlined'
              label={config.labels.material.additionalPrice[0].value}
              value={values.additionalPrice}
              onChange={handleChange}
              error={touched.additionalPrice && !!errors.additionalPrice}
            />
            {touched.additionalPrice && errors.additionalPrice && (
              <div className={styles.inputError}>{errors.additionalPrice}</div>
            )}
          </Paper>
        </Grid>
        {languages.length > 0 ? (
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
        ) : null}
        <div className={styles.controlsBlock}>
          <div>
            <Button
              id='go-back'
              component={Link}
              to={config.routes.pathToMaterials}
              variant='outlined'
              color='primary'
              className={styles.returnButton}
              data-cy='goBackButton'
            >
              {config.buttonTitles.GO_BACK_TITLE}
            </Button>
            {createColorButton}
            <SaveButton
              className={styles.saveButton}
              data-cy='save'
              type='submit'
              title={config.buttonTitles.SAVE_MATERIAL}
            />
            {materialColorPaletteButton}
          </div>
        </div>
      </form>
      <DialogWindowWrapper
        buttonType='submit'
        buttonTitle={config.buttonTitles.CLOSE_DIALOG_TITLE}
        dialogTitle={config.titles.colorTitles.createColorTitle}
        component={
          <CreateColor
            colorImages={colorImages}
            addNewColorImages={addNewColorImages}
            imagesToUpload={colorImagesToUpload}
            setImagesToUpload={setColorImagesToUpload}
          />
        }
      />
    </div>
  );
}
const valueShape = PropTypes.shape({
  value: PropTypes.string
});

MaterialForm.propTypes = {
  id: PropTypes.string,
  material: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.arrayOf(valueShape),
    description: PropTypes.arrayOf(valueShape),
    colors: PropTypes.arrayOf(valueShape),
    simpleName: PropTypes.arrayOf(valueShape),
    additionalPrice: PropTypes.arrayOf(valueShape),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    purpose: PropTypes.string,
    available: PropTypes.bool
  }),
  values: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  errors: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
    ukName: PropTypes.string,
    enName: PropTypes.string,
    ukDescription: PropTypes.string,
    enDescription: PropTypes.string
  }),
  touched: PropTypes.shape({
    available: PropTypes.bool,
    purpose: PropTypes.string,
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

MaterialForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  material: {
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
    available: false,
    purpose: '',
    additionalPrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ]
  }
};

export default MaterialForm;
