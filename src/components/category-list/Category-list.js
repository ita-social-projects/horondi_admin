import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import {
  setCategories,
  categoryLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
} from '../../actions';

import useStyle from './Category-list-style';
import LoadingBar from '../loading-bar';
import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

import { config } from '../../config';

const tableTitles = config.tableHeadRowTitles.categories;

const REMOVE_TITLE = 'Remove category';
const REMOVE_MESSAGE = 'Are you sure you want to remove category?';
const SUCCESS_STATUS = 'success';
const PATH_TO_CATEGORY = '/category';

const CategoryList = ({
  adminService,
  categories,
  setCategories,
  categoryLoadingStatus,
  loading,
  history,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
}) => {
  const { categoriesService, catalogsService } = adminService;

  const classes = useStyle();

  const pathToAddCategoryPage = '/categoryadd';

  useEffect(() => {
    categoryLoadingStatus();
    categoriesService.getAllCategories().then((res) => setCategories(res));
  }, [categoriesService, setCategories, categoryLoadingStatus]);

  const openSuccessSnackbar = (eventHandler) => {
    setDialogTitle(REMOVE_TITLE);
    setDialogContent(REMOVE_MESSAGE);
    setButtonTitle(REMOVE_TITLE);
    setEventHandler(eventHandler);
    setDialogStatus(true);
  };

  const deleteHandler = (id) => () => {
    try {
      const removeCategory = async () => {
        const catalogs = await catalogsService.getAllCatalogs();

        catalogs.forEach(async (catalog) => {
          const categories = catalog.categories.filter(
            (category) => category._id !== id
          );
          catalog.categories = categories;
          await catalogsService.putCatalog(catalog._id, catalog);
        });

        const res = await categoriesService.delteCategory(id);
        setDialogStatus(false);
        setSnackBarMessage(res);
        setSnackBarSeverity(SUCCESS_STATUS);
        setSnackBarStatus(true);
        categoryLoadingStatus();
        const newCategories = await categoriesService.getAllCategories();
        setCategories(newCategories);
      };
      openSuccessSnackbar(removeCategory);
    } catch (error) {
      console.error(error);
    }
  };

  const categoryItems = categories.map((category, index) => (
    <TableContainerRow
      key={index}
      id={category._id}
      category={category.category}
      editHandler={() => {
        history.push(`${PATH_TO_CATEGORY}/${category._id}`);
      }}
      deleteHandler={deleteHandler(category._id)}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div>
      <div className={classes.tableNav}>
        <Button
          id='add-new-category'
          component={Link}
          to={pathToAddCategoryPage}
          variant='contained'
          color='primary'
        >
          New Category
        </Button>
      </div>
      <TableContainerGenerator
        id='categoriesTable'
        tableTitles={tableTitles}
        tableItems={categoryItems}
      />
    </div>
  );
};

const mapStateToProps = ({ categoriesState: { categories, loading } }) => ({
  categories,
  loading
});
const mapDispatchToProps = {
  setCategories,
  categoryLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage,
  setDialogStatus,
  setDialogTitle,
  setDialogContent,
  setButtonTitle,
  setEventHandler
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryList))
);
