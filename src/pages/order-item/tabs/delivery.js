import React from 'react';
import { TextField, Checkbox } from '@material-ui/core';
import moment from 'moment';
import PropTypes from 'prop-types';
import DeliveryDetails from './delivery-details';
import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';

const Delivery = ({ data, handleChange }) => {
  const classes = useStyles();
  const { deliveryLabels } = labels;
  const {
    deliveryMethodLabel,
    byCourierLabel,
    deliveryCostLabel,
    sentAtLabel,
    courierOfficeNameLabel
  } = deliveryLabels;
  const { delivery } = data;
  const { sentOn, sentBy, byCourier, courierOffice, cost } = delivery;

  const address = {
    city: delivery.city,
    street: delivery.street,
    house: delivery.house,
    flat: delivery.flat
  };

  return (
    <div className={classes.delivery}>
      <TextField
        label={deliveryMethodLabel}
        name='delivery.sentBy'
        value={sentBy}
        onChange={handleChange}
        variant='outlined'
      />
      <TextField
        label={courierOfficeNameLabel}
        name='delivery.office'
        value={courierOffice}
        onChange={handleChange}
        variant='outlined'
      />
      <div className={classes.dateContainer}>
        {sentOn ? (
          <p>
            {sentAtLabel}{' '}
            {moment.unix(sentOn / 1000).format(' HH:mm DD/MM/YYYY ')}
          </p>
        ) : null}
      </div>
      {delivery?.cost[0]?.value ? (
        <TextField
          label={deliveryCostLabel}
          name='delivery.cost[0].value'
          value={cost[0].value}
          onChange={handleChange}
          variant='outlined'
        />
      ) : null}
      <div className={classes.idContainer}>
        <label htmlFor='byCourier'>{byCourierLabel}</label>
        <Checkbox
          id='byCourier'
          checked={byCourier}
          name='delivery.byCourier'
          onChange={handleChange}
        />
      </div>
      {byCourier && (
        <DeliveryDetails address={address} handleChange={handleChange} />
      )}
    </div>
  );
};

Delivery.defaultProps = {
  data: {},
  handleChange: () => {}
};

Delivery.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      sentOn: PropTypes.string,
      sentBy: PropTypes.string,
      byCourier: PropTypes.bool,
      courierOffice: PropTypes.string,
      cost: PropTypes.arrayOf(PropTypes.string),
      city: PropTypes.string,
      street: PropTypes.string,
      house: PropTypes.string,
      flat: PropTypes.string
    })
  ),
  handleChange: PropTypes.func
};

export default Delivery;
