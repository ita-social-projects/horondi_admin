import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import moment from 'moment';
import { push } from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useStyles } from './orders-page.styles';
import { useCommonStyles } from '../common.styles';
import { getOrderList, deleteOrder } from '../../redux/orders/orders.actions';
import Status from './Status/Status';
import LoadingBar from '../../components/loading-bar';
import TableContainerGenerator from '../../containers/table-container-generator';
import TableContainerRow from '../../containers/table-container-row';
import { config } from '../../configs';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';

const { ADD_ORDER } = config.buttonTitles;
const pathToOrdersAddPage = config.routes.pathToOrderAdd;
const { REMOVE_ORDER_MESSAGE } = config.messages;

const OrdersPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const [status, setStatus] = useState('All');

  const statusList = config.labels.orders.select.map(({ label, value }) => (
    <MenuItem key={value} value={value}>
      {label}
    </MenuItem>
  ));

  const { orderLoading, orders, count } = useSelector(({ Orders }) => ({
    orderLoading: Orders.orderLoading,
    orders: Orders.list.items,
    count: Orders.list.count
  }));

  const { currentPage, rowsPerPage, itemsCount } = useSelector(({ Table }) => ({
    currentPage: Table.pagination.currentPage,
    rowsPerPage: Table.pagination.rowsPerPage,
    itemsCount: Table.itemsCount
  }));

  useEffect(() => {
    dispatch(
      getOrderList({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        filter: {
          orderStatus: status === 'All' ? '' : status
        }
      })
    );
  }, [dispatch, rowsPerPage, currentPage, status, orders]);

  const ordersDeleteHandler = (id) => {
    const removeOrders = () => {
      dispatch(closeDialog());
      dispatch(deleteOrder(id));
    };
    openSuccessSnackbar(removeOrders, REMOVE_ORDER_MESSAGE);
  };

  const orderItems =
    orders &&
    orders.map((order) => (
      <TableContainerRow
        key={order._id}
        orderId={order.orderNumber}
        date={moment.unix(order.dateOfCreation / 1000).format(' DD.MM.YYYY ')}
        totalPrice={`${order.totalItemsPrice[0].value} ₴`}
        deliveryPrice={`${
          order.totalPriceToPay[0].value - order.totalItemsPrice[0].value
        } ₴`}
        status={<Status status={order.status} />}
        editHandler={() => {
          dispatch(push(`/orders/${order._id}`));
        }}
        deleteHandler={() => {
          ordersDeleteHandler(order._id);
        }}
        showAvatar={false}
      />
    ));

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.adminHeader}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {config.titles.orderTitles.mainPageTitle}
        </Typography>
        <div className={styles.filterBy}>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            {statusList}
          </Select>
          <Button
            id='add-order'
            component={Link}
            to={pathToOrdersAddPage}
            variant='contained'
            color='primary'
          >
            {ADD_ORDER}
          </Button>
        </div>
      </div>
      <div className={styles.orderCount}>
        {count} {config.titles.orderTitles.orders}
      </div>
      <div className={commonStyles.table}>
        {orderLoading ? (
          <LoadingBar />
        ) : orders && orders.length ? (
          <TableContainerGenerator
            pagination
            count={itemsCount}
            tableTitles={config.tableHeadRowTitles.orders}
            tableItems={orderItems}
          />
        ) : (
          <Typography variant='h1' className={commonStyles.materialTitle}>
            {config.titles.orderTitles.ORDER_NOT_FOUND}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
