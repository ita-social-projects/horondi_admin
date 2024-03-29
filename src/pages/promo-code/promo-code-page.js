import React, { useEffect } from 'react';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './promo-code-page.styles';
import { config } from '../../configs';
import { useCommonStyles } from '../common.styles';
import { getAllPromoCodes } from './operations/promo-code.queries';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import { deletePromoCodeByID } from './operations/promo-code.mutation';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import orders from '../../configs/orders';
import LoadingBar from '../../components/loading-bar';
import { getFromLocalStorage } from '../../services/local-storage.service';
import { LOCAL_STORAGE } from '../../consts/local-storage';
import { setItemsCount } from '../../redux/table/table.actions';
import usePromoCodeFilters from '../../hooks/filters/use-promo-code-filters';
import FilterNavbar from '../../components/filter-search-sort';

const pathToAddPromoCodePage = config.routes.pathToAddPromoCode;
const { CREATE_PROMOCODE_TITLE } = config.buttonTitles;
const tableTitles = config.tableHeadRowTitles.promoCodes;

const PromoCodePage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const dateToday = new Date();
  const { promoCodesConsts } = orders;
  const promoCodeFilters = usePromoCodeFilters();
  const { sortOptions, searchOptions, filterByMultipleOptions } =
    promoCodeFilters;
  const token = getFromLocalStorage(LOCAL_STORAGE.AUTH_ACCESS_TOKEN);
  const { currentPage, rowsPerPage } = useSelector(({ Table }) => ({
    currentPage: Table.pagination.currentPage,
    rowsPerPage: Table.pagination.rowsPerPage,
    itemsCount: Table.itemsCount
  }));
  const { data, refetch, loading } = useQuery(getAllPromoCodes, {
    variables: {
      limit: rowsPerPage,
      skip: rowsPerPage * currentPage,
      sortOrder: sortOptions.sortDirection,
      sortBy: sortOptions.sortBy,
      search: searchOptions.search,
      status: filterByMultipleOptions[0].status
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    dispatch(setItemsCount(data?.getAllPromoCodes?.count) || 0);
  }, [data, dispatch]);

  const [deletePromoCodeByIDMutation] = useMutation(deletePromoCodeByID);

  const promoCodes = data?.getAllPromoCodes || {};
  const runRefetchData = () => refetch();

  const { openSuccessSnackbar } = useSuccessSnackbar();

  const dateCorrectFormat = (date) =>
    new Date(date)
      .toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
      })
      .split(' ')
      .join('-');

  const checkPromoStatus = (dateFrom, dateTo) => {
    const startDate = new Date(dateFrom);
    const expiredDate = new Date(dateTo);

    if (dateToday < startDate) {
      return promoCodesConsts.status.planned;
    }
    if (dateToday < expiredDate) {
      return promoCodesConsts.status.active;
    }
    return promoCodesConsts.status.expired;
  };

  const completeDeleteHandler = (promoID) => {
    deletePromoCodeByIDMutation({
      variables: {
        id: promoID
      },
      context: {
        headers: {
          token
        }
      }
    }).then(() => runRefetchData());
    dispatch(closeDialog());
  };
  const openDeleteModalHandler = (promoID) =>
    openSuccessSnackbar(
      () => completeDeleteHandler(promoID),
      promoCodesConsts.deletePromo
    );
  const editPromoCodeHandler = (promoID) => {
    dispatch(push(`${promoID}`));
  };

  const promoItems = promoCodes.items
    ? promoCodes.items.map(({ _id, code, dateFrom, dateTo, discount }) => (
        <TableContainerRow
          key={_id}
          promo={code}
          id={_id}
          discount={`${discount}%`}
          status={checkPromoStatus(dateFrom, dateTo)}
          showAvatar={false}
          date={`${dateCorrectFormat(dateFrom)} - ${dateCorrectFormat(dateTo)}`}
          deleteHandler={() => openDeleteModalHandler(_id)}
          editHandler={() => editPromoCodeHandler(_id)}
        />
      ))
    : null;

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <div className={commonStyles.container}>
      <div className={styles.header}>
        <Typography
          variant='h1'
          className={styles.promoTitle}
          data-cy='main-header'
        >
          {config.titles.promoPageTitles.mainPageTitle}
        </Typography>
        <Button
          component={Link}
          to={pathToAddPromoCodePage}
          variant='contained'
          color='primary'
        >
          {CREATE_PROMOCODE_TITLE}
        </Button>
      </div>
      <FilterNavbar options={promoCodeFilters} />
      <TableContainerGenerator
        id='promoCodeTable'
        pagination
        tableTitles={tableTitles}
        tableItems={promoItems}
        count={data?.getAllPromoCodes?.count}
      />
    </div>
  );
};

export default PromoCodePage;
