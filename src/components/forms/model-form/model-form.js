import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel
} from '@material-ui/core';

import useModelHandlers from '../../../utils/use-model-handlers';
import { useStyles } from './model-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addModel, updateModel } from '../../../redux/model/model.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';
import { getCategories } from '../../../redux/categories/categories.actions';
import { getCurrencies } from '../../../redux/currencies/currencies.actions';
import LanguagePanel from '../language-panel';
import { modelValidationSchema } from '../../../validations/models/model-form-validation';
import {
  useFormikInitialValues,
  modelFormOnSubmit,
  updateModelHandler,
  loadHelper
} from '../../../utils/model-form';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useSizeHandlers from '../../../hooks/model-form/use-size-handlers';
import SizeFormAccordion from '../size-form/size-form-accordion';
import { sizeDefaultProps } from '../../../utils/size-helpers';

const { languages } = config;
const { materialUiConstants } = config;
const { PHOTO_NOT_PROVIDED } = config.modelErrorMessages;
const {
  availableForConstructor,
  show,
  name,
  availableCategory,
  description,
  avatarText,
  priority,
  labelsEn
} = config.labels.model;
const { IMG_URL } = config;
const { MODEL_SAVE_TITLE, MODEL_CONSTRUCTOR } = config.buttonTitles;
const { pathToModels } = config.routes;
const { sizeAdd } = config.titles.sizesTitles;

const ModelForm = ({ model, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const checkIsEdit = (checkCondition) => (checkCondition ? model.sizes : []);

  const { createModel, setUpload, upload, modelImage, setModelImage } =
    useModelHandlers();

  useEffect(() => {
    dispatch(getCategories({}));
    dispatch(getCurrencies());
  }, [dispatch]);

  const { categories } = useSelector(({ Categories }) => ({
    categories: Categories.categories
  }));

  const [category, setCategory] = useState(model.category._id || '');
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
    validationSchema: modelValidationSchema,
    initialValues: useFormikInitialValues(model, category, checkIsEdit, isEdit),
    onSubmit: () => {
      const newModel = createModel(values);
      const uploadOrModelCondition =
        upload instanceof File || model.images.thumbnail;
      const isEditAndUploadCondition = isEdit && upload instanceof File;
      if (uploadOrModelCondition) {
        updateModelHandler(isEditAndUploadCondition, dispatch, updateModel, {
          id,
          model: newModel,
          image: upload
        });

        modelFormOnSubmit(
          isEdit,
          dispatch,
          updateModel,
          addModel,
          { id, model: newModel },
          { model: newModel, image: upload }
        );
        return;
      }
      dispatch(showErrorSnackbar(PHOTO_NOT_PROVIDED));
    }
  });

  const { sizes, onSizeSubmit, onSizeDelete } = useSizeHandlers(
    model.sizes,
    setFieldValue
  );
  const [sizesTouched, setSizesTouched] = useState(false);
  const sizesAdded = sizes.map((size) => size.name);

  const sizeUtils = {
    onSizeSubmit,
    onSizeDelete,
    sizesAdded
  };

  const [sizeFormExpanded, setSizeFormExpanded] = useState('');

  const handleExpandedChange = (sizeForm) => (_event, isExpanded) => {
    if (sizeFormExpanded === sizeAdd) {
      setSizesTouched(true);
    }
    setSizeFormExpanded(isExpanded ? sizeForm : '');
  };

  const unblock = useUnsavedChangesHandler(values);

  const handleCategory = (event) => {
    setFieldValue('category', event.target.value);
    setCategory(event.target.value);
  };

  const checkboxes = (checkBoxName, label) => [
    {
      id: `${checkBoxName}`,
      dataCy: `${checkBoxName}`,
      value: values[`${checkBoxName}`],
      checked: values[`${checkBoxName}`],
      color: materialUiConstants.primary,
      label,
      handler: () =>
        setFieldValue(`${checkBoxName}`, !values[`${checkBoxName}`])
    }
  ];

  const handleImageLoad = (files) => {
    if (loadHelper(files, files[0])) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue(labelsEn.modelImage, event.target.result);
        setModelImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };

  const inputs = [
    { label: name, name: labelsEn.name },
    { label: description, name: labelsEn.description, isEditor: true }
  ];

  const inputOptions = {
    errors,
    touched,
    handleChange,
    handleBlur,
    values,
    inputs,
    setFieldValue
  };

  const eventPreventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form
        onSubmit={eventPreventHandler}
        autoComplete={materialUiConstants.off}
      >
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToModels} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy={materialUiConstants.save}
                type={materialUiConstants.types.submit}
                title={MODEL_SAVE_TITLE}
                onClickHandler={handleSubmit}
                values={values}
                errors={errors}
                unblockFunction={unblock}
                disabled={!dirty || !isValid}
              />
            </Grid>
          </Grid>
        </div>
        <CheckboxOptions options={checkboxes(materialUiConstants.show, show)} />
        <CheckboxOptions
          options={checkboxes(
            labelsEn.availableForConstructor,
            availableForConstructor
          )}
        />

        <Grid item xs={12}>
          <Paper className={styles.modelItemUpdate}>
            <span className={styles.imageUpload}>{avatarText}</span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={
                  isEdit
                    ? modelImage || `${IMG_URL}${model.images.thumbnail}`
                    : modelImage
                }
              />
            </div>
            <FormControl variant='outlined' className={styles.formControl}>
              <InputLabel>{availableCategory}</InputLabel>
              <Select
                data-cy='category'
                id='category'
                name='category'
                value={category}
                onChange={handleCategory}
                onBlur={handleBlur}
                label={availableCategory}
              >
                <option value='' />
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.code}
                  </option>
                ))}
              </Select>
            </FormControl>
            {touched.category && errors.category && (
              <div className={styles.inputError}>{errors.category}</div>
            )}
            <TextField
              id={labelsEn.priority}
              type={materialUiConstants.types.number}
              data-cy={labelsEn.priority}
              className={styles.textFields}
              variant={materialUiConstants.outlined}
              label={priority}
              value={values.priority}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.priority && !!errors.priority}
            />
            {touched.priority && errors.priority && (
              <div className={styles.inputError}>{errors.priority}</div>
            )}
          </Paper>

          <Grid item xs={12}>
            {sizesTouched && errors.sizes && (
              <div className={styles.inputError}>{errors.sizes}</div>
            )}
            {sizes.map((size) => (
              <SizeFormAccordion
                key={size._id}
                size={size}
                isExpanded={sizeFormExpanded === size._id}
                onChange={handleExpandedChange(size._id)}
                isSizeEdit
                sizeUtils={sizeUtils}
              />
            ))}
            <SizeFormAccordion
              onChange={handleExpandedChange(sizeAdd)}
              isExpanded={sizeFormExpanded === sizeAdd}
              sizeUtils={sizeUtils}
              size={sizeDefaultProps.size}
            />
          </Grid>
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel
            lang={lang}
            onBlur={handleBlur}
            inputOptions={inputOptions}
            key={lang}
          />
        ))}
      </form>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
ModelForm.propTypes = {
  id: PropTypes.string,
  model: PropTypes.shape({
    _id: PropTypes.string,
    description: PropTypes.arrayOf(valueShape),
    show: PropTypes.bool,
    priority: PropTypes.number,
    availableForConstructor: PropTypes.bool,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    category: PropTypes.shape({
      _id: PropTypes.string,
      images: PropTypes.shape({
        thumbnail: PropTypes.string
      }),
      name: PropTypes.arrayOf(valueShape),
      code: PropTypes.string
    }),
    sizes: PropTypes.arrayOf(valueShape),
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    modelImage: PropTypes.string,
    category: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    priority: PropTypes.number
  }),
  errors: PropTypes.shape({
    modelImage: PropTypes.string,
    category: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    priority: PropTypes.number
  }),
  touched: PropTypes.shape({
    modelImage: PropTypes.string,
    category: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    uaDescription: PropTypes.string,
    enDescription: PropTypes.string,
    priority: PropTypes.number
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  isEdit: PropTypes.bool
};
ModelForm.defaultProps = {
  id: '',
  match: {},
  values: {},
  errors: {},
  touched: {},
  model: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    description: [
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
    category: {},
    sizes: [],
    show: false,
    availableForConstructor: false,
    priority: 1
  },
  isEdit: false
};

export default ModelForm;
