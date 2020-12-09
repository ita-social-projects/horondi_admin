import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  AppBar,
  Tabs,
  Button
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import useCategoryHandlers from '../../utils/use-category-handlers';
import { useStyles } from './category-form.styles';
import { SaveButton } from '../buttons';
import TabPanel from '../tab-panel';
import { config } from '../../configs';
import { addCategory, updateCategory } from '../../redux/category/category.actions';
import ImageUploadContainer from '../../containers/image-upload-container';

const {
  CATEGORY_VALIDATION_ERROR,
  CATEGORY_ERROR_MESSAGE,

} = config.categoryErrorMessages;

const { SAVE_TITLE } = config.buttonTitles;

const { languages } = config;

const CategoryForm = ({ category, id,edit = false}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    tabsValue,
    handleTabsChange,
    createCategory,
    setUpload,
    upload,
    categoryImage,
    setCategoryImage
  } = useCategoryHandlers();
  const languageTabs =
    languages.length > 0
      ? languages.map((lang) => <Tab label={lang} data-cy={`${lang}`} key={lang} />)
      : null;

  const categoryValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .required(CATEGORY_ERROR_MESSAGE),
    uaName: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .required(CATEGORY_ERROR_MESSAGE),
      code: Yup.string()
      .min(2, CATEGORY_VALIDATION_ERROR)
      .required(CATEGORY_ERROR_MESSAGE)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: categoryValidationSchema,
    initialValues: {
      categoryImage: category.images.thumbnail || '',
      uaName: category.name[0].value || '',
      enName:category.name[1].value || '',
      code:category.code || ''
    },
    onSubmit: (data) => {
      const newCategory = createCategory(data);
       if (edit) {
        dispatch(updateCategory({ id,category: newCategory,upload }));
        return;
      }
      dispatch(addCategory({category: newCategory,upload }));
     
    }
  });

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('categoryImage', event.target.result);
        setCategoryImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <Paper className={styles.categoryItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.avatarText}
            </span>
            <ImageUploadContainer
              handler={handleImageLoad}
              srcForAvatar={
                categoryImage ||
                `${config.imagePrefix}${values.categoryImage}`
              }
                fileName={upload.name ||category.images.thumbnail}
            />
            <TextField
              data-cy='code'
              name='code'
              className={styles.textField}
              variant='outlined'
              label= {config.labels.categories.categoryCode}
              value={values.code}
              onChange={handleChange}
              error={touched.code && !!errors.code}
            />
            {touched.code && errors.code && (
              <div data-cy='code-error' className={styles.inputError}>
                {errors.code}
              </div>
            )}
          </Paper>
        </Grid>
        <AppBar position='static'>
          <Tabs
            className={styles.tabs}
            value={tabsValue}
            onChange={handleTabsChange}
          >
            {languageTabs}
          </Tabs>
        </AppBar>
        {languages.map((lang, index) => (
          <TabPanel key={index} value={tabsValue} index={index}>
            <Paper className={styles.categoryItemUpdate}>
               <TextField
                data-cy={`${lang}-Name`}
                name={`${lang}Name`}
                className={styles.textField}
                variant='outlined'
                label={config.labels.categories.categoryName}
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
              /> 
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div
                  data-cy={`${lang}-Name-error`}
                  className={styles.inputError}
                >
                  {errors[`${lang}Name`]}
                </div>
              )}
            </Paper>
          </TabPanel>
        ))}

        <Button
          id='contactsBack'
          component={Link}
          to={config.routes.pathToCategories}
          variant='outlined'
          color='primary'
          className={styles.returnButton}
          data-cy='go-back-button'
        >
          {config.buttonTitles.GO_BACK_TITLE}
        </Button>
        <SaveButton
          className={styles.saveCategoryButton}
          data-cy='save'
          type='submit'
          title={SAVE_TITLE}
        />
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
    name: PropTypes.arrayOf(valueShape)
  }),
  values: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
  }),
  errors: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
  }),
  touched: PropTypes.shape({
    categoryImage: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  })
};
CategoryForm.defaultProps = {
  id: '',
  match: {},
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
     code:'',
    images: {
      thumbnail: ''
    },
    available: false,
  }
};

export default CategoryForm;