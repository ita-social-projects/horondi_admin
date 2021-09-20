import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Paper,
  FormControl,
  RadioGroup,
  FormControlLabel,
  TextField,
  Radio,
  Box,
  Typography
} from '@material-ui/core';
import { useStyles } from './additional-price-container.styles';
import { getCurrencies } from '../../redux/currencies/currencies.actions';
import {
  calculateAddittionalPriceValue,
  getLabelValue
} from '../../utils/additionalPrice-helper';

const AdditionalPrice = ({
  values,
  labels,
  onChange,
  onBlur,
  errors,
  touched,
  radio
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const exchangeRate = useSelector(({ Currencies }) => Currencies.exchangeRate);
  useEffect(() => {
    dispatch(getCurrencies());
  }, [dispatch]);
  return (
    <Paper className={styles.additionalPricePaper}>
      <Box>
        <Typography>{labels.enterPrice}</Typography>
      </Box>
      {radio && (
        <FormControl component='fieldset'>
          <RadioGroup
            name='additionalPriceType'
            className={styles.textField}
            onChange={onChange}
            value={values.additionalPriceType}
          >
            <FormControlLabel
              value='ABSOLUTE_INDICATOR'
              label={labels.additionalPriceType.absolutePrice[0].value}
              control={<Radio />}
              key={2}
            />
            <FormControlLabel
              value='RELATIVE_INDICATOR'
              label={labels.additionalPriceType.relativePrice[0].value}
              control={<Radio />}
              key={1}
            />
          </RadioGroup>
        </FormControl>
      )}
      <TextField
        data-cy='additionalPrice'
        className={`
                  ${styles.textField}
                  ${styles.additionalPrice} 
                  `}
        id='additionalPrice'
        variant='outlined'
        label={getLabelValue(values, labels.additionalPriceType)}
        value={values.additionalPrice}
        onChange={onChange}
        onBlur={onBlur}
        error={touched.additionalPrice && errors.additionalPrice}
      />
      {touched.additionalPrice && errors.additionalPrice && (
        <div data-cy='additionalPrice-error' className={styles.error}>
          {errors.additionalPrice}
        </div>
      )}
      <TextField
        id='outlined-basic'
        variant='outlined'
        label={labels.convertationTitle}
        className={`
                  ${styles.textField} 
                  ${styles.currencyField}
                  `}
        value={calculateAddittionalPriceValue(values, exchangeRate)}
        disabled
      />
    </Paper>
  );
};

AdditionalPrice.propTypes = {
  values: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.object
    ])
  ).isRequired,
  labels: PropTypes.objectOf(PropTypes.string).isRequired,
  radio: PropTypes.bool,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  touched: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired
};

AdditionalPrice.defaultProps = {
  radio: false
};

export default AdditionalPrice;
