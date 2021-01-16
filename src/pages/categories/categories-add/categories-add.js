import React from 'react';
import { useStyles } from './categories-add.styles';
import CategoryForm from '../../../components/forms/category-form';
import { config } from '../../../configs';

export const CategoriesAdd = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <span className={styles.categoryTitle}>
        {config.titles.categoriesTitles.createPageTitle}
      </span>
      <CategoryForm />
    </div>
  );
};
