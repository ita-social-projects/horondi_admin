import React from 'react';
import { useStyles } from './pattern-add.styles';
import PatternForm from '../../../components/forms/pattern-form';

const PatternAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <PatternForm />
    </div>
  );
};

export default PatternAdd;
