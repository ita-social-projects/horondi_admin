import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useStyles } from './certificate.styles';
import CertificateImages from '../../../assets/images/certificates/CertificateImages';

const Certificate = ({ name, value }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <img
        src={CertificateImages[`image${value}`]}
        alt='Certificate'
        className={styles.img}
      />
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
