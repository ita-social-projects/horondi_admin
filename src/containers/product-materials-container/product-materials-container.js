import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { FormControl, Select, InputLabel, Grid } from '@material-ui/core';

import { noop } from 'lodash';
import { useSharedStyles } from '../shared.styles';
import { useStyles } from './product-materials-container.styles';
import { config } from '../../configs';
import { handleMenuItem } from '../../utils/handle-menu-item';

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
    () => handleMenuItem(mainMaterials),
    [mainMaterials]
  );
  const mainColorOptions = useMemo(
    () => handleMenuItem(mainColors),
    [mainColors]
  );
  const bottomMaterialOptions = useMemo(
    () => handleMenuItem(bottomMaterials),
    [bottomMaterials]
  );
  const bottomColorOptions = useMemo(
    () => handleMenuItem(bottomColors),
    [bottomColors]
  );

  const innerMaterialOptions = useMemo(
    () => handleMenuItem(innerMaterials),
    [innerMaterials]
  );

  const innerColorOptions = useMemo(
    () => handleMenuItem(innerColors),
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
              disabled={!options[idx] || !options[idx].length}
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
  innerMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  innerColors: PropTypes.arrayOf(PropTypes.object).isRequired,
  bottomMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  bottomColors: PropTypes.arrayOf(PropTypes.object).isRequired,
  mainMaterials: PropTypes.arrayOf(PropTypes.object).isRequired,
  mainColors: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
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
  toggleFieldsChanged: noop
};

export default ProductMaterialsContainer;
