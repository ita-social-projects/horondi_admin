import React, { useState } from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import { DatePicker } from 'rsuite';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useStyles } from './promo-code-add.styles';
import {
  checkboxesValues,
  productFormValues
} from '../../../consts/product-form';
import { productsTranslations } from '../../../configs/product-translations';
import { BackButton } from '../../../components/buttons';
import { config } from '../../../configs';
import { addPromoCodes } from '../promo-code.mutation';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../../redux/snackbar/snackbar.actions';
import orders from '../../../configs/orders';

const pathToPromoCodesPage = config.routes.pathToPromoCodes;
const initialState = {
  code: '',
  dateTo: '',
  dateFrom: '',
  discount: ''
};
const { SAVE } = productsTranslations;
const PromoCodeAdd = () => {
  const [promoValue, setPromoValue] = useState(initialState);

  const styles = useStyles();
  const dispatch = useDispatch();
  const { promoCodesTranslation } = orders;
  const onCompletedHandler = () => {
    dispatch(setSnackBarSeverity('success'));
    dispatch(setSnackBarMessage('Успішно додано'));
    dispatch(setSnackBarStatus(true));
    setPromoValue(initialState);
  };
  const [addPromoCodeHandler] = useMutation(addPromoCodes, {
    onCompleted: onCompletedHandler,
    variables: {
      promoCode: promoValue
    }
  });

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <div className={styles.fixedButtons}>
          <Grid item className={styles.button}>
            <BackButton pathBack={pathToPromoCodesPage} />
          </Grid>
          <Grid>
            <Link to={pathToPromoCodesPage}>
              <Button
                id='buttonSave'
                size='medium'
                type={productFormValues.submit}
                variant={productFormValues.contained}
                color={checkboxesValues.primary}
                onClick={addPromoCodeHandler}
              >
                {SAVE}
              </Button>
            </Link>
          </Grid>
        </div>
      </div>
      <span className={styles.title}>{promoCodesTranslation.createPromo}</span>
      <div>
        <span
          className={styles.subTitle}
        >{`${promoCodesTranslation.namePromo}:`}</span>
        <div className={styles.promoNameContainer}>
          <TextField
            id='code'
            label={promoCodesTranslation.namePromo}
            variant='outlined'
            value={promoValue.code}
            onChange={(event) =>
              setPromoValue((prevState) => ({
                ...prevState,
                code: event.target.value
              }))
            }
          />
        </div>
      </div>
      <div>
        <span className={styles.subTitle}>
          {promoCodesTranslation.date.validityPeriod}:
        </span>
        <DatePicker
          placeholder={promoCodesTranslation.date.validFrom}
          oneTap
          style={{ width: 200 }}
          value={promoValue.dateFrom}
          onChange={(item) =>
            setPromoValue((prevState) => ({ ...prevState, dateFrom: item }))
          }
        />
        <DatePicker
          placeholder={promoCodesTranslation.date.validTo}
          oneTap
          style={{ width: 200 }}
          id='dateTo'
          value={promoValue.dateTo}
          onChange={(item) =>
            setPromoValue((prevState) => ({ ...prevState, dateTo: item }))
          }
        />
      </div>

      <div>
        <span className={styles.subTitle}>
          {promoCodesTranslation.discount.title}
        </span>
        <TextField
          id='discount'
          label={promoCodesTranslation.discount.label}
          variant='outlined'
          className={styles.amountInput}
          value={promoValue.discount}
          onChange={(event) =>
            setPromoValue((prevState) => ({
              ...prevState,
              discount: Number(event.target.value)
            }))
          }
        />
      </div>
    </div>
  );
};

export default PromoCodeAdd;
