import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormControl, Select, InputLabel, TextField } from '@material-ui/core';
import useStyles from './product-species-container.styles';

import { productsTranslations } from '../../translations/product.translations';
import { config } from '../../configs';

const { selectsLabels } = config.product;
const { ALL_FIELDS_ARE_REQUIRED } = productsTranslations;

const ProductSpeciesContainer = ({
  colors,
  patterns,
  models,
  getSelectedCategory,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  toggleFieldsChanged
}) => {
  const styles = useStyles();
  const { categories, modelsForSelectedCategory } = useSelector(
    ({ Products: { productSpecies, productToSend } }) => ({
      categories: productSpecies.categories,
      modelsForSelectedCategory: productSpecies.modelsForSelectedCategory,
      productToSend
    })
  );

  const selectedCategory = useMemo(
    () => (values.category ? getSelectedCategory(values.category) : null),
    [values.category, getSelectedCategory]
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
        const value = modelsForSelectedCategory.length
          ? model.name[0].value
          : model[0].value;

        return (
          <option value={value} key={value}>
            {value}
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

  const speciesErrors = useMemo(() => {
    const optionsNames = selectsLabels.map(({ name }) => name);
    return Object.keys(errors).filter((key) => optionsNames.includes(key));
  }, [errors]);

  const handleSelectChange = (e) => {
    if (e.target.name === 'category') {
      setFieldValue('subcategory', '');
      setFieldValue('model', '');
    }
    handleSpeciesChange(e)
  };

  const handleSpeciesChange = (e) => {
    handleChange(e);
    toggleFieldsChanged(true);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {selectsLabels.map(({ label, name, type, required }, idx) =>
        type === 'select' ? (
          <FormControl
            className={styles.formControl}
            key={label}
          >
            <InputLabel htmlFor={label}>{`${label}${required ? '*' : ''}`}</InputLabel>
            <Select
              name={name}
              native
              error={touched[name] && !!errors[name]}
              value={values[name]}
              onChange={handleSelectChange}
              onBlur={handleBlur}
            >
              <option aria-label='None' value='' />
              {options[idx]}
            </Select>
          </FormControl>
        ) : (
          <TextField
            className={styles.numberInputControl}
            label={`${label}${required ? '*' : ''}`}
            key={name}
            type={type}
            name={name}
            inputProps={{ min: 0 }}
            error={touched[name] && !!errors[name]}
            value={values[name]}
            onChange={handleSpeciesChange}
            onBlur={handleBlur}
          />
        )
      )}
      <div className={styles.error}>
        {!!speciesErrors.length && ALL_FIELDS_ARE_REQUIRED}
      </div>
    </form>
  );
};

ProductSpeciesContainer.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.array).isRequired,
  patterns: PropTypes.arrayOf(PropTypes.array).isRequired,
  models: PropTypes.arrayOf(PropTypes.array).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  getSelectedCategory: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  toggleFieldsChanged: PropTypes.func
};

ProductSpeciesContainer.defaultProps = {
  toggleFieldsChanged: () => {},
};

export default ProductSpeciesContainer;
