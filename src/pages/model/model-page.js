import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useStyles } from './model-page.styles';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import {
  getModels,
  deleteModel,
  setModelsCurrentPage
} from '../../redux/model/model.actions';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import {selectModels} from '../../redux/selectors/model.selectors'

const map = require('lodash/map');

const { routes } = config;
const { MODEL_REMOVE_MESSAGE } = config.messages;
const { CREATE_MODEL_TITLE } = config.buttonTitles;
const pathToModelAddPage = routes.pathToAddModel;
const tableTitles = config.tableHeadRowTitles.models;
const pageTitle = config.titles.modelPageTitles.mainPageTitle;
const { IMG_URL } = config;
const {
  showEnable,
  showDisable
} = config.labels.model;

const ModelPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    list,
    loading,
    pagesCount,
    currentPage,
    modelsPerPage
  } = useSelector(selectModels);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getModels({
        limit: modelsPerPage,
        skip: currentPage * modelsPerPage,
        modelsPerPage
      })
    );
  }, [dispatch, modelsPerPage, currentPage]);

  const modelDeleteHandler = (id) => {
    const removeModel = () => {
      dispatch(closeDialog());
      dispatch(deleteModel(id));
    };
    openSuccessSnackbar(removeModel, MODEL_REMOVE_MESSAGE);
  };

  const changeHandler = (e, value) => dispatch(setModelsCurrentPage(value));

  if (loading) {
    return <LoadingBar />;
  }

  const modelItems = map( list, modelItem => (
    <TableContainerRow
      image={
        modelItem.images
          ? `${IMG_URL}${modelItem.images.thumbnail}`
          : ''
      }
      key={modelItem._id}
      id={modelItem._id}
      name={modelItem.name[0].value}
      category={modelItem.category.name[0].value}
      show={
        modelItem.show
          ? showEnable
          : showDisable
      }
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
        tableTitles={tableTitles}
        tableItems={modelItems}
      />
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

export default ModelPage;
