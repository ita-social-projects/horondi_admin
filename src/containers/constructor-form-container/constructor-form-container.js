import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';

import { BackButton, SaveButton } from '../../components/buttons';
import { useStyles } from '../../components/forms/common.styles';
import LoadingBar from '../../components/loading-bar';
import CheckboxOptions from '../../components/checkbox-options';
import LanguagePanel from '../../components/forms/language-panel';
import ImageUploadPreviewContainer from '../image-upload-container/image-upload-previewContainer';
import { config } from '../../configs';
import MaterialsContainer from '../materials-container';
import { useUnsavedChangesHandler } from '../../hooks/form-dialog/use-unsaved-changes-handler';
import AdditionalPriceContainer from '../additional-price-container';

import { materialSelector } from '../../redux/selectors/material.selectors';
import { getMaterialsByPurpose } from '../../redux/material/material.actions';

import useConstructorFormHandlers from '../../utils/use-constructor-form-handlers';
import {
  getDefaultPartItem,
  getCheckboxOptions,
  getPartItemInitialValues,
  partItemColorsHandler,
  getValidationSchema
} from '../../utils/constructor-form-utils';
import {
  imagePreviewId,
  defaultProps,
  constructorObjectPropsTypes,
  defaultPropTypes,
  valuesPropTypes,
  imagePropTypes
} from './constructor-form.variables';

const { IMG_URL } = config;
const { SAVE_TITLE } = config.buttonTitles;
const { languages, imagePrefix } = config;
const { constructorItemLabels } = config.labels;

const {
  availableLabel,
  uploadLabel,
  additionalPriceContainer,
  constructorItems
} = constructorItemLabels;

const { inputFields } = constructorItems.bottom;

const ConstructorFormContainer = ({
  part,
  id,
  edit,
  partItemKey,
  pathBack,
  dispatchAction
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const partItem = part ?? getDefaultPartItem(partItemKey);
  const { optionType } = partItem;
  const { featuresLabels } = constructorItems[partItemKey];
  const { materialsByPurpose, loading } = useSelector(materialSelector);
  const materials = materialsByPurpose?.[partItemKey] || [];

  const {
    createPartItem,
    setPartItemUpload,
    partItemUpload,
    setPartItemImage,
    partItemImage,
    colors,
    setColors
  } = useConstructorFormHandlers();

  useEffect(() => {
    dispatch(getMaterialsByPurpose([optionType]));
  }, []);

  useEffect(() => {
    if (partItem?.images.thumbnail) {
      setPartItemImage(`${imagePrefix}${partItem.images.thumbnail}`);
    }
  }, []);

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
    validationSchema: getValidationSchema(optionType),
    initialValues: getPartItemInitialValues(edit, IMG_URL, partItem),

    onSubmit: () => {
      const editAndUpload = edit && partItemUpload instanceof File;
      const newPartItem = createPartItem(values);
      const actionPayload = {};
      actionPayload[partItemKey] = newPartItem;

      if (edit) {
        actionPayload.id = id;
        if (editAndUpload) {
          actionPayload.image = partItemUpload;
          dispatch(dispatchAction(actionPayload));
          return;
        }
        dispatch(dispatchAction(actionPayload));
        return;
      }

      actionPayload.image = partItemUpload;
      dispatch(dispatchAction(actionPayload));
    }
  });

  const unblock = useUnsavedChangesHandler(values);

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  const checkboxOptions = getCheckboxOptions(
    values,
    availableLabel,
    setFieldValue
  );

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('image', event.target.result);
        setPartItemImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setPartItemUpload(files[0]);
    }
  };

  useEffect(() => {
    partItemColorsHandler(values, setColors, materials);
  }, [values.material]);

  const inputs = [{ label: inputFields, name: 'name' }];

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

  return (
    <div>
      {loading ? (
        <LoadingBar />
      ) : (
        <form onSubmit={(e) => eventPreventHandler(e)}>
          <div className={styles.buttonContainer}>
            <Grid container spacing={2} className={styles.fixedButtons}>
              <Grid item className={styles.button}>
                <BackButton pathBack={pathBack} />
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
          <CheckboxOptions options={checkboxOptions} />
          <Grid item xs={12}>
            <Paper className={styles.itemUpdate}>
              <div className={styles.imageUploadBlock}>
                <div>
                  <span className={styles.imageUpload}>{uploadLabel}</span>
                  <div className={styles.imageUploadAvatar}>
                    <ImageUploadPreviewContainer
                      handler={handleImageLoad}
                      src={partItemImage}
                      id={imagePreviewId}
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
            materialLabels={featuresLabels}
          />

          {languagesPanel}

          <AdditionalPriceContainer
            values={values}
            labels={additionalPriceContainer}
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
// TODO: Check proptypes
valuesPropTypes.values.bottomImage = imagePropTypes;
valuesPropTypes.errors.bottomImage = imagePropTypes;
valuesPropTypes.touched.bottomImage = imagePropTypes;

ConstructorFormContainer.propTypes = {
  ...defaultPropTypes,
  part: constructorObjectPropsTypes.element,
  ...valuesPropTypes
};

ConstructorFormContainer.defaultProps = {
  ...defaultProps
};

export default ConstructorFormContainer;
