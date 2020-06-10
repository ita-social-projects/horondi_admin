import React from 'react';
import { useStyles } from './news-page-container-styles';
import TestList from '../../components/news-page';

const NewsPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <TestList />
    </div>
  );
};

export default NewsPageContainer;
