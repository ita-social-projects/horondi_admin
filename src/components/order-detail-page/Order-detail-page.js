import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';

import {
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Paper
} from '@material-ui/core';

import wrapWithAdminService from '../wrappers';

import { useStyles } from './Order-detail-page-style';
import { setOrder } from '../../actions';

const idItemIndex = 2;

const OrderDetailPage = ({ order, adminService, setOrder }) => {
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState([]);
  const { ordersService, productsService } = adminService;
  const orderItemsTitle = 'Order Items';

  const getOrder = useCallback(() => {
    const getConcreteItem = (item) =>
      productsService.getProductById(item.item).then((res) => res || null);

    const gridItems = (itemsDetails) =>
      itemsDetails.map((item) => {
        const itemDetails = getConcreteItem(item).then((res) =>
          Object.assign({}, res, { quantity: item.quantity })
        );
        return itemDetails;
      });

    ordersService
      .getOrderById(window.location.pathname.split('/')[idItemIndex])
      .then(async (res) => {
        if (res) {
          const order = res;
          setOrder(order);
          setAddress(order.deliveryAddress);
          const itemsDetailInfo = [];
          await gridItems(order.orderItems).map(async (item, i) => {
            await item.then((res) => {
              itemsDetailInfo.push(res);
              return itemsDetailInfo;
            });
            if (order.orderItems.length === itemsDetailInfo.length)
              setItems(itemsDetailInfo);
          });
          return;
        }
        setOrder([]);
      });
  }, [ordersService, productsService, setOrder]);

  useEffect(() => getOrder(), [getOrder]);

  const orderItemPrice = (price, quantity) => price * quantity;

  const expansionHeader = (item) => (
    <ExpansionPanelSummary aria-controls='panel1a-content' id='panel1a-header'>
      <div className={classes.heading}>
        <Typography>{item.title}</Typography>
        <Typography>
          Price: {orderItemPrice(item.price, item.quantity)}
        </Typography>
      </div>
    </ExpansionPanelSummary>
  );

  const expansionContent = (item) => (
    <ExpansionPanelDetails>
      <Grid container direction='column' alignItems='stretch'>
        <Typography>Material: {item.material}</Typography>
        <Typography>About product: {item.description}</Typography>
      </Grid>
    </ExpansionPanelDetails>
  );

  const itemsInfo = (
    <Grid container className={classes.itemsDetail}>
      <Paper className={classes.itemsPaper}>
        <h2>{orderItemsTitle}</h2>
        {items.map((item, id) => (
          <ExpansionPanel key={id}>
            {expansionHeader(item)}
            {expansionContent(item)}
          </ExpansionPanel>
        ))}
      </Paper>
    </Grid>
  );

  const orderInfo = (
    <Paper className={classes.orderInfo}>
      <Grid
        container
        className={classes.OrderInfoDetails}
        direction='column'
        alignItems='stretch'
      >
        <h2> First name: {order.firstName}</h2>
        <h2> Last name: {order.lastName}</h2>
        <h2> Email: {order.email}</h2>
        <h3> Phone-number: {order.contactPhone}</h3>
        <h3> Date: {order.date}</h3>
        <h3>
          {' '}
          Address:
          {address.country},{address.city},{address.street}
          {address.buildingNumber}
        </h3>
        <h3>Status: {order.status}</h3>
      </Grid>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      className={classes.content}
      direction='column'
      justify='center'
      alignItems='stretch'
    >
      {orderInfo}
      {itemsInfo}
    </Grid>
  );
};

const mapStateToProps = ({ ordersState: { order } }) => ({
  order
});
const mapDispatchToProps = {
  setOrder
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(OrderDetailPage)
);
