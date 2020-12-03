import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { push } from 'connected-react-router';
import Paper from '@material-ui/core/Paper';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';
import { getRecentComments } from '../../redux/comments/comments.actions';
import { getOrderList } from '../../redux/orders/orders.actions';
import LoadingBar from '../../components/loading-bar';
import titles from '../../configs/titles';
import tableHeadRowTitles from '../../configs/table-head-row-titles';
import labels from '../../configs/labels';

import { useCommonStyles } from '../common.styles';
import { useStyles } from './main-page.styles';
import messages from '../../configs/messages';
import TableContainerGenerator from '../../containers/table-container-generator';

const MainPage = () => {
  const {
    mainTitle,
    commentsTitle,
    ordersTitle,
    changesTitle
  } = titles.mainPageTitles;
  const ordersTableTitles = tableHeadRowTitles.mainPageOrders;
  const { guestUser } = labels.user;
  const { EMPTY_LIST } = messages;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const { commentsList, commentsLoading } = useSelector(({ Comments }) => ({
    commentsList: Comments.list,
    commentsLoading: Comments.commentsLoading
  }));

  const { orderLoading, ordersList } = useSelector(({ Orders }) => ({
    orderLoading: Orders.orderLoading,
    ordersList: Orders.list.items
  }));

  useEffect(() => {
    dispatch(getRecentComments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getOrderList({
        filter: {
          orderStatus: 'CANCELLED'
        }
      })
    );
  }, [dispatch]);

  const comments = commentsList.map(({ date, text, user, _id }) => (
    <div key={_id} className={classes.comment}>
      <div className={classes.commentText}>{text}</div>
      <div className={classes.commentInfo}>
        <div>{user.name || guestUser}</div>
        <div>{moment.unix(date / 1000).format('HH:mm DD.MM.YYYY ')}</div>
      </div>
    </div>
  ));

  const orders =
    ordersList && ordersList.length
      ? ordersList.map(({ dateOfCreation, totalItemsPrice, _id }) => (
        <TableRow
          key={_id}
          onClick={() => dispatch(push(`/orders/${_id}`))}
          className={classes.order}
          data-cy='order'
        >
          <TableCell>
            {moment.unix(dateOfCreation / 1000).format('DD.MM.YYYY')}
          </TableCell>
          <TableCell>
            {totalItemsPrice[0].value}
            {totalItemsPrice[0].currency} / {totalItemsPrice[1].value}
            {totalItemsPrice[1].currency}
          </TableCell>
          <TableCell>{_id}</TableCell>
        </TableRow>
      ))
      : null;

  if (orderLoading || commentsLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={`${commonClasses.container} ${classes.root}`}>
      <Typography
        variant='h3'
        className={commonClasses.materialTitle}
        data-cy='page-title'
      >
        {mainTitle}
      </Typography>
      <div className={classes.main}>
        <div className={classes.commentsOrders}>
          <Paper className={classes.ordersContainer} data-cy='orders-container'>
            <Typography variant='h5' className={classes.blockTitle}>
              {ordersTitle}
            </Typography>
            {ordersList && ordersList.length ? (
              <TableContainerGenerator
                tableItems={orders}
                tableTitles={ordersTableTitles}
                data-cy='orders-table'
              />
            ) : (
              <div className={classes.emptyList} data-cy='empty-orders'>
                {EMPTY_LIST}
              </div>
            )}
          </Paper>
          <Paper
            className={classes.commentsContainer}
            data-cy='comments-container'
          >
            <Typography variant='h5' className={classes.blockTitle}>
              {commentsTitle}
            </Typography>
            <div className={classes.comments}>{comments}</div>
          </Paper>
        </div>
        <Paper className={classes.changesContainer} data-cy='changes-container'>
          <Typography variant='h5' className={classes.blockTitle}>
            {changesTitle}
          </Typography>
        </Paper>
      </div>
    </div>
  );
};

export default MainPage;
