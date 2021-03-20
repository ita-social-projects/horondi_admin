import React from 'react';
import { Select, MenuItem, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';

import { useStyles } from '../order-item.styles';
import orders from '../../../configs/orders';
import labels from '../../../configs/labels';
import materialUiConstants from '../../../configs/material-ui-constants';
import { inputName } from '../../../utils/order';

const General = ({ data, handleChange }) => {
  const classes = useStyles();
  const { status, isPaid, paymentMethod } = data;
  const { generalLabels } = labels;
  const {
    deliveryStatusLabel,
    isPaidLabel,
    paymentMethodLabel
  } = generalLabels;
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
        <label htmlFor='status'>{deliveryStatusLabel}</label>
        <Select
          fullWidth
          id='status'
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
        <label htmlFor='paymentMethod'>{paymentMethodLabel}</label>
        <Select
          fullWidth
          id='paymentMethod'
          name='paymentMethod'
          value={paymentMethod}
          onChange={handleChange}
          variant={materialUiConstants.outlined}
          defaultValue={paymentOptions[0].value}
        >
          {paymentOptionsElements}
        </Select>
      </div>
      <div className={classes.isPaid}>
        <label htmlFor='paymentMethod'>{isPaidLabel}</label>
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

General.propTypes = {
  data: PropTypes.shape({
    status: PropTypes.string,
    isPaid: PropTypes.bool,
    courierOffice: PropTypes.string,
    paymentMethod: PropTypes.string,
    paymentStatus: PropTypes.string,
    city: PropTypes.string,
    street: PropTypes.string
  }),
  handleChange: PropTypes.func.isRequired
};

export default General;
