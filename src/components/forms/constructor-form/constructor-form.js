import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  Select,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { Image } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import { createBrowserHistory } from 'history';
import { useStyles } from './constructor-form.styles';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import ImageUploadContainer from '../../../containers/image-upload-container';
import { BackButton, SaveButton } from '../../buttons';
import useConstructorHandlers from '../../../utils/use-constructor-handlers';
import ColorCircle from '../../color-circle';
import { selectConstructorMethodAndMaterials } from '../../../redux/selectors/constructor.selectors';
import LanguagePanel from '../language-panel';

const map = require('lodash/map');

const { languages } = config;
const { SAVE_TITLE } = config.buttonTitles;
const {
  CONSTRUCTOR_VALIDATION_ERROR,
  CONSTRUCTOR_ERROR_MESSAGE,
  PHOTO_NOT_PROVIDED,
  PRICE_VALIDATION_ERROR
} = config.constructorErrorMessages;

const {
  constructorName,
  constructorPhoto,
  show,
  defaultElement,
  baseConstructorElementPrice,
  constructorMaterial,
  constructorColor
} = config.labels.model;

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
    constructorImg,
    setConstructorImg,
    createConstructor
  } = useConstructorHandlers();

  const { list, model, constructorElementMethod } = useSelector(
    selectConstructorMethodAndMaterials
  );

  const [materialColors, setMaterialColors] = useState([]);

  useEffect(() => {
    if (isEdit) {
      setConstructorImg(editableConstructorElement.image);
      setMaterialColors(
        list.filter(
          (el) => el._id === editableConstructorElement.material._id
        )[0].colors
      );
    }
  }, [dispatch]);

  const constructorValidationSchema = Yup.object().shape({
    enName: Yup.string()
      .min(2, CONSTRUCTOR_VALIDATION_ERROR)
      .required(CONSTRUCTOR_ERROR_MESSAGE),
    uaName: Yup.string()
      .min(2, CONSTRUCTOR_VALIDATION_ERROR)
      .required(CONSTRUCTOR_ERROR_MESSAGE),
    material: Yup.string().required(CONSTRUCTOR_ERROR_MESSAGE),
    color: Yup.string().required(CONSTRUCTOR_ERROR_MESSAGE),
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
      color: editableConstructorElement.color._id || '',
      available: editableConstructorElement.available || false,
      default: editableConstructorElement.default || false,
      basePrice: +editableConstructorElement.basePrice[1].value / 100 || 0
    },

    onSubmit: () => {
      const constructorElement = createConstructor(values);
      history.goBack();
      if (isEdit) {
        return dispatch(
          constructorElementMethod({
            constructorElement,
            id: editableConstructorElement._id
          })
        );
      }
      return dispatch(
        constructorElementMethod({
          constructorElement,
          id: model._id
        })
      );
    }
  });

  const handleMaterial = (e) => {
    setFieldValue('material', e.target.value);
    setMaterialColors(list.filter((el) => el._id === e.target.value)[0].colors);
  };
  const handleMaterialColor = (e) => {
    setFieldValue('color', e.target.value);
  };

  const checkboxes = (checkBoxName, label) => [
    {
      id: `${checkBoxName}`,
      dataCy: `${checkBoxName}`,
      value: values[`${checkBoxName}`],
      checked: values[`${checkBoxName}`],
      color: 'primary',
      label,
      handler: () =>
        setFieldValue(`${checkBoxName}`, !values[`${checkBoxName}`])
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

  const selectField = (
    selectValue,
    selectChangeAction,
    selectItemsList,
    inputLabel,
    defaultValue
  ) => (
    <FormControl className={styles.formControl}>
      <InputLabel id={`multiple-${selectValue}-label`}>{inputLabel}</InputLabel>
      <Select
        variant='outlined'
        labelId={`multiple-${selectValue}-label`}
        id={`multiple-${selectValue}`}
        onChange={selectChangeAction}
        input={<Input />}
        value={defaultValue || ''}
        MenuProps={MenuProps}
        disabled={!selectItemsList.length}
      >
        {map(selectItemsList, (selectItem) => (
          <MenuItem value={selectItem._id} key={selectItem._id}>
            <div className={styles.selectBox}>
              {selectValue === 'color' ? (
                <ColorCircle size={SMALL_CIRCLE} color={selectItem.colorHex} />
              ) : null}
              <span> {selectItem.name[0].value}</span>
            </div>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const inputs = [{ label: constructorName, name: 'name' }];
  const inputOptions = {
    errors,
    touched,
    handleChange,
    values,
    inputs
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CheckboxOptions options={checkboxes('available', show)} />
        <CheckboxOptions options={checkboxes('default', defaultElement)} />
        <Grid item xs={12}>
          <Paper className={styles.constructorItemUpdate}>
            <div>
              <span className={styles.imageUpload}>{constructorPhoto}</span>
              <div className={styles.imageUploadAvatar}>
                <ImageUploadContainer handler={handleLoadConstructorImage} />
                {constructorImg && (
                  <Avatar
                    src={constructorImg}
                    variant='rounded'
                    className={styles.avatar}
                  >
                    <Image />
                  </Avatar>
                )}
                {touched.image && errors.image && (
                  <div className={styles.inputError}>{errors.image}</div>
                )}
              </div>
            </div>
            <TextField
              data-cy='basePrice'
              id='basePrice'
              className={styles.textField}
              variant='outlined'
              label={baseConstructorElementPrice}
              value={values.basePrice}
              onChange={handleChange}
              error={touched.basePrice && !!errors.basePrice}
            />
            {touched.basePrice && errors.basePrice && (
              <div className={styles.inputError}>{errors.basePrice}</div>
            )}
            <div className={styles.textField}>
              {selectField(
                'material',
                handleMaterial,
                list,
                constructorMaterial,
                values.material
              )}
              {touched.material && errors.material && (
                <div className={styles.inputError}>{errors.material}</div>
              )}
              {selectField(
                'color',
                handleMaterialColor,
                materialColors,
                constructorColor,
                values.color
              )}
              {touched.color && errors.color && (
                <div className={styles.inputError}>{errors.color}</div>
              )}
            </div>
          </Paper>
        </Grid>
        {languages.map((lang) => (
          <LanguagePanel lang={lang} inputOptions={inputOptions} key={lang} />
        ))}
        <BackButton />
        <SaveButton
          className={styles.saveButton}
          data-cy='save-btn'
          type='submit'
          title={SAVE_TITLE}
          values={values}
          errors={errors}
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
    default: PropTypes.bool,
    image: PropTypes.string,
    material: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.arrayOf(valueShape)
    }),
    color: PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.arrayOf(valueShape),
      colorHex: PropTypes.string
    }),
    name: PropTypes.arrayOf(valueShape),
    basePrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    )
  }),
  values: PropTypes.shape({
    image: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool,
    default: PropTypes.bool,
    basePrice: PropTypes.number
  }),
  errors: PropTypes.shape({
    image: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool,
    default: PropTypes.bool,
    basePrice: PropTypes.number
  }),
  touched: PropTypes.shape({
    image: PropTypes.string,
    material: PropTypes.string,
    color: PropTypes.string,
    uaName: PropTypes.string,
    enName: PropTypes.string,
    available: PropTypes.bool,
    default: PropTypes.bool,
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
    color: '',
    available: false,
    default: false,
    basePrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ]
  }
};

export default ConstructorForm;
