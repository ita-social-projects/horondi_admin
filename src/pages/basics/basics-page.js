import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';

import _ from 'lodash';
import LoadingBar from '../../components/loading-bar';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getAllBasics, deleteBasic } from '../../redux/basics/basics.actions';
import { basicsSelectorWithPagination } from '../../redux/selectors/basics.selectors';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import FilterNavbar from '../../components/filter-search-sort';
import useBasicFilters from '../../hooks/filters/use-basic-filters';
import constructorItemPrice from '../../utils/constructorItemPrice';

const { materialUiConstants } = config;
const { pathToAddBasic } = config.routes;
const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.basicsAvailableVariants;
const { CREATE_BASIC_TITLE } = config.buttonTitles;
const { DELETE_BASIC_MESSAGE, NO_BASICS_MESSAGE } = config.messages;

const BasicsPage = () => {
  const dispatch = useDispatch();
  const basicOptions = useBasicFilters();
  const { IMG_URL } = config;
  const { filter, items, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(basicsSelectorWithPagination);
  useEffect(() => {
    dispatch(
      getAllBasics({
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        },
        filter
      })
    );
  }, [dispatch, itemsCount, currentPage, rowsPerPage, filter]);

  const commonStyles = useCommonStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const basicDeleteHandler = (id) => {
    const removeBasic = () => {
      dispatch(closeDialog());
      dispatch(deleteBasic(id));
    };
    openSuccessSnackbar(removeBasic, DELETE_BASIC_MESSAGE);
  };
  const basicsItems = _.map(items, (basic) => (
    <TableContainerRow
      key={basic._id}
      id={basic._id}
      image={basic?.images?.thumbnail ? IMG_URL + basic.images.thumbnail : ''}
      name={basic?.name[0]?.value}
      material={basic?.features?.material?.name[0].value}
      color={basic?.features?.color?.name[0].value}
      additionalPrice={constructorItemPrice(basic)}
      available={basic.available ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      deleteHandler={() => {
        basicDeleteHandler(basic._id);
      }}
      editHandler={() => {
        dispatch(push(`${config.routes.pathToBasics}/${basic._id}`));
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
        >
          {config.titles.basicsTitles.mainPageTitle}
        </Typography>
        <Button
          id='addBasic'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToAddBasic}
        >
          {CREATE_BASIC_TITLE}
        </Button>
      </div>
      <div>
        <FilterNavbar options={basicOptions || {}} />
      </div>
      {basicsItems?.length ? (
        <TableContainerGenerator
          pagination
          tableTitles={config.tableHeadRowTitles.basics}
          tableItems={basicsItems}
          count={itemsCount}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_BASICS_MESSAGE}</p>
      )}
    </div>
  );
};

export default BasicsPage;
