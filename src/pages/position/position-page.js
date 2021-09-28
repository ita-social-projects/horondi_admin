import React, { useEffect } from 'react';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { push } from 'connected-react-router';

import LoadingBar from '../../components/loading-bar';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import FilterNavbar from '../../components/filter-search-sort/filter-navbar';
import {
  getAllPositions,
  deletePosition
} from '../../redux/position/position.actions';
import { positionsSelectorWithPagination } from '../../redux/selectors/position.selectors';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import usePositionFilters from '../../hooks/filters/use-position-filters';

const { materialUiConstants } = config;
const labels = config.labels.positionPageLabel;
const { CREATE_POSITION_TITLE } = config.buttonTitles;
const { pathToPositionAdd } = config.routes;
const { DELETE_POSITION_MESSAGE, NO_POSITION_MESSAGE } = config.messages;
const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.positionAvailableVariants;

const PositionPage = () => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const positionOptions = usePositionFilters();
  const { filter, items, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(positionsSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getAllPositions({
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        },
        filter: {
          search: filter.search
        }
      })
    );
  }, [dispatch, itemsCount, currentPage, rowsPerPage, filter]);

  const positionDeleteHandler = (id) => {
    const removePosition = () => {
      dispatch(closeDialog());
      dispatch(deletePosition(id));
    };
    openSuccessSnackbar(removePosition, DELETE_POSITION_MESSAGE);
  };

  const positionsItems = _.map(items, (position) => (
    <TableContainerRow
      key={position._id}
      id={position._id}
      name={position?.name[0]?.value}
      available={position.available ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      showAvatar={false}
      deleteHandler={() => {
        positionDeleteHandler(position._id);
      }}
      editHandler={() => {
        dispatch(push(`${config.routes.pathToPosition}/${position._id}`));
      }}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader}`}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
          data-cy={labels.positionHeader}
        >
          {config.titles.positionTitles.mainPageTitle}
        </Typography>
        <Button
          id='addPockets'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToPositionAdd}
        >
          {CREATE_POSITION_TITLE}
        </Button>
      </div>
      <div>
        <FilterNavbar options={positionOptions || {}} />
      </div>
      {positionsItems?.length ? (
        <TableContainerGenerator
          pagination
          tableTitles={config.tableHeadRowTitles.positions}
          tableItems={positionsItems}
          count={itemsCount}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_POSITION_MESSAGE}</p>
      )}
    </div>
  );
};

export default PositionPage;
