import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  Select,
  InputLabel,
  TextField,
  MenuItem
} from '@material-ui/core';
import { map, noop } from 'lodash';
import { useSharedStyles } from '../shared.styles';

import { productsTranslations } from '../../translations/product.translations';
import { config } from '../../configs';

const { selectsLabels } = config.labels.product;
const { ALL_FIELDS_ARE_REQUIRED } = productsTranslations;

const ProductSpeciesContainer = ({
  patterns,
  models,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setSizes,
  categories,
  setFieldValue,
  closures,
  sizes,
  toggleFieldsChanged
}) => {
  const styles = useSharedStyles();

  const categoriesOptions = useMemo(
    () =>
      map(categories, ({ name, _id }) => (
        <MenuItem value={_id} key={_id}>
          {name[0].value}
        </MenuItem>
      )),
    [categories]
  );

  const patternsOptions = useMemo(
    () =>
      map(patterns, (pattern) => (
        <MenuItem value={pattern._id} key={pattern.name[1].value}>
          {pattern.name[0].value}
        </MenuItem>
      )),
    [patterns]
  );

  const modelsOptions = useMemo(
    () =>
      map(models, (model) => {
        const { value } = model.name[0];

        return (
          <MenuItem value={model._id} key={value}>
            {value}
          </MenuItem>
        );
      }),
    [models]
  );

  const sizesOptions = useMemo(
    () =>
      map(sizes, (size) => (
        <MenuItem value={size._id} key={size.name}>
          {size.name}
        </MenuItem>
      )),
    [sizes]
  );

  const closuresOptions = useMemo(
    () =>
      map(closures, (closure) => (
        <MenuItem value={closure._id} key={closure.name[1].value}>
          {closure.name[0].value}
        </MenuItem>
      )),
    [closures]
  );

  const options = [
    categoriesOptions,
    modelsOptions,
    sizesOptions,
    patternsOptions,
    closuresOptions
  ];

  const speciesErrors = useMemo(() => {
    const optionsNames = selectsLabels.map(({ name }) => name);
    return Object.keys(errors).filter((key) => optionsNames.includes(key));
  }, [errors]);

  const handleSelectChange = (e) => {
    if (e.target.name === selectsLabels[0].name) {
      setFieldValue(selectsLabels[1].name, '');
      setFieldValue(selectsLabels[2].name, []);
      setSizes([]);
    } else if (e.target.name === selectsLabels[1].name) {
      setFieldValue(selectsLabels[2].name, []);
      setSizes([]);
    }
    handleSpeciesChange(e);
  };
  const handleSpeciesChange = (e) => {
    handleChange(e);
    toggleFieldsChanged(true);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      {selectsLabels.map(({ label, name, type, required, multiple }, idx) =>
        type === 'select' ? (
          <FormControl className={styles.formControl} key={label}>
            <InputLabel htmlFor={label}>{`${label}${
              required ? '*' : ''
            }`}</InputLabel>
            <Select
              name={name}
              error={touched[name] && !!errors[name]}
              value={values[name] || []}
              onChange={handleSelectChange}
              onBlur={handleBlur}
              multiple={multiple}
            >
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
  patterns: PropTypes.arrayOf(PropTypes.array).isRequired,
  categories: PropTypes.arrayOf(PropTypes.array).isRequired,
  closures: PropTypes.arrayOf(PropTypes.array).isRequired,
  models: PropTypes.arrayOf(PropTypes.array).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  toggleFieldsChanged: PropTypes.func,
  setSizes: PropTypes.func.isRequired,
  sizes: PropTypes.arrayOf(PropTypes.array).isRequired
};

ProductSpeciesContainer.defaultProps = {
  toggleFieldsChanged: noop()
};

export default ProductSpeciesContainer;
