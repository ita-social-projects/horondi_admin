import React from 'react';

import { TextField, Grid, Paper } from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import { useStyles } from './size-form.styles';
import { addSize, updateSize } from '../../../redux/sizes/sizes.actions';
import { sizesSelectorWithPagination } from '../../../redux/selectors/sizes.selector';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import purposeEnum from '../../../configs/sizes-enum';

const {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  VALIDATION_ERROR,
  PRICE_VALIDATION_ERROR
} = config.materialErrorMessages;

function SizeForm({ id, size }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(sizesSelectorWithPagination);

  const formSchema = Yup.object().shape({
    name: Yup.string().required(VALIDATION_ERROR),

    heightInCm: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(4, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    widthInCm: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(4, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    depthInCm: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(4, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    volumeInLiters: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(4, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    weightInKg: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(4, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    available: Yup.bool().required(VALIDATION_ERROR),

    additionalPrice: Yup.string()
      .matches(config.formRegExp.onlyPositiveDigits, PRICE_VALIDATION_ERROR)
      .required(VALIDATION_ERROR)
  });

  const {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue
  } = useFormik({
    validateOnBlur: true,
    validationSchema: formSchema,
    initialValues: {
      name: size.name || 'M',
      heightInCm: size.heightInCm || '',
      widthInCm: size.widthInCm || '',
      depthInCm: size.depthInCm || '',
      volumeInLiters: size.volumeInLiters || '',
      weightInKg: size.weightInKg || '',
      available: size.available || false,
      additionalPrice: size.additionalPrice[1].value / 100 || 0
    },
    onSubmit: (data) => {
      if (id) {
        dispatch(
          updateSize({
            id,
            data
          })
        );
        return;
      }
      dispatch(addSize(data));
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

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <form className={styles.materialForm} onSubmit={handleSubmit}>
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
              type='string'
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
              type='number'
              value={values.heightInCm}
              onChange={handleChange}
              error={touched.heightInCm && !!errors.heightInCm}
            />
            {touched.heightInCm && errors.heightInCm && (
              <div data-cy='code-error' className={styles.error}>
                {errors.heightInCm}
              </div>
            )}
            <TextField
              data-cy='widthInCm'
              id='widthInCm'
              className={styles.textField}
              variant='outlined'
              label='widthInCm'
              type='number'
              value={values.widthInCm}
              onChange={handleChange}
              error={touched.code && !!errors.code}
            />
            <TextField
              data-cy='depthInCm'
              id='depthInCm'
              className={styles.textField}
              variant='outlined'
              label='depthInCm'
              type='number'
              value={values.depthInCm}
              onChange={handleChange}
            />
            <TextField
              data-cy='volumeInLiters'
              id='volumeInLiters'
              className={styles.textField}
              variant='outlined'
              label='volumeInLiters'
              type='number'
              value={values.volumeInLiters}
              onChange={handleChange}
            />
            <TextField
              data-cy='weightInKg'
              id='weightInKg'
              className={styles.textField}
              variant='outlined'
              label='weightInKg'
              type='number'
              value={values.weightInKg}
              onChange={handleChange}
            />
            <TextField
              data-cy='additionalPrice'
              id='additionalPrice'
              className={styles.textField}
              variant='outlined'
              label='additionalPrice'
              type='number'
              value={values.additionalPrice}
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

SizeForm.propTypes = {
  id: PropTypes.string,
  size: PropTypes.shape({
    name: PropTypes.string,
    heightInCm: PropTypes.number,
    widthInCm: PropTypes.number,
    depthInCm: PropTypes.number,
    volumeInLiters: PropTypes.number,
    weightInKg: PropTypes.number,
    available: PropTypes.bool,
    additionalPrice: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number
      })
    )
  })
};
SizeForm.defaultProps = {
  id: '',
  size: {
    name: '',
    heightInCm: '',
    widthInCm: '',
    depthInCm: '',
    volumeInLiters: '',
    weightInKg: '',
    available: false,
    additionalPrice: [{ value: 0 }, { value: 0 }]
  }
};

export default SizeForm;
