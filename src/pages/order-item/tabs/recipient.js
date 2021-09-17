import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';
import { inputName, recipientPropTypes } from '../../../utils/order';
import { config } from '../../../configs';

const Recipient = ({ data, handleChange }) => {
  const { materialUiConstants } = config;
  const { recipient, userComment } = data;
  const { orderRecipient } = labels;
  const classes = useStyles();
  return (
    <div className={classes.recipient}>
      {recipient &&
        Object.keys(recipient).map((item) => (
          <TextField
            name={`recipient.${item}`}
            label={orderRecipient[item] || ''}
            key={item}
            variant={materialUiConstants.outlined}
            onChange={handleChange}
            value={recipient[item] || ''}
          />
        ))}
      {recipient && (
        <TextField
          name={inputName.userComment}
          label={orderRecipient.commentary}
          onChange={handleChange}
          variant={materialUiConstants.outlined}
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
