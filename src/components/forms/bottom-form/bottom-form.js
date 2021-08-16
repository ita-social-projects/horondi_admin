import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid, Box, Typography, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { find } from 'lodash';
import { BackButton, SaveButton } from '../../buttons';
import { checkInitialValue } from '../../../utils/check-initial-values';
import { config } from '../../../configs';
import { useStyles } from './bottom-form.styles';
import LoadingBar from '../../loading-bar';
import {
  addBottom,
  updateBottom,
  clearBottom
} from '../../../redux/bottom/bottom.actions';
import CheckboxOptions from '../../checkbox-options';
import LanguagePanel from '../language-panel';
import ImageUploadPreviewContainer from '../../../containers/image-upload-container/image-upload-previewContainer';
import {
  bottomUseEffectHandler,
  bottomFormOnSubmit,
  getBottomInitialValues,
  setBottomColorsHandler
} from '../../../utils/bottom-form';
import BottomMaterialsContainer from '../../../containers/bottom-materials-container';
import { selectProductDetails } from '../../../redux/selectors/products.selectors';
import useBottomHandlers from '../../../utils/use-bottom-handlers';

const { IMG_URL } = config;
const { bottomName, enterPrice, additionalPriceLabel } = config.labels.bottom;
const map = require('lodash/map');

const {
  BOTTOM_ERROR_MESSAGE,
  BOTTOM_ERROR_ENGLISH_AND_DIGITS_ONLY,
  PHOTO_NOT_PROVIDED,
  BOTTOM_UA_NAME_MESSAGE,
  BOTTOM_EN_NAME_MESSAGE,
  BOTTOM_PRICE_ERROR,
  BOTTOM_MAX_LENGTH_MESSAGE,
  BOTTOM_MIN_LENGTH_MESSAGE
} = config.bottomErrorMessages;

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
const { pathToBottoms } = config.routes;

const BottomForm = ({ bottom, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    details: { materials },
    loading
  } = useSelector(selectProductDetails);

  const { createBottom, setUpload, upload, setBottomImage, color, setColor } =
    useBottomHandlers();

  useEffect(() => {
    bottomUseEffectHandler(bottom, setBottomImage, imagePrefix);
  }, [dispatch, bottom]);

  useEffect(
    () => () => {
      dispatch(clearBottom());
    },
    []
  );

  const bottomValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, BOTTOM_MIN_LENGTH_MESSAGE)
      .max(50, BOTTOM_MAX_LENGTH_MESSAGE)
      .required(BOTTOM_ERROR_MESSAGE)
      .matches(enNameCreation, BOTTOM_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, BOTTOM_MIN_LENGTH_MESSAGE)
      .max(50, BOTTOM_MAX_LENGTH_MESSAGE)
      .required(BOTTOM_ERROR_MESSAGE)
      .matches(uaNameCreation, BOTTOM_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, BOTTOM_MIN_LENGTH_MESSAGE)
      .matches(backMaterial, BOTTOM_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BOTTOM_ERROR_MESSAGE),
    color: Yup.string()
      .min(2, BOTTOM_MIN_LENGTH_MESSAGE)
      .matches(backColor, BOTTOM_ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(BOTTOM_ERROR_MESSAGE),
    additionalPrice: Yup.string()
      .matches(additionalPriceRegExp, BOTTOM_PRICE_ERROR)
      .required(BOTTOM_ERROR_MESSAGE)
      .nullable(),
    available: Yup.boolean(),
    customizable: Yup.boolean(),
    bottomImage: Yup.string().required(PHOTO_NOT_PROVIDED)
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
    validationSchema: bottomValidationSchema,
    initialValues: getBottomInitialValues(edit, IMG_URL, bottom),

    onSubmit: () => {
      const newBottom = createBottom(values);
      const editAndUpload = edit && upload instanceof File;
      if (editAndUpload || edit) {
        bottomFormOnSubmit(
          editAndUpload,
          dispatch,
          updateBottom,
          {
            id,
            bottom: newBottom,
            image: upload
          },
          edit,
          {
            id,
            bottom: newBottom
          }
        );
        return;
      }
      dispatch(
        addBottom({
          bottom: newBottom,
          image: upload
        })
      );
    }
  });

  useEffect(() => {
    setBottomColorsHandler(values, setColor, find, materials);
  }, [materials, values.material]);

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.bottom.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('bottomImage', event.target.result);
        setBottomImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const inputs = [{ label: bottomName, name: 'name' }];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs
  };

  const imageUploadBottomInputsId = {
    bottomImageInput: 'bottomImageInput'
  };

  const valueEquality = checkInitialValue(
    getBottomInitialValues(edit, IMG_URL, bottom),
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
                <BackButton initial={!valueEquality} pathBack={pathToBottoms} />
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
            <Paper className={styles.bottomItemUpdate}>
              <div className={styles.imageUploadBlock}>
                <div>
                  <span className={styles.imageUpload}>
                    {config.labels.bottom.avatarText}
                  </span>
                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleImageLoad}
                      src={values.bottomImage}
                      id={imageUploadBottomInputsId.bottomImageInput}
                    />
                    {touched.bottomImage && errors.bottomImage && (
                      <div className={styles.inputError}>
                        {errors.bottomImage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
          <BottomMaterialsContainer
            material={materials?.bottom}
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
BottomForm.propTypes = {
  id: PropTypes.string,
  bottom: PropTypes.shape({
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
    bottomImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    bottomImage: PropTypes.string,
    material: PropTypes,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    bottomImage: PropTypes.string,
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
BottomForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  bottom: {
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

export default BottomForm;
