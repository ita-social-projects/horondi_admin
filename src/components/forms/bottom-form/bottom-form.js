import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid, Box, Typography } from '@material-ui/core';
import * as Yup from 'yup';
import { find } from 'lodash';
import { BackButton, SaveButton } from '../../buttons';
import { checkInitialValue } from '../../../utils/check-initial-values';
import { config } from '../../../configs';
import { useStyles } from '../common.styles';
import LoadingBar from '../../loading-bar';
import { addBottom, updateBottom } from '../../../redux/bottom/bottom.actions';
import CheckboxOptions from '../../checkbox-options';
import LanguagePanel from '../language-panel';
import ImageUploadPreviewContainer from '../../../containers/image-upload-container/image-upload-previewContainer';
import {
  bottomUseEffectHandler,
  bottomFormOnSubmit,
  getBottomInitialValues,
  setBottomColorsHandler
} from '../../../utils/bottom-form';
import MaterialsContainer from '../../../containers/materials-container';
import { selectProductDetails } from '../../../redux/selectors/products.selectors';
import { getProductDetails } from '../../../redux/products/products.actions';
import useBottomHandlers from '../../../utils/use-bottom-handlers';
import {
  constructorObject,
  defaultProps,
  constructorObjectPropsTypes,
  defaultPropTypes,
  valuesPropTypes,
  imagePropTypes
} from './constructor.variables';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import AdditionalPriceContainer from '../../../containers/additional-price-container';

const { IMG_URL } = config;
const { bottomName, enterPrice, materialLabels, additionalPriceLabel } =
  config.labels.bottom;
const { additionalPriceType } = config.labels.closuresPageLabel;
const { convertationTitle } = config.titles.closuresTitles;

const labels = {
  enterPrice,
  additionalPriceLabel,
  additionalPriceType,
  convertationTitle
};
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
  formRegExp: { enNameCreation, uaNameCreation, backMaterial, backColor },
  imagePrefix
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
    dispatch(getProductDetails());
  }, []);

  useEffect(() => {
    bottomUseEffectHandler(bottom, setBottomImage, imagePrefix);
  }, [dispatch, bottom]);

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
    additionalPriceType: Yup.string(),
    additionalPrice: Yup.string()
      .required(BOTTOM_ERROR_MESSAGE)
      .matches(config.formRegExp.onlyPositiveFloat, BOTTOM_PRICE_ERROR)
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

  const unblock = useUnsavedChangesHandler(values);
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
                  unblockFunction={unblock}
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
          <MaterialsContainer
            material={materials?.bottom}
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
            values={values}
            labels={labels}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors}
            touched={touched}
          />
        </form>
      )}
    </div>
  );
};

valuesPropTypes.values.bottomImage = imagePropTypes;
valuesPropTypes.errors.bottomImage = imagePropTypes;
valuesPropTypes.touched.bottomImage = imagePropTypes;

BottomForm.propTypes = {
  ...defaultPropTypes,
  bottom: constructorObjectPropsTypes.element,
  ...valuesPropTypes
};

BottomForm.defaultProps = { bottom: constructorObject, ...defaultProps };

export default BottomForm;
