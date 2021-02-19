import React from 'react';
import { TextField, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import createSize from '../../../utils/create-size';
import { useStyles } from './size-form.styles';
import { addSize, updateSize } from '../../../redux/sizes/sizes.actions';
import { sizesSelectorWithPagination } from '../../../redux/selectors/sizes.selector';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import purposeEnum from '../../../configs/sizes-enum';

const {
  MAX_LENGTH_MESSAGE,
  MIN_LENGTH_MESSAGE,
  MAX_LENGTH_MESSAGE_SIZE,
  MIN_LENGTH_MESSAGE_SIZE,
  VALIDATION_ERROR,
  PRICE_VALIDATION_ERROR,
  NOT_UA_INPUT_MESSAGE,
  NOT_EN_INPUT_MESSAGE
} = config.sizeErrorMessages;

const { selectTitle } = config.titles.sizesTitles;
const labels = config.labels.sizeLabels;

function SizeForm({ id, size }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(sizesSelectorWithPagination);

  const formSchema = Yup.object().shape({
    name: Yup.string().required(VALIDATION_ERROR),

    simpleNameUa: Yup.string()
      .matches(config.formRegExp.uaNameCreation, NOT_UA_INPUT_MESSAGE)
      .min(1, MIN_LENGTH_MESSAGE_SIZE)
      .max(20, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),

    simpleNameEn: Yup.string()
      .matches(config.formRegExp.enNameCreation, NOT_EN_INPUT_MESSAGE)
      .min(1, MIN_LENGTH_MESSAGE_SIZE)
      .max(20, MAX_LENGTH_MESSAGE)
      .required(VALIDATION_ERROR),
    heightInCm: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE_SIZE)
      .required(VALIDATION_ERROR),
    widthInCm: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE_SIZE)
      .required(VALIDATION_ERROR),
    depthInCm: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE_SIZE)
      .required(VALIDATION_ERROR),
    volumeInLiters: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE_SIZE)
      .required(VALIDATION_ERROR),
    weightInKg: Yup.number()
      .min(1, MIN_LENGTH_MESSAGE)
      .max(100, MAX_LENGTH_MESSAGE_SIZE)
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
      simpleNameUa: size.simpleName[0].value || '',
      simpleNameEn: size.simpleName[1].value || '',
      heightInCm: size.heightInCm || '',
      widthInCm: size.widthInCm || '',
      depthInCm: size.depthInCm || '',
      volumeInLiters: size.volumeInLiters || '',
      weightInKg: size.weightInKg || '',
      available: size.available || false,
      additionalPrice: size.additionalPrice[1].value / 100 || 0
    },
    onSubmit: (data) => {
      const newSize = createSize(data);
      if (id) {
        dispatch(
          updateSize({
            id,
            newSize
          })
        );
        return;
      }
      dispatch(addSize(newSize));
    }
  });

  const checkboxes = [
    {
      id: 'available',
      dataCy: 'available',
      value: values.available,
      checked: values.available,
      color: 'primary',
      label: labels.available,
      handler: () => setFieldValue('available', !values.available)
    }
  ];

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <form className={styles.sizeForm} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <div className={styles.wrapper}>
            <div className={styles.nameBlok}>
              <Paper className={styles.sizeItemAdd}>
                <TextField
                  data-cy='heightInCm'
                  id='heightInCm'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.heightInCm}
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
                  label={labels.widthInCm}
                  type='number'
                  value={values.widthInCm}
                  onChange={handleChange}
                  error={touched.widthInCm && !!errors.widthInCm}
                />
                {touched.widthInCm && errors.widthInCm && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.widthInCm}
                  </div>
                )}
                <TextField
                  data-cy='depthInCm'
                  id='depthInCm'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.depthInCm}
                  type='number'
                  value={values.depthInCm}
                  onChange={handleChange}
                  error={touched.depthInCm && !!errors.depthInCm}
                />
                {touched.depthInCm && errors.depthInCm && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.depthInCm}
                  </div>
                )}
                <TextField
                  data-cy='volumeInLiters'
                  id='volumeInLiters'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.volumeInLiters}
                  type='number'
                  value={values.volumeInLiters}
                  onChange={handleChange}
                  error={touched.volumeInLiters && !!errors.volumeInLiters}
                />
                {touched.volumeInLiters && errors.volumeInLiters && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.volumeInLiters}
                  </div>
                )}
                <TextField
                  data-cy='weightInKg'
                  id='weightInKg'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.weightInKg}
                  type='number'
                  value={values.weightInKg}
                  onChange={handleChange}
                  error={touched.weightInKg && !!errors.weightInKg}
                />
                {touched.weightInKg && errors.weightInKg && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.weightInKg}
                  </div>
                )}
                <TextField
                  data-cy='additionalPrice'
                  id='additionalPrice'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.additionalPrice}
                  type='number'
                  value={values.additionalPrice}
                  onChange={handleChange}
                  error={touched.additionalPrice && !!errors.additionalPrice}
                />
                {touched.additionalPrice && errors.additionalPrice && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.additionalPrice}
                  </div>
                )}
              </Paper>
            </div>
            <div className={styles.nameBlok}>
              <FormControl
                variant='outlined'
                className={`${styles.formControl} 
                      ${styles.purposeSelect}`}
              >
                <InputLabel htmlFor='outlined-age-native-simple'>
                  {selectTitle}
                </InputLabel>
                <Select
                  data-cy='name'
                  id='name'
                  native
                  value={values.name}
                  type='string'
                  onChange={(e) => setFieldValue('name', e.target.value)}
                  label={labels.name}
                >
                  {Object.values(purposeEnum).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Paper className={styles.sizeItemAdd}>
                <TextField
                  data-cy='simpleNameUa'
                  id='simpleNameUa'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.simpleNameUa}
                  type='string'
                  value={values.simpleNameUa}
                  onChange={handleChange}
                  error={touched.simpleNameUa && !!errors.simpleNameUa}
                />
                {touched.simpleNameUa && errors.simpleNameUa && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.simpleNameUa}
                  </div>
                )}
                <TextField
                  data-cy='simpleNameEn'
                  id='simpleNameEn'
                  className={styles.textField}
                  variant='outlined'
                  label={labels.simpleNameEn}
                  type='string'
                  value={values.simpleNameEn}
                  onChange={handleChange}
                  error={touched.simpleNameEn && !!errors.simpleNameEn}
                />
                {touched.simpleNameEn && errors.simpleNameEn && (
                  <div data-cy='code-error' className={styles.error}>
                    {errors.simpleNameEn}
                  </div>
                )}
              </Paper>
              <CheckboxOptions options={checkboxes} />
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
            </div>
          </div>
        </Grid>
      </form>
    </div>
  );
}

SizeForm.propTypes = {
  id: PropTypes.string,
  size: PropTypes.shape({
    _id: PropTypes.string,
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
    ),
    simpleName: PropTypes.arrayOf(
      PropTypes.shape({
        lang: PropTypes.string,
        value: PropTypes.string
      })
    )
  })
};
SizeForm.defaultProps = {
  id: '',
  size: {
    _id: '',
    name: '',
    simpleName: [
      { lang: '', value: '' },
      { lang: '', value: '' }
    ],
    heightInCm: '',
    widthInCm: '',
    depthInCm: '',
    volumeInLiters: '',
    weightInKg: '',
    available: '',
    additionalPrice: [
      {
        value: 0
      },
      {
        value: 0
      }
    ]
  }
};

export default SizeForm;
