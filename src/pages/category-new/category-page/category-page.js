import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './category-page.styles';
import {
  getCategories,
  deleteCategory,
  setCategoriesCurrentPage
} from '../../../redux/category-new/category.actions';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';

const { CATEGORY_REMOVE_MESSAGE } = config.messages;
const { CREATE_CATEGORY, DELETE_CATEGORY } = config.buttonTitles;

 const pathToCategoryAddPage = config.routes.pathToAddCategory;
const tableTitles = config.tableHeadRowTitles.Categories;

const CategoryPage = () => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    loading,
    pagesCount,
    currentPage,
    categoriesPerPage
  } = useSelector(({ Categories}) => ({
    list: Categories.list,
    loading: Categories.newsLoading,
    pagesCount: Categories.pagination.pagesCount,
    currentPage: Categories.pagination.currentPage,
    categoriesPerPage: Categories.pagination.categoriesPerPage
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getCategories()
    );
  }, [dispatch]);

  const categoryDeleteHandler = (id) => {
    const removeCategory = () => {
      dispatch(closeDialog());
      dispatch(deleteCategory(id));
    };
    openSuccessSnackbar(
      removeCategory,
      DELETE_CATEGORY,
      CATEGORY_REMOVE_MESSAGE,
      DELETE_CATEGORY
    );
  };

  const changeHandler = (e, value) => dispatch(setCategoriesCurrentPage(value));

  const categoryItems =
    list !== undefined
      ? list.map((categoryItem) => (
        <TableContainerRow
          image={
            categoryItem.images.thumbnail
              ? `${config.imagePrefix}${categoryItem.images.thumbnail}`
              : ''
          }
          key={categoryItem._id}
          id={categoryItem.id}
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
      </div>
    </div>
  );
};

export default CategoryPage;
