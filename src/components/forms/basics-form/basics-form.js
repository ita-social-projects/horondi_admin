import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, Grid } from '@material-ui/core';
import * as Yup from 'yup';

import { find } from 'lodash';
import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import { config } from '../../../configs';
import { useStyles } from './basics-form.styles';
import { addBasic, updateBasic } from '../../../redux/basics/basics.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import MaterialsContainer from '../../../containers/materials-container';
import AdditionalPriceContainer from '../../../containers/additional-price-container';
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
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const { basicName, enterPrice, additionalPriceLabel, materialLabels } =
  config.labels.basics;
const { additionalPriceType } = config.labels.basicsPageLabel;
const { convertationTitle } = config.titles.basicsTitles;
const labels = {
  enterPrice,
  additionalPriceLabel,
  additionalPriceType,
  convertationTitle
};
const map = require('lodash/map');

const { PHOTO_NOT_PROVIDED } = config.basicsErrorMessages;
const {
  ERROR_MESSAGE,
  ERROR_ENGLISH_AND_DIGITS_ONLY,
  UA_NAME_MESSAGE,
  EN_NAME_MESSAGE,
  PRICE_ERROR,
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE
} = config.commonErrorMessages;
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
  imagePrefix
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
    basicImageHandler(basic, setBasicImage, imagePrefix);
    dispatch(getProductDetails());
  }, [dispatch, basic]);

  const basicsValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(enNameCreation, EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(uaNameCreation, UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(basicMaterial, ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(ERROR_MESSAGE),
    color: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(basicColor, ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(ERROR_MESSAGE),
    additionalPrice: Yup.string()
      .matches(additionalPriceRegExp, PRICE_ERROR)
      .required(ERROR_MESSAGE)
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

  const changed = useChangedValuesChecker(values);
  const unblock = useUnsavedChangesHandler(values);

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
              <BackButton pathBack={pathToBasics} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                type='submit'
                data-cy='save-btn'
                title={SAVE_TITLE}
                errors={errors}
                values={values}
                onClickHandler={handleSubmit}
                {...(id ? { disabled: !changed } : {})}
                unblockFunction={unblock}
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
        <AdditionalPriceContainer
          values={values}
          labels={labels}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors}
          touched={touched}
        />
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
    name: PropTypes.arrayOf(valueShape),
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        currency: PropTypes.string,
        value: PropTypes.number
      })
    )
  }),
  values: PropTypes.shape({
    basicImage: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    additionalPrice: PropTypes.number,
    additionalPriceType: PropTypes.string
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
      { value: null, currency: '', type: '' },
      { value: null, currency: '', type: '' }
    ],
    available: false
  },
  edit: false
};

export default BasicsForm;
