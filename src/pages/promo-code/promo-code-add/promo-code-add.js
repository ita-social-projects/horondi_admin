import React from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { DatePicker } from 'rsuite';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { useStyles } from './promo-code-add.styles';
import {
  checkboxesValues,
  productFormValues
} from '../../../consts/product-form';
import { productsTranslations } from '../../../configs/product-translations';
import { BackButton } from '../../../components/buttons';
import { config } from '../../../configs';
import { addPromoCodes } from '../operations/promo-code.mutation';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import orders from '../../../configs/orders';
import { getFromLocalStorage } from '../../../services/local-storage.service';
import { LOCAL_STORAGE } from '../../../consts/local-storage';
import { promoValidationSchema } from '../../../validations/promo-code/promo-code-validation';
import { useCommonStyles } from '../../common.styles';

const pathToPromoCodesPage = config.routes.pathToPromoCodes;
const initialState = {
  code: '',
  dateTo: '',
  dateFrom: '',
  discount: ''
};
const { SAVE } = productsTranslations;
const PromoCodeAdd = () => {
  const history = useHistory();
  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const { promoCodesTranslation } = orders;
  const onCompletedHandler = () => {
    dispatch(setSnackBarSeverity('success'));
    dispatch(setSnackBarMessage('Успішно додано'));
    dispatch(setSnackBarStatus(true));
  };
  const goToPromoPage = () => {
    history.push(pathToPromoCodesPage);
  };
  const [addPromoCodeHandler] = useMutation(addPromoCodes, {
    onCompleted: onCompletedHandler,
    context: {
      headers: {
        token
      }
    }
  });

  const {
    values,
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
          promoCode: values
        }
      }).then(goToPromoPage)
  });
  const handlerDateHandler = (value, string) => setFieldValue(string, value);

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
              value={values.code}
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
                value={values.dateFrom}
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
                value={values.dateTo}
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
            value={values.discount}
            error={!!(touched.discount ? errors.discount : null)}
            helperText={touched.discount ? errors.discount : null}
            onBlur={handleBlur}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0, max: 90 } }}
          />
        </div>
      </form>
    </div>
  );
};

export default PromoCodeAdd;
