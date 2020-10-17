import React from 'react';
import { useStyles } from './model-add.styles';
import ModelForm from '../../../components/model-form';

const ModelAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <ModelForm />
    </div>
  );
};

export default ModelAdd;
