import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, Box, Typography, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { find } from 'lodash';
import useBackHandlers from '../../../utils/use-back-handlers';
import { useStyles } from './back-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addBack,
  updateBack,
  clearBack
} from '../../../redux/back/back.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadPreviewContainer from '../../../containers/image-upload-container/image-upload-previewContainer';
import LanguagePanel from '../language-panel';
import LoadingBar from '../../loading-bar';
import {
  backUseEffectHandler,
  backFormOnSubmit,
  getBackInitialValues,
  setBackColorsHandler
} from '../../../utils/back-form';
import { checkInitialValue } from '../../../utils/check-initial-values';
import BackMaterialsContainer from '../../../containers/back-materials-container';
import { selectProductDetails } from '../../../redux/selectors/products.selectors';

const { IMG_URL } = config;
const { backName, enterPrice, additionalPriceLabel } = config.labels.back;
const map = require('lodash/map');

const {
  BACK_VALIDATION_ERROR,
  BACK_ERROR_MESSAGE,
  BACK_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  BACK_EN_NAME_MESSAGE,
  BACK_UA_NAME_MESSAGE,
  BACK_PRICE_ERROR
} = config.backErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const {
  languages,
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
const { pathToBacks } = config.routes;

const BackForm = ({ back, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { details, loading } = useSelector(selectProductDetails);

  const { materials } = details;

  const { createBack, setUpload, upload, setBackImage, color, setColor } =
    useBackHandlers();

  useEffect(() => {
    backUseEffectHandler(back, setBackImage, imagePrefix);
  }, [dispatch, back]);

  useEffect(
    () => () => {
      dispatch(clearBack());
    },
    []
  );
  const backValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(enNameCreation, BACK_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .matches(uaNameCreation, BACK_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .matches(backMaterial, BACK_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BACK_ERROR_MESSAGE),
    color: Yup.string()
      .min(2, BACK_VALIDATION_ERROR)
      .matches(backColor, BACK_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BACK_ERROR_MESSAGE),
    additionalPrice: Yup.string()
      .matches(additionalPriceRegExp, BACK_PRICE_ERROR)
      .required(BACK_ERROR_MESSAGE)
      .nullable(),
    available: Yup.boolean(),
    customizable: Yup.boolean(),
    backImage: Yup.string().required(PHOTO_NOT_PROVIDED)
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
    validationSchema: backValidationSchema,
    initialValues: getBackInitialValues(edit, IMG_URL, back),

    onSubmit: () => {
      const newBack = createBack(values);
      const editAndUpload = edit && upload instanceof File;
      if (editAndUpload || edit) {
        backFormOnSubmit(
          editAndUpload,
          dispatch,
          updateBack,
          {
            id,
            back: newBack,
            image: upload
          },
          edit,
          {
            id,
            back: newBack
          }
        );
        return;
      }
      dispatch(
        addBack({
          back: newBack,
          image: upload
        })
      );
    }
  });

  useEffect(() => {
    setBackColorsHandler(values, setColor, find, materials);
  }, [materials, values.material]);

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.back.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const handleImageLoad = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('backImage', event.target.result);
        setBackImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  const inputs = [{ label: backName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const imageUploadBackInputsId = {
    backImageInput: 'backImageInput'
  };

  const valueEquality = checkInitialValue(
    getBackInitialValues(edit, IMG_URL, back),
    values
  );
  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {loading ? (
        <LoadingBar />
      ) : (
        <form onSubmit={(e) => eventPreventHandler(e)}>
          <div className={styles.buttonContainer}>
            <Grid container spacing={2} className={styles.fixedButtons}>
              <Grid item className={styles.button}>
                <BackButton initial={!valueEquality} pathBack={pathToBacks} />
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
                    <ImageUploadPreviewContainer
                      handler={handleImageLoad}
                      src={values.backImage}
                      id={imageUploadBackInputsId.backImageInput}
                    />
                    {touched.backImage && errors.backImage && (
                      <div className={styles.inputError}>
                        {errors.backImage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <BackMaterialsContainer
            material={materials?.back}
            color={color}
            values={values}
            errors={errors}
            touched={touched}
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
      )}
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
BackForm.propTypes = {
  id: PropTypes.string,
  back: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    customizable: PropTypes.bool,
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
    backImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    backImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    backImage: PropTypes.string,
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
BackForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  back: {
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
    available: false,
    customizable: false
  },
  edit: false
};

export default BackForm;
