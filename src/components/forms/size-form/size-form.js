import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import { useFormik } from 'formik';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { uniqueId } from 'lodash';
import { useCommonStyles } from '../../../pages/common.styles';
import { SaveButton } from '../../buttons';
import DeleteButton from '../../buttons/delete-button';
import {
  createSize,
  getSizeInitialValues,
  sizePropTypes,
  sizeDefaultProps
} from '../../../utils/size';
import {
  getLabelValue,
  calculateAddittionalPriceValue
} from '../../../utils/additionalPrice-helper';
import { formSchema } from '../../../validations/sizes/size-form-validation';
import { useStyles } from './size-form.styles';
import { config } from '../../../configs';
import CheckboxOptions from '../../checkbox-options';
import sizesEnum from '../../../configs/sizes-enum';

import Tooltip from '../../tooltip';
import { sizes } from '../../../configs/tooltip-titles';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { selectProductsAndTable } from '../../../redux/selectors/multiple.selectors';

const { DELETE_TITLE } = config.buttonTitles;

const {
  RELATIVE_PRICE_EXPLANATION,
  PRICE_EXPLANATION,
  PRICE_EXPLANATION_DESCRIPTION
} = sizes;

const { selectTitle, convertationTitle, sizeAdd, sizeEdit } =
  config.titles.sizesTitles;
const labels = config.labels.sizeLabels;
const { additionalPriceType } = labels;
const sizeInputs = config.labels.sizeInputData;
const { materialUiConstants } = config;
const { DELETE_SIZE_CONFIRMATION_MESSAGE } = config.messages;

const SizeForm = ({ size, sizeUtils, isEdit }) => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const dispatch = useDispatch();

  const exchangeRate = useSelector((state) => state.Currencies.exchangeRate);
  const { products } = useSelector(selectProductsAndTable);

  const [initSize, setInitSize] = useState(getSizeInitialValues(size));
  const { onSizeSubmit, onSizeDelete, sizesAdded } = sizeUtils;

  const {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    errors,
    touched,
    dirty,
    isValid,
    setFieldValue,
    handleBlur
  } = useFormik({
    validateOnBlur: true,
    enableReinitialize: isEdit,
    validationSchema: formSchema,
    initialValues: initSize,
    onSubmit: (data) => {
      const newSize = createSize(data);
      newSize._id = isEdit ? size._id : uniqueId('size_');
      onSizeSubmit(newSize);
      if (isEdit) setInitSize(getSizeInitialValues(newSize));
      resetForm();
    }
  });

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

  const availableSizes = Object.values(sizesEnum).filter((sizeName) => {
    const sizeAddedCondition = !sizesAdded.includes(sizeName);
    if (isEdit) {
      return sizeName === size.name || sizeAddedCondition;
    }
    return sizeAddedCondition;
  });

  const sizeEditFields = sizeInputs.sizeMetricData.map((item) => (
    <React.Fragment key={item}>
      <TextField
        data-cy={item}
        id={item}
        className={styles.textField}
        variant={materialUiConstants.outlined}
        type={materialUiConstants.types.number}
        label={labels.ua[item]}
        value={values[item]}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched[item] && !!errors[item]}
      />
      {touched[item] && errors[item] && (
        <div data-cy={materialUiConstants.codeError} className={styles.error}>
          {errors[item]}
        </div>
      )}
    </React.Fragment>
  ));

  return (
    <div
      className={styles.container}
      data-testid={`size-form${size._id || ''}`}
    >
      <div className={styles.buttonsWrapper}>
        <div className={styles.buttonContainer}>
          <Grid container spacing={2} className={styles.fixedButtons}>
            {isEdit && (
              <Grid item className={styles.button}>
                <DeleteButton
                  data-cy='size-delete-btn'
                  onClickHandler={() =>
                    openSuccessSnackbar(
                      () => onSizeDelete(size._id, products, dispatch),
                      DELETE_SIZE_CONFIRMATION_MESSAGE
                    )
                  }
                >
                  {DELETE_TITLE}
                </DeleteButton>
              </Grid>
            )}
            <Grid item className={styles.button}>
              <SaveButton
                onClickHandler={handleSubmit}
                data-cy={materialUiConstants.save}
                type={materialUiConstants.types.submit}
                title={config.buttonTitles.SAVE_SIZE_TITLE}
                confirmOn={false}
                values={values}
                errors={errors}
                disabled={!dirty || !isValid}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <Typography
        variant={materialUiConstants.typographyVariantH1}
        className={commonStyles.sizeTitle}
      >
        {isEdit ? sizeEdit : sizeAdd}
      </Typography>
      <div className={styles.sizeForm}>
        <Grid item xs={12}>
          <div className={styles.wrapper}>
            <div className={styles.contentWrapper}>
              <Paper className={styles.sizeItemAdd}>
                {sizeEditFields}
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
                    {availableSizes.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Paper>
            </div>
            <div className={styles.contentWrapper}>
              <Paper className={styles.sizeItemAdd}>
                <FormControl component='fieldset'>
                  <RadioGroup
                    name='additionalPriceType'
                    className={styles.textField}
                    onChange={handleChange}
                    value={values.additionalPriceType}
                  >
                    <FormControlLabel
                      value='ABSOLUTE'
                      label={additionalPriceType.absolutePrice[0].value}
                      key={2}
                      control={<Radio />}
                    />
                    <FormControlLabel
                      value='RELATIVE'
                      label={
                        <>
                          <span>
                            {additionalPriceType.relativePrice[0].value}
                          </span>
                          <Tooltip
                            title={RELATIVE_PRICE_EXPLANATION}
                            placement='right'
                          />
                        </>
                      }
                      key={1}
                      control={<Radio />}
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl
                  variant={materialUiConstants.outlined}
                  className={`${styles.formControl} 
                  ${styles.purposeSelect} ${styles.withTooltip}`}
                >
                  <TextField
                    data-cy='additionalPrice'
                    id='additionalPrice'
                    variant='outlined'
                    className={`
                    ${styles.textFieldWithTooltip}
                    ${styles.materialSelect}
                    `}
                    label={getLabelValue(values, additionalPriceType)}
                    type={materialUiConstants.types.number}
                    value={values.additionalPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.additionalPrice && !!errors.additionalPrice}
                  />
                  <Tooltip title={PRICE_EXPLANATION}>
                    <span>{PRICE_EXPLANATION_DESCRIPTION}</span>
                  </Tooltip>
                  {touched.additionalPrice && errors.additionalPrice && (
                    <div className={styles.inputError}>
                      {errors.additionalPrice}
                    </div>
                  )}
                </FormControl>
                <TextField
                  className={`
                    ${styles.textField} 
                    ${styles.currencyField}
                `}
                  id='outlined-basic'
                  label={convertationTitle}
                  variant='outlined'
                  value={calculateAddittionalPriceValue(values, exchangeRate)}
                  disabled
                />
              </Paper>
              <CheckboxOptions options={checkboxes} />
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};

SizeForm.propTypes = {
  sizeUtils: PropTypes.shape(sizePropTypes.sizeUtils),
  isEdit: sizePropTypes.isEdit,
  size: PropTypes.shape(sizePropTypes.size)
};
SizeForm.defaultProps = sizeDefaultProps;

export default SizeForm;
