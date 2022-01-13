import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useCommonStyles } from '../common.styles';
import TableContainerRow from '../../containers/table-container-row';
import { config } from '../../configs';
import { bottomSelectorWithPagination } from '../../redux/selectors/bottom.selectors';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import LoadingBar from '../../components/loading-bar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { getBottoms, deleteBottom } from '../../redux/bottom/bottom.actions';
import useBottomFilters from '../../hooks/filters/use-bottom-filters';
import FilterNavbar from '../../components/filter-search-sort';
import TableContainerGenerator from '../../containers/table-container-generator';
import { getProductDetails } from '../../redux/products/products.actions';

const { materialUiConstants } = config;
const map = require('lodash/map');

const { BOTTOM_REMOVE_MESSAGE, NO_BOTTOMS_MESSAGE } = config.messages;
const { CREATE_BOTTOM_TITLE } = config.buttonTitles;

const pathToBottomAddPage = config.routes.pathToBottomsAdd;
const tableTitles = config.tableHeadRowTitles.bottoms;

const BottomPage = () => {
  const common = useCommonStyles();
  const bottomOptions = useBottomFilters();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { items, loading, currentPage, rowsPerPage, itemsCount, filter } =
    useSelector(bottomSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getBottoms({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter
      })
    );
  }, [dispatch, currentPage, rowsPerPage, filter]);

  useEffect(() => {
    dispatch(getProductDetails());
  }, []);

  const bottomDeleteHandler = (id) => {
    const removeBottom = () => {
      dispatch(closeDialog());
      dispatch(deleteBottom(id));
    };
    openSuccessSnackbar(removeBottom, BOTTOM_REMOVE_MESSAGE);
  };
  const bottomItems = map(items, (bottomItem) => (
    <TableContainerRow
      image={
        bottomItem.images.thumbnail
          ? `${config.imagePrefix}${bottomItem.images.thumbnail}`
          : ''
      }
      key={bottomItem._id}
      id={bottomItem._id}
      name={bottomItem.name[0].value}
      material={bottomItem.features.material.name[0].value}
      color={bottomItem.features.color.name[0].value}
      additionalPrice={bottomItem.additionalPrice[1]?.value}
      available={bottomItem.available ? 'Так' : 'Ні'}
      deleteHandler={() => bottomDeleteHandler(bottomItem._id)}
      editHandler={() => {
        dispatch(push(`/bottoms/${bottomItem._id}`));
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
          data-cy='bottom-header'
        >
          {config.titles.bottomTitles.mainPageTitle}
        </Typography>
        <Button
          data-cy='add-bottom'
          component={Link}
          to={pathToBottomAddPage}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
        >
          {CREATE_BOTTOM_TITLE}
        </Button>
      </div>
      <div>
        <FilterNavbar options={bottomOptions || {}} />
      </div>
      {bottomItems.length ? (
        <TableContainerGenerator
          pagination
          data-cy='bottomTable'
          count={itemsCount}
          tableTitles={tableTitles}
          tableItems={bottomItems}
        />
      ) : (
        <p className={common.noRecords}>{NO_BOTTOMS_MESSAGE}</p>
      )}
    </div>
  );
};

export default BottomPage;
