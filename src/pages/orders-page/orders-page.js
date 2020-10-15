import React from 'react';
import { useStyles } from './orders-page.styles';

const OrdersPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h3>OrdersPage</h3>
    </div>
  );
};

export default OrdersPage;
