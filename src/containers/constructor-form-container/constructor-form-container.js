import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';

import { useStyles } from '../../components/forms/common.styles';
import { BackButton, SaveButton } from '../../components/buttons';
import LoadingBar from '../../components/loading-bar';
import CheckboxOptions from '../../components/checkbox-options';
import LanguagePanel from '../../components/forms/language-panel';
import ImageUploadPreviewContainer from '../image-upload-container/image-upload-previewContainer';
import ConstructorFeaturesContainer from '../constructor-features-container';
import { useUnsavedChangesHandler } from '../../hooks/form-dialog/use-unsaved-changes-handler';
import AdditionalPriceContainer from '../additional-price-container';
import { config } from '../../configs';

import {
  getDefaultPartItem,
  getCheckboxOptions,
  getPartItemInitialValues,
  getNewPartItem
} from '../../utils/constructor-form-container';

import { getValidationSchema } from '../../validations/constructor-form/constructor-form-validation';

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

const ConstructorFormContainer = ({
  part,
  id,
  edit,
  partItemKey,
  pathBack,
  dispatchAction,
  withoutImg,
  withoutPrice
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const partItem = part ?? getDefaultPartItem(partItemKey);
  const { optionType } = partItem;
  const { featuresLabels } = constructorItems[partItemKey];
  const { inputFields, featuresVariant } = constructorItems[partItemKey];

  const [isLoading, setIsLoading] = useState(false);
  const [partItemImage, setPartItemImage] = useState('');
  const [partItemUpload, setPartItemUpload] = useState('');

  useEffect(() => {
    if (!withoutImg && partItem?.images.thumbnail) {
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
      const editAndUpload = Boolean(edit && partItemUpload instanceof File);
      const newPartItem = getNewPartItem(values);
      const actionPayload = {};
      actionPayload[partItemKey] = newPartItem;

      if (edit) {
        actionPayload.id = id;
        if (editAndUpload) {
          actionPayload.image = partItemUpload;
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
      {isLoading ? (
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
          {!withoutImg ? (
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
          ) : null}
          <ConstructorFeaturesContainer
            setIsLoading={setIsLoading}
            materialsPurpose={optionType}
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            setFieldValue={setFieldValue}
            featuresLabels={featuresLabels}
            variant={featuresVariant}
          />

          {languagesPanel}

          {!withoutPrice ? (
            <AdditionalPriceContainer
              values={values}
              labels={additionalPriceContainer}
              onChange={handleChange}
              onBlur={handleBlur}
              radio
              errors={errors}
              touched={touched}
            />
          ) : null}
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
