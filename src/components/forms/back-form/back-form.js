import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import { find } from 'lodash';
import useBackHandlers from '../../../utils/use-back-handlers';
import { useStyles } from '../common.styles';
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
import MaterialsContainer from '../../../containers/materials-container';
import AdditionalPriceContainer from '../../../containers/additional-price-container';
import { selectProductDetails } from '../../../redux/selectors/products.selectors';
import {
  constructorObject,
  defaultProps,
  constructorObjectPropsTypes,
  defaultPropTypes,
  valuesPropTypes,
  imagePropTypes
} from '../bottom-form/constructor.variables';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const { IMG_URL, materialUiConstants } = config;
const {
  backName,
  enterPrice,
  additionalPriceLabel,
  materialLabels,
  additionalPriceType
} = config.labels.back;
const { convertationTitle } = config.titles.backTitles;
const labels = {
  enterPrice,
  additionalPriceLabel,
  additionalPriceType,
  convertationTitle
};
const map = require('lodash/map');

const { PHOTO_NOT_PROVIDED, BACK_UA_NAME_MESSAGE, BACK_EN_NAME_MESSAGE } =
  config.backErrorMessages;

const {
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  ERROR_MESSAGE,
  ERROR_ENGLISH_AND_DIGITS_ONLY,
  PRICE_ERROR
} = config.commonErrorMessages;

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
  imagePrefix
} = config;
const { pathToBacks } = config.routes;

const BackForm = ({ back, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    details: { materials },
    loading
  } = useSelector(selectProductDetails);

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
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(enNameCreation, BACK_EN_NAME_MESSAGE),
    uaName: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .max(50, MAX_LENGTH_MESSAGE)
      .required(ERROR_MESSAGE)
      .matches(uaNameCreation, BACK_UA_NAME_MESSAGE),
    material: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(backMaterial, ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(ERROR_MESSAGE),
    color: Yup.string()
      .min(2, MIN_LENGTH_MESSAGE)
      .matches(backColor, ERROR_ENGLISH_AND_DIGITS_ONLY)
      .required(ERROR_MESSAGE),
    additionalPrice: Yup.string()
      .matches(additionalPriceRegExp, PRICE_ERROR)
      .required(ERROR_MESSAGE)
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
    dirty,
    isValid,
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

  const unblock = useUnsavedChangesHandler(values);

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

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('backImage', event.target.result);
        setBackImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
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
                <BackButton pathBack={pathToBacks} />
              </Grid>
              <Grid item className={styles.button}>
                <SaveButton
                  data-cy='save-btn'
                  title={SAVE_TITLE}
                  type={materialUiConstants.types.submit}
                  values={values}
                  errors={errors}
                  onClickHandler={handleSubmit}
                  unblockFunction={unblock}
                  disabled={!dirty || !isValid}
                />
              </Grid>
            </Grid>
          </div>
          <CheckboxOptions options={checkboxes} />
          <Grid item xs={12}>
            <Paper className={styles.itemUpdate}>
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
          <MaterialsContainer
            material={materials?.back}
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

          <AdditionalPriceContainer
            radio
            values={values}
            labels={labels}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
            radio
          />
        </form>
      )}
    </div>
  );
};

valuesPropTypes.values.backImage = imagePropTypes;
valuesPropTypes.errors.backImage = imagePropTypes;
valuesPropTypes.touched.backImage = imagePropTypes;

BackForm.propTypes = {
  ...defaultPropTypes,
  back: constructorObjectPropsTypes.element,
  ...valuesPropTypes
};

BackForm.defaultProps = { back: constructorObject, ...defaultProps };

export default BackForm;
