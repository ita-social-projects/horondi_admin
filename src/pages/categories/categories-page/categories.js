import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import { gql, useQuery } from '@apollo/client';
import {
  setCategoryDeleteId,
  toggleCategoryDeleteDialog
} from '../../../redux/categories/categories.actions';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import { useCommonStyles } from '../../common.styles';
import CategoryDeleteDialog from './category-delete-dialog';
import { selectCategoriesLoadingDialogOpen } from '../../../redux/selectors/categories.selectors';
import StandardButton from '../../../components/buttons/standard-button';

const GET_CATEGORIES = gql`
  query {
    getAllCategories {
      _id
      name {
        lang
        value
      }
      code
      images {
        thumbnail
      }
    }
  }
`;

const Categories = () => {
  const { IMG_URL } = config;
  const { ADD_CATEGORY } = config.buttonTitles;

  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();

  const handleDeleteCategory = (id) => {
    dispatch(setCategoryDeleteId(id));
    dispatch(toggleCategoryDeleteDialog());
  };

  const handleAddCategory = () => {
    dispatch(push(config.routes.pathToAddCategory));
  };

  const { data, loading } = useQuery(GET_CATEGORIES);

  if (loading) {
    return <LoadingBar />;
  }
  const categories = data.getAllCategories;
  const categoriesList = categories.length
    ? categories
      .slice()
      .sort((a, b) => {
        if (a.name[0].value.toLowerCase() > b.name[0].value.toLowerCase()) {
          return 1;
        }
        if (a.name[0].value.toLowerCase() < b.name[0].value.toLowerCase()) {
          return -1;
        }
        return 0;
      })
      .filter((category) => category)
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
      <TableContainerGenerator
        tableTitles={config.tableHeadRowTitles.categories}
        tableItems={categoriesList}
      />
      <CategoryDeleteDialog />
    </div>
  );
};

export default Categories;
