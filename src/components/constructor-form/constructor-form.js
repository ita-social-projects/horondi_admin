import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Avatar, FormControl, Grid, InputLabel, Paper, Select, Tab, Tabs, TextField } from '@material-ui/core';
import * as Yup from 'yup';
import { Image } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { createBrowserHistory } from 'history';
import { useStyles } from './constructor-form.styles';
import { config } from '../../configs';
import CheckboxOptions from '../checkbox-options';
import ImageUploadContainer from '../../containers/image-upload-container';
import TabPanel from '../tab-panel';
import { BackButton, SaveButton } from '../buttons';
import useConstructorHandlers from '../../utils/use-constructor-handlers';
import { getMaterials } from '../../redux/material/material.actions';
import ColorCircle from '../color-circle';
import {
  selectConstructorMethodAndMaterials
} from '../../redux/selectors/constructor.selectors';

const { languages } = config;
const { SAVE_TITLE } = config.buttonTitles;
const {
  CONSTRUCTOR_VALIDATION_ERROR,
  CONSTRUCTOR_ERROR_MESSAGE,
  PHOTO_NOT_PROVIDED,
  PRICE_VALIDATION_ERROR
} = config.constructorErrorMessages;

const labels = config.labels.pattern.form;
const { SMALL_CIRCLE } = config.colorCircleSizes;

const MenuProps = {
  variant: 'menu',
  PaperProps: {
    style: {
      maxHeight: 300
    }
  }
};

const ConstructorForm = ({ isEdit, editableConstructorElement }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const history = createBrowserHistory();
  const {
    tabsValue,
    handleTabsChange,
    constructorImg,
    setConstructorImg,
    createConstructor
  } = useConstructorHandlers();

  const {
    list,
    filter,
    model,
    constructorElementMethod,
  } = useSelector(selectConstructorMethodAndMaterials);

  useEffect(() => {
    dispatch(
      getMaterials({
        filter
      })
    );
    if (editableConstructorElement) {
      setConstructorImg(editableConstructorElement.image);
    }
  }, [dispatch, filter]);

  const languageTabs =
    languages.length > 0
      ? languages.map((lang) => (
        <Tab label={lang} data-cy={`${lang}-tab`} key={lang} />
      ))
      : null;

  const constructorValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, CONSTRUCTOR_VALIDATION_ERROR)
      .required(CONSTRUCTOR_ERROR_MESSAGE),
    uaName: Yup.string()
      .min(2, CONSTRUCTOR_VALIDATION_ERROR)
      .required(CONSTRUCTOR_ERROR_MESSAGE),
    material: Yup.string()
      .required(CONSTRUCTOR_ERROR_MESSAGE),
    image: Yup.string().required(PHOTO_NOT_PROVIDED),
    basePrice: Yup.string()
      .matches(config.formRegExp.onlyPositiveDigits, PRICE_VALIDATION_ERROR)
      .required(CONSTRUCTOR_ERROR_MESSAGE)
  });

  const {
    values,
    handleSubmit,
    handleChange,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: constructorValidationSchema,
    initialValues: {
      image: editableConstructorElement.image || '',
      uaName: editableConstructorElement.name[0].value || '',
      enName: editableConstructorElement.name[1].value || '',
      material: editableConstructorElement.material._id || '',
      available: editableConstructorElement.available || false,
      basePrice: +editableConstructorElement.basePrice[1].value / 100 || 0
    },

    onSubmit: () => {
      const constructorElement = createConstructor(values);
      history.goBack()
      if(isEdit){
        return dispatch(constructorElementMethod({
          constructorElement,
          id:editableConstructorElement._id
        }))
      }
      return dispatch(constructorElementMethod({
        constructorElement,
        id:model._id
      }))
    }
  });

  const handleMaterial = (e) => {
    setFieldValue('material', e.target.value)
  }
  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.model.show,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  const handleImageLoad = (e, callback) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        callback(event);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLoadConstructorImage = (e) => {
    handleImageLoad(e, (event) => {
      setFieldValue('image', event.target.result);
      setConstructorImg(event.target.result);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CheckboxOptions options={checkboxes} />
        <Grid item xs={12}>
          <Paper className={styles.constructorItemUpdate}>
            <div>
              <span className={styles.imageUpload}>
                {config.labels.model.constructorPhoto}
              </span>
              <div className={styles.imageUploadAvatar}>
                <ImageUploadContainer handler={handleLoadConstructorImage} />
                {constructorImg && (
                  <Avatar src={constructorImg} variant='rounded' className={styles.avatar}>
                    <Image />
                  </Avatar>
                )}
                {touched.image &&
                errors.image && (
                  <div className={styles.inputError}>
                    {errors.image}
                  </div>
                )}
              </div>
            </div>
            <TextField
              data-cy='basePrice'
              id='basePrice'
              className={styles.textField}
              variant='outlined'
              label={config.labels.model.basePrice}
              value={values.basePrice}
              onChange={handleChange}
              error={touched.basePrice && !!errors.basePrice}
            />
            {touched.basePrice && errors.basePrice && (
              <div className={styles.inputError}>{errors.basePrice}</div>
            )}
            <FormControl variant='outlined' className={styles.textField}>
              <InputLabel id='multiple-checkbox-label'>
                {config.labels.model.material}
              </InputLabel>
              <Select
                labelId='multiple-checkbox-label'
                id='multiple-checkbox'
                onChange={handleMaterial}
                input={<Input />}
                defaultValue={values.material}
                MenuProps={MenuProps}
              >
                {list.map((cat) => (
                  <MenuItem value={cat._id} key={cat._id}>
                    <div className={styles.selectBox}>
                      <ColorCircle size={SMALL_CIRCLE} color={cat.color.colorHex} />
                      <span> {cat.name[0].value}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
              {touched.material && errors.material && (
                <div className={styles.inputError}>{errors.material}</div>
              )}
            </FormControl>

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
          <TabPanel key={index} value={tabsValue} index={index}>
            <Paper className={styles.constructorItemUpdate}>
              <TextField
                data-cy={`${lang}-name`}
                id={`${lang}Name`}
                className={styles.textField}
                variant='outlined'
                label={labels.name[index].value}
                multiline
                value={values[`${lang}Name`]}
                onChange={handleChange}
                error={touched[`${lang}Name`] && !!errors[`${lang}Name`]}
              />
              {touched[`${lang}Name`] && errors[`${lang}Name`] && (
                <div
                  data-cy={`${lang}-name-error`}
                  className={styles.inputError}
                >
                  {errors[`${lang}Name`]}
                </div>
              )}
            </Paper>
          </TabPanel>
        ))}
        <BackButton />
        <SaveButton
          className={styles.saveButton}
          data-cy='save-btn'
          type='submit'
          // onClick={() => history.goBack()}
          title={SAVE_TITLE}
        />
      </form>
    </div>
  );

};
const valueShape = PropTypes.shape({
  value: PropTypes.string
});

ConstructorForm.propTypes = {
  editableConstructorElement: PropTypes.shape({
    _id: PropTypes.string,
    available: PropTypes.bool,
    image:PropTypes.string,
    material: PropTypes.string,
    name: PropTypes.arrayOf(valueShape),
    basePrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    ),
  }),
  values: PropTypes.shape({
    image: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool,
    basePrice: PropTypes.number
  }),
  errors: PropTypes.shape({
    image: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool,
    basePrice: PropTypes.number
  }),
  touched: PropTypes.shape({
    image: PropTypes.string,
    material: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool,
    basePrice: PropTypes.number
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  isEdit: PropTypes.bool
};

ConstructorForm.defaultProps = {
  match: {},
  values: {},
  errors: {},
  touched: {},
  isEdit: false,
  editableConstructorElement: {
    _id: '',
    name: [
      {
        value: ''
      },
      {
        value: ''
      }
    ],
    image: '',
    material: '',
    available: false,
    basePrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ],
  },
};

export default ConstructorForm;
