import React from 'react';
import { TextField, Grid, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';

import { BackButton, SaveButton } from '../../buttons';
import LoadingBar from '../../loading-bar';
import {
  createSize,
  createSizeNamelist,
  getSizeInitialValues,
  formSchema
} from '../../../utils/size-helpers';
import { useStyles } from './size-form.styles';
import { addSize, updateSize } from '../../../redux/sizes/sizes.actions';
import { sizesSelectorWithPagination } from '../../../redux/selectors/sizes.selector';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import purposeEnum from '../../../configs/sizes-enum';

const { selectTitle } = config.titles.sizesTitles;
const labels = config.labels.sizeLabels;

function SizeForm({ id, size }) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const sizeList = createSizeNamelist();

  const { loading } = useSelector(sizesSelectorWithPagination);

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
    initialValues: getSizeInitialValues(size),
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
                {sizeList[0].map((item) => (
                  <>
                    <TextField
                      data-cy={item}
                      id={item}
                      className={styles.textField}
                      variant='outlined'
                      type='number'
                      label={labels[item]}
                      value={values[item]}
                      onChange={handleChange}
                      error={touched[item] && !!errors[item]}
                    />
                    {touched[item] && errors[item] && (
                      <div data-cy='code-error' className={styles.error}>
                        {errors[item]}
                      </div>
                    )}
                  </>
                ))}
              </Paper>
            </div>
            <div className={styles.contentWrapper}>
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
                {sizeList[1].map((item) => (
                  <>
                    <TextField
                      data-cy={item}
                      id={item}
                      className={styles.textField}
                      variant='outlined'
                      type='string'
                      label={labels[item]}
                      value={values[item]}
                      onChange={handleChange}
                      error={touched[item] && !!errors[item]}
                    />
                    {touched[item] && errors[item] && (
                      <div data-cy='code-error' className={styles.error}>
                        {errors[item]}
                      </div>
                    )}
                  </>
                ))}
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
