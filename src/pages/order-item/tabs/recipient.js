import React from 'react';
import { TextField } from '@material-ui/core';

import { useStyles } from '../order-item.styles';
import labels from '../../../configs/labels';
import { inputName, recipientPropTypes } from '../../../utils/order';
import { config } from '../../../configs';
import { isFieldError, getError } from '../../../utils/form-error-validation';

const Recipient = ({ data, handleChange, inputOptions }) => {
  const { materialUiConstants } = config;
  const { recipient, userComment } = data;
  const { orderRecipient } = labels;
  const { recipientBase } = inputName;
  const classes = useStyles();

  const { handleBlur, touched, errors } = inputOptions;

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
              data-testid={`input-${recipientBase}.${item}`}
              error={isFieldError(`${recipientBase}.${item}`, errors, touched)}
            />
            {isFieldError(`${recipientBase}.${item}`, errors, touched) && (
              <div
                className={classes.inputError}
                data-testid={`${recipientBase}.${item}`}
              >
                {getError(`${recipientBase}.${item}`, errors)}
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
            error={isFieldError(inputName.userComment, errors, touched)}
          />
          {isFieldError(inputName.userComment, errors, touched) && (
            <div
              className={classes.inputError}
              data-testid={inputName.userComment}
            >
              {getError(inputName.userComment, errors)}
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
