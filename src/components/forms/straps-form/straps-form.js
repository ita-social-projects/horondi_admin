import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { useStyles } from './straps-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addStraps, updateStrap } from '../../../redux/straps/straps.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { strapsTranslations } from '../../../translations/straps.translations';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import { getStrapsInitialValues } from '../../../utils/straps-form';
import CheckboxOptions from '../../checkbox-options';
import { checkInitialValue } from '../../../utils/check-initial-values';
import { getColors } from '../../../redux/color/color.actions';
import { handleCircularProgress } from '../../../utils/handle-orders-page';
import useStrapsHandlers from '../../../utils/use-straps-handlers';

const labels = config.labels.strapsPageLabel;

const {
  STRAPS_VALIDATION_ERROR,
  STRAPS_ERROR_MESSAGE,
  STRAPS_UA_NAME_MESSAGE,
  STRAPS_EN_NAME_MESSAGE,
  STRAPS_MAX_LENGTH_MESSAGE,
  STRAPS_MIN_LENGTH_MESSAGE,
  STRAPS_COLOR_ERROR_MESSAGE
} = config.strapsErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { STRAPS_ERROR } = strapsTranslations;
const { IMG_URL } = config;
const { enNameCreation, uaNameCreation, additionalPriceRegExp } =
  config.formRegExp;
const { materialUiConstants } = config;
const { pathToStraps } = config.routes;

const StrapsForm = ({ strap, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { createStraps, setUpload, upload, strapsImage, setStrapsImage } =
    useStrapsHandlers();

  useEffect(() => {
    dispatch(
      getColors({
        pagination: {
          skip: null,
          limit: null
        }
      })
    );
  }, [dispatch]);

  const { colorsList, colorLoading } = useSelector(({ Color }) => ({
    colorsList: Color.list,
    colorLoading: Color.colorLoading
  }));

  // const [color, setColor] = useState(strap.color || []);
  const [color, setColor] = useState([]);

  const strapsValidationSchema = Yup.object().shape({
    uaName: Yup.string()
      .min(2, STRAPS_MIN_LENGTH_MESSAGE)
      .max(50, STRAPS_MAX_LENGTH_MESSAGE)
      .required(STRAPS_ERROR_MESSAGE)
      .matches(uaNameCreation, STRAPS_UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, STRAPS_MIN_LENGTH_MESSAGE)
      .max(50, STRAPS_MAX_LENGTH_MESSAGE)
      .required(STRAPS_ERROR_MESSAGE)
      .matches(enNameCreation, STRAPS_EN_NAME_MESSAGE),
    additionalPrice: Yup.string()
      .required(STRAPS_ERROR_MESSAGE)
      .matches(additionalPriceRegExp, STRAPS_VALIDATION_ERROR)
      .nullable(),
    available: Yup.boolean(),
    strapImage: Yup.string(),
    color: Yup.string().required(STRAPS_COLOR_ERROR_MESSAGE)
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
    validationSchema: strapsValidationSchema,
    initialValues: getStrapsInitialValues(edit, IMG_URL, strap),
    onSubmit: (data) => {
      const newStrap = createStraps(data);
      const uploadCondition = upload instanceof File;

      if (id) {
        dispatch(
          updateStrap({
            id,
            strap: newStrap,
            image: upload
          })
        );
        return;
      }
      dispatch(addStraps({ strap: newStrap, image: upload }));

      if (!uploadCondition && !strap.image) {
        dispatch(setSnackBarSeverity('error'));
        dispatch(setSnackBarMessage(STRAPS_ERROR));
        dispatch(setSnackBarStatus(true));
      }
    }
  });

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (data) => {
        setFieldValue('strapImage', data.target.result);
        setStrapsImage(data.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const checkboxes = (checkBoxName, label) => [
    {
      id: `${checkBoxName}`,
      dataCy: `${checkBoxName}`,
      value: values[`${checkBoxName}`],
      checked: values[`${checkBoxName}`],
      color: materialUiConstants.primary,
      label,
      handler: () =>
        setFieldValue(`${checkBoxName}`, !values[`${checkBoxName}`])
    }
  ];

  const onTagsChange = (_, value) => {
    const colorsData = value.map((color) => color._id);
    setFieldValue('color', [...new Set(colorsData)]);
    setColor(value);
  };

  const inputs = [{ label: labels.strapsName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const valueEquality = checkInitialValue(
    getStrapsInitialValues(edit, IMG_URL, strap),
    values
  );

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };
  console.log(strap);
  return (
    <div>
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton
                className={styles.returnButton}
                initial={!valueEquality}
                pathBack={pathToStraps}
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
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <CheckboxOptions
            options={checkboxes('available', labels.available)}
          />
        </div>
        <Grid item xs={12}>
          <Paper>
            <span className={styles.imageUpload}>{labels.avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={edit ? values.strapImage : strapsImage}
              />
            </div>
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        <Paper className={styles.inputPanel}>
          <Autocomplete
            id={labels.labelIdAut}
            className={styles.textField}
            multiple
            freeSolo
            filterSelectedOptions
            options={colorsList}
            getOptionSelected={(option, value) => option._id === value._id}
            defaultValue={color}
            onChange={onTagsChange}
            onBlur={handleBlur}
            getOptionLabel={(option) => `${option.name[0].value}`}
            renderInput={(params) => (
              <TextField
                {...params}
                variant={materialUiConstants.outlined}
                label={labels.chooseColor.title}
                placeholder={labels.chooseColor.inputTitle}
                margin={labels.normal}
                fullWidth
                error={touched.labelIdAut && !!errors.color}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: <>{handleCircularProgress(colorLoading)}</>
                }}
              />
            )}
          />
          {touched.labelIdAut && errors.color && (
            <div
              data-cy={materialUiConstants.codeError}
              className={styles.error}
            >
              {errors.color}
            </div>
          )}
        </Paper>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <Paper className={styles.additionalPrice}>
          <Box>
            <Typography>{labels.enterPrice}</Typography>
          </Box>
          <TextField
            data-cy='additionalPrice'
            id='additionalPrice'
            className={styles.textField}
            variant={materialUiConstants.outlined}
            type={materialUiConstants.types.number}
            label={labels.additionalPrice}
            value={values.additionalPrice}
            inputProps={{ min: 0 }}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.additionalPrice && !!errors.additionalPrice}
          />
          {touched.additionalPrice && errors.additionalPrice && (
            <div
              data-cy={materialUiConstants.codeError}
              className={styles.error}
            >
              {errors.additionalPrice}
            </div>
          )}
        </Paper>
      </form>
    </div>
  );
};

StrapsForm.propTypes = {
  id: PropTypes.string,
  strap: PropTypes.shape({
    image: PropTypes.string,
    optionType: PropTypes.string,
    names: PropTypes.shape([]),
    features: PropTypes.shape({
      color: PropTypes.shape({
        _id: PropTypes.string
      })
    }),
    additionalPrice: PropTypes.number
  }),
  values: PropTypes.shape({
    strapImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    color: PropTypes.string,
    additionalPrice: PropTypes.number,
    available: PropTypes.bool
  }),
  errors: PropTypes.shape({
    strapImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    color: PropTypes.string,
    additionalPrice: PropTypes.number,
    available: PropTypes.bool
  }),
  touched: PropTypes.shape({
    strapImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    optionType: PropTypes.string,
    color: PropTypes.string,
    additionalPrice: PropTypes.number,
    available: PropTypes.bool
  }),
  edit: PropTypes.bool
};

StrapsForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  strap: {
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
    image: '',
    optionType: null,
    additionalPrice: [
      { value: null, currency: '' },
      { value: null, currency: '' }
    ],
    features: {
      color: { _id: '' }
    },
    available: false
  },
  edit: false
};

export default StrapsForm;
