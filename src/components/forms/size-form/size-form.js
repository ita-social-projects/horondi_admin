import React, { useState } from 'react';
import {
  FormControlLabel,
  TextField,
  FormControl,
  Grid,
  Switch,
  Button,
  Dialog,
  DialogContent
} from '@material-ui/core';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useStyles } from './size-form.styles';
import useSizeHandlers from '../../../utils/use-size-handlers';
import { SaveButton } from '../../buttons';
import { addSize } from '../../../redux/sizes/sizes.actions';

const SizesForm = () => {
  const styles = useStyles();
  const [isAvailable, setIsAvailable] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleChangeAvailable = () => {
    setIsAvailable(!isAvailable);
  };

  const { createSize } = useSizeHandlers();

  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      heightInCm: 0,
      widthInCm: 0,
      depthInCm: 0,
      volumeInLiters: 0,
      weightInKg: 0,
      available: isAvailable,
      valueUAH: 0
    },
    onSubmit: () => {
      const newSize = createSize(values);
      dispatch(addSize(newSize));
    }
  });

  return (
    <div>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Add Size
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogContent>
          <form onSubmit={handleSubmit}>
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
                <TextField
                  id='valueUAH'
                  onChange={handleChange}
                  variant='outlined'
                  label='additional price UAH'
                  className={styles.textField}
                />
              </Grid>
              <FormControlLabel
                control={
                  <Switch
                    id='available'
                    checked={isAvailable}
                    onChange={handleChangeAvailable}
                    name='switch'
                    color='primary'
                  />
                }
                label='available'
              />
            </FormControl>
            <div className={styles.buttonContainer}>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <SaveButton
                title='save size'
                type='submit'
                onClick={handleClose}
              />
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SizesForm;
