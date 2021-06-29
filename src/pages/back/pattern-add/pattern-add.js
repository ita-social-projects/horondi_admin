import React from 'react';
import { useStyles } from './pattern-add.styles';
import PatternForm from '../../../components/forms/pattern-form';
import { config } from '../../../configs';

const PatternAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span className={styles.patternTitle}>
        {config.titles.patternTitles.createPageTitle}
      </span>
      <PatternForm />
    </div>
  );
};

export default PatternAdd;
