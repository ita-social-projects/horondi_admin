import React from 'react';
import { TextField, Grid, Paper, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
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
  sizePropTypes,
  sizeDefaultProps,
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
const { materialUiLabels } = config;

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
        className={commonStyles.sizeTitle}
      >
        {config.titles.sizesTitles.sizeAdjustMenu}
      </Typography>
      <form className={styles.sizeForm} onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
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
              <Paper className={styles.sizeItemAdd}>
                <TextField
                  data-cy={labels[1].additionalPrice}
                  id={labels[1].additionalPrice}
                  className={styles.textField}
                  variant={materialUiLabels.outlined}
                  type={materialUiLabels.types.number}
                  label={labels[1].additionalPrice}
                  value={values.additionalPrice}
                  onChange={handleChange}
                  error={touched.additionalPrice && !!errors.additionalPrice}
                />
                {touched.additionalPrice && errors.additionalPrice && (
                  <div
                    data-cy={materialUiLabels.codeError}
                    className={styles.error}
                  >
                    {errors.additionalPrice}
                  </div>
                )}
              </Paper>
              <CheckboxOptions options={checkboxes} />
            </div>
          </div>
        </Grid>
        <div className={styles.buttonsWrapper}>
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
      </form>
    </div>
  );
}

SizeForm.propTypes = sizePropTypes;
SizeForm.defaultProps = sizeDefaultProps;

export default SizeForm;
