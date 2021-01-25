import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { config } from '../../configs';
import {
  getMaterials,
  deleteMaterial,
  setColorFilter
} from '../../redux/material/material.actions.js';
import { getColors } from '../../redux/color/color.actions';
import ColorCircle from '../../components/color-circle';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { materialTranslations } from '../../translations/material.translations';
import { useCommonStyles } from '../common.styles';
import { useStyles } from './material-page.styles';
import ColorsAutocomplete from '../../components/colors-autocomplete';
import { materialSelectorWithPagination } from '../../redux/selectors/material.selectors';

const map = require('lodash/map');

const { REMOVE_MATERIAL_MESSAGE } = config.messages;
const { CREATE_MATERIAL_TITLE } = config.buttonTitles;
const pathToMaterialAddPage = config.routes.pathToAddMaterial;
const tableTitles = config.tableHeadRowTitles.materials;
const { SMALL_CIRCLE } = config.colorCircleSizes;

const MaterialPage = () => {
  const commonStyles = useCommonStyles();
  const styles = useStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    itemsCount,
    currentPage,
    rowsPerPage,
    colors,
    filter
  } = useSelector(materialSelectorWithPagination);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getMaterials({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const materialDeleteHandler = (id) => {
    const removeMaterial = () => {
      dispatch(closeDialog());
      dispatch(deleteMaterial(id));
    };
    openSuccessSnackbar(removeMaterial, REMOVE_MATERIAL_MESSAGE);
  };

  const materialItems = map(list, (materialItem) => (
    <TableContainerRow
      key={materialItem._id}
      showAvatar={false}
      id={materialItem.id}
      name={materialItem.name[0].value}
      purpose={materialItem.purpose}
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
        materialItem.available
          ? materialTranslations.YES
          : materialTranslations.NO
      }
      deleteHandler={() => materialDeleteHandler(materialItem._id)}
      editHandler={() => {
        dispatch(push(`/materials/${materialItem._id}`));
      }}
    />
  ));

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
          selectedColors={filter.colors}
          handleChange={(value) => {
            dispatch(setColorFilter(value));
          }}
        />
      </div>
      <div>
        <TableContainerGenerator
          pagination
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={materialItems}
        />
      </div>
    </div>
  );
};

export default MaterialPage;
