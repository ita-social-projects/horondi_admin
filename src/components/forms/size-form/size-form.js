import React from 'react';
import { TextField, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';

import { useCommonStyles } from '../../../pages/common.styles';
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
const {materialUiLabels} = config;

function SizeForm({ id, size }) {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
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
      id: labels[1].avaliable,
      dataCy: labels[1].avaliable,
      value: values.available,
      checked: values.available,
      color: materialUiLabels.primary,
      label: labels[0].available,
      handler: () => setFieldValue(labels[1].available, !values.available)
    }
  ];

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <Typography
        variant={materialUiLabels.typographyVariantH1}
        className={commonStyles.materialTitle}
      >
        {config.titles.sizesTitles.sizeAdjustMenu}
      </Typography>
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
                      variant={materialUiLabels.outlined}
                      type={materialUiLabels.types.number}
                      label={labels[0][item]}
                      value={values[item]}
                      onChange={handleChange}
                      error={touched[item] && !!errors[item]}
                    />
                    {touched[item] && errors[item] && (
                      <div
                        data-cy={materialUiLabels.codeError}
                        className={styles.error}
                      >
                        {errors[item]}
                      </div>
                    )}
                  </>
                ))}
              </Paper>
            </div>
            <div className={styles.contentWrapper}>
              <FormControl
                variant={materialUiLabels.outlined}
                className={`${styles.formControl} 
                ${styles.purposeSelect}`}
              >
                <InputLabel htmlFor={materialUiLabels.outlinedAgeNativeSimple}>
                  {selectTitle}
                </InputLabel>
                <Select
                  data-cy={labels[1].name}
                  id={labels[1].name}
                  native
                  value={values.name}
                  onChange={(e) =>
                    setFieldValue(labels[1].name, e.target.value)
                  }
                  label={selectTitle}
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
                      variant={materialUiLabels.outlined}
                      type={materialUiLabels.types.string}
                      label={labels[0][item]}
                      value={values[item]}
                      onChange={handleChange}
                      error={touched[item] && !!errors[item]}
                    />
                    {touched[item] && errors[item] && (
                      <div
                        data-cy={materialUiLabels.codeError}
                        className={styles.error}
                      >
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
                    data-cy={materialUiLabels.save}
                    type={materialUiLabels.types.submit}
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
