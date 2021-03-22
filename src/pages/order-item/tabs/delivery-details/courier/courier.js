import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from './courier.styles';
import {
  courierInputLabels,
  courierPropTypes
} from '../../../../../utils/order';
import config from '../../../../../configs/orders';

const Courier = ({ deliveryType, values, handleChange }) => {
  const { deliveryTypes, deliveryTitles } = config;
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
              className={styles.textField}
              label={field.label}
              value={values[field.value]}
              onChange={handleChange}
              variant='outlined'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Courier.propTypes = courierPropTypes;

export default Courier;
