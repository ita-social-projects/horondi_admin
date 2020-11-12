import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './order-status-styles.js';

const Status = ({ status }) => {
  const styles = useStyles();
  let color;
  switch (status) {
  case 'CANCELLED' || 'REFUNDED': {
    color = styles.redStatus;
    break;
  }
  case 'DELIVERED': {
    color = styles.greenStatus;
    break;
  }
  default:
    color = styles.blueStatus;
  }
  return <div className={color}>{status}</div>;
};

Status.propTypes = {
  status: PropTypes.string.isRequired
};

export default Status;
