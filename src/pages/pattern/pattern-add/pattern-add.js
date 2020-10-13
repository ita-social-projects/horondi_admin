import React from 'react';
import { useStyles } from './pattern-add.styles';
import PatternForm from '../../../components/pattern-form';
import { titles } from '../../../configs';

const PatternAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span className={styles.patternTitle}>
        {titles.patternTitles.createPageTitle}
      </span>
      <PatternForm />
    </div>
  );
};

export default PatternAdd;
