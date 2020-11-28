import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import { push } from 'connected-react-router';
import { useStyles } from './main-page.styles';

import { getRecentComments } from '../../redux/comments/comments.actions';
import { getOrderList } from '../../redux/orders/orders.actions';
import LoadingBar from '../../components/loading-bar';
import titles from '../../configs/titles';

const MainPage = () => {
  const {
    mainTitle,
    commentsTitle,
    ordersTitle,
    changesTitle
  } = titles.mainPageTitles;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { commentsList, commentsLoading, comments1 } = useSelector(
    ({ Comments }) => ({
      commentsList: Comments.list,
      commentsLoading: Comments.commentsLoading,
      comments1: Comments
    })
  );
  // console.log(comments1);

  const { orderLoading, ordersList, order } = useSelector(({ Orders }) => ({
    orderLoading: Orders.orderLoading,
    ordersList: Orders.list.items,
    order: Orders
  }));

  console.log(order);
  useEffect(() => {
    dispatch(getRecentComments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getOrderList({
        filter: {
          orderStatus: 'CREATED'
        }
      })
    );
  }, [dispatch]);

  const comments = commentsList.map(({ date, text, user, _id }, i) =>
    i < 5 ? (
      <div key={_id} className={classes.comment}>
        <div className={classes.commentText}>{text}</div>
        <div className={classes.commentInfo}>
          <div>{user.name || 'Гість'}</div>
          <div>{moment.unix(date / 1000).format('HH:mm DD.MM.YYYY ')}</div>
        </div>
      </div>
    ) : null
  );

  if (orderLoading || commentsLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h3' className={classes.pageTitle}>
        {mainTitle}
      </Typography>
      <div className={classes.container}>
        <div className={classes.commentsOrders}>
          <Paper className={classes.ordersContainer}>
            <Typography variant='h5' className={classes.blockTitle}>
              {ordersTitle}
            </Typography>
            {ordersList && ordersList.length ? (
              <TableContainer className={classes.orders}>
                <Table
                  stickyHeader
                  aria-label='sticky table'
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell component='th' align='center'>
                        Дата
                      </TableCell>
                      <TableCell component='th' align='center'>
                        Сума
                      </TableCell>
                      <TableCell component='th' align='center'>
                        ID замовлення
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersList.map(
                      ({ dateOfCreation, totalItemsPrice, _id }) => (
                        <TableRow
                          key={_id}
                          onClick={() => dispatch(push(`/orders/${_id}`))}
                          className={classes.order}
                        >
                          <TableCell align='center'>
                            {moment
                              .unix(dateOfCreation / 1000)
                              .format('DD.MM.YYYY')}
                          </TableCell>
                          <TableCell align='center'>
                            {totalItemsPrice[0].value}
                            {totalItemsPrice[0].currency} /{' '}
                            {totalItemsPrice[1].value}
                            {totalItemsPrice[1].currency}
                          </TableCell>
                          <TableCell align='center'>{_id}</TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className={classes.emptyOrders}>
                У вас немає нових замовлень
              </div>
            )}
          </Paper>
          <Paper className={classes.commentsContainer}>
            <Typography variant='h5' className={classes.blockTitle}>
              {commentsTitle}
            </Typography>
            <div className={classes.comments}>{comments}</div>
          </Paper>
        </div>
        <Paper className={classes.changesContainer}>
          <Typography variant='h5' className={classes.blockTitle}>
            {changesTitle}
          </Typography>
        </Paper>
      </div>
      {/* <Grid
        container
        spacing={3}
        direction="row"
        justify="center"
        className={classes.gridContainer}
      >
        <Grid
          classes={{ item: classes.item }}
          container
          item
          spacing={3}
          direction="column"
          justify="center"
          xs={12}
          sm={7} md={6}
        >
          <Grid item className={classes.ordersContainer}>
            <Paper className={classes.paper}>
              <Typography variant="h5" className={classes.blockTitle}>
                {ordersTitle}
              </Typography>
              <TableContainer className={classes.orders}>
                <Table
                  size="small"
                  stickyHeader
                  aria-label="sticky table"
                  className={classes.table}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Дата</TableCell>
                      <TableCell align="center">Сума</TableCell>
                      <TableCell align="center">ID замовлення</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ordersList && ordersList.length ? (
                      ordersList.map(
                        ({ dateOfCreation, totalItemsPrice, _id }) => (
                          <TableRow
                            key={_id}
                            onClick={() => dispatch(push(`/orders/${_id}`))}
                          >
                            <TableCell align="center">
                              {moment
                                .unix(dateOfCreation / 1000)
                                .format("DD.MM.YYYY")}
                            </TableCell>
                            <TableCell align="center">
                              {totalItemsPrice[0].value}
                              {totalItemsPrice[0].currency} /{" "}
                              {totalItemsPrice[1].value}
                              {totalItemsPrice[1].currency}
                            </TableCell>
                            <TableCell align="center">{_id}</TableCell>
                          </TableRow>
                        )
                      )
                    ) : (
                      <div className={classes.emptyOrders}>
                        У вас немає нових замовлень
                      </div>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item className={classes.commentsContainer}>
            <Paper className={classes.paper}>
              <Typography variant="h5" className={classes.blockTitle}>
                {commentsTitle}
              </Typography>
              <div className={classes.comments}>{comments}</div>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={5} md={6} className={classes.changesContainer}>
          <Paper className={classes.paper}>
            <Typography variant="h5" className={classes.blockTitle}>
              {changesTitle}
            </Typography>
          </Paper>
        </Grid>
      </Grid> */}
    </div>
  );
};

export default MainPage;
