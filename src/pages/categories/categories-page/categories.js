import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import {
  getCategories,
  deleteCategory
} from '../../../redux/categories/categories.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import { useStyles } from './categories.styles';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';

const Categories = () => {
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { tableHeadRowTitles, buttonTitles, app, IMG_URL } = config;
  const { routes } = app;
  const { ADD_CATEGORY } = buttonTitles;
  const { DELETE_CATEGORY_MESSAGE } = config.messages;
  const { DELETE_CATEGORY } = config.buttonTitles;

  const dispatch = useDispatch();

  const { categories, categoriesLoading } = useSelector(({ Categories }) => ({
    categories: Categories.categories,
    categoriesLoading: Categories.categoriesLoading
  }));

  const handleDeleteCategory = (id) => {
    const removeCategory = () => {
      dispatch(closeDialog());
      dispatch(deleteCategory({ id }));
    };
    openSuccessSnackbar(
      removeCategory,
      DELETE_CATEGORY,
      DELETE_CATEGORY_MESSAGE,
      DELETE_CATEGORY
    );
  };

  const handleAddCategory = () => {
    dispatch(push(routes.pathToAddCategory));
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const classes = useStyles();

  if (categoriesLoading) {
    return <LoadingBar />;
  }

  const categoriesList = categories.length
    ? categories
      .sort((a, b) => {
        if (a.name[0].value.toLowerCase() > b.name[0].value.toLowerCase()) {
          return 1;
        }
        if (a.name[0].value.toLowerCase() < b.name[0].value.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      .filter((category) => category.isMain)
      .map((category, index) => {
        return (
          <TableContainerRow
            key={index}
            id={category._id}
            image={category.images.thumbnail ? IMG_URL+category.images.thumbnail : ''}
            name={category.name.length ? category.name[0].value : ''}
            deleteHandler={() => handleDeleteCategory(category._id)}
            editHandler={() => dispatch(push(`/add-category/${category._id}`))}
          />
        )
      })
    : null;

  return (
    <div className={classes.outerContainer}>
      <div className={classes.tableNav}>
        <Button onClick={handleAddCategory} variant='contained' color='primary'>
          {ADD_CATEGORY}
        </Button>
      </div>
      <div className='classes.tableContainer'>
        <TableContainerGenerator
          tableTitles={tableHeadRowTitles.categories}
          tableItems={categoriesList}
        />
      </div>
    </div>
  );
};

export default Categories;
