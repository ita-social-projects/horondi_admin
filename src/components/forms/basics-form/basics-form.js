import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';

import { find } from 'lodash';
import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import { config } from '../../../configs';
import { useStyles } from './basics-form.styles';
import { addBasic, updateBasic } from '../../../redux/basics/basics.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import MaterialsContainer from '../../../containers/materials-container';
import { getProductDetails } from '../../../redux/products/products.actions';
import LanguagePanel from '../language-panel';
import { selectProductDetails } from '../../../redux/selectors/products.selectors';
import {
  getBasicsInitialValues,
  basicFormOnSubmit,
  setBasicsColorsHandler,
  basicImageHandler
} from '../../../utils/basics-form';
import useBasicsHandlers from '../../../utils/use-basics-handlers';
import CheckboxOptions from '../../checkbox-options';
import { checkInitialValue } from '../../../utils/check-initial-values';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const { basicName, enterPrice, additionalPriceLabel, materialLabels } =
  config.labels.basics;
const map = require('lodash/map');

const {
  BASICS_ERROR_MESSAGE,
  BASICS_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  BASICS_EN_NAME_MESSAGE,
  BASICS_UA_NAME_MESSAGE,
  BASICS_PRICE_ERROR,
  BASICS_MAX_LENGTH_MESSAGE,
  BASICS_MIN_LENGTH_MESSAGE
} = config.basicsErrorMessages;
const { SAVE_TITLE } = config.buttonTitles;
const {
  languages,
  IMG_URL,
  formRegExp: {
    enNameCreation,
    uaNameCreation,
    basicMaterial,
    basicColor,
    additionalPriceRegExp
  },
  imagePrefix,
  materialUiConstants
} = config;
const { pathToBasics } = config.routes;

const BasicsForm = ({ basic, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    details: { materials },
    loading
  } = useSelector(selectProductDetails);

  const { createBasic, setUpload, upload, setBasicImage, color, setColor } =
    useBasicsHandlers();

  useEffect(() => {
    dispatch(getProductDetails());
  }, []);

  useEffect(() => {
    basicImageHandler(basic, setBasicImage, imagePrefix);
  }, [dispatch, basic]);

  const basicsValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, BASICS_MIN_LENGTH_MESSAGE)
      .max(50, BASICS_MAX_LENGTH_MESSAGE)
      .required(BASICS_ERROR_MESSAGE)
      .matches(enNameCreation, BASICS_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, BASICS_MIN_LENGTH_MESSAGE)
      .max(50, BASICS_MAX_LENGTH_MESSAGE)
      .required(BASICS_ERROR_MESSAGE)
      .matches(uaNameCreation, BASICS_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, BASICS_MIN_LENGTH_MESSAGE)
      .matches(basicMaterial, BASICS_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BASICS_ERROR_MESSAGE),
    color: Yup.string()
      .min(2, BASICS_MIN_LENGTH_MESSAGE)
      .matches(basicColor, BASICS_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BASICS_ERROR_MESSAGE),
    additionalPrice: Yup.string()
      .matches(additionalPriceRegExp, BASICS_PRICE_ERROR)
      .required(BASICS_ERROR_MESSAGE)
      .nullable(),
    available: Yup.boolean(),
    customizable: Yup.boolean(),
    basicImage: Yup.string().required(PHOTO_NOT_PROVIDED)
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
    validationSchema: basicsValidationSchema,
    initialValues: getBasicsInitialValues(edit, IMG_URL, basic),
    onSubmit: () => {
      const newBasic = createBasic(values);
      const editAndUpload = edit && upload instanceof File;
      if (editAndUpload || edit) {
        basicFormOnSubmit(
          editAndUpload,
          dispatch,
          updateBasic,
          {
            id,
            basic: newBasic,
            image: upload
          },
          edit,
          {
            id,
            basic: newBasic
          }
        );
        return;
      }
      dispatch(
        addBasic({
          basic: newBasic,
          image: upload
        })
      );
    }
  });

  useUnsavedChangesHandler(values);

  useEffect(() => {
    setBasicsColorsHandler(values, setColor, find, materials);
  }, [materials, values.material]);

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.basics.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const inputs = [{ label: basicName, name: 'name' }];
  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('basicImage', event.target.result);
        setBasicImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const valueEquality = checkInitialValue(
    getBasicsInitialValues(edit, IMG_URL, basic),
    values
  );

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <form onSubmit={eventPreventHandler}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton initial={!valueEquality} pathBack={pathToBasics} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                type='submit'
                data-cy='save-btn'
                title={SAVE_TITLE}
                errors={errors}
                values={values}
                onClickHandler={handleSubmit}
              />
            </Grid>
          </Grid>
        </div>
        <CheckboxOptions options={checkboxes} />
        <Grid item xs={12}>
          <Paper className={styles.basicItemUpdate}>
            <div className={styles.imageUploadBlock}>
              <div>
                <span className={styles.imageUpload}>
                  {config.labels.basics.avatarText}
                </span>
                <div className={styles.imageUploadAvatar}>
                  <ImageUploadContainer
                    handler={handleImageLoad}
                    src={values.basicImage}
                    id='basicImageInput'
                  />
                  {touched.basicImage && errors.basicImage && (
                    <div className={styles.inputError}>{errors.basicImage}</div>
                  )}
                </div>
              </div>
            </div>
          </Paper>
        </Grid>
        <MaterialsContainer
          material={materials?.main}
          color={color}
          values={values}
          errors={errors}
          touched={touched}
          materialLabels={materialLabels}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
        />
        {map(languages, (lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <Paper className={styles.additionalPrice}>
          <Box>
            <Typography>{enterPrice}</Typography>
          </Box>
          <TextField
            data-cy='additionalPrice'
            id='additionalPrice'
            className={styles.textField}
            variant={materialUiConstants.outlined}
            type={materialUiConstants.types.number}
            label={additionalPriceLabel}
            value={values.additionalPrice}
            inputProps={{ min: 0 }}
            error={touched.additionalPrice && !!errors.additionalPrice}
            onChange={handleChange}
            onBlur={handleBlur}
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

const valueShape = PropTypes.shape({
  value: PropTypes.string
});

BasicsForm.propTypes = {
  id: PropTypes.string,
  basic: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    features: PropTypes.shape({
      material: PropTypes.string,
      color: PropTypes.string
    }),
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    basicImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    basicImage: PropTypes.string,
    material: PropTypes,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    basicImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  edit: PropTypes.bool
};

BasicsForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  basic: {
    _id: '',
    name: [
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
    features: {
      material: {
        name: [
          {
            value: ''
          },
          {
            value: ''
          }
        ]
      },
      color: {
        name: [
          {
            value: ''
          },
          {
            value: ''
          }
        ]
      }
    },
    additionalPrice: [
      { value: null, currency: '' },
      { value: null, currency: '' }
    ],
    available: false
  },
  edit: false
};

export default BasicsForm;
