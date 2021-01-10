import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { config } from '../../../configs';
import {
  getMaterials,
  deleteMaterial
} from '../../../redux/material/material.actions.js';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import { materialTranslations } from '../../../translations/material.translations';
import { useCommonStyles } from '../../common.styles';
import { selectMaterialAndTable } from '../../../redux/selectors/material.selectors';

const { REMOVE_MATERIAL_MESSAGE } = config.messages;
const { CREATE_MATERIAL_TITLE } = config.buttonTitles;

const pathToMaterialAddPage = config.routes.pathToAddMaterial;
const tableTitles = config.tableHeadRowTitles.materials;

const MaterialPage = () => {
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, itemsCount, currentPage, rowsPerPage } = useSelector(
    selectMaterialAndTable
  );

  const dispatch = useDispatch();

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

  const materialItems = list.length
    ? list.map((materialItem) => (
      <TableContainerRow
        key={materialItem._id}
        showAvatar={false}
        id={materialItem.id}
        name={materialItem.name[0].value}
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
