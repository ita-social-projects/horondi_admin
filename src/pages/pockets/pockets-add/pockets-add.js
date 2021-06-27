import React from 'react';
import PocketsForm from '../../../components/forms/pockets-form/pockets-form';
import { useStyles } from './pockets-add.styles';

const PocketsAdd = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <PocketsForm />
    </div>
  );
};

export default PocketsAdd;
