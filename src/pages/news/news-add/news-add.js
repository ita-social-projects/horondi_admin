import React from 'react';
import NewsForm from '../news-form/news-form';
import { useCommonStyles } from '../../common.styles';

const NewsAdd = () => {
  const common = useCommonStyles();

  return (
    <div className={common.container}>
      <NewsForm />
    </div>
  );
};

export default NewsAdd;
