import React from 'react';
import { useFormik } from 'formik';
import { DatePicker } from 'rsuite';
import {
  Button,
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl
} from '@material-ui/core';
import PropTypes from 'prop-types';

import { productsTranslations } from '../../../configs/product-translations';
import orders from '../../../configs/orders';
import {
  checkboxesValues,
  productFormValues
} from '../../../consts/product-form';

import { useStyles } from './promo-code-form.style';
import { useCommonStyles } from '../../common.styles';
import { BackButton } from '../../../components/buttons';

function PromoCodeForm({
  pathToPromoCodesPage,
  promoValidationSchema,
  addPromoCodeHandler,
  goToPromoPage,
  initialState = {
    code: '',
    dateTo: '',
    dateFrom: '',
    discount: '',
    categories: []
  }
}) {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const {
    values: { code, dateTo, dateFrom, discount, categories, _id },
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    setFieldValue
  } = useFormik({
    validationSchema: promoValidationSchema,
    initialValues: initialState,
    onSubmit: () =>
      addPromoCodeHandler({
        variables: {
          id: _id,
          promoCode: {
            code,
            dateTo,
            dateFrom,
            discount,
            categories
          }
        }
      }).then(goToPromoPage)
  });

  const handlerDateHandler = (value, string) => setFieldValue(string, value);

  const { promoCodesTranslation } = orders;
  const chechboxLabels = promoCodesTranslation.categories.allCheckboxLables;
  const { SAVE } = productsTranslations;

  const allCategoriesHandler = () => {
    categories.length === chechboxLabels.length
      ? setFieldValue('categories', [])
      : setFieldValue('categories', [
          ...chechboxLabels.map(({ value }) => value)
        ]);
  };

  const parentChecbox = (
    <FormControlLabel
      className={styles.checkboxes}
      label='Всі товари'
      control={
        <Checkbox
          color='primary'
          name='categories'
          checked={categories.length === chechboxLabels.length}
          indeterminate={
            categories.length < chechboxLabels.length && categories.length > 0
          }
          onChange={allCategoriesHandler}
        />
      }
    />
  );

  const checkoxGroup = chechboxLabels.map((item) => (
    <FormControlLabel
      key={item.label}
      control={
        <Checkbox
          onChange={handleChange}
          checked={categories.includes(item.value)}
          name='categories'
          color='primary'
          value={item.value}
        />
      }
      label={item.label}
    />
  ));

  return (
    <div className={commonStyles.container}>
      <div className={styles.fixedButtons}>
        <Grid item>
          <BackButton pathBack={pathToPromoCodesPage} />
        </Grid>
        <Grid>
          <Button
            id='buttonSave'
            size='medium'
            type={productFormValues.submit}
            variant={productFormValues.contained}
            color={checkboxesValues.primary}
            onClick={handleSubmit}
          >
            {SAVE}
          </Button>
        </Grid>
      </div>

      <span className={styles.title}>{promoCodesTranslation.createPromo}</span>
      <form>
        <div>
          <span
            className={styles.subTitle}
          >{`${promoCodesTranslation.namePromo}:`}</span>
          <div className={styles.promoNameContainer}>
            <TextField
              id='code'
              label={promoCodesTranslation.namePromo}
              variant='outlined'
              value={code}
              className={styles.textField}
              error={!!(touched.code ? errors.code : null)}
              helperText={touched.code ? errors.code : ''}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <span className={styles.subTitle}>
            {promoCodesTranslation.date.validityPeriod}
          </span>
          <div className={styles.dataContainer}>
            <div className={styles.dataPickerContainer}>
              <DatePicker
                placeholder={promoCodesTranslation.date.validFrom}
                oneTap
                style={{ width: 200 }}
                value={dateFrom}
                onChange={(value) => handlerDateHandler(value, 'dateFrom')}
              />
              {touched.dateFrom && errors.dateFrom && (
                <div className={styles.errorDate}>{errors.dateFrom}</div>
              )}
            </div>

            <div className={styles.dataPickerContainer}>
              <DatePicker
                placeholder={promoCodesTranslation.date.validTo}
                oneTap
                style={{ width: 200 }}
                id='dateTo'
                value={dateTo}
                onChange={(value) => handlerDateHandler(value, 'dateTo')}
              />
              {touched.dateTo && errors.dateTo && (
                <div className={styles.errorDate}>{errors.dateTo}</div>
              )}
            </div>
          </div>
        </div>

        <div>
          <span className={styles.subTitle}>
            {promoCodesTranslation.discount.title}
          </span>
          <TextField
            id='discount'
            label={promoCodesTranslation.discount.label}
            variant='outlined'
            type='number'
            className={styles.textField}
            value={discount}
            error={!!(touched.discount ? errors?.discount : null)}
            helperText={touched.discount ? errors?.discount : null}
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0, max: 90 } }}
          />
          <div>
            <span className={styles.subTitle}>
              {promoCodesTranslation.categories.title}
            </span>
            <FormControl>
              <FormGroup>
                {parentChecbox}
                {checkoxGroup}
              </FormGroup>
              {touched.categories && errors.categories && (
                <div className={styles.errorCategory}>{errors.categories}</div>
              )}
            </FormControl>
          </div>
        </div>
      </form>
    </div>
  );
}

PromoCodeForm.propTypes = {
  pathToPromoCodesPage: PropTypes.string.isRequired,
  initialState: PropTypes.objectOf(PropTypes.string).isRequired,
  promoValidationSchema: PropTypes.objectOf(PropTypes.string).isRequired,
  addPromoCodeHandler: PropTypes.func.isRequired,
  goToPromoPage: PropTypes.func.isRequired
};

export default PromoCodeForm;
