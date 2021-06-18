import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
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
import { useStyles } from '../../components/forms/model-form/model-form.styles';
import DropDownModelList from './drop-down-component';

const { labelsEn } = config.labels.model;
const { materialUiConstants } = config;
const { MODEL_CONSTRUCTOR, CREATE_CONSTRUCTOR } = config.buttonTitles;
const map = require('lodash/map');

const { routes } = config;
const { MODEL_REMOVE_MESSAGE } = config.messages;

const tableTitles = config.tableHeadRowTitles.models;
const pageTitle = config.titles.constructorListPageTitles.mainPageTitle;
const { IMG_URL } = config;
const { showEnable, showDisable } = config.labels.model;

const ConstructorListPage = () => {
  const id = '6043bf9e3e06ad3edcdb7b30';
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(selectModelAndTable);

  const dispatch = useDispatch();

  const handleConstructor = () => {
    dispatch(push(config.routes.pathToConstructor.replace(':id', id)));
  };

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

        <div className={styles.constructorButton}>
          <Button
            data-cy={labelsEn.constructor}
            className={styles.saveButton}
            onClick={handleConstructor}
            color={materialUiConstants.secondary}
            variant={materialUiConstants.contained}
          >
            {/* {MODEL_CONSTRUCTOR} */}
            {CREATE_CONSTRUCTOR}
          </Button>
        </div>
      </div>
      <div>
        <DropDownModelList />
      </div>
      {/* <TableContainerGenerator */}
      {/*    data-cy='modelTable' */}
      {/*    pagination */}
      {/*    count={itemsCount} */}
      {/*    tableTitles={tableTitles} */}
      {/*    tableItems={modelItems} */}
      {/* /> */}
    </div>
  );
};

export default ConstructorListPage;
