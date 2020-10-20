import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useStyles } from './orders-page.styles';
import { getOrderList } from '../../../redux/orders/orders.actions';
import LoadingBar from '../../../components/loading-bar';
import TableContainerGenerator from '../../../containers/table-container-generator';
import TableContainerRow from '../../../containers/table-container-row';

import { config } from '../../../configs';
// import { productsTranslations } from '../../../translations/product.translations';

// const { ORDERS_NOT_FOUND } = productsTranslations;
const tableTitles = config.tableHeadRowTitles.orders;

const OrdersPage = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { list, orderLoading, orderError } = useSelector(
    ({ Orders }) => ({
      list: Orders.list,
      orderLoading: Orders.orderLoading,
      orderError: Orders.orderError
    })
  );

  useEffect(() => {
    dispatch(
      getOrderList({
        limit: 10,
        skip: 10
      })
    );
  }, [dispatch]);

  const orderItems = list ? list.map(
    ({
      _id,
      status,
      dateOfCreation,
      totalItemsPrice,
      totalPriceToPay
    }) => (
      <TableContainerRow 
        key = {_id}
        id = {_id}
        status = {status}
        date = {dateOfCreation}
        totalPrice = {totalItemsPrice}
        deliveryPrice = {totalPriceToPay - totalItemsPrice}
      />
    )
  ) : null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>23 orders</div>
        <div>Filter by</div>
      </div>
      {orderLoading ? <LoadingBar /> : <TableContainerGenerator
        pagination
        tableTitles={tableTitles}
        tableItems={orderItems}
      />}
      <h3>OrdersPage</h3>
    </div>
  );
};

export default OrdersPage;
