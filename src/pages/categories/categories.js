import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import {
  getCategories,
  setCategoryDeleteId,
  toggleCategoryDeleteDialog
} from '../../redux/categories/categories.actions';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { useCommonStyles } from '../common.styles';
import CategoryDeleteDialog from './category-delete-dialog';
import { selectCategoriesLoadingDialogOpen } from '../../redux/selectors/category.selectors';
import StandardButton from '../../components/buttons/standard-button';
import FilterNavbar from '../../components/filter-search-sort/filter-navbar';
import useCategoryFilters from '../../hooks/filters/use-category-filters';
import messages from '../../configs/messages';

const pathToAddCategoryPage = config.routes.pathToAddCategory;

const pathToEditCategoryPage = config.routes.pathToCategories;

const Categories = () => {
  const { IMG_URL } = config;
  const { ADD_CATEGORY } = config.buttonTitles;
  const categoryOptions = useCategoryFilters();

  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

  const {
    categories,
    categoriesLoading,
    filter,
    sort,
    currentPage,
    rowsPerPage
  } = useSelector(selectCategoriesLoadingDialogOpen);

  const handleDeleteCategory = (id) => {
    dispatch(setCategoryDeleteId(id));
    dispatch(toggleCategoryDeleteDialog());
  };

  const handleAddCategory = () => {
    dispatch(push(pathToAddCategoryPage));
  };

  useEffect(() => {
    dispatch(
      getCategories({
        filter,
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        },
        sort
      })
    );
  }, [dispatch, filter, sort, currentPage, rowsPerPage]);

  const categoriesList = categories.length
    ? categories
        .slice()
        .filter((category) => category)
        .map((category) => (
          <TableContainerRow
            key={category._id}
            id={category._id}
            image={
              category?.images?.thumbnail
                ? IMG_URL + category.images.thumbnail
                : ''
            }
            name={category.name.length ? category.name[0].value : ''}
            deleteHandler={() => handleDeleteCategory(category._id)}
            editHandler={() =>
              dispatch(push(`${pathToEditCategoryPage}/${category._id}`))
            }
          />
        ))
    : null;

  if (categoriesLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {config.titles.categoryPageTitles.mainPageTitle}
        </Typography>
        <StandardButton
          title={ADD_CATEGORY}
          onClickHandler={handleAddCategory}
        />
      </div>
      <div>
        <FilterNavbar options={categoryOptions || {}} />
      </div>

      {categoriesList?.length ? (
        <>
          <TableContainerGenerator
            tableTitles={config.tableHeadRowTitles.categories}
            tableItems={categoriesList}
          />
          <CategoryDeleteDialog />
        </>
      ) : (
        <p className={commonStyles.noRecords}>{messages.NO_CATEGORY_MESSAGE}</p>
      )}
    </div>
  );
};

export default Categories;
