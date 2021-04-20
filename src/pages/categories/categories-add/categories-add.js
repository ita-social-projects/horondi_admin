import React from 'react';
import { useSelector } from 'react-redux';

import { useStyles } from './categories-add.styles';
import CategoryForm from '../../../components/forms/category-form';
import { config } from '../../../configs';
import { selectCategoriesLoadingDialogOpen } from '../../../redux/selectors/category.selectors';
import LoadingBar from '../../../components/loading-bar';

export const CategoriesAdd = () => {
  const styles = useStyles();
  const { categoriesLoading } = useSelector(selectCategoriesLoadingDialogOpen);

  if (categoriesLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={styles.container}>
      <span className={styles.categoryTitle}>
        {config.titles.categoriesTitles.createPageTitle}
      </span>
      <CategoryForm />
    </div>
  );
};
