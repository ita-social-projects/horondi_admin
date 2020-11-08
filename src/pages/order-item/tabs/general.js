import React from 'react';
import { Select, MenuItem, TextField, Checkbox } from '@material-ui/core';
import { useStyles } from '../order-item.styles'
import moment from 'moment';
import orders from '../../../configs/orders'
import labels from '../../../configs/labels';

const General = ({data,handleChange}) => {
  const classes = useStyles()
  const {_id,status,dateOfCreation,lastUpdatedDate,isPaid,paymentMethod,adminComment,cancellationReason} = data
  const {generalLabels} = labels
  const {adminCommentLabel,cancellationReasonLabel,creationDateLabel,deliveryStatusLabel,isPaidLabel,paymentMethodLabel,updateDateLabel} = generalLabels
  const {statusOptions,paymentOptions} = orders

  const statusOptionElements = statusOptions.map(({ label, value }, index) => (
    <MenuItem key={label} value={value} disabled={index === 0}>{label}</MenuItem>
  ));

  const paymentOptionsElements = paymentOptions.map(({label,value}, index)=> (
    <MenuItem key={label} value={value} disabled={index === 0}>{label}</MenuItem>
  ))

  return (
    <div className={classes.general}>
      <p className={classes.idContainer}><b>ID: </b>{_id}</p>
      <div>
        <label htmlFor="status">{deliveryStatusLabel}</label>
        <Select fullWidth id='status' name='status' value={status} onChange={handleChange} variant='outlined' defaultValue={statusOptions[0].value}>
          {statusOptionElements}
        </Select>
      </div>
      <div>
        <label htmlFor="paymentMethod">{paymentMethodLabel}</label>
        <Select fullWidth id='paymentMethod' name='paymentMethod' value={paymentMethod} onChange={handleChange} variant='outlined' defaultValue={paymentOptions[0].value}>
          {paymentOptionsElements}
        </Select>
      </div>
      <div className={classes.isPaid}>
        <label htmlFor="paymentMethod">{isPaidLabel}</label>
        <Checkbox checked={isPaid} name='isPaid' onChange={handleChange}/>
      </div>
      <TextField
        name='cancellationReason'
        multiline
        variant={'outlined'}
        label={cancellationReasonLabel}
        value={cancellationReason}
        onChange={handleChange}
      />
      <div className={classes.dateContainer}>
        <p>{creationDateLabel} {moment.unix(dateOfCreation / 1000).format(' DD/MM/YYYY z HH:mm')}</p>
        <p>{updateDateLabel} {moment.unix(lastUpdatedDate / 1000).format(' DD/MM/YYYY z HH:mm')}</p>
      </div>
      <TextField
        label={adminCommentLabel}
        name='adminComment'
        value={adminComment}
        variant={'outlined'}
        multiline
        rows={5}
        onChange={handleChange}
      />
    </div>
  );
};

export default General;
