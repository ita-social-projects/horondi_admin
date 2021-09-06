import React from 'react';
import {
  TextField,
  Grid,
  Paper,
  Typography,
  MenuItem
} from '@material-ui/core';
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
  getSizeInitialValues,
  sizePropTypes,
  sizeDefaultProps
} from '../../../utils/size-helpers';
import { formSchema } from '../../../validations/sizes/size-form-validation';
import { useStyles } from './size-form.styles';
import { addSize, updateSize } from '../../../redux/sizes/sizes.actions';
import { sizesSelectorWithPagination } from '../../../redux/selectors/sizes.selector';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import purposeEnum from '../../../configs/sizes-enum';
import { useUnsavedChangesHandler } from '../../../hooks/form-dialog/use-unsaved-changes-handler';

const { selectTitle, modelTitle } = config.titles.sizesTitles;
const labels = config.labels.sizeLabels;
const sizeInputs = config.labels.sizeInputData;
const { materialUiConstants } = config;
const { pathToSizes } = config.routes;

function SizeForm({ id, size }) {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

  const { sizesList, loading } = useSelector(sizesSelectorWithPagination);

  const uniqueModelMap = [
    ...new Map(
      sizesList?.map((item) => [item.modelId?.name[0].value, item])
    ).values()
  ];

  const { values, handleChange, handleSubmit, errors, touched, setFieldValue } =
    useFormik({
      validateOnBlur: true,
      validationSchema: formSchema,
      initialValues: getSizeInitialValues(size),
      onSubmit: (data) => {
        const newSize = createSize(data);
        if (id) {
          const updatedSize = createSize(data);
          dispatch(
            updateSize({
              id,
              updatedSize
            })
          );
          return;
        }
        dispatch(addSize(newSize));
      }
    });

  useUnsavedChangesHandler(values);

  const checkboxes = [
    {
      id: 'avaliable',
      dataCy: labels.en.avaliable,
      value: values.available,
      checked: values.available,
      color: materialUiConstants.primary,
      label: labels.ua.available,
      handler: () => setFieldValue(labels.en.available, !values.available)
    }
  ];

  const preventEventHandler = (e) => {
    e.preventDefault();
  };

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            <Grid item className={styles.button}>
              <BackButton pathBack={pathToSizes} />
            </Grid>
            <Grid item className={styles.button}>
              <SaveButton
                onClickHandler={handleSubmit}
                data-cy={materialUiConstants.save}
                type={materialUiConstants.types.submit}
                title={config.buttonTitles.SAVE_SIZE_TITLE}
                values={values}
                errors={errors}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <Typography
        variant={materialUiConstants.typographyVariantH1}
        className={commonStyles.sizeTitle}
      >
        {id
          ? config.titles.sizesTitles.sizeEdit
          : config.titles.sizesTitles.sizeAdd}
      </Typography>
      <form
        className={styles.sizeForm}
        onSubmit={(e) => preventEventHandler(e)}
      >
        <Grid item xs={12}>
          <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
              <Paper className={styles.sizeItemAdd}>
                {sizeInputs.sizeMetricData.map((item) => (
                  <>
                    <TextField
                      data-cy={item}
                      id={item}
                      className={styles.textField}
                      variant={materialUiConstants.outlined}
                      type={materialUiConstants.types.number}
                      label={labels.ua[item]}
                      value={values[item]}
                      onChange={handleChange}
                      error={touched[item] && !!errors[item]}
                    />
                    {touched[item] && errors[item] && (
                      <div
                        data-cy={materialUiConstants.codeError}
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
              <Paper className={styles.sizeItemAdd}>
                <FormControl
                  variant={materialUiConstants.outlined}
                  className={`${styles.formControl} 
                ${styles.purposeSelect}`}
                >
                  <InputLabel
                    htmlFor={materialUiConstants.outlinedAgeNativeSimple}
                  >
                    {selectTitle}
                  </InputLabel>
                  <Select
                    className={styles.select}
                    data-cy={labels.en.name}
                    id='name'
                    value={values.name}
                    onChange={(e) =>
                      setFieldValue(labels.en.name, e.target.value)
                    }
                    label={selectTitle}
                  >
                    {Object.values(purposeEnum).map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
              <Paper className={styles.sizeItemAdd}>
                <FormControl
                  variant={materialUiConstants.outlined}
                  className={`${styles.formControl} 
                ${styles.purposeSelect}`}
                >
                  <InputLabel
                    htmlFor={materialUiConstants.outlinedAgeNativeSimple}
                  >
                    {modelTitle}
                  </InputLabel>
                  <Select
                    data-cy={labels.en.modelId}
                    id='modelId'
                    value={values.modelId}
                    onChange={(e) =>
                      setFieldValue(labels.en.modelName, e.target.value)
                    }
                    label={selectTitle}
                  >
                    {uniqueModelMap.map((value) => (
                      <MenuItem
                        key={value.modelId._id}
                        value={value.modelId._id}
                      >
                        {value.modelId?.name[0]?.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
              <Paper className={styles.sizeItemAdd}>
                <TextField
                  data-cy='additionalPrice'
                  id={labels.en.additionalPrice}
                  className={styles.textField}
                  variant={materialUiConstants.outlined}
                  type={materialUiConstants.types.number}
                  label={labels.ua.additionalPrice}
                  value={values.additionalPrice}
                  onChange={handleChange}
                  error={touched.additionalPrice && !!errors.additionalPrice}
                />
                {touched.additionalPrice && errors.additionalPrice && (
                  <div
                    data-cy={materialUiConstants.codeError}
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
      </form>
    </div>
  );
}

SizeForm.propTypes = sizePropTypes;
SizeForm.defaultProps = sizeDefaultProps;

export default SizeForm;
