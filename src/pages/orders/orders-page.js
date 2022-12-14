import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { push } from 'connected-react-router';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReactHtmlParser from 'react-html-parser';

import orders from '../../configs/orders';
import getTime from '../../utils/getTime';
import { useStyles } from './orders-page.styles';
import { useCommonStyles } from '../common.styles';
import { getOrderList, deleteOrder } from '../../redux/orders/orders.actions';
import Status from './Status/Status';
import LoadingBar from '../../components/loading-bar';
import TableContainerRow from '../../containers/table-container-row';
import { config } from '../../configs';
import useSuccessSnackbar from '../../utils/use-success-snackbar';
import { closeDialog } from '../../redux/dialog-window/dialog-window.actions';
import { handleOrdersPage } from '../../utils/handle-orders-page';
import Filters from './filters/filters.js';
import { getUsers } from '../../redux/users/users.actions';
import { inputName } from '../../utils/order';

const { ADD_ORDER } = config.buttonTitles;
const pathToOrdersAddPage = config.routes.pathToOrderAdd;
const { pathToOrderItem } = config.routes;
const { REMOVE_ORDER_MESSAGE } = config.messages;

const OrdersPage = () => {
  const styles = useStyles();
  const commonStyles = useCommonStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const {
    orderLoading,
    orders: ordersList,
    filters,
    sort
  } = useSelector(({ Orders }) => ({
    orderLoading: Orders.orderLoading,
    orders: Orders.list.items,
    filters: Orders.filters,
    sort: Orders.sort
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
          date: { dateFrom: filters.dateFrom, dateTo: filters.dateTo },
          status: filters.status,
          paymentStatus: filters.paymentStatus,
          search: filters.search
        },
        sort
      })
    );
  }, [dispatch, rowsPerPage, currentPage, filters, sort, itemsCount]);

  const ordersDeleteHandler = (id) => {
    const removeOrders = () => {
      dispatch(closeDialog());
      dispatch(deleteOrder(id));
    };
    openSuccessSnackbar(removeOrders, REMOVE_ORDER_MESSAGE);
  };

  useEffect(() => {
    dispatch(getUsers({}));
  }, [dispatch]);

  const regUser = useSelector(({ Users }) => ({
    list: Users.list,
    loading: Users.userLoading
  }));

  const setRegisteredUser = (id) => {
    if (id && regUser.list) {
      for (const user of regUser.list) {
        if (user._id === id) {
          return `${user?.firstName} ${user?.lastName}`;
        }
      }
    } else {
      return inputName.noUser;
    }
  };

  const orderItems =
    ordersList &&
    ordersList.map((order) => (
      <TableContainerRow
        key={order._id}
        data={ReactHtmlParser(getTime(order.dateOfCreation, true))}
        orderId={order.orderNumber}
        registeredUser={setRegisteredUser(order.user_id)}
        customer={`${order?.recipient?.firstName} ${order?.recipient?.lastName}`}
        totalPrice={`${order?.totalPriceToPay} $`}
        paymentStatus={
          <Status
            status={orders.paymentStatusTranslation[order?.paymentStatus]}
          />
        }
        status={<Status status={orders.orderTableStatus[order.status]} />}
        editHandler={() => {
          dispatch(push(pathToOrderItem.replace(':id', order._id)));
        }}
        deleteHandler={() => {
          ordersDeleteHandler(order._id);
        }}
        showAvatar={false}
      />
    ));
  if (orderLoading || regUser.loading) {
    return <LoadingBar />;
  }
  return (
    <div className={commonStyles.container}>
      <div className={`${commonStyles.adminHeader} ${styles.title}`}>
        <Typography variant='h1' className={commonStyles.materialTitle}>
          {config.titles.orderTitles.mainPageTitle}
        </Typography>
        <div className={styles.filterBy}>
          <Button
            id='add-order'
            component={Link}
            to={pathToOrdersAddPage}
            variant='contained'
            color='primary'
            className={styles.addButton}
          >
            {ADD_ORDER}
          </Button>
        </div>
      </div>
      <Filters />
      <div className={commonStyles.table}>
        {handleOrdersPage(
          ordersList,
          itemsCount,
          orderItems,
          commonStyles.noRecords
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
