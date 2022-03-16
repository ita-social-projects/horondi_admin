import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useStyles } from './certificate-status-styles.js';
import { config } from '../../../configs';

const { ACTIVE_STATUS, USED_STATUS, EXPIRED_STATUS, PENDING_STATUS } =
  config.statuses;

const Status = ({ status }) => {
  const styles = useStyles();

  const statuses = {
    [EXPIRED_STATUS]: styles.expiredStatus,
    [ACTIVE_STATUS]: styles.activeStatus,
    [PENDING_STATUS]: styles.pendingStatus,
    [USED_STATUS]: styles.usedStatus
  };

  const color = `${styles.status} ${statuses[status]}`;

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
