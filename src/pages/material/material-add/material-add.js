import React from 'react';
import MaterialForm from '../../../components/forms/material-form';
import { useStyles } from './material-add.styles';

const MaterialAdd = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <MaterialForm edit={false} />
    </div>
  );
};

export default MaterialAdd;
