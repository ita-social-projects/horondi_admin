import React from 'react';
import CategoryList from '../../components/category-list/Category-list';
import { useStyles } from './Categories-page-container-syles';

const CategoriesPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <CategoryList />
    </div>
  );
};

export default CategoriesPageContainer;
