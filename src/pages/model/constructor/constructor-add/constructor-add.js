import React from 'react';
import { useStyles } from './constructor-add.styles';
import ConstructorForm from '../../../../components/forms/constructor-form';

const ConstructorAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <ConstructorForm />
    </div>
  );
};

export default ConstructorAdd;
