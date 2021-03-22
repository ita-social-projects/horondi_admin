import React from 'react';
import { TextField } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from './courier.styles';
import { courierInputLabels } from '../../../../../utils/order';
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

Courier.propTypes = {
  deliveryType: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Courier;
