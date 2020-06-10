import React, { useEffect, useCallback } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  Menu,
  MenuItem,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import wrapWithAdminService from '../../wrappers';

import { useStyles } from './Latest-orders-style';
import {
  setOrders,
  ordersLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
} from '../../../actions';
import LoadingBar from '../../loading-bar';

const tableTitles = ['Order ID', 'Customer', 'Date', 'Status'];
const DATE_FORMAT = 'DD MMM YYYY';
const TABLE_TITLE = 'Latest Orders';
const ORDER_STATUSES = ['pending', 'canceled', 'delivered'];
const PATH_TO_ORDER = (id) => `/order/${id}`;

const SUCCESS_MSG = (name, status) =>
  `Order ${name} status updated to ${status}`;
const SUCCESS = 'success';

const noOrdersText = 'No orders were found.';

const LatestOrders = ({
  orders,
  loading,
  adminService,
  history,
  setOrders,
  ordersLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
}) => {
  const [menuStatus, setMenuStatus] = React.useState({});
  const classes = useStyles();
  const { ordersService } = adminService;

  const getOrders = useCallback(() => {
    ordersLoadingStatus();
    ordersService.getAllOrders().then((res) => {
      if (res) {
        const orders = res.slice(0, 10);
        setOrders(orders);
        return;
      }

      setOrders([]);
    });
  }, [ordersService, setOrders, ordersLoadingStatus]);

  useEffect(() => getOrders(), [getOrders]);

  if (loading) {
    return <LoadingBar />;
  }

  if (!orders.length) {
    return (
      <Typography id='no-orders-msg' variant='h4' component='h2'>
        {noOrdersText}
      </Typography>
    );
  }

  const handleSnackBarOpen = (message, severity) => {
    setSnackBarMessage(message);
    setSnackBarSeverity(severity);
    setSnackBarStatus(true);
  };

  const handleMenuOpen = (name) => (event) => {
    const target = event.currentTarget;
    setMenuStatus({ ...menuStatus, [name]: target });
  };

  const handleMenuClose = (name) => () => {
    setMenuStatus({ ...menuStatus, [name]: null });
  };

  const handleStatusChange = (name, status) => async () => {
    const orderStatus = { status };
    await ordersService.putOrder(name, orderStatus);
    handleSnackBarOpen(SUCCESS_MSG(name, status), SUCCESS);
    setMenuStatus({ ...menuStatus, [name]: null });
    getOrders();
  };

  const statusChangeMenu = (name) => (
    <Menu
      id='simple-menu'
      anchorEl={menuStatus[name]}
      keepMounted
      open={Boolean(menuStatus[name])}
      onClose={handleMenuClose(name)}
    >
      {ORDER_STATUSES.map((status) => (
        <MenuItem key={status} onClick={handleStatusChange(name, status)}>
          {status}
        </MenuItem>
      ))}
    </Menu>
  );

  const tableHeaders = tableTitles.map((title) => (
    <TableCell key={title}>{title}</TableCell>
  ));

  const handleOrder = (id) => {
    history.push(PATH_TO_ORDER(id));
  };

  const tableRows = orders.map((order) => {
    if (!order.userId) {
      order.userId = {
        email: ''
      };
    }
    return (
      <TableRow hover key={order._id}>
        <TableCell
          onClick={() => handleOrder(order._id)}
          style={{ cursor: 'pointer' }}
        >
          {order._id}
        </TableCell>
        <TableCell>{order.userId.email}</TableCell>
        <TableCell>{moment(order.date).format(DATE_FORMAT)}</TableCell>
        <TableCell>
          <div className={classes.statusContainer}>
            <span className={classes[order.status]} />
            {order.status}
            <IconButton
              className={classes.editButton}
              onClick={handleMenuOpen(order._id)}
            >
              <EditIcon fontSize='small' />
            </IconButton>
            {statusChangeMenu(order._id)}
          </div>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <Card id='latest-orders' className={classes.root}>
      <CardHeader title={TABLE_TITLE} />
      <Divider />
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>
            <TableHead>
              <TableRow>{tableHeaders}</TableRow>
            </TableHead>
            <TableBody id='table-body'>{tableRows}</TableBody>
          </Table>
        </div>
      </CardContent>
      <Divider />
    </Card>
  );
};

const mapStateToProps = ({ ordersState: { orders, loading } }) => ({
  orders,
  loading
});
const mapDispatchToProps = {
  setOrders,
  ordersLoadingStatus,
  setSnackBarStatus,
  setSnackBarSeverity,
  setSnackBarMessage
};

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(LatestOrders))
);
