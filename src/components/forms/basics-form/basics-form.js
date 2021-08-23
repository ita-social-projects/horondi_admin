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

const { basicName, enterPrice, additionalPriceLabel, materialLabels } =
  config.labels.basics;
const map = require('lodash/map');

const {
  BACK_ERROR_MESSAGE,
  BACK_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  BACK_EN_NAME_MESSAGE,
  BACK_UA_NAME_MESSAGE,
  BACK_PRICE_ERROR,
  BACK_MAX_LENGTH_MESSAGE,
  BACK_MIN_LENGTH_MESSAGE
} = config.backErrorMessages;
const { SAVE_TITLE } = config.buttonTitles;
const {
  languages,
  IMG_URL,
  formRegExp: {
    enNameCreation,
    uaNameCreation,
    backMaterial,
    backColor,
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
      .min(2, BACK_MIN_LENGTH_MESSAGE)
      .max(50, BACK_MAX_LENGTH_MESSAGE)
      .required(BACK_ERROR_MESSAGE)
      .matches(enNameCreation, BACK_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, BACK_MIN_LENGTH_MESSAGE)
      .max(50, BACK_MAX_LENGTH_MESSAGE)
      .required(BACK_ERROR_MESSAGE)
      .matches(uaNameCreation, BACK_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, BACK_MIN_LENGTH_MESSAGE)
      .matches(backMaterial, BACK_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BACK_ERROR_MESSAGE),
    color: Yup.string()
      .min(2, BACK_MIN_LENGTH_MESSAGE)
      .matches(backColor, BACK_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BACK_ERROR_MESSAGE),
    additionalPrice: Yup.string()
      .matches(additionalPriceRegExp, BACK_PRICE_ERROR)
      .required(BACK_ERROR_MESSAGE)
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
          <Paper className={styles.backItemUpdate}>
            <div className={styles.imageUploadBlock}>
              <div>
                <span className={styles.imageUpload}>
                  {config.labels.back.avatarText}
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
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
          setFieldValue={setFieldValue}
          materialLabels={materialLabels}
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
