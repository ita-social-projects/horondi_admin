import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import { BackButton, SaveButton } from '../../components/buttons';
import { config } from '../../configs';
import { useStyles } from '../../components/forms/common.styles';
import LoadingBar from '../../components/loading-bar';

// TODO: investigate redux actions
import { addBottom, updateBottom } from '../../redux/bottom/bottom.actions';
import { materialSelector } from '../../redux/selectors/material.selectors';
import { getMaterialsByPurpose } from '../../redux/material/material.actions';

import CheckboxOptions from '../../components/checkbox-options';
import LanguagePanel from '../../components/forms/language-panel';
import ImageUploadPreviewContainer from '../image-upload-container/image-upload-previewContainer';
import {
  bottomUseEffectHandler,
  bottomFormOnSubmit,
  getPartInitialValues,
  setBottomColorsHandler,
  getValidationSchema
} from './constructor-part-utils';
import MaterialsContainer from '../materials-container';
import useBottomHandlers from './use-constructor-forms-container-handler';
import {
  getDefaultPart,
  defaultProps,
  constructorObjectPropsTypes,
  defaultPropTypes,
  valuesPropTypes,
  imagePropTypes
} from './constructor-parts.variables';
import { useUnsavedChangesHandler } from '../../hooks/form-dialog/use-unsaved-changes-handler';
import AdditionalPriceContainer from '../additional-price-container';

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

const { SAVE_TITLE } = config.buttonTitles;

const { languages, imagePrefix } = config;
const { pathToBottoms } = config.routes;

const ConstructorFormsContainer = ({ part, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { materialsByPurpose, loading } = useSelector(materialSelector);
  const materials = materialsByPurpose?.bottom || [];

  const {
    createPart,
    setPartUpload,
    partUpload,
    setPartImage,
    partImage,
    colors,
    setColors
  } = useBottomHandlers();

  useEffect(() => {
    dispatch(getMaterialsByPurpose(['BOTTOM']));
  }, []);

  useEffect(() => {
    bottomUseEffectHandler(part, setPartImage, imagePrefix);
  }, [dispatch, part]);

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
    validationSchema: getValidationSchema('BOTTOM'),
    initialValues: getPartInitialValues(edit, IMG_URL, part),

    onSubmit: () => {
      const newPart = createPart(values);
      const editAndUpload = edit && partUpload instanceof File;
      if (editAndUpload || edit) {
        bottomFormOnSubmit(
          editAndUpload,
          dispatch,
          updateBottom,
          {
            id,
            bottom: newPart,
            image: partUpload
          },
          edit,
          {
            id,
            bottom: newPart
          }
        );
        return;
      }
      dispatch(
        addBottom({
          bottom: newPart,
          image: partUpload
        })
      );
    }
  });

  const unblock = useUnsavedChangesHandler(values);

  useEffect(() => {
    setBottomColorsHandler(values, setColors, materials);
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
        setFieldValue('image', event.target.result);
        setPartImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setPartUpload(files[0]);
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
  const languagesPanel = languages.map((lang) => (
    <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
  ));

  const imageUploadBottomInputsId = {
    bottomImageInput: 'bottomImageInput'
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
                <BackButton pathBack={pathToBottoms} />
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
                    {config.labels.bottom.avatarText}
                  </span>
                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleImageLoad}
                      src={partImage}
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
            material={materials}
            color={colors}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            materialLabels={materialLabels}
          />

          {languagesPanel}

          <AdditionalPriceContainer
            values={values}
            labels={labels}
            onChange={handleChange}
            onBlur={handleBlur}
            radio
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

ConstructorFormsContainer.propTypes = {
  ...defaultPropTypes,
  part: constructorObjectPropsTypes.element,
  ...valuesPropTypes
};

ConstructorFormsContainer.defaultProps = {
  part: getDefaultPart('BOTTOM'),
  ...defaultProps
};

export default ConstructorFormsContainer;
