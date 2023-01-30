import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { FormControl, Select, InputLabel, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './materials-with-color-container.styles';
import { getMaterialsByPurpose } from '../../redux/material/material.actions';
import { materialSelector } from '../../redux/selectors/material.selectors';
import { handleMenuItem } from '../../utils/handle-menu-item';

const MaterialsWithColorContainer = ({
  materialsPurpose,
  setIsLoading,
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
  materialLabels
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [colors, setColors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const materialsKey = materialsPurpose.toLowerCase();

  useEffect(() => {
    dispatch(getMaterialsByPurpose([materialsPurpose]));
  }, [dispatch, materialsPurpose]);

  const { materialsByPurpose, loading } = useSelector(materialSelector);

  useEffect(() => {
    if (!loading) {
      setMaterials(materialsByPurpose[materialsKey]);
      setIsLoading(loading);
    }
  }, [loading, setIsLoading, materialsByPurpose, materialsKey]);

  const materialOptions = useMemo(() => handleMenuItem(materials), [materials]);
  const colorOptions = useMemo(() => handleMenuItem(colors), [colors]);

  const options = [materialOptions, colorOptions];

  useEffect(() => {
    const materialColors =
      materials?.find((material) => material._id === values.material)?.colors ||
      [];
    setColors(materialColors);
  }, [values, materials]);

  const handleSelectChange = (e) => {
    setFieldValue(materialLabels[1].name, '');
    handleChange(e);
  };

  const getCurrentValue = useCallback(
    (name) => {
      if (!colors.length || !materials.length) {
        return '';
      }
      return values[name];
    },
    [materials, colors, values]
  );

  return (
    <>
      <Grid container spacing={1} justify='flex-start'>
        {materialLabels.map(({ label, name, testId }, idx) => (
          <FormControl className={styles.formControl} key={label} xs={12}>
            <InputLabel htmlFor={label}>{`${label}`}</InputLabel>
            <Select
              data-testid={testId}
              name={name}
              error={touched[name] && !!errors[name]}
              value={getCurrentValue(name)}
              onChange={handleSelectChange}
              onBlur={handleBlur}
            >
              {options[idx]}
            </Select>
          </FormControl>
        ))}
      </Grid>
    </>
  );
};

MaterialsWithColorContainer.propTypes = {
  materialsPurpose: PropTypes.string.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  values: PropTypes.shape({
    material: PropTypes.string
  }).isRequired,
  errors: PropTypes.shape({}).isRequired,
  touched: PropTypes.shape({}).isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  materialLabels: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired
};

export default MaterialsWithColorContainer;
