import React from 'react';
import {Field, useFormikContext} from 'formik'
import { Select, MenuItem, TextField } from '@material-ui/core';
import { useStyles } from '../order-item.styles'
import moment from 'moment';

const General = ({data,handleChange}) => {
  const classes = useStyles()
  const {_id,status,dateOfCreation,lastUpdatedDate,isPaid,paymentMethod} = data

  const statusOptions = [
    {label:'Статус замовлення',value:''},
    {label:'Замовлення створено',value:'CREATED'},
    {label:'Замовлення підтвердженно',value:'CONFIRMED'},
    {label:'Замовлення виготовлено',value:'PRODUCED'},
    {label:'Замовлення скасовано',value:'CANCELLED'},
    {label:'Повернення коштів',value:'REFUNDED'},
    {label:'Замовлення відправлено',value:'SENT'},
    {label:'Замовлення доставлено',value:'DELIVERED'},
  ]

  const paymentOptions = [
    {label:'Спосіб оплати',value:''},
    {label:'Картка',value:'CARD'},
    {label:'Готівка',value:'CASH'},
  ]

  const statusOptionElements = statusOptions.map(({ label, value }, index) => (
    <MenuItem key={label} value={value} disabled={index === 0}>{label}</MenuItem>
  ));

  const paymentOptionsElements = paymentOptions.map(({label,value}, index)=> (
    <MenuItem key={label} value={value} disabled={index === 0}>{label}</MenuItem>
  ))

  console.log(data);
  return (
    <div className={classes.general}>
      <p>ID: {_id}</p>
      <Select name='status' value={status} onChange={handleChange} variant='outlined'>
        {statusOptionElements}
      </Select>
      <Select name='paymentMethod' value={paymentMethod} onChange={handleChange} variant='outlined'>
        {paymentOptionsElements}
      </Select>
      <TextField
        name='cancellationReason'
        multiline = {true}
        rows={5}
        variant={'outlined'}
        label={'Причина скасування'}
      />
      <p>Дата створення: {moment.unix(dateOfCreation/1000).format(' DD/MM/YYYY z HH:mm')}</p>
      <p>Дата оновлення: {moment.unix(lastUpdatedDate/1000).format(' DD/MM/YYYY z HH:mm')}</p>

      Checkbox

    </div>
  );
};

export default General;
