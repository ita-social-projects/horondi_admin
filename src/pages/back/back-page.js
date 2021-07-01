import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useCommonStyles } from '../common.styles';
import { getBacks, deleteBack } from '../../redux/back/back.actions';

import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { backSelectorWithPagination } from '../../redux/selectors/back.selectors';

const map = require('lodash/map');

const { BACK_REMOVE_MESSAGE } = config.messages;
const { CREATE_BACK_TITLE, EXIT_WITHOUT_SAVING } = config.buttonTitles;

const pathToBackAddPage = config.routes.pathToAddBacks;
const tableTitles = config.tableHeadRowTitles.backs;

const BackPage = () => {
  const common = useCommonStyles();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { list, loading, currentPage, rowsPerPage, itemsCount } = useSelector(
    backSelectorWithPagination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getBacks({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, currentPage, rowsPerPage]);

  const backDeleteHandler = (id) => {
    const removeBack = () => {
      dispatch(closeDialog());
      dispatch(deleteBack(id));
    };
    openSuccessSnackbar(removeBack, EXIT_WITHOUT_SAVING, BACK_REMOVE_MESSAGE);
  };

  const backItems = map(list, (backItem) => (
    <TableContainerRow
      image={
        backItem.images.thumbnail
          ? `${config.imagePrefix}${backItem.images.thumbnail}`
          : ''
      }
      key={backItem._id}
      id={backItem._id}
      name={backItem.name[0].value}
      material={backItem.features.material.name[0].value}
      available={backItem.available ? 'Так' : 'Ні'}
      deleteHandler={() => backDeleteHandler(backItem._id)}
      editHandler={() => {
        dispatch(push(`/backs/${backItem._id}`));
      }}
    />
  ));

  return (
    <div className={common.container}>
      <div className={common.adminHeader}>
        <Typography
          variant='h1'
          className={common.materialTitle}
          data-cy='back-header'
        >
          {config.titles.backTitles.mainPageTitle}
        </Typography>
        <Button
          data-cy='add-back'
          component={Link}
          to={pathToBackAddPage}
          variant='contained'
          color='primary'
        >
          {CREATE_BACK_TITLE}
        </Button>
      </div>
      {!loading ? (
        <TableContainerGenerator
          pagination
          data-cy='backTable'
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={backItems}
        />
      ) : (
        <LoadingBar />
      )}
    </div>
  );
};

export default BackPage;
