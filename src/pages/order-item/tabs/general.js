import React from 'react';
import { Select, MenuItem, Checkbox } from '@material-ui/core';

import { useStyles } from '../order-item.styles';
import orders from '../../../configs/orders';
import labels from '../../../configs/labels';
import materialUiConstants from '../../../configs/material-ui-constants';
import { generalPropTypes, inputName } from '../../../utils/order';

const General = ({ data, handleChange }) => {
  const classes = useStyles();
  const { status, isPaid, paymentMethod } = data;
  const { generalLabels } = labels;
  const { deliveryStatusLabel, isPaidLabel, paymentMethodLabel } =
    generalLabels;
  const { statusOptions, paymentOptions } = orders;

  const statusOptionElements = statusOptions.map(({ label, value }, index) => (
    <MenuItem key={label} value={value} disabled={index === 0}>
      {label}
    </MenuItem>
  ));

  const paymentOptionsElements = paymentOptions.map(
    ({ label, value }, index) => (
      <MenuItem key={label} value={value} disabled={index === 0}>
        {label}
      </MenuItem>
    )
  );

  return (
    <div className={classes.general}>
      <div>
        <label htmlFor={inputName.status}>{deliveryStatusLabel}</label>
        <Select
          fullWidth
          id={inputName.status}
          name={inputName.status}
          value={status}
          onChange={handleChange}
          variant={materialUiConstants.outlined}
          defaultValue={statusOptions[0].value}
        >
          {statusOptionElements}
        </Select>
      </div>
      <div>
        <label htmlFor={inputName.paymentMethod}>{paymentMethodLabel}</label>
        <Select
          fullWidth
          id={inputName.paymentMethod}
          name={inputName.paymentMethod}
          value={paymentMethod}
          onChange={handleChange}
          variant={materialUiConstants.outlined}
          defaultValue={paymentOptions[0].value}
        >
          {paymentOptionsElements}
        </Select>
      </div>
      <div className={classes.isPaid}>
        <label htmlFor={inputName.paymentMethod}>{isPaidLabel}</label>
        <Checkbox
          checked={isPaid}
          name={inputName.isPaidInput}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

General.defaultProps = {
  data: {}
};

General.propTypes = generalPropTypes;

export default General;
