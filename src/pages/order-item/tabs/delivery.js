import React from 'react';
import DeliveryDetails from './delivery-details';
import { TextField, Checkbox } from '@material-ui/core';
import {useStyles} from '../order-item.styles';
import moment from 'moment';

const Delivery = ({data,handleChange}) => {
  const classes = useStyles()
  const {delivery,address} = data
  const {sentOn,sentBy,invoiceNumber,byCourier,courierOffice,cost} = delivery
  return (
    <div className={classes.delivery}>
      <TextField
        label='Спосіб доставки'
        name='delivery.sentBy'
        value={sentBy}
        onChange={handleChange}
        variant='outlined'
      />
      <div className={classes.idContainer}>
        <label htmlFor="byCourier">Доставка кур'єром: </label>
        <Checkbox id='byCourier' checked={byCourier} name='delivery.byCourier' onChange={handleChange}/>
      </div>
      <TextField
        label='Номер накладної'
        name='delivery.invoiceNumber'
        value={invoiceNumber}
        onChange={handleChange}
        variant='outlined'
      />
      <div className={classes.dateContainer}>
        <p>Номер відділення: {courierOffice}</p>
        <p>Відправлено о: {moment.unix(sentOn/1000).format(' HH:mm DD/MM/YYYY ')}</p>
      </div>
      <TextField
        label='Вартість доставки'
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
