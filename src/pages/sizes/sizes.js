import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { useCommonStyles } from '../common.styles';
import { useStyles } from './sizes.styles';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { getSizes, deleteSize } from '../../redux/sizes/sizes.actions';
import TableContainerRow from '../../containers/table-container-row';
import TableContainerGenerator from '../../containers/table-container-generator';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import LoadingBar from '../../components/loading-bar';
import { config } from '../../configs';
import { sizesSelectorWithPagination } from '../../redux/selectors/sizes.selector';
import useSizeFilters from '../../hooks/filters/useSizesFilters';
import FilterNavbar from '../../components/filter-search-sort';

const tableTitles = config.tableHeadRowTitles.sizes.sizesPageTitles;
const { materialUiConstants } = config;
const labels = config.labels.sizePageLabels;
const pathToAddSizePage = config.routes.pathToAddSize;
const { CREATE_SIZE_TITLE } = config.buttonTitles;
const { DELETE_SIZE_MESSAGE, NO_SIZES_MESSAGE } = config.messages;
const { AVAILABLE_TEXT, UNAVAILABLE_TEXT } = config.sizesAvailableVariants;

const Sizes = () => {
  const dispatch = useDispatch();
  const commonStyles = useCommonStyles();
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const sizeFilters = useSizeFilters();
  const { sizesList, loading, itemsCount, filters, rowsPerPage, currentPage } =
    useSelector(sizesSelectorWithPagination);
  useEffect(() => {
    dispatch(
      getSizes({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          available: filters.available,
          searchBySimpleName: filters.searchBySimpleName,
          name: filters.name
        }
      })
    );
  }, [dispatch, rowsPerPage, currentPage, filters]);

  const sizeDeleteHandler = (id) => {
    const removeSize = () => {
      dispatch(closeDialog());
      dispatch(deleteSize(id));
    };
    openSuccessSnackbar(removeSize, DELETE_SIZE_MESSAGE);
  };

  const sizeItems = _.map(sizesList, (size) => (
    <TableContainerRow
      showAvatar={false}
      showEdit
      showDelete
      name={size?.model.name[0]?.value}
      size={size.name}
      available={size.available ? AVAILABLE_TEXT : UNAVAILABLE_TEXT}
      id={size._id}
      key={size._id}
      deleteHandler={() => {
        sizeDeleteHandler(size._id);
      }}
      editHandler={() => {
        dispatch(push(`${config.routes.pathToSizes}/${size._id}`));
      }}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader} ${styles.title}`}>
        <Typography
          variant={materialUiConstants.typographyVariantH1}
          className={commonStyles.materialTitle}
          data-cy={labels.sizesHeader}
        >
          {config.titles.sizesTitles.mainPageTitle}
        </Typography>
        <Button
          id='addSize'
          component={Link}
          variant={materialUiConstants.contained}
          color={materialUiConstants.primary}
          to={pathToAddSizePage}
        >
          {CREATE_SIZE_TITLE}
        </Button>
      </div>
      <FilterNavbar options={sizeFilters || {}} />
      {sizeItems?.length ? (
        <TableContainerGenerator
          pagination
          data-cy={labels.sizesTable}
          count={itemsCount}
          tableTitles={tableTitles || NO_SIZES_MESSAGE}
          tableItems={sizeItems}
        />
      ) : (
        <div className={styles.noRecords}>{NO_SIZES_MESSAGE}</div>
      )}
    </div>
  );
};

export default Sizes;
