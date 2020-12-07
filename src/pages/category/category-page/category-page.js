import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useStyles } from './category-page.styles';
import {
  getCategories,
  setCategoryDeleteId,
  toggleCategoryDeleteDialog
} from '../../../redux/category/category.actions';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import CategoryDeleteDialog from '../category-delete-dialog';

const { CREATE_CATEGORY } = config.buttonTitles;

const pathToCategoryAddPage = config.routes.pathToAddCategory;
const tableTitles = config.tableHeadRowTitles.Categories;

const CategoryPage = () => {
  const styles = useStyles();
  const { categories, loading } = useSelector(({ Categories }) => ({
    categories: Categories.categories,
    loading: Categories.categoryLoading,
    pagesCount: Categories.pagination.pagesCount,
    currentPage: Categories.pagination.currentPage,
    categoriesPerPage: Categories.pagination.categoriesPerPage
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categoryDeleteHandler = (id) => {
    dispatch(setCategoryDeleteId(id));
    dispatch(toggleCategoryDeleteDialog());
  };

  const categoryItems =
    categories !== undefined
      ? categories.map((categoryItem) => (
        <TableContainerRow
          image={
            categoryItem.images.thumbnail
              ? `${config.imagePrefix}${categoryItem.images.thumbnail}`
              : ''
          }
          key={categoryItem._id}
          id={categoryItem._id}
          name={categoryItem.name[0].value}
          deleteHandler={() => categoryDeleteHandler(categoryItem._id)}
          editHandler={() => {
            dispatch(push(`/categories/${categoryItem._id}`));
          }}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={styles.container}>
      <Typography variant='h1' className={styles.categoryTitle}>
        {config.titles.categoriesTitles.mainPageTitle}
      </Typography>
      <div className={styles.tableNav}>
        <Button
          data-cy='add-category'
          component={Link}
          to={pathToCategoryAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_CATEGORY}
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <TableContainerGenerator
          data-cy='categoryTable'
          tableTitles={tableTitles}
          tableItems={categoryItems}
        />
        <CategoryDeleteDialog />
      </div>
    </div>
  );
};

export default CategoryPage;
