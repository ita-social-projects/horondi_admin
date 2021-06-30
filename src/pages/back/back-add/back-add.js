import React from 'react';
import { useStyles } from './back-add.styles';
import PatternForm from '../../../components/forms/pattern-form';
import { config } from '../../../configs';

const BackAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span className={styles.backTitle}>
        {config.titles.patternTitles.createPageTitle}
      </span>
      <PatternForm />
    </div>
  );
};

export default BackAdd;
