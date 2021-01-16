import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './material-page.styles';
import { config } from '../../../configs';
import {
  getMaterials,
  deleteMaterial,
  setColorFilter,
  setMaterialsCurrentPage
} from '../../../redux/material/material.actions.js';
import { getColors } from '../../../redux/color/color.actions';
import ColorCircle from '../../../components/color-circle';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import { materialTranslations } from '../../../translations/material.translations';
import { useCommonStyles } from '../../common.styles';
import { selectMaterialsAndColors } from '../../../redux/selectors/material.selectors';
import ColorsAutocomplete from '../../../components/colors-autocomplete';

const { REMOVE_MATERIAL_MESSAGE } = config.messages;
const { CREATE_MATERIAL_TITLE } = config.buttonTitles;
const pathToMaterialAddPage = config.routes.pathToAddMaterial;
const tableTitles = config.tableHeadRowTitles.materials;
const { SMALL_CIRCLE } = config.colorCircleSizes;

const MaterialPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    colors,
    filter,
    loading,
    pagesCount,
    currentPage,
    materialsPerPage
  } = useSelector(selectMaterialsAndColors);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getMaterials({
        filter,
        limit: materialsPerPage,
        skip: currentPage * materialsPerPage,
        materialsPerPage
      })
    );
  }, [dispatch, materialsPerPage, currentPage, filter]);

  useEffect(() => {
    if (!list.length && currentPage > 0) {
      dispatch(setMaterialsCurrentPage(currentPage));
    }
  }, [list, dispatch, currentPage]);

  const materialDeleteHandler = (id) => {
    const removeMaterial = () => {
      dispatch(closeDialog());
      dispatch(deleteMaterial(id));
    };
    openSuccessSnackbar(removeMaterial, REMOVE_MATERIAL_MESSAGE, 'danger');
  };

  const changeHandler = (e, value) => dispatch(setMaterialsCurrentPage(value));
  const materialItems = list.length
    ? list.map((materialItem) => (
      <TableContainerRow
        key={materialItem._id}
        showAvatar={false}
        id={materialItem.id}
        name={materialItem.name[0].value}
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
        purpose={materialItem.purpose}
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
    ))
    : null;

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
        {!loading ? (
          <TableContainerGenerator
            tableTitles={tableTitles}
            tableItems={materialItems}
          />
        ) : (
          <LoadingBar />
        )}
      </div>
      <div className={styles.paginationDiv}>
        <Pagination
          count={pagesCount}
          variant='outlined'
          shape='rounded'
          page={currentPage + 1}
          onChange={changeHandler}
        />
      </div>
    </div>
  );
};

export default MaterialPage;
