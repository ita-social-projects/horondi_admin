import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './certificate-status-styles.js';
import certificates from '../../../configs/certificates';

const {
  certificateStatus: { ACTIVE, USED, EXPIRED }
} = certificates;

const Status = ({ status }) => {
  const styles = useStyles();

  let color;
  switch (status) {
    case EXPIRED: {
      color = styles.red;
      break;
    }
    case ACTIVE: {
      color = styles.green;
      break;
    }
    case USED:
    default:
      color = styles.blue;
  }

  return <div className={color}>{status}</div>;
};

Status.propTypes = {
  status: PropTypes.string.isRequired
};

export default Status;
