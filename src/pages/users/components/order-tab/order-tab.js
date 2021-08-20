import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import ReactHtmlParser from 'react-html-parser';

import orders from '../../../../configs/orders';
import getTime from '../../../../utils/getTime';
import Status from '../../../orders/Status/Status';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row';
import { config } from '../../../../configs';
import { useStyles } from './order-tab.styles';
import LoadingBar from '../../../../components/loading-bar';
import FilterNavbar from '../../../../components/filter-search-sort';
import useOrderUserFilters from '../../../../hooks/filters/use-order-user-filters';
import { orderSelectorWithPagination } from '../../../../redux/selectors/orders.selectors';
import { deleteOrder } from '../../../../redux/orders/orders.actions';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';

const { pathToOrderItem } = config.routes;
const tableTitles = config.tableHeadRowTitles.users.orderTab;
const { REMOVE_ORDER_MESSAGE } = config.messages;

const OrderTab = ({ list }) => {
  const tabStyles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { orderLoading: loadOrder, itemsCount } = useSelector(
    orderSelectorWithPagination
  );

  const orderUserFilters = useOrderUserFilters();

  const ordersDeleteHandler = (id) => {
    const removeOrders = () => {
      dispatch(closeDialog());
      dispatch(deleteOrder(id));
    };
    openSuccessSnackbar(removeOrders, REMOVE_ORDER_MESSAGE);
  };

  const orderItems = list?.map((order) => (
    <TableContainerRow
      key={order._id}
      data={ReactHtmlParser(getTime(order.dateOfCreation, true))}
      orderId={order.orderNumber}
      totalPrice={`${order?.totalPriceToPay[0]?.value} ₴`}
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

  if (loadOrder) {
    return <LoadingBar />;
  }

  return (
    <>
      <div className={tabStyles.filters}>
        <FilterNavbar options={orderUserFilters || {}} />
      </div>
      <div>
        <TableContainerGenerator
          pagination
          count={itemsCount}
          id='usersTable'
          tableTitles={tableTitles}
          tableItems={orderItems}
        />
      </div>
    </>
  );
};

OrderTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default OrderTab;
