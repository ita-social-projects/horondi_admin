import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { map, noop } from 'lodash';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import { config } from '../../configs';
import {
  getMaterials,
  deleteMaterial
} from '../../redux/material/material.actions.js';
import { getColors } from '../../redux/color/color.actions';
import ColorCircle from '../../components/color-circle';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { materialMessages } from '../../configs/material-messages';
import { useCommonStyles } from '../common.styles';
import { useStyles } from './material-page.styles';
import ColorsAutocomplete from '../../components/colors-autocomplete';
import { materialSelectorWithPagination } from '../../redux/selectors/material.selectors';
import LoadingBar from '../../components/loading-bar';
import useMaterialFilters from '../../hooks/filters/use-material-filters';
import messages from '../../configs/messages';
import Filters from './filters/filters';
import { deleteManyProducts } from '../../redux/products/products.operations';

const { REMOVE_MATERIAL_MESSAGE } = config.messages;
const { CREATE_MATERIAL_TITLE, DELETE_TITLE } = config.buttonTitles;
const pathToMaterialAddPage = config.routes.pathToAddMaterial;
const tableTitles = config.tableHeadRowTitles.materials;
const { SMALL_CIRCLE } = config.colorCircleSizes;

const MaterialPage = ({ validatorMethods }) => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    loading,
    itemsCount,
    currentPage,
    rowsPerPage,
    colors,
    filters
  } = useSelector(materialSelectorWithPagination);
  const materialFilters = useMaterialFilters();

  const dispatch = useDispatch();
  const { deleteValidation, toggleRerender } = validatorMethods;

  useEffect(() => {
    dispatch(getColors());
    toggleRerender();
  }, []);

  useEffect(() => {
    dispatch(
      getMaterials({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          colors: filters.colors,
          name: filters.name,
          available: filters.available,
          purpose: filters.purpose
        }
      })
    );
  }, [dispatch, rowsPerPage, currentPage, filters]);

  const materialDeleteHandler = (id) => {
    const validationData = deleteValidation(id);
    const removeMaterial = async () => {
      await deleteManyProducts(validationData.map((el) => el.itemId));
      dispatch(closeDialog());
      dispatch(deleteMaterial(id));
      toggleRerender();
    };
    openSuccessSnackbar(
      removeMaterial,
      REMOVE_MATERIAL_MESSAGE,
      DELETE_TITLE,
      true,
      validationData
    );
  };

  const materialItems = map(list, (materialItem) => (
    <TableContainerRow
      key={materialItem._id}
      showAvatar={false}
      id={materialItem.id}
      name={materialItem.name[0].value}
      purpose={materialMessages.purpose[materialItem.purpose]}
      colors={
        <div className={styles.colorsCell}>
          {materialItem.colors.map((color) => (
            <ColorCircle
              key={color._id}
              colorName={color.name[0].value}
              color={color.colorHex}
              size={SMALL_CIRCLE}
            />
          ))}
        </div>
      }
      available={
        materialItem.available ? materialMessages.YES : materialMessages.NO
      }
      deleteHandler={() => materialDeleteHandler(materialItem._id)}
      editHandler={() => {
        dispatch(push(`/materials/${materialItem._id}`));
      }}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {config.titles.materialTitles.mainPageTitle}
        </Typography>
        <Button
          data-cy='add-button'
          component={Link}
          to={pathToMaterialAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_MATERIAL_TITLE}
        </Button>
      </div>
      <div className={styles.filters}>
        <ColorsAutocomplete
          colorsSet={colors}
          selectedColors={filters?.colors}
          handleChange={(value) => {
            materialFilters.setColorsFilter(value);
          }}
        />
        <Filters />
      </div>
      <div>
        {materialItems?.length ? (
          <TableContainerGenerator
            pagination
            count={itemsCount}
            tableTitles={tableTitles}
            tableItems={materialItems}
          />
        ) : (
          <p className={commonStyles.noRecords}>
            {messages.NO_MATERIAL_MESSAGE}
          </p>
        )}
      </div>
    </div>
  );
};

MaterialPage.propTypes = {
  validatorMethods: PropTypes.shape({
    deleteValidation: PropTypes.func,
    toggleRerender: PropTypes.func
  })
};

MaterialPage.defaultProps = {
  validatorMethods: PropTypes.shape({
    deleteValidation: noop,
    toggleRerender: noop
  })
};

export default MaterialPage;
