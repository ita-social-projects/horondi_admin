import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useStyles } from './certificate-status-styles.js';
import { config } from '../../../configs';

const { ACTIVE_STATUS, USED_STATUS, EXPIRED_STATUS, PENDING_STATUS } =
  config.statuses;

const Status = ({ status }) => {
  const styles = useStyles();

  let color;
  switch (status) {
    case EXPIRED_STATUS: {
      color = `${styles.status} ${styles.redStatus}`;
      break;
    }
    case ACTIVE_STATUS: {
      color = `${styles.status} ${styles.greenStatus}`;
      break;
    }
    case PENDING_STATUS: {
      color = `${styles.status} ${styles.pendingStatus}`;
      break;
    }
    case USED_STATUS:
    default:
      color = `${styles.status} ${styles.blueStatus}`;
  }

  return (
    <Typography paragraph className={color}>
      {status}
    </Typography>
  );
};

Status.propTypes = {
  status: PropTypes.string.isRequired
};

export default Status;
