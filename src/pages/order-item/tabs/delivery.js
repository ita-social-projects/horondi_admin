import React from 'react';
import DeliveryDetails from './delivery-details';
import { TextField, Checkbox } from '@material-ui/core';
import {useStyles} from '../order-item.styles';
import moment from 'moment';
import labels from '../../../configs/labels';

const Delivery = ({data,handleChange}) => {
  const classes = useStyles()
  const {deliveryLabels} = labels
  const {deliveryMethodLabel,byCourierLabel,deliveryCostLabel,invoiceNumberLabel,sentAtLabel,warehouseNumberLabel} = deliveryLabels
  const {delivery,address} = data
  const {sentOn,sentBy,invoiceNumber,byCourier,courierOffice,cost} = delivery
  return (
    <div className={classes.delivery}>
      <TextField
        label={deliveryMethodLabel}
        name='delivery.sentBy'
        value={sentBy}
        onChange={handleChange}
        variant='outlined'
      />
      <div className={classes.idContainer}>
        <label htmlFor="byCourier">{byCourierLabel}</label>
        <Checkbox id='byCourier' checked={byCourier} name='delivery.byCourier' onChange={handleChange}/>
      </div>
      <TextField
        label={invoiceNumberLabel}
        name='delivery.invoiceNumber'
        value={invoiceNumber}
        onChange={handleChange}
        variant='outlined'
      />
      <div className={classes.dateContainer}>
        <p>{warehouseNumberLabel} {courierOffice}</p>
        <p>{sentAtLabel} {moment.unix(sentOn/1000).format(' HH:mm DD/MM/YYYY ')}</p>
      </div>
      <TextField
        label={deliveryCostLabel}
        name='delivery.cost[0].value'
        value={cost[0].value}
        onChange={handleChange}
        variant='outlined'
      />
      {byCourier && <DeliveryDetails address={address} handleChange={handleChange}/>}
    </div>
  );
};

export default Delivery;
