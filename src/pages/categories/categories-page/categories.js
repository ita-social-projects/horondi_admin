import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import {
  getCategories,
  setCategoryDeleteId,
  toggleCategoryDeleteDialog
} from '../../../redux/categories/categories.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import { useStyles } from './categories.styles';
import CategoryDeleteDialog from './category-delete-dialog';

const Categories = () => {
  const { IMG_URL } = config;
  const { ADD_CATEGORY } = config.buttonTitles;

  const dispatch = useDispatch();

  const { categories, categoriesLoading } = useSelector(({ Categories }) => ({
    categories: Categories.categories,
    categoriesLoading: Categories.categoriesLoading,
    isDeleteDialogOpen: Categories.isDeleteDialogOpen
  }));

  const handleDeleteCategory = (id) => {
    dispatch(setCategoryDeleteId(id));
    dispatch(toggleCategoryDeleteDialog());
  };

  const handleAddCategory = () => {
    dispatch(push(config.routes.pathToAddCategory));
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
      .map((category) => (
        <TableContainerRow
          key={category._id}
          id={category._id}
          image={
            category.images.thumbnail
              ? IMG_URL + category.images.thumbnail
              : ''
          }
          name={category.name.length ? category.name[0].value : ''}
          deleteHandler={() => handleDeleteCategory(category._id)}
          editHandler={() => dispatch(push(`/add-category/${category._id}`))}
        />
      ))
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
          tableTitles={config.tableHeadRowTitles.categories}
          tableItems={categoriesList}
        />
      </div>
      <CategoryDeleteDialog />
    </div>
  );
};

export default Categories;
