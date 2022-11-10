import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useStyles } from './certificate.styles';

const Certificate = ({ name, value }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.certificate}>
        <Typography variant='body1' className={styles.value}>
          {value}
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
