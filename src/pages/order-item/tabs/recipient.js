import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';
import { inputName, recipientPropTypes } from '../../../utils/order';

const Recipient = ({ data, handleChange }) => {
  const { user, userComment } = data;
  const { orderRecipient } = labels;
  const classes = useStyles();
  return (
    <div className={classes.recipient}>
      {user &&
        Object.keys(user).map((item) => (
          <TextField
            name={`user.${item}`}
            label={orderRecipient[item] || ''}
            key={item}
            variant='outlined'
            onChange={handleChange}
            value={user[item] || ''}
          />
        ))}
      {user && (
        <TextField
          name={inputName.userComment}
          label={orderRecipient.commentary}
          onChange={handleChange}
          variant='outlined'
          value={userComment || ''}
          multiline
          rows={4}
        />
      )}
    </div>
  );
};

Recipient.defaultProps = {
  data: {}
};

Recipient.propTypes = recipientPropTypes;

export default Recipient;
