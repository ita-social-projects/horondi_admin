import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import {
  getCategories,
  deleteCategory
} from '../../../redux/categories/categories.actions';
import LoadingBar from '../../../components/loading-bar';
import { config, routes } from '../../../configs';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import { useStyles } from './categories.styles';

const Categories = () => {
  const { tableHeadRowTitles, buttonTitles } = config;
  const { ADD_CATEGORY } = buttonTitles;

  const dispatch = useDispatch();

  const { categories, categoriesLoading, categoriesError } = useSelector(
    ({ Categories }) => ({
      categories: Categories.categories,
      categoriesLoading: Categories.categoriesLoading,
      categoriesError: Categories.categoriesError,
      pagesCount: Categories.pagesCount,
      currentPage: Categories.currentPage,
      productsPerPage: Categories.productsPerPage
    })
  );

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

  if (categoriesError) {
    dispatch(push('/error-page'));
  }

  const categoriesList = categories.length
    ? categories
      .sort((a, b) => {
        if (a.name[0].value.toLowerCase() > b.name[0].value.toLowerCase()) {
          return 1;
        } if (
          a.name[0].value.toLowerCase() < b.name[0].value.toLowerCase()
        ) {
          return -1;
        }
        return 0;
      })
      .filter((category) => category.isMain)
      .map((category, index) => (
        <TableContainerRow
          key={index}
          id={category._id}
          num={index + 1}
          name={category.name.length ? category.name[0].value : ''}
          deleteHandler={() =>
            dispatch(deleteCategory({ id: category._id }))
          }
          editHandler={() =>
            dispatch(push(`/add-category/${category._id}`))
          }
          showAvatar={false}
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
          tableTitles={tableHeadRowTitles.categories}
          tableItems={categoriesList}
        />
      </div>
    </div>
  );
};

export default Categories;
