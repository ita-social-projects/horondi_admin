import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  TextField,
  Grid,
  Tab,
  AppBar,
  Tabs,
  Button,
  Select,
  FormControl,
  InputLabel,
  Avatar
} from '@material-ui/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Image } from '@material-ui/icons';
import useModelHandlers from '../../utils/use-model-handlers';
import { useStyles } from './model-form.styles';
import { SaveButton } from '../buttons';
import TabPanel from '../tab-panel';
import { config } from '../../configs';
import { addModel, updateModel } from '../../redux/model/model.actions';
import { getCategories } from '../../redux/categories/categories.actions';
import CheckboxOptions from '../checkbox-options';
import ImageUploadContainer from '../../containers/image-upload-container';

const {
  MODEL_VALIDATION_ERROR,
  MODEL_ERROR_MESSAGE
} = config.modelErrorMessages;

const { routes } = config;

const { languages } = config;

const ModelForm = ({ model, id }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    tabsValue,
    handleTabsChange,
    createModel,
    setUpload,
    upload,
    modelImage,
    setModelImage
  } = useModelHandlers();
  const languageTabs =
    languages.length > 0
      ? languages.map((lang, index) => <Tab label={lang} key={lang} />)
      : null;

  const modelValidationSchema = Yup.object().shape({
    enDescription: Yup.string()
      .min(2, MODEL_VALIDATION_ERROR)
      .required(MODEL_ERROR_MESSAGE),
    enName: Yup.string()
      .min(2, MODEL_VALIDATION_ERROR)
      .required(MODEL_ERROR_MESSAGE),
    uaDescription: Yup.string()
      .min(2, MODEL_VALIDATION_ERROR)
      .required(MODEL_ERROR_MESSAGE),
    uaName: Yup.string()
      .min(2, MODEL_VALIDATION_ERROR)
      .required(MODEL_ERROR_MESSAGE),
    priority: Yup.number(),
    category: Yup.string()
  });

  const { categories } = useSelector(({ Categories }) => ({
    categories: Categories.categories.filter((result) => result.isMain)
  }));

  const [category, setCategory] = useState(model.category._id || '');

  const handleCategory = (event) => {
    values.category = event.target.value;
    setCategory(event.target.value);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: modelValidationSchema,
    initialValues: {
      modelImage: model.images ? model.images.thumbnail : '',
      uaName: model.name[0].value || '',
      enName: model.name[1].value || '',
      uaDescription: model.description[0].value || '',
      enDescription: model.description[1].value || '',
      priority: model.priority || 1,
      category: category || '',
      show: model.show || false
    },
    onSubmit: () => {
      const newModel = createModel(values);
      if (model && model.category) {
        dispatch(updateModel({ id, model: newModel, image: upload }));
        return;
      }
      dispatch(addModel({ model: newModel, image: upload }));
    }
  });

  const checkboxes = [
    {
      id: 'show',
      dataCy: 'show',
      value: values.show,
      checked: values.show,
      color: 'primary',
      label: config.labels.model.show,
      handler: (e) => setFieldValue('show', !values.show)
    }
  ];

  const handleImageLoad = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFieldValue('modelImage', event.target.result);
        setModelImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setUpload(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CheckboxOptions options={checkboxes} />

        <Grid item xs={12}>
          <Paper className={styles.modelItemUpdate}>
            <span className={styles.imageUpload}>
              {config.labels.model.avatarText}
            </span>
            <ImageUploadContainer handler={handleImageLoad} />
            {modelImage && (
              <Avatar src={modelImage}>
                <Image />
              </Avatar>
            )}
            <FormControl variant='outlined' className={styles.textField}>
              <InputLabel htmlFor='category-select'>
                {config.labels.model.category}
              </InputLabel>
              <Select
                data-cy='category'
                native
                value={category}
                onChange={handleCategory}
                label={config.labels.model.category}
                inputProps={{
                  name: 'category',
                  id: 'category-select'
                }}
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
              id='priority'
              type='number'
              data-cy='priority'
              className={styles.textField}
              variant='outlined'
              label={config.labels.model.priority}
              value={values.priority}
              onChange={handleChange}
              error={touched.priority && !!errors.priority}
            />
            {touched.priority && errors.priority && (
              <div className={styles.inputError}>{errors.priority}</div>
            )}
          </Paper>
        </Grid>
        <AppBar position='static'>
          <Tabs
            className={styles.tabs}
            value={tabsValue}
            onChange={handleTabsChange}
            aria-label='simple tabs example'
          >
            {languageTabs}
          </Tabs>
        </AppBar>
        {languages.map((lang, index) => (
          <TabPanel key={lang} value={tabsValue} index={index}>
            <Paper className={styles.modelItemUpdate}>
              <TextField
                data-cy='Name'
                id={`${lang}Name`}
                className={styles.textField}
                variant='outlined'
                label={config.labels.model.name}
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
              />
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div className={styles.inputError}>{errors[`${lang}Name`]}</div>
              )}
              <TextField
                data-cy={`${lang}Description`}
                id={`${lang}Description`}
                className={styles.textField}
                variant='outlined'
                label={config.labels.model.description}
                multiline
                value={values[`${lang}Description`]}
                onChange={handleChange}
                error={
                  touched[`${lang}Description`] &&
                  !!errors[`${lang}Description`]
                }
              />
              {touched[`${lang}Description`] &&
                errors[`${lang}Description`] && (
                <div className={styles.inputError}>
                  {errors[`${lang}Description`]}
                </div>
              )}
            </Paper>
          </TabPanel>
        ))}

        <Button
          id='contactsBack'
          component={Link}
          to={routes.pathToModels}
          variant='outlined'
          color='primary'
          className={styles.returnButton}
          data-cy='goBackButton'
        >
          {config.buttonTitles.GO_BACK_TITLE}
        </Button>
        <SaveButton
          className={styles.saveButton}
          data-cy='save'
          type='submit'
          title={config.buttonTitles.MODEL_SAVE_TITLE}
        />
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
    images: PropTypes.shape({
      thumbnail: PropTypes.string
    }),
    category: PropTypes.string,
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
  })
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
    category: '',
    show: false,
    priority: 1
  }
};

export default ModelForm;
