import React from 'react';

import { TextField, Grid, Tabs, Tab, AppBar, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TabPanel from '../../tab-panel';
import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import ColorsBar from '../../colors-bar';
import useMaterialHandlers from '../../../utils/use-material-handlers';
import { useStyles } from './size-form.styles';
import {
  addMaterial,
  updateMaterial
} from '../../../redux/material/material.actions';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import { materialSelector } from '../../../redux/selectors/material.selectors';
import purposeEnum from '../../../configs/sizes-enum';

const {
  VALIDATION_ERROR,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE,
  PRICE_VALIDATION_ERROR
} = config.materialErrorMessages;

function SizeForm(size, id) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    validateOnBlur: true,
    initialValues: {
      name: size.name || 'M',
      heightInCm: size.heightInCm || '',
      widthInCm: size.widthInCm || '',
      depthInCm: size.depthInCm || '',
      volumeInLiters: size.volumeInLiters || '',
      weightInKg: size.weightInKg || '',
      available: size.available || false
    }
  });

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: config.labels.material.available[0].value,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  return (
    <div className={styles.container}>
      <form className={styles.materialForm}>
        <Grid item xs={12}>
          <FormControl
            variant='outlined'
            className={`${styles.formControl} 
                    ${styles.purposeSelect}`}
          >
            <InputLabel htmlFor='outlined-age-native-simple'>Розмір</InputLabel>
            <Select
              data-cy='name'
              id='name'
              native
              value={values.name}
              onChange={(e) => setFieldValue('name', e.target.value)}
              label='Розмір'
            >
              {Object.values(purposeEnum).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </FormControl>
          <Paper className={styles.materialItemAdd}>
            <TextField
              data-cy='heightInCm'
              id='heightInCm'
              className={styles.textField}
              variant='outlined'
              label='heightInCm'
              value={values.heightInCm}
              onChange={handleChange}
            />
            <TextField
              data-cy='widthInCm'
              id='widthInCm'
              className={styles.textField}
              variant='outlined'
              label='widthInCm'
              value={values.widthInCm}
              onChange={handleChange}
            />
            <TextField
              data-cy='depthInCm'
              id='depthInCm'
              className={styles.textField}
              variant='outlined'
              label='depthInCm'
              value={values.depthInCm}
              onChange={handleChange}
            />
            <TextField
              data-cy='volumeInLiters'
              id='volumeInLiters'
              className={styles.textField}
              variant='outlined'
              label='volumeInLiters'
              value={values.volumeInLiters}
              onChange={handleChange}
            />
            <TextField
              data-cy='weightInKg'
              id='weightInKg'
              className={styles.textField}
              variant='outlined'
              label='weightInKg'
              value={values.weightInKg}
              onChange={handleChange}
            />
          </Paper>
          <CheckboxOptions options={checkboxes} />
        </Grid>
        <div className={styles.controlsBlock}>
          <div>
            <BackButton />
            <SaveButton
              className={styles.saveButton}
              data-cy='save'
              type='submit'
              title={config.buttonTitles.SAVE_SIZE_TITLE}
              values={values}
              errors={errors}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default SizeForm;
