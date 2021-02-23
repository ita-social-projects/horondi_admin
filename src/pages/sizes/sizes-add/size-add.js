import React from 'react';
import SizeForm from '../../../components/forms/size-form/size-form';
import { useStyles } from './size-add.styles';

const SizeAdd = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <SizeForm />
    </div>
  );
};

export default SizeAdd;
