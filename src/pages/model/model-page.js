import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getModels, deleteModel } from '../../redux/model/model.actions';
import { getCategories } from '../../redux/categories/categories.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { modelSelectorWithPagination } from '../../redux/selectors/model.selectors';
import Filters from './filters/filters';

const map = require('lodash/map');

const { routes } = config;
const { MODEL_REMOVE_MESSAGE } = config.messages;
const { CREATE_MODEL_TITLE } = config.buttonTitles;
const pathToModelAddPage = routes.pathToAddModel;
const tableTitles = config.tableHeadRowTitles.models;
const pageTitle = config.titles.modelPageTitles.mainPageTitle;
const { IMG_URL } = config;
const { showEnable, showDisable } = config.labels.model;
const { NO_MODEL_MESSAGE } = config.messages;
const ModelPage = () => {
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { filter, list, sort, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(modelSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getModels({
        filter: {
          category: filter.category,
          available: filter.available,
          availableForConstructor: filter.availableForConstructor,
          search: filter.search
        },
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        },
        sort
      })
    );
    dispatch(
      getCategories({
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        }
      })
    );
  }, [dispatch, filter, sort, rowsPerPage, currentPage]);

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
      <div>
        <Filters />
      </div>
      {modelItems?.length ? (
        <TableContainerGenerator
          data-cy='modelTable'
          pagination
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={modelItems}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_MODEL_MESSAGE}</p>
      )}
    </div>
  );
};

export default ModelPage;
