import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useStyles } from './certificate.styles';
import { config } from '../../../configs';

const Certificate = ({ name, value }) => {
  const styles = useStyles();
  const { TITLE_CERTIFICATE, CERTIFICATE_TEXT_WITH_VALUE } = config.certificate;

  return (
    <div className={styles.wrapper}>
      <div className={styles.certificate}>
        <Typography variant='h5' className={styles.title}>
          {TITLE_CERTIFICATE}
        </Typography>
        <Typography variant='body1' className={styles.value}>
          {CERTIFICATE_TEXT_WITH_VALUE(value)}
        </Typography>
      </div>
      <Typography paragraph className={styles.name}>
        {name}
      </Typography>
    </div>
  );
};

Certificate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired
};

export default Certificate;
