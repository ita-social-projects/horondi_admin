import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from './courier.styles';
import {
  courierInputLabels,
  courierPropTypes
} from '../../../../../utils/order';
import configs from '../../../../../configs/orders';
import { config } from '../../../../../configs';
import {
  isFieldError,
  getError
} from '../../../../../utils/form-error-validation';

const Courier = ({ deliveryType, values, handleChange, inputOptions }) => {
  const { deliveryTypes, deliveryTitles } = configs;
  const { materialUiConstants } = config;
  const styles = useStyles();

  const { handleBlur, touched, errors } = inputOptions;

  return (
    <div>
      <h3 className={styles.courierTitle}>
        {deliveryType === deliveryTypes.novaPostCourier
          ? deliveryTitles.novaPostCourieru
          : deliveryTitles.ukrPostCourier}
      </h3>
      <div>
        <h4 className={styles.courierInputDataTitle}>
          {deliveryTitles.deliveryAddress}
        </h4>
        <div>
          {courierInputLabels().map((field, idx) => (
            <React.Fragment key={idx}>
              <TextField
                id={field.name}
                key={`${field.name}${deliveryType}`}
                name={field.name}
                data-testid={field.name}
                className={styles.textField}
                label={field.label}
                value={values[field.value]}
                onChange={handleChange}
                onBlur={handleBlur}
                variant={materialUiConstants.outlined}
                error={isFieldError(field.name, errors, touched)}
              />
              {isFieldError(field.name, errors, touched) && (
                <div className={styles.error}>
                  {getError(field.name, errors)}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

Courier.propTypes = courierPropTypes;

export default Courier;
