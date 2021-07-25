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
  getAllClosures,
  deleteClosure
} from '../../redux/closures/closures.actions';
import { closuresSelectorWithPagination } from '../../redux/selectors/closures.selectors';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import FilterNavbar from '../../components/filter-search-sort/filter-navbar';
// import useClosureFilters from '../../hooks/filters/use-closure-filters';

const { materialUiConstants } = config;
const labels = config.labels.closuresPageLabel;
const { CREATE_CLOSURES_TITLE } = config.buttonTitles;
const { pathToClosuresAdd } = config.routes;
const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.closuresAvailableVariants;
const { DELETE_CLOSURE_MESSAGE, NO_CLOSURE_MESSAGE } = config.messages;

const ClosuresPage = () => {
  const dispatch = useDispatch();
  const { IMG_URL } = config;
  const { openSuccessSnackbar } = useSuccessSnackbar();
  // const closureOptions = useClosureFilters();

  const {
    filter,
    closuresList,
    loading,
    currentPage,
    rowsPerPage,
    itemsCount
  } = useSelector(closuresSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getAllClosures({
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        }
      })
    );
  }, [dispatch, itemsCount, currentPage, rowsPerPage, filter]);

  const commonStyles = useCommonStyles();

  const closuresDeleteHandler = (id) => {
    const removeClosure = () => {
      dispatch(closeDialog());
      dispatch(deleteClosure(id));
    };
    openSuccessSnackbar(removeClosure, DELETE_CLOSURE_MESSAGE);
  };

  const closuresItems = _.map(closuresList, (closure) => (
    <TableContainerRow
      key={closure._id}
      id={closure._id}
      image={
        closure?.images?.thumbnail ? IMG_URL + closure.images.thumbnail : ''
      }
      name={closure?.name[0]?.value}
      available={closure.restriction ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      deleteHandler={() => {
        closuresDeleteHandler(closure._id);
      }}
      editHandler={() => {
        dispatch(push(`${config.routes.pathToClosures}/${closure._id}`));
      }}
    />
  ));

  // if (loading) {
  //     return <LoadingBar />;
  // }

  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader}`}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
          data-cy={labels.closuresHeader}
        >
          {config.titles.closuresTitles.mainPageTitle}
        </Typography>
        <Button
          id='addClosures'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToClosuresAdd}
        >
          {CREATE_CLOSURES_TITLE}
        </Button>
      </div>
      <div>{/* <FilterNavbar options={closureOptions || {}} /> */}</div>

      {closuresItems?.length ? (
        <TableContainerGenerator
          pagination
          tableTitles={config.tableHeadRowTitles.closures}
          tableItems={closuresItems}
          count={itemsCount}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_CLOSURE_MESSAGE}</p>
      )}
    </div>
  );
};

export default ClosuresPage;
