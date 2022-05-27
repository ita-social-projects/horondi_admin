import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import _ from 'lodash';

import LoadingBar from '../../components/loading-bar';
import { useCommonStyles } from '../common.styles';
import { config } from '../../configs';
import { getAllStraps, deleteStrap } from '../../redux/straps/straps.actions';
import { strapsSelectorWithPagination } from '../../redux/selectors/straps.selectors';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import FilterNavbar from '../../components/filter-search-sort/filter-navbar';
import useStrapFilters from '../../hooks/filters/use-strap-filters';

const { materialUiConstants } = config;
const labels = config.labels.strapsPageLabel;
const { CREATE_STRAP_TITLE } = config.buttonTitles;
const { pathToStrapsAdd } = config.routes;
const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.strapsAvailableVariants;
const { DELETE_STRAP_MESSAGE, NO_STRAPS_MESSAGE } = config.messages;

const StrapsPage = () => {
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const searchOptions = useStrapFilters();
  const { filter, items, loading, currentPage, rowsPerPage, itemsCount } =
    useSelector(strapsSelectorWithPagination);

  useEffect(() => {
    dispatch(
      getAllStraps({
        pagination: {
          skip: currentPage * rowsPerPage,
          limit: rowsPerPage
        },
        filter: {
          name: filter.name
        }
      })
    );
  }, [dispatch, itemsCount, currentPage, rowsPerPage, filter]);

  const commonStyles = useCommonStyles();

  const { IMG_URL } = config;

  const strapsDeleteHandler = (id) => {
    const removeStrap = () => {
      dispatch(closeDialog());
      dispatch(deleteStrap(id));
    };
    openSuccessSnackbar(removeStrap, DELETE_STRAP_MESSAGE);
  };

  const strapsItems = _.map(items, (strap) => (
    <TableContainerRow
      key={strap._id}
      id={strap._id}
      image={strap?.images?.thumbnail ? IMG_URL + strap.images.thumbnail : ''}
      name={strap?.name[0]?.value}
      color={strap?.features?.color?.name[0]?.value}
      additionalPrice={strap?.absolutePrice}
      available={strap.available ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      deleteHandler={() => {
        strapsDeleteHandler(strap._id);
      }}
      editHandler={() => {
        dispatch(push(`${config.routes.pathToStraps}/${strap._id}`));
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
          data-cy={labels.strapsHeader}
        >
          {config.titles.strapsTitles.mainPageTitle}
        </Typography>
        <Button
          id='addStraps'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToStrapsAdd}
        >
          {CREATE_STRAP_TITLE}
        </Button>
      </div>
      <div>
        <FilterNavbar options={searchOptions || {}} />
      </div>

      {strapsItems?.length ? (
        <TableContainerGenerator
          pagination
          tableTitles={config.tableHeadRowTitles.straps}
          tableItems={strapsItems}
          count={itemsCount}
        />
      ) : (
        <p className={commonStyles.noRecords}>{NO_STRAPS_MESSAGE}</p>
      )}
    </div>
  );
};

export default StrapsPage;
