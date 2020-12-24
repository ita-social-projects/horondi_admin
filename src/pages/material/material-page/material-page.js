import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography, TextField, Checkbox } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Autocomplete from '@material-ui/lab/Autocomplete';
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

const { REMOVE_MATERIAL_MESSAGE } = config.messages;
const { CREATE_MATERIAL_TITLE } = config.buttonTitles;
const { mainLabel } = config.labels.color;
const pathToMaterialAddPage = config.routes.pathToAddMaterial;
const tableTitles = config.tableHeadRowTitles.materials;
const { DEFAULT_CIRCLE } = config.colorCircleSizes;

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const MaterialPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const {
    list,
    filter,
    loading,
    pagesCount,
    currentPage,
    materialsPerPage
  } = useSelector(({ Material }) => ({
    list: Material.list,
    filter: Material.filter,
    loading: Material.materialLoading,
    pagesCount: Material.pagination.pagesCount,
    currentPage: Material.pagination.currentPage,
    materialsPerPage: Material.pagination.materialsPerPage
  }));

  const colors = useSelector(({ Color }) => Color.list);

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
        color={
          <ColorCircle
            colorName={materialItem.color.name[0].value}
            color={materialItem.color.colorHex}
            size={DEFAULT_CIRCLE}
          />
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
      <Autocomplete
        className={styles.root}
        multiple
        id='tags-filled'
        options={colors}
        disableCloseOnSelect
        getOptionLabel={(option) => option.name[0].value}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <div key={option._id} className={styles.colorCircleInTextfield}>
              <ColorCircle
                color={option.colorHex}
                colorName={option.name[0].value}
                {...getTagProps({ index })}
              />
            </div>
          ))
        }
        renderOption={(option, { selected }) => (
          <>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <ColorCircle color={option.colorHex} />
            {option.name[0].value}
          </>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant='outlined'
            label={mainLabel}
            placeholder={mainLabel}
          />
        )}
        onChange={(e, value) => {
          dispatch(setColorFilter(value.map((color) => color._id)));
        }}
      />
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
