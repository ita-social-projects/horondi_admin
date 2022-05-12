import React from 'react';
import { useFormik } from 'formik';
import { useQuery } from '@apollo/client';
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
import { getCategoriesList } from '../operations/categories-list.queries';
import LoadingBar from '../../../components/loading-bar';
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

  const { promoCodesConsts } = orders;
  let { checkboxes } = promoCodesConsts.categories;

  const {
    data: categoriesList,
    loading,
    error
  } = useQuery(getCategoriesList, {
    fetchPolicy: 'no-cache'
  });

  if (categoriesList) {
    checkboxes = [
      ...checkboxes,
      ...categoriesList.getAllCategories.items.map((item) => ({
        label: item.name[0].value,
        value: item.code
      }))
    ];
  }

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

  const { SAVE } = productsTranslations;

  const allCategoriesHandler = () => {
    categories.length === checkboxes.length
      ? setFieldValue('categories', [])
      : setFieldValue('categories', [...checkboxes.map(({ value }) => value)]);
  };

  const allCategoriesCheckbox = (
    <FormControlLabel
      className={styles.checkboxes}
      label='Всі товари'
      control={
        <Checkbox
          color='primary'
          name='categories'
          checked={categories.length === checkboxes.length}
          indeterminate={
            categories.length < checkboxes.length && categories.length > 0
          }
          onChange={allCategoriesHandler}
        />
      }
    />
  );

  const checkoxGroup = checkboxes.map((item) => (
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

  if (loading || error) {
    return <LoadingBar />;
  }

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

      <span className={styles.title}>{promoCodesConsts.createPromo}</span>
      <form>
        <div>
          <span
            className={styles.subTitle}
          >{`${promoCodesConsts.namePromo}:`}</span>
          <div className={styles.promoNameContainer}>
            <TextField
              id='code'
              label={promoCodesConsts.namePromo}
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
            {promoCodesConsts.date.validityPeriod}
          </span>
          <div className={styles.dataContainer}>
            <div className={styles.dataPickerContainer}>
              <DatePicker
                placeholder={promoCodesConsts.date.validFrom}
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
                placeholder={promoCodesConsts.date.validTo}
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
            {promoCodesConsts.discount.title}
          </span>
          <TextField
            id='discount'
            label={promoCodesConsts.discount.label}
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
              {promoCodesConsts.categories.title}
            </span>
            <FormControl>
              <FormGroup>
                {allCategoriesCheckbox}
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
