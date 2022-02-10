import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Paper, TextField, Grid } from '@material-ui/core';
import * as Yup from 'yup';
import useCategoryHandlers from '../../../utils/use-category-handlers';
import { useStyles } from './category-form.styles';
import { BackButton, SaveButton } from '../../buttons';
import { config } from '../../../configs';
import {
  addCategory,
  updateCategory
} from '../../../redux/categories/categories.actions';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { showErrorSnackbar } from '../../../redux/snackbar/snackbar.actions';
import LanguagePanel from '../language-panel';
import {
  getCategoryInitialValues,
  onSubmitCategoryHandler
} from '../../../utils/category-form';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';
import useChangedValuesChecker from '../../../hooks/forms/use-changed-values-checker';

const {
  CATEGORY_VALIDATION_ERROR,
  CATEGORY_VALIDATION_ERROR_CATEGORY_NAME,
  CATEGORY_CODE_MESSAGE,
  CATEGORY_ERROR
} = config.categoryErrorMessages;

const { ERROR_MESSAGE, UA_NAME_MESSAGE, EN_NAME_MESSAGE } =
  config.commonErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;
const { languages } = config;
const { IMG_URL } = config;
const { enNameCreation, uaNameCreation, categoryCode } = config.formRegExp;
const { materialUiConstants } = config;

const CategoryForm = ({ category, id, edit }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { createCategory, setUpload, upload, categoryImage, setCategoryImage } =
    useCategoryHandlers();

  const { pathToCategories } = config.routes;

  const categoryValidationSchema = Yup.object().shape({
    code: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .max(30, CATEGORY_VALIDATION_ERROR)
      .required(ERROR_MESSAGE)
      .matches(categoryCode, CATEGORY_CODE_MESSAGE),
    uaName: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR_CATEGORY_NAME)
      .max(50, CATEGORY_VALIDATION_ERROR_CATEGORY_NAME)
      .required(ERROR_MESSAGE)
      .matches(uaNameCreation, UA_NAME_MESSAGE),
    enName: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR_CATEGORY_NAME)
      .max(50, CATEGORY_VALIDATION_ERROR_CATEGORY_NAME)
      .required(ERROR_MESSAGE)
      .matches(enNameCreation, EN_NAME_MESSAGE)
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
    validationSchema: categoryValidationSchema,
    initialValues: getCategoryInitialValues(edit, IMG_URL, category),
    onSubmit: (data) => {
      const newCategory = createCategory(data);
      const uploadCondition = upload instanceof File;
      onSubmitCategoryHandler(edit, dispatch, updateCategory, {
        id,
        category: newCategory,
        upload
      });
      onSubmitCategoryHandler(uploadCondition, dispatch, addCategory, {
        category: newCategory,
        upload
      });
      if (!uploadCondition && !category.images.thumbnail) {
        dispatch(showErrorSnackbar(CATEGORY_ERROR));
      }
    }
  });

  const changed = useChangedValuesChecker(values, errors);
  const unblock = useUnsavedChangesHandler(values);

  const handleImageLoad = (files) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('categoryImage', event.target.result);
        setCategoryImage(event.target.result);
      };
      reader.readAsDataURL(files[0]);
      setUpload(files[0]);
    }
  };
  const inputs = [
    { label: config.labels.categories.categoryName, name: 'name' }
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
      <form onSubmit={(e) => eventPreventHandler(e)}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToCategories} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                data-cy='save'
                type={materialUiConstants.types.submit}
                title={SAVE_TITLE}
                onClickHandler={handleSubmit}
                unblockFunction={unblock}
                errors={errors}
                values={{
                  uaName: values.uaName,
                  enName: values.enName,
                  code: values.code
                }}
                {...(id ? { disabled: !changed } : {})}
              />
            </Grid>
          </Grid>
        </div>
        <Grid item xs={12}>
          <Paper className={styles.categoryItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.avatarText}
            </span>
            <div className={styles.imageUploadAvatar}>
              <ImageUploadContainer
                handler={handleImageLoad}
                src={edit ? values.categoryImage : categoryImage}
              />
            </div>
            <TextField
              data-cy='code'
              name='code'
              className={styles.textField}
              variant='outlined'
              placeholder={config.labels.categories.categoryCode}
              value={values.code}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.code && !!errors.code}
            />
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.error}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
      </form>
    </div>
  );
};

const valueShape = PropTypes.shape({
  value: PropTypes.string
});
CategoryForm.propTypes = {
  id: PropTypes.string,
  category: PropTypes.shape({
    _id: PropTypes.string,
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    name: PropTypes.arrayOf(valueShape),
    code: PropTypes.string
  }),
  values: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  errors: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  touched: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string
  }),
  edit: PropTypes.bool
};
CategoryForm.defaultProps = {
  id: '',
  values: {},
  errors: {},
  touched: {},
  category: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    code: '',
    images: {
      thumbnail: ''
    },
    available: false
  },
  edit: false
};

export default CategoryForm;
