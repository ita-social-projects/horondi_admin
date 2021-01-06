import React, { useEffect, useState } from 'react';

import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const SaveButton = ({
  title,
  type,
  onClickHandler,
  color,
  disable,
  errors,
  ...props
}) => {
  const [disabled, setDisabled] = useState(!disable);
  useEffect(() => {
    setDisabled(!disable);
  }, [disable, errors]);

  return (
    <Button
      variant='contained'
      color={color}
      type={type}
      onClick={() => {
        setTimeout(() => {
          if (!errors) {
            setDisabled(true);
          }
        }, 50);
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
  disable: PropTypes.bool,
  errors: PropTypes.bool
};

SaveButton.defaultProps = {
  color: 'primary',
  disable: false,
  errors: false,
  onClickHandler: () => {}
};

export default SaveButton;
