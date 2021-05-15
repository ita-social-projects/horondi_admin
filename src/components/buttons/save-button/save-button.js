import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { noop } from 'lodash';

const SaveButton = ({
  title,
  type,
  onClickHandler,
  color,
  errors,
  values,
  ...props
}) => {
  const error = !!Object.keys(errors).length;
  const disable = Object.values(values).every((el) => {
    if (typeof el === 'boolean') {
      return true;
    }
    if (el || el === 0) {
      return true;
    }
    return false;
  });

  const [disabled, setDisabled] = useState(!disable);
  useEffect(() => {
    setDisabled(!disable);
  }, [disable, values, error]);

  return (
    <Button
      variant='contained'
      color={color}
      type={type}
      onClick={() => {
        setTimeout(() => {
          if (!error) {
            setDisabled(true);
          }
        }, 10);
      }}
      disabled={disabled}
      {...props}
    >
      {title}
    </Button>
  );
};

SaveButton.propTypes = {
  onClickHandler: PropTypes.func,
  color: PropTypes.string,
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  values: PropTypes.objectOf(PropTypes.object),
  errors: PropTypes.objectOf(PropTypes.object)
};

SaveButton.defaultProps = {
  color: 'primary',
  errors: {},
  values: {},
  onClickHandler: noop
};

export default SaveButton;
