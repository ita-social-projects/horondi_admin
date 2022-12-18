import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import ReactHtmlParser from 'react-html-parser';

import { useCommonStyles } from '../../../common.styles';
import orders from '../../../../configs/orders';
import getTime from '../../../../utils/getTime';
import Status from '../../../orders/Status/Status';
import TableContainerGenerator from '../../../../containers/table-container-generator';
import TableContainerRow from '../../../../containers/table-container-row';
import { config } from '../../../../configs';
import { useStyles } from './order-tab.styles';
import LoadingBar from '../../../../components/loading-bar';
import { orderSelectorWithPagination } from '../../../../redux/selectors/orders.selectors';
import { deleteOrder } from '../../../../redux/orders/orders.actions';
import { closeDialog } from '../../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../../utils/use-success-snackbar';
import Filters from './filters/filters';

const { pathToOrderItem } = config.routes;
const tableTitles = config.tableHeadRowTitles.users.orderTab;
const { REMOVE_ORDER_MESSAGE, NO_ORDERS_MESSAGE } = config.messages;

const OrderTab = ({ list }) => {
  const commonStyles = useCommonStyles();
  const tabStyles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const { orderLoading: loadOrder, itemsCount } = useSelector(
    orderSelectorWithPagination
  );

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
      totalPrice={`${order?.totalPriceToPay} ₴`}
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
        <Filters />
      </div>
      <div>
        {orderItems?.length ? (
          <TableContainerGenerator
            pagination
            count={itemsCount}
            id='usersTable'
            tableTitles={tableTitles}
            tableItems={orderItems}
          />
        ) : (
          <p className={commonStyles.noRecords}>{NO_ORDERS_MESSAGE}</p>
        )}
      </div>
    </>
  );
};

OrderTab.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default OrderTab;
