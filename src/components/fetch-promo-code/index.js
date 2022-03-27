import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import materialUiConstants from '../../configs/material-ui-constants';
import { useStyles } from './fetch-promo-code.styles';

const FetchPromoCode = ({ getPromoCode, setPromoCodeValue, promoCode }) => {
  const styles = useStyles();

  const promoCodeInput = useRef(null);
  const [error, setError] = useState();

  useEffect(() => {
    promoCode && setError(false);
  }, [promoCode]);

  const checkPromoCode = () => {
    setPromoCodeValue(promoCodeInput.current.value);
    getPromoCode();
    promoCodeInput.current.value = '';
    !promoCode && setError(true);
  };

  return (
    <div className={styles.promoCode}>
      <TextField
        InputProps={{
          className: styles.promoButton
        }}
        placeholder='Введіть промокод'
        variant={materialUiConstants.outlined}
        inputRef={promoCodeInput}
        error={error}
        helperText={error && 'промокод не знайдено'}
      />
      <Button
        variant={materialUiConstants.contained}
        className={styles.promoButton}
        onClick={checkPromoCode}
      >
        Застосувати
      </Button>
    </div>
  );
};

FetchPromoCode.defaultProps = {
  promoCode: null
};

FetchPromoCode.propTypes = {
  getPromoCode: PropTypes.func.isRequired,
  setPromoCodeValue: PropTypes.func.isRequired,
  promoCode: PropTypes.shape({
    discount: PropTypes.string,
    code: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string)
  })
};

export default FetchPromoCode;
