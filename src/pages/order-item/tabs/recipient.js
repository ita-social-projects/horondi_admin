import React from 'react';
import {useStyles} from '../order-item.styles';
import { TextField } from '@material-ui/core';
import labels from '../../../configs/labels';

const Recipient = ({data,handleChange}) => {
  const {user,userComment} = data
  const {orderRecipient} = labels
  const classes = useStyles()
  return (
    <div className={classes.recipient}>
      {Object.keys(user).map(item=> (
        <TextField
          name={`user.${item}`}
          label={orderRecipient[item]||''}
          key={item}
          variant='outlined'
          onChange={handleChange}
          value={user[item]||''}
        />
      ))}
      <TextField
        name='userComment'
        label={orderRecipient['commentary']}
        onChange={handleChange}
        variant='outlined'
        value={userComment||''}
        multiline
        rows={4}
      />
    </div>
  );
};

export default Recipient;
