import React from 'react';
import { useStyles } from './news-add.styles';
import NewsForm from '../news-form/news-form';

const NewsAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <NewsForm />
    </div>
  );
};

export default NewsAdd;
