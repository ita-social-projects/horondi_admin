import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { FormControl, Select, InputLabel, Grid } from '@material-ui/core';
import { noop } from 'lodash';
import { handleMenuItem } from '../../utils/handle-menu-item';
import { useSharedStyles } from '../shared.styles';
import { useStyles } from './back-materials-container.styles';
import { config } from '../../configs';

const { materialLabels } = config.labels.back;

const BackMaterialsContainer = ({
  material,
  color,
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
    setFieldValue(materialLabels[1].name, '');
    handleSpeciesChange(e);
  };

  const handleSpeciesChange = (e) => {
    handleChange(e);
    toggleFieldsChanged(true);
  };

  const backMaterialOptions = useMemo(
    () => handleMenuItem(material),
    [material]
  );
  const backColorOptions = useMemo(() => handleMenuItem(color), [color]);

  const options = [backMaterialOptions, backColorOptions];

  return (
    <>
      <form onSubmit={handleSubmit} className={sharedStyles.container}>
        <Grid container spacing={1} xs={12} justify='flex-start'>
          {materialLabels.map(({ label, name, required }, idx) => (
            <FormControl className={styles.formControl} key={label}>
              <InputLabel htmlFor={label}>
                {`${label}${required ? '*' : ''}`}
              </InputLabel>
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
    </>
  );
};

BackMaterialsContainer.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  toggleFieldsChanged: PropTypes.func,
  material: PropTypes.arrayOf(PropTypes.object).isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ).isRequired,
  color: PropTypes.arrayOf(PropTypes.object).isRequired
};

BackMaterialsContainer.defaultProps = {
  toggleFieldsChanged: noop
};

export default BackMaterialsContainer;
