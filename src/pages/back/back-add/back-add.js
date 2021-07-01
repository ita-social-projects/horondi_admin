import React from 'react';
import { useStyles } from './back-add.styles';
import BackForm from '../../../components/forms/back-form';
import { config } from '../../../configs';

const BackAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span className={styles.backTitle}>
        {config.titles.backTitles.createPageTitle}
      </span>
      <BackForm />
    </div>
  );
};

export default BackAdd;
