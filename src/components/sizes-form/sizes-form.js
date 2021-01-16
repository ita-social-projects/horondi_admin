import React from 'react';
import { Paper, TextField, FormControl, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './size-form.styles';

const SizesForm = ({ handleChange }) => {
  const styles = useStyles();

  return (
    <Paper className={styles.sizeItemUpdate}>
      <FormControl variant='outlined' className={styles.sizeFrom}>
        <span className={styles.formTitle}>SizesForm</span>
        <Grid xs={12}>
          <TextField
            id='name'
            onChange={handleChange}
            variant='outlined'
            label='name'
            className={styles.textField}
          />
          <TextField
            id='heightInCm'
            onChange={handleChange}
            variant='outlined'
            label='height in cm'
            className={styles.textField}
          />
          <TextField
            id='widthInCm'
            onChange={handleChange}
            variant='outlined'
            label='width in cm'
            className={styles.textField}
          />
          <TextField
            id='depthInCm'
            onChange={handleChange}
            variant='outlined'
            label='depth in cm'
            className={styles.textField}
          />
          <TextField
            id='weightInKg'
            onChange={handleChange}
            variant='outlined'
            label='weight in kg'
            className={styles.textField}
          />
          <TextField
            id='volumeInLiters'
            onChange={handleChange}
            variant='outlined'
            label='volume in liters'
            className={styles.textField}
          />
        </Grid>
      </FormControl>
    </Paper>
  );
};

SizesForm.propTypes;

export default SizesForm;
