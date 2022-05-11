import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from './courier.styles';
import {
  courierInputLabels,
  courierPropTypes
} from '../../../../../utils/order';
import configs from '../../../../../configs/orders';
import { config } from '../../../../../configs';

const Courier = ({ deliveryType, values, handleChange }) => {
  const { deliveryTypes, deliveryTitles } = configs;
  const { materialUiConstants } = config;
  const styles = useStyles();

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
          {courierInputLabels().map((field) => (
            <TextField
              key={`${field.name}${deliveryType}`}
              name={field.name}
              data-testid={field.name}
              className={styles.textField}
              label={field.label}
              value={values[field.value]}
              onChange={handleChange}
              variant={materialUiConstants.outlined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Courier.propTypes = courierPropTypes;

export default Courier;
