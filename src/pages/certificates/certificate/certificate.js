import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from './certificate.styles';

const Certificate = ({ name, value }) => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.certificate}>
        <p className={styles.logo}>Horondi</p>
        <p
          className={styles.text}
        >{`Подарунковий сертифікат на ${value} грн`}</p>
      </div>
      <p className={styles.name}>{name}</p>
    </div>
  );
};

Certificate.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Certificate;
