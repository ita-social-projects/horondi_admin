/* eslint-disable react/prop-types */
// TODO: Implement propTypes
import React, { useMemo, useEffect, useState } from 'react';
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
  const materialsKey = materialsPurpose;

  useEffect(() => {
    dispatch(getMaterialsByPurpose([materialsPurpose]));
  }, [dispatch, materialsPurpose]);

  const { materialsByPurpose, loading } = useSelector(materialSelector);

  useEffect(() => {
    if (!loading) {
      setMaterials(materialsByPurpose[materialsKey]);
      setIsLoading(loading);
    }
  }, [loading, setIsLoading, materialsByPurpose[materialsKey]]);

  const materialOptions = useMemo(() => handleMenuItem(materials), [materials]);
  const colorOptions = useMemo(() => handleMenuItem(colors), [colors]);

  const options = [materialOptions, colorOptions];

  const selectColorsHandler = (values, setColors, materials) => {
    const materialColors =
      materials?.find((material) => material._id === values.material)?.colors ||
      [];
    setColors(materialColors);
  };

  useEffect(() => {
    selectColorsHandler(values, setColors, materials);
  }, [values, materials]);

  const handleSelectChange = (e) => {
    setFieldValue(materialLabels[1].name, '');
    handleChange(e);
  };

  return (
    <>
      <Grid container spacing={1} xs={12} justify='flex-start'>
        {materialLabels.map(({ label, name }, idx) => (
          <FormControl className={styles.formControl} key={label}>
            <InputLabel htmlFor={label}>{`${label}`}</InputLabel>
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
    </>
  );
};

MaterialsWithColorContainer.propTypes = {
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ).isRequired,
  materialLabels: PropTypes.arrayOf(PropTypes.object).isRequired
};

// TODO: define default props

export default MaterialsWithColorContainer;
