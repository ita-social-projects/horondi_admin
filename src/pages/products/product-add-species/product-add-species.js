import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { FormControl, Select, InputLabel } from '@material-ui/core';
import { config } from '../../../configs';
import { useStyles } from './product-add-species.styles';

const { productSelectsLabels } = config;

const ProductAddSpecies = ({
  productSelects,
  setProductSelects,
  colors,
  patterns,
  modelsForSelectedCategory,
  getModels,
  models
}) => {
  const styles = useStyles();
  const { categories } = useSelector(({ Products: { productSpecies } }) => ({
    categories: productSpecies.categories
  }));

  const { category } = productSelects;

  const filteredModels = useMemo(() => getModels(modelsForSelectedCategory), [
    modelsForSelectedCategory,
    getModels
  ]);

  const handleSelectChange = (event) => {
    const { value, name } = event.target;
    if (name === 'category') {
      setProductSelects({
        ...productSelects,
        subcategory: '',
        model: '',
        [name]: value
      });
    } else {
      setProductSelects({ ...productSelects, [name]: value });
    }
  };

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

  const selectedCategory = useMemo(
    () => (category ? categories.find(({ _id }) => category === _id) : null),
    [categories, category]
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
        <option value={simpleName[1].value} key={simpleName[1].value}>
          {simpleName[0].value}
        </option>
      )),
    [colors]
  );

  const patternsOptions = useMemo(
    () =>
      patterns.map((pattern) => (
        <option value={pattern[1].value} key={pattern[1].value}>
          {pattern[0].value}
        </option>
      )),
    [patterns]
  );

  const modelsOptions = useMemo(
    () =>
      (selectedCategory ? filteredModels : models).map((model) => (
        <option value={model[1].value} key={model[1].value}>
          {model[0].value}
        </option>
      )),
    [filteredModels, selectedCategory, models]
  );

  const options = [
    categoriesOptions,
    subcategoriesOptions,
    modelsOptions,
    colorsOptions,
    patternsOptions
  ];

  return (
    <div>
      {productSelectsLabels.map(({ label, name }, idx) => (
        <FormControl
          variant='outlined'
          className={styles.formControl}
          key={label}
        >
          <InputLabel htmlFor={label}>{label}</InputLabel>
          <Select
            native
            value={productSelects[name]}
            onChange={handleSelectChange}
            label={label}
            inputProps={{
              name,
              id: label
            }}
          >
            <option aria-label='None' value='' />
            {options[idx]}
          </Select>
        </FormControl>
      ))}
    </div>
  );
};

ProductAddSpecies.propTypes = {
  productSelects: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.array),
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.number,
    PropTypes.object
  ]).isRequired,
  setProductSelects: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(PropTypes.array).isRequired,
  patterns: PropTypes.arrayOf(PropTypes.array).isRequired,
  modelsForSelectedCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  getModels: PropTypes.func.isRequired,
  models: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default ProductAddSpecies;
