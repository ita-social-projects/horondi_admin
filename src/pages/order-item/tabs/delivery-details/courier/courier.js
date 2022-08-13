import React from 'react';
import { TextField } from '@material-ui/core';
import { get } from 'lodash';

import { useStyles } from './courier.styles';
import {
  courierInputLabels,
  courierPropTypes
} from '../../../../../utils/order';
import configs from '../../../../../configs/orders';
import { config } from '../../../../../configs';

const Courier = ({ deliveryType, values, handleChange, inputOptions }) => {
  const { deliveryTypes, deliveryTitles } = configs;
  const { materialUiConstants } = config;
  const styles = useStyles();

  const { handleBlur, touched, errors } = inputOptions;
  const getError = (field) => get(errors, field);
  const getTouched = (field) => get(touched, field);

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
              />
              {getTouched(field.name) && getError(field.name) && (
                <div className={styles.error}>{getError(field.name)}</div>
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
