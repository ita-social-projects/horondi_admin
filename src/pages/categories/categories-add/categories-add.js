import React from 'react';
import { useStyles } from './category-add.styles';
import CategoryForm from '../../../components/category-form';
import { config } from '../../../configs';

const CategoryAdd = () => {
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

export default CategoryAdd;