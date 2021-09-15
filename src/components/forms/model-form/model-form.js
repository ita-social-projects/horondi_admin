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
  InputLabel,
  Button
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { push } from 'connected-react-router';

import useModelHandlers from '../../../utils/use-model-handlers';
import { useStyles } from './model-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import { addModel, updateModel } from '../../../redux/model/model.actions';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadContainer from '../../../containers/image-upload-container';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import { getCategories } from '../../../redux/categories/categories.actions';
import LanguagePanel from '../language-panel';
import { modelValidationSchema } from '../../../validations/models/model-form-validation';
import { getSizes } from '../../../redux/sizes/sizes.actions';
import { sizesSelectorWithPagination } from '../../../redux/selectors/sizes.selector';
import {
  useFormikInitialValues,
  modelFormOnSubmit,
  updateModelHandler,
  loadHelper
} from '../../../utils/model-form';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

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
  labelsEn,
  chooseSizes
} = config.labels.model;
const { IMG_URL } = config;
const { MODEL_SAVE_TITLE, MODEL_CONSTRUCTOR } = config.buttonTitles;
const { pathToModels } = config.routes;

const ModelForm = ({ model, id, isEdit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const checkIsEdit = (checkCondition) => {
    if (checkCondition) {
      return model.sizes.map((item) => item._id);
    }
  };

  const inputLabel = React.useRef(null);
  const { createModel, setUpload, upload, modelImage, setModelImage } =
    useModelHandlers();

  useEffect(() => {
    dispatch(getSizes({ limit: null }));

    dispatch(getCategories({}));
  }, [dispatch]);

  const { sizesList } = useSelector(sizesSelectorWithPagination);
  const { categories } = useSelector(({ Categories }) => ({
    categories: Categories.categories
  }));

  const [sizes, setSizes] = useState(model.sizes || []);
  const [category, setCategory] = useState(model.category._id || '');

  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
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
      dispatch(setSnackBarSeverity(materialUiConstants.codeError));
      dispatch(setSnackBarMessage(PHOTO_NOT_PROVIDED));
      dispatch(setSnackBarStatus(true));
    }
  });

  const changed = useChangedValuesChecker(values, errors);
  useUnsavedChangesHandler(values);

  const handleCategory = (event) => {
    setFieldValue('category', event.target.value);
    setCategory(event.target.value);
  };

  const onTagsChange = (_, value) => {
    setFieldValue(
      'sizes',
      value.map((size) => size._id)
    );
    setSizes(value);
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
  const handleConstructor = () => {
    dispatch(push(config.routes.pathToConstructor.replace(':id', id)));
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
    inputs
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
                {...(id ? { disabled: !changed } : {})}
              />
            </Grid>
            <Grid item className={styles.button}>
              {isEdit ? (
                <Button
                  data-cy={labelsEn.constructor}
                  onClick={handleConstructor}
                  color={materialUiConstants.secondary}
                  variant={materialUiConstants.contained}
                >
                  {MODEL_CONSTRUCTOR}
                </Button>
              ) : null}
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
            <FormControl
              variant={materialUiConstants.outlined}
              className={styles.formControl}
            >
              <InputLabel
                htmlFor={labelsEn.categorySelect}
                ref={inputLabel}
                id={labelsEn.labelId}
                shrink
              >
                {availableCategory}
              </InputLabel>
              <Select
                id={labelsEn.category}
                labelId={labelsEn.labelId}
                data-cy={labelsEn.category}
                value={category}
                native
                onChange={handleCategory}
                label={availableCategory}
                variant={labelsEn.variantStandard}
              >
                <option value='' />
                {categories.map((cat) => (
                  <option value={cat._id} key={cat._id}>
                    {cat.code}
                  </option>
                ))}
              </Select>
              {touched.category && errors.category && (
                <div className={styles.inputError}>{errors.category}</div>
              )}
            </FormControl>
            <TextField
              id={labelsEn.priority}
              type={materialUiConstants.types.number}
              data-cy={labelsEn.priority}
              className={styles.textField}
              variant={materialUiConstants.outlined}
              label={priority}
              value={values.priority}
              onChange={handleChange}
              error={touched.priority && !!errors.priority}
            />
            {touched.priority && errors.priority && (
              <div className={styles.inputError}>{errors.priority}</div>
            )}
          </Paper>
          <Paper>
            <Autocomplete
              id={labelsEn.tagsFilled}
              className={styles.autoComplete}
              multiple
              freeSolo
              options={sizesList}
              getOptionLabel={(option) =>
                `${option.modelId.name[0].value} | ${option.name}`
              }
              defaultValue={sizes}
              onChange={onTagsChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant={materialUiConstants.outlined}
                  label={chooseSizes.title}
                  placeholder={chooseSizes.inputTitle}
                  margin={labelsEn.normal}
                  fullWidth
                />
              )}
            />
          </Paper>
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
