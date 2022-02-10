import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './certificate.styles';

import certificateImg from '../img/certificate.svg';

const Certificate = ({ name }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <img src={certificateImg} alt='Certificate' />
      <p className={styles.name}>{name}</p>
    </div>
  );
};

Certificate.propTypes = {
  name: PropTypes.string.isRequired
};

export default Certificate;
