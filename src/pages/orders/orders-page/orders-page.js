import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';
import { push } from 'connected-react-router';
import { useStyles } from './orders-page.styles';
import { getOrderList } from '../../../redux/orders/orders.actions';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';
import StandardButton from '../../../components/buttons/standard-button/standard-button';
import { config } from '../../../configs';

const tableTitles = config.tableHeadRowTitles.orders;

const OrdersPage = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { orderLoading, orders, count } = useSelector(({ Orders }) => ({
    orderLoading: Orders.orderLoading,
    orders: Orders.list.items,
    count: Orders.list.count
  }));

  const { currentPage, rowsPerPage } = useSelector(({ Table }) => ({
    currentPage: Table.pagination.currentPage,
    rowsPerPage: Table.pagination.rowsPerPage
  }));

  useEffect(() => {
    dispatch(
      getOrderList({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  const orderItems =
    orders &&
    orders.map((order) => (
      <TableContainerRow
        key={order._id}
        orderId={order._id}
        date={moment.unix(order.dateOfCreation / 1000).format(' DD/MM/YYYY ')}
        totalPrice={`${order.totalItemsPrice[0].value} ₴`}
        deliveryPrice={`${
          order.totalPriceToPay[0].value - order.totalItemsPrice[0].value
        } ₴`}
        status={order.status}
        button={
          <StandardButton
            title='Details'
            onClickHandler={() => dispatch(push(`/orders/${order._id}`))}
          />
        }
        showDelete={false}
        showEdit={false}
        showAvatar={false}
      />
    ));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.orderCount}>{count} orders</div>
        <div className={styles.filterBy}>Filter by</div>
      </div>
      {orderLoading ? (
        <LoadingBar />
      ) : (
        <TableContainerGenerator
          pagination
          tableTitles={tableTitles}
          tableItems={orderItems}
        />
      )}
    </div>
  );
};

export default OrdersPage;
