import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  TextField,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormGroup,
  Paper
} from '@material-ui/core';

import {
  categoryLoadingStatus,
  setCategory,
  categoryUpdateCatalogs,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../actions';
import { useStyles } from './Category-details-style';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';
import { SaveButton } from '../buttons';

const CategoryDetails = (props) => {
  const {
    categoryId,
    setCategory,
    categoryUpdateCatalogs,
    catalogsToUpdate,
    categoryLoadingStatus,
    category,
    loading,
    adminService,
    history,
    setSnackBarStatus,
    setSnackBarSeverity,
    setSnackBarMessage
  } = props;

  const { categoriesService, catalogsService } = adminService;

  const classes = useStyles();

  useEffect(() => {
    categoryLoadingStatus();
    categoriesService.getCategoryById(categoryId).then((resCategory) => {
      setCategory(resCategory);
      catalogsService.getAllCatalogs().then((resCatalog) => {
        const newCatalogs = resCatalog.map((catalog) => {
          const categoryName = resCategory.category;

          const index = catalog.categories.findIndex(
            (element) => element.category === categoryName
          );

          if (index > -1) {
            catalog.checked = true;
            return catalog;
          }
          catalog.checked = false;
          return catalog;
        });
        categoryUpdateCatalogs(newCatalogs);
      });
    });
  }, [
    setCategory,
    categoryLoadingStatus,
    categoryId,
    categoriesService,
    catalogsService,
    categoryUpdateCatalogs
  ]);

  const submitHandler = async (e) => {
    e.preventDefault();
    categoryLoadingStatus();
    const categoryToSend = {
      id: category._id,
      name: e.target.categoryName.value
    };

    const updatedCategory = await categoriesService.putCategory(categoryToSend);
    setCategory(updatedCategory);
    categoryLoadingStatus();
    const editedCategoryName = updatedCategory.category;
    catalogsToUpdate.forEach(async (catalog) => {
      const index = catalog.categories.findIndex(
        (categoryItem) => categoryItem._id === updatedCategory._id
      );

      if (index > -1 && !catalog.checked) {
        catalog.categories.splice(index, 1);
      }
      if (index === -1 && catalog.checked) {
        catalog.categories.push({ _id: updatedCategory._id });
      }
      await catalogsService.putCatalog(catalog._id, catalog);
      setSnackBarSeverity('success');
      setSnackBarMessage(`Category ${editedCategoryName} succesfully edited!`);
      setSnackBarStatus(true);
      history.push(`/categories`);
    });
  };

  const catalogsToUpdateHandler = (catalogCheckbox) => (e) => {
    const catalogToUpdate = {
      ...catalogCheckbox,
      checked: e.target.checked
    };

    const index = catalogsToUpdate.findIndex(
      (element) => element._id === catalogCheckbox._id
    );

    const newCatalogsToUpdate = [...catalogsToUpdate];
    if (index > -1) {
      newCatalogsToUpdate[index] = catalogToUpdate;
    }
    categoryUpdateCatalogs(newCatalogsToUpdate);
  };

  const checkboxes = catalogsToUpdate.map((catalog) => {
    const catalogName = catalog.catalog;

    return (
      <FormControlLabel
        key={catalogName}
        control={
          <Checkbox
            key={catalogName}
            id={catalogName}
            className={classes.checkbox}
            color='primary'
            checked={catalog.checked}
            value={catalogName}
            onChange={catalogsToUpdateHandler(catalog)}
          />
        }
        label={catalogName.toUpperCase()}
      />
    );
  });

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <Paper className={classes.categoryEdit}>
          <TextField
            id='categoryName'
            className={classes.textfield}
            variant='outlined'
            label='Category Name'
            defaultValue={category.category}
          />
          <FormLabel className={classes.formLable} component='legend'>
            Choose catalogs for this category
          </FormLabel>
          <FormGroup row>{checkboxes}</FormGroup>
          <SaveButton type='submit' title='Save' />
        </Paper>
      </form>
    </div>
  );
};

const mapStateToProps = ({
  categoriesState: { category, loading, catalogsToUpdate }
}) => ({
  category,
  loading,
  catalogsToUpdate
});
const mapDispatchToProps = {
  categoryLoadingStatus,
  setCategory,
  categoryUpdateCatalogs,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(CategoryDetails))
);
