import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormDialog from '../../../../containers/form-dialog';
import CategoryDelete from '../category-delete';
import {
  setCategoryDeleteId,
  setCategorySwitchId,
  toggleCategoryDeleteDialog
} from '../../../../redux/categories/categories.actions';
import { config } from '../../../../configs';

const { categoriesTitles } = config.titles;

const CategoryDeleteDialog = () => {
  const isOpen = useSelector(({ Categories }) => Categories.isDeleteDialogOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleCategoryDeleteDialog());
    dispatch(setCategorySwitchId(null));
    dispatch(setCategoryDeleteId(null));
  };

  return (
    <FormDialog
      data-cy='category-delete-dialog'
      title={categoriesTitles.deleteTitle}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <CategoryDelete />
    </FormDialog>
  );
};

export default CategoryDeleteDialog;
