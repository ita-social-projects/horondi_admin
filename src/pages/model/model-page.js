import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getModels, deleteModel } from '../../redux/model/model.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { selectModelAndTable } from '../../redux/selectors/model.selectors';
// import { getSizes } from '../../redux/sizes/sizes.actions';

const map = require('lodash/map');

const { routes } = config;
const { MODEL_REMOVE_MESSAGE } = config.messages;
const { CREATE_MODEL_TITLE } = config.buttonTitles;
const pathToModelAddPage = routes.pathToAddModel;
const tableTitles = config.tableHeadRowTitles.models;
const pageTitle = config.titles.modelPageTitles.mainPageTitle;
const { IMG_URL } = config;
const { showEnable, showDisable } = config.labels.model;

const ModelPage = () => {
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, currentPage, rowsPerPage, itemsCount } = useSelector(
    selectModelAndTable
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getModels({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const modelDeleteHandler = (id) => {
    const removeModel = () => {
      dispatch(closeDialog());
      dispatch(deleteModel(id));
    };
    openSuccessSnackbar(removeModel, MODEL_REMOVE_MESSAGE);
  };

  if (loading) {
    return <LoadingBar />;
  }

  const modelItems = map(list, (modelItem) => (
    <TableContainerRow
      image={modelItem.images ? `${IMG_URL}${modelItem.images.thumbnail}` : ''}
      key={modelItem._id}
      id={modelItem._id}
      name={modelItem.name[0].value}
      category={modelItem.category?.name[0].value}
      show={modelItem.show ? showEnable : showDisable}
      priority={modelItem.priority}
      deleteHandler={() => modelDeleteHandler(modelItem._id)}
      editHandler={() => {
        dispatch(push(`/models/${modelItem._id}`));
      }}
    />
  ));

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {pageTitle}
        </Typography>
        <Button
          data-cy='add-model'
          component={Link}
          to={pathToModelAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_MODEL_TITLE}
        </Button>
      </div>
      <TableContainerGenerator
        data-cy='modelTable'
        pagination
        count={itemsCount}
        tableTitles={tableTitles}
        tableItems={modelItems}
      />
    </div>
  );
};

export default ModelPage;
