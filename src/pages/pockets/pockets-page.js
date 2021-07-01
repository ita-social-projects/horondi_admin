import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import _ from 'lodash';
import LoadingBar from '../../components/loading-bar';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import {
  getAllPockets,
  deletePocket
} from '../../redux/pockets/pockets.actions';
import { pocketsSelectorWithPagination } from '../../redux/selectors/pockets.selectors';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import FilterNavbar from '../../components/filter-search-sort/filter-navbar';
import usePocketFilters from '../../hooks/filters/use-pocket-filters';

const { materialUiConstants } = config;
const labels = config.labels.pocketsPageLabel;
const { CREATE_POCKETS_TITLE } = config.buttonTitles;
const { pathToPocketsAdd } = config.routes;
const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.pocketsAvailableVariants;
const { DELETE_POCKET_MESSAGE, NO_POCKET_MESSAGE } = config.messages;

const PocketsPage = () => {
  const dispatch = useDispatch();
  const { IMG_URL } = config;
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const pocketOptions = usePocketFilters();

  const { filter, pocketsList, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(pocketsSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getAllPockets({
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        },
        filter
      })
    );
  }, [dispatch, itemsCount, currentPage, rowsPerPage, filter]);

  const commonStyles = useCommonStyles();

  const pocketsDeleteHandler = (id) => {
    const removePocket = () => {
      dispatch(closeDialog());
      dispatch(deletePocket(id));
    };
    openSuccessSnackbar(removePocket, DELETE_POCKET_MESSAGE);
  };

  const pocketsItems = _.map(pocketsList, (pocket) => (
    <TableContainerRow
      key={pocket._id}
      id={pocket._id}
      image={pocket?.images?.thumbnail ? IMG_URL + pocket.images.thumbnail : ''}
      name={pocket?.name[0]?.value}
      available={pocket.restriction ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      deleteHandler={() => {
        pocketsDeleteHandler(pocket._id);
      }}
      editHandler={() => {
        dispatch(push(`${config.routes.pathToPockets}/${pocket._id}`));
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
          data-cy={labels.pocketsHeader}
        >
          {config.titles.pocketsTitles.mainPageTitle}
        </Typography>
        <Button
          id='addPockets'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToPocketsAdd}
        >
          {CREATE_POCKETS_TITLE}
        </Button>
      </div>
      <div>
        <FilterNavbar options={pocketOptions || {}} />
      </div>

      {pocketsItems?.length ? (
        <TableContainerGenerator
          pagination
          tableTitles={config.tableHeadRowTitles.pockets}
          tableItems={pocketsItems}
          count={itemsCount}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_POCKET_MESSAGE}</p>
      )}
    </div>
  );
};

export default PocketsPage;
