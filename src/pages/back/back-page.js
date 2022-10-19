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
import { getProductDetails } from '../../redux/products/products.actions';
import FilterNavbar from '../../components/filter-search-sort';
import useBackFilters from '../../hooks/filters/use-back-filters';
import constructorItemPrice from '../../utils/constructorItemPrice';

const { materialUiConstants } = config;
const map = require('lodash/map');

const { BACK_REMOVE_MESSAGE, NO_BACKS_MESSAGE } = config.messages;
const { CREATE_BACK_TITLE } = config.buttonTitles;

const pathToBackAddPage = config.routes.pathToAddBacks;
const tableTitles = config.tableHeadRowTitles.backs;

const BackPage = () => {
  const common = useCommonStyles();
  const backOptions = useBackFilters();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const dispatch = useDispatch();

  const { items, loading, currentPage, rowsPerPage, itemsCount, filter } =
    useSelector(backSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getBacks({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filter]);

  useEffect(() => {
    dispatch(getProductDetails());
  }, []);

  const backDeleteHandler = (id) => {
    const removeBack = () => {
      dispatch(closeDialog());
      dispatch(deleteBack(id));
    };
    openSuccessSnackbar(removeBack, BACK_REMOVE_MESSAGE);
  };

  const backItems = map(items, (backItem) => (
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
      color={backItem.features.color.name[0].value}
      additionalPrice={constructorItemPrice(backItem)}
      available={backItem.available ? 'Так' : 'Ні'}
      deleteHandler={() => backDeleteHandler(backItem._id)}
      editHandler={() => {
        dispatch(push(`/backs/${backItem._id}`));
      }}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }

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
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
        >
          {CREATE_BACK_TITLE}
        </Button>
      </div>
      <div>
        <FilterNavbar options={backOptions || {}} />
      </div>

      {backItems?.length ? (
        <TableContainerGenerator
          pagination
          data-cy='backTable'
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={backItems}
        />
      ) : (
        <p className={common.noRecords}>{NO_BACKS_MESSAGE}</p>
      )}
    </div>
  );
};

export default BackPage;
