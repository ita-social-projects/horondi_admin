import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useStyles } from './orders-page.styles';
import { getOrder } from '../../../redux/orders/orders.actions';

const OrdersPage = () => {
  const styles = useStyles();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getOrder({
        limit: 10,
        skip: 2
      })
    );
  }, [dispatch]);

  return (
    <div>
      <h3>OrdersPage</h3>
    </div>
  );
};

export default OrdersPage;
