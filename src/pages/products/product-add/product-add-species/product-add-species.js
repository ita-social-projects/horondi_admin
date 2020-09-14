import React, { useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { FormControl, Select, InputLabel, TextField } from '@material-ui/core';
import { useStyles } from './product-add-species.styles';

import StepperButtons from '../product-add-stepper/stepper-buttons/stepper-buttons';
import { config } from '../../../../configs';
import {
  setProductToSend,
  getModelsByCategory
} from '../../../../redux/products/products.actions';

const { productSelectsLabels } = config;

const ProductAddSpecies = ({
  colors,
  patterns,
  models,
  activeStep,
  handleNext,
  handleBack
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { categories, modelsForSelectedCategory, productToSend } = useSelector(
    ({ Products: { productSpecies, productToSend } }) => ({
      categories: productSpecies.categories,
      modelsForSelectedCategory: productSpecies.modelsForSelectedCategory,
      productToSend
    })
  );

  const [shouldValidate, setShouldValidate] = useState(false);

  const getColorToSend = (color) =>
    colors.find((item) => item[0].simpleName[0].value === color);
  const getPatternToSend = (pattern) =>
    patterns.find((item) => pattern === item[0].value);
  const getModelToSend = (model) =>
    modelsForSelectedCategory.find(({ _id }) => _id === model)._id;

  const formikValues = {
    category: productToSend.category,
    pattern: productToSend.pattern.length
      ? productToSend.pattern[0].value
      : productToSend.pattern,
    colors: productToSend.colors.length
      ? productToSend.colors[0].simpleName[0].value
      : productToSend.colors,
    subcategory: productToSend.subcategory,
    model: productToSend.model,
    basePrice: productToSend.basePrice,
    strapLengthInCm: productToSend.strapLengthInCm
  };

  const yupSchema = Yup.object().shape({
    category: Yup.string().required(),
    subcategory: Yup.string().required(),
    pattern: Yup.string().required(),
    colors: Yup.string().required(),
    model: Yup.string().required(),
    basePrice: Yup.number().min(1).required(),
    strapLengthInCm: Yup.number().min(1).required()
  });

  const onSubmit = (values) => {
    const { colors, pattern, model } = values;
    dispatch(
      setProductToSend({
        ...values,
        colors: getColorToSend(colors),
        pattern: getPatternToSend(pattern),
        model: getModelToSend(model)
      })
    );
    handleNext();
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched
  } = useFormik({
    initialValues: formikValues,
    validationSchema: yupSchema,
    onSubmit,
    validateOnBlur: shouldValidate,
    validateOnChange: shouldValidate
  });

  useEffect(() => {
    if (values.category) dispatch(getModelsByCategory(values.category));
  }, [values.category, dispatch]);

  const selectedCategory = useMemo(
    () =>
      values.category
        ? categories.find(({ _id }) => values.category === _id)
        : null,
    [categories, values.category]
  );

  const categoriesOptions = useMemo(
    () =>
      categories
        .filter(({ isMain }) => isMain)
        .map(({ name, _id }) => (
          <option value={_id} key={_id}>
            {name[0].value}
          </option>
        )),
    [categories]
  );

  const subcategoriesOptions = useMemo(
    () =>
      categories
        .filter(
          ({ isMain, _id }) =>
            !isMain &&
            (selectedCategory
              ? selectedCategory.subcategories.includes(_id)
              : true)
        )
        .map(({ _id, name }) => (
          <option value={_id} key={_id}>
            {name[0].value}
          </option>
        )),
    [categories, selectedCategory]
  );

  const colorsOptions = useMemo(
    () =>
      colors.map(([{ simpleName }]) => (
        <option value={simpleName[0].value} key={simpleName[1].value}>
          {simpleName[0].value}
        </option>
      )),
    [colors]
  );

  const patternsOptions = useMemo(
    () =>
      patterns.map((pattern) => (
        <option value={pattern[0].value} key={pattern[1].value}>
          {pattern[0].value}
        </option>
      )),
    [patterns]
  );

  const modelsOptions = useMemo(
    () =>
      (modelsForSelectedCategory.length
        ? modelsForSelectedCategory
        : models
      ).map((model) => {
        const name = modelsForSelectedCategory.length
          ? model.name[0].value
          : model[0].value;
        const value = modelsForSelectedCategory.length
          ? model._id
          : model[0].value;

        return (
          <option value={value} key={value}>
            {name}
          </option>
        );
      }),
    [modelsForSelectedCategory, models]
  );

  const options = [
    categoriesOptions,
    subcategoriesOptions,
    modelsOptions,
    colorsOptions,
    patternsOptions
  ];

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {productSelectsLabels.map(({ label, name, type }, idx) =>
        type === 'select' ? (
          <FormControl
            variant='outlined'
            className={styles.formControl}
            key={label}
          >
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <Select
              native
              label={label}
              value={values[name]}
              error={touched[name] && !!errors[name]}
              onBlur={handleBlur}
              onChange={handleChange}
              name={name}
            >
              <option aria-label='None' value='' />
              {options[idx]}
            </Select>
          </FormControl>
        ) : (
          <TextField
            className={styles.numberInputControl}
            label={label}
            key={name}
            variant='outlined'
            type={type}
            name={name}
            inputProps={{ min: 0 }}
            value={values[name]}
            error={touched[name] && !!errors[name]}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        )
      )}
      <div className={styles.error}>
        {!!Object.values(errors).length && "Усі поля обов'язкові"}
      </div>
      <div className={styles.buttons}>
        <StepperButtons
          activeStep={activeStep}
          type='submit'
          handleBack={handleBack}
          handleNext={() => setShouldValidate(true)}
        />
      </div>
    </form>
  );
};

ProductAddSpecies.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.array).isRequired,
  patterns: PropTypes.arrayOf(PropTypes.array).isRequired,
  models: PropTypes.arrayOf(PropTypes.array).isRequired,
  activeStep: PropTypes.bool.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired
};

export default ProductAddSpecies;
