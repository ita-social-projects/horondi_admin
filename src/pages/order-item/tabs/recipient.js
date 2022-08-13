import React from 'react';
import { TextField } from '@material-ui/core';

import { get } from 'lodash';
import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';
import { inputName, recipientPropTypes } from '../../../utils/order';
import { config } from '../../../configs';

const Recipient = ({ data, handleChange, inputOptions }) => {
  const { materialUiConstants } = config;
  const { recipient, userComment } = data;
  const { orderRecipient } = labels;
  const classes = useStyles();

  const { handleBlur, touched, errors } = inputOptions;

  const recipientTouched = (item) => get(touched, item);
  const recipientError = (item) => get(errors, item);
  return (
    <div className={classes.recipient}>
      {recipient &&
        Object.keys(recipient).map((item, idx) => (
          <React.Fragment key={idx}>
            <TextField
              name={`recipient.${item}`}
              label={orderRecipient[item] || ''}
              key={item}
              variant={materialUiConstants.outlined}
              onChange={handleChange}
              onBlur={handleBlur}
              value={recipient[item] || ''}
              data-testid={`input-recipient.${item}`}
            />
            {recipientTouched(`recipient.${item}`) &&
              recipientError(`recipient.${item}`) && (
                <div
                  className={classes.inputError}
                  data-testid={`recipient.${item}`}
                >
                  {recipientError(`recipient.${item}`)}
                </div>
              )}
          </React.Fragment>
        ))}
      {recipient && (
        <>
          <TextField
            name={inputName.userComment}
            label={orderRecipient.commentary}
            onChange={handleChange}
            onBlur={handleBlur}
            variant={materialUiConstants.outlined}
            value={userComment || ''}
            data-testid={`input-${inputName.userComment}`}
            multiline
            rows={4}
          />
          {touched[inputName.userComment] && errors[inputName.userComment] && (
            <div
              className={classes.inputError}
              data-testid={inputName.userComment}
            >
              {errors[inputName.userComment]}
            </div>
          )}
        </>
      )}
    </div>
  );
};

Recipient.defaultProps = {
  data: {}
};

Recipient.propTypes = recipientPropTypes;

export default Recipient;
