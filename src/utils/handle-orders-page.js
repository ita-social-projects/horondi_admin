import React from 'react';
import Typography from '@material-ui/core/Typography';

import TableContainerGenerator from '../containers/table-container-generator';
import { config } from '../configs';
import order from '../configs/orders';
import { newOrder, submitStatus, initialValues } from './order';
import { addOrder, updateOrder } from '../redux/orders/orders.actions';
import { closeDialog } from '../redux/dialog-window/dialog-window.actions';

export const handleOrdersPage = (orders, itemsCount, orderItems, style) =>
  orders && orders.length ? (
    <TableContainerGenerator
      pagination
      count={itemsCount}
      tableTitles={config.tableHeadRowTitles.orders}
      tableItems={orderItems}
    />
  ) : (
    <Typography variant='h1' className={style}>
      {config.titles.orderTitles.ORDER_NOT_FOUND}
    </Typography>
  );

const { dialogContent, buttonTitle } = order;

export const handleOrderSubmition = (
  dispatch,
  resetForm,
  openSuccessSnackbar,
  data,
  id
) => {
  if (
    newOrder.status !== initialValues.status &&
    !submitStatus.includes(newOrder(data).status)
  ) {
    const updateOrderSnackbar = () => {
      dispatch(closeDialog());
      if (id) {
        dispatch(updateOrder(newOrder(data), id));
      } else {
        dispatch(addOrder(newOrder(data)));
        resetForm({ values: initialValues });
      }
    };
    openSuccessSnackbar(updateOrderSnackbar, dialogContent, buttonTitle);
  } else if (id) {
    dispatch(updateOrder(newOrder(data), id));
  } else {
    dispatch(addOrder(newOrder(data)));
    resetForm({ values: initialValues });
  }
};
