import React from 'react';
import { Select, MenuItem, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from '../order-item.styles';
import orders from '../../../configs/orders';
import labels from '../../../configs/labels';

const General = ({ data, handleChange }) => {
  const classes = useStyles();
  const { status, isPaid, paymentMethod, paymentStatus } = data;
  const { generalLabels } = labels;
  const {
    deliveryStatusLabel,
    isPaidLabel,
    paymentMethodLabel,
    paymentStatusLabel
  } = generalLabels;
  const { statusOptions, paymentOptions, paymentSatatusOptions } = orders;

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

  const paymentStatusOptionsElements = paymentSatatusOptions.map(
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
          name='status'
          value={status}
          onChange={handleChange}
          variant='outlined'
          defaultValue={statusOptions[0].value}
        >
          {statusOptionElements}
        </Select>
      </div>
      <div>
        <label htmlFor='paymentStatus'>{paymentStatusLabel}</label>
        <Select
          fullWidth
          id='paymentStatus'
          name='paymentStatus'
          value={paymentStatus}
          onChange={handleChange}
          variant='outlined'
          defaultValue={paymentStatus}
        >
          {paymentStatusOptionsElements}
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
          variant='outlined'
          defaultValue={paymentOptions[0].value}
        >
          {paymentOptionsElements}
        </Select>
      </div>
      <div className={classes.isPaid}>
        <label htmlFor='paymentMethod'>{isPaidLabel}</label>
        <Checkbox checked={isPaid} name='isPaid' onChange={handleChange} />
      </div>
    </div>
  );
};

General.defaultProps = {
  data: {},
  handleChange: () => {}
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
  handleChange: PropTypes.func
};

export default General;
