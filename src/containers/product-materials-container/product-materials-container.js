import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Grid
} from '@material-ui/core';

import { map } from 'lodash';
import { useSharedStyles } from '../shared.styles';
import { useStyles } from './product-materials-container.styles';
import { config } from '../../configs';

const { materialLabels } = config.labels.product;

const ProductMaterialsContainer = ({
  innerMaterials,
  innerColors,
  bottomMaterials,
  bottomColors,
  mainMaterials,
  mainColors,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  toggleFieldsChanged
}) => {
  const sharedStyles = useSharedStyles();
  const styles = useStyles();
  const handleSelectChange = (e) => {
    if (e.target.name === materialLabels[0].name) {
      setFieldValue(materialLabels[1].name, '');
    } else if (e.target.name === materialLabels[2].name) {
      setFieldValue(materialLabels[3].name, '');
    } else if (e.target.name === materialLabels[4].name) {
      setFieldValue(materialLabels[5].name, '');
    }
    handleSpeciesChange(e);
  };

  const handleSpeciesChange = (e) => {
    handleChange(e);
    toggleFieldsChanged(true);
  };

  const mainMaterialOptions = useMemo(
    () =>
      map(mainMaterials, (material) => (
        <MenuItem value={material._id} key={material.name[1].value}>
          {material.name[0].value}
        </MenuItem>
      )),
    [mainMaterials]
  );
  const mainColorOptions = useMemo(
    () =>
      map(mainColors, (color) => (
        <MenuItem value={color._id} key={color.name[1].value}>
          {color.name[0].value}
        </MenuItem>
      )),
    [mainColors]
  );
  const bottomMaterialOptions = useMemo(
    () =>
      map(bottomMaterials, (material) => (
        <MenuItem value={material._id} key={material.name[1].value}>
          {material.name[0].value}
        </MenuItem>
      )),
    [bottomMaterials]
  );
  const bottomColorOptions = useMemo(
    () =>
      map(bottomColors, (color) => (
        <MenuItem value={color._id} key={color.name[1].value}>
          {color.name[0].value}
        </MenuItem>
      )),
    [bottomColors]
  );

  const innerMaterialOptions = useMemo(
    () =>
      map(innerMaterials, (material) => (
        <MenuItem value={material._id} key={material.name[1].value}>
          {material.name[0].value}
        </MenuItem>
      )),
    [innerMaterials]
  );

  const innerColorOptions = useMemo(
    () =>
      map(innerColors, (color) => (
        <MenuItem value={color._id} key={color.name[1].value}>
          {color.name[0].value}
        </MenuItem>
      )),
    [innerColors]
  );
  const options = [
    mainMaterialOptions,
    mainColorOptions,
    bottomMaterialOptions,
    bottomColorOptions,
    innerMaterialOptions,
    innerColorOptions
  ];

  return (
    <form onSubmit={handleSubmit} className={sharedStyles.container}>
      <Grid container spacing={1} xs={12} justify='flex-start'>
        {materialLabels.map(({ label, name, required }, idx) => (
          <FormControl className={styles.formControl} key={label}>
            <InputLabel htmlFor={label}>{`${label}${
              required ? '*' : ''
            }`}</InputLabel>
            <Select
              name={name}
              error={touched[name] && !!errors[name]}
              value={values[name]}
              onChange={handleSelectChange}
              onBlur={handleBlur}
            >
              {options[idx]}
            </Select>
          </FormControl>
        ))}
      </Grid>
    </form>
  );
};

ProductMaterialsContainer.propTypes = {
  innerMaterials: PropTypes.arrayOf(PropTypes.array).isRequired,
  innerColors: PropTypes.arrayOf(PropTypes.array).isRequired,
  bottomMaterials: PropTypes.arrayOf(PropTypes.array).isRequired,
  bottomColors: PropTypes.arrayOf(PropTypes.array).isRequired,
  mainMaterials: PropTypes.arrayOf(PropTypes.array).isRequired,
  mainColors: PropTypes.arrayOf(PropTypes.array).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  toggleFieldsChanged: PropTypes.func
};

ProductMaterialsContainer.defaultProps = {
  toggleFieldsChanged: () => {}
};

export default ProductMaterialsContainer;
