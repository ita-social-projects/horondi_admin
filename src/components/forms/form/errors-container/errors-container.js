import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './errors-container.styles';

export const ErrorsContainer = ({
  touched,
  errors,
  name,
  className,
  ...props
}) => {
  const styles = useStyles();

  return (
    <>
      {touched[name] && errors[name] && (
        <div {...props} className={`${styles.error} ${className}`}>
          {errors[name]}
        </div>
      )}
    </>
  );
};

ErrorsContainer.propTypes = {
  name: PropTypes.string.isRequired,
  touched: PropTypes.objectOf(PropTypes.object),
  errors: PropTypes.objectOf(PropTypes.object),
  className: PropTypes.string
};

ErrorsContainer.defaultProps = {
  touched: {},
  errors: {},
  className: ''
};

export default ErrorsContainer;
