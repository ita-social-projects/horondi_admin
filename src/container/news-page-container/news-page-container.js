import React from 'react';
import { useStyles } from './news-page-container-styles';
import NewsPage from '../../components/news-page';

const NewsPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <NewsPage />
    </div>
  );
};

export default NewsPageContainer;
