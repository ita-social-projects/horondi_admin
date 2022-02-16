import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { useStyles } from './certificate.styles';

import certificateImg from '../img/certificate.svg';

const Certificate = ({ name }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <img src={certificateImg} alt='Certificate' />
      <Typography paragraph className={styles.name}>
        {name}
      </Typography>
    </div>
  );
};

Certificate.propTypes = {
  name: PropTypes.string.isRequired
};

export default Certificate;
