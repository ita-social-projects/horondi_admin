import React from 'react';
import { Button, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useStyles } from './promo-code-page.styles';
import { productsTranslations } from '../../configs/product-translations';
import { config } from '../../configs';
import PromoCodeFilter from './promo-code-filter/promo-code-filter';
import { useCommonStyles } from '../common.styles';
import { getAllPromoCodes } from './promo-code.queries';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import { deletePromoCodeByID } from './promo-code.mutation';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import orders from '../../configs/orders';
import LoadingBar from '../../components/loading-bar';

const pathToAddPromoCodePage = config.routes.pathToAddPromoCode;
const tableTitles = config.tableHeadRowTitles.promoCodes;

const PromoCodePage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const dateToday = new Date();
  const { promoCodesTranslation } = orders;

  const { data, refetch, loading } = useQuery(getAllPromoCodes);
  const [deletePromoCodeByIDMutation] = useMutation(deletePromoCodeByID);
  const promoCodes = data?.getAllPromoCodes || {};

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

  const checkPromoStatus = (dateTo) =>
    dateToday < new Date(dateTo)
      ? promoCodesTranslation.status.active
      : promoCodesTranslation.status.expired;

  const completeDeleteHandler = (promoID) => {
    deletePromoCodeByIDMutation({
      variables: {
        id: promoID
      }
    });
    refetch();
    dispatch(closeDialog());
  };
  const openDeleteModalHandler = (promoID) =>
    openSuccessSnackbar(
      () => completeDeleteHandler(promoID),
      promoCodesTranslation.deletePromo
    );

  const promoItems = promoCodes.items
    ? promoCodes.items.map(({ _id, code, dateFrom, dateTo, discount }) => (
        <TableContainerRow
          key={_id}
          promo={code}
          discount={`${discount}%`}
          status={checkPromoStatus(dateTo)}
          showAvatar={false}
          date={`${dateCorrectFormat(dateFrom)} - ${dateCorrectFormat(dateTo)}`}
          deleteHandler={() => openDeleteModalHandler(_id)}
          editHandler={() => 'editHandler'}
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
          id='add-questions-answers'
          component={Link}
          to={pathToAddPromoCodePage}
          variant='contained'
          color='primary'
          data-cy='add-questions-answers'
        >
          {productsTranslations.CREATE_PROMOCODE}
        </Button>
      </div>

      <PromoCodeFilter />

      <TableContainerGenerator
        id='questionsAnswersTable'
        tableTitles={tableTitles}
        tableItems={promoItems}
      />
    </div>
  );
};

export default PromoCodePage;
