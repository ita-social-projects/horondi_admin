import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { push } from 'connected-react-router';
import Paper from '@material-ui/core/Paper';
import { TableCell, TableRow, Typography } from '@material-ui/core';
import LoadingBar from '../../components/loading-bar';
import TableContainerGenerator from '../../containers/table-container-generator';

import { getRecentComments } from '../../redux/comments/comments.actions';
import { getOrderList } from '../../redux/orders/orders.actions';
import { selectOrderList } from '../../redux/orders/orders.reducer';
import { selectComment } from '../../redux/comments/comments.reducer';
import { commentSelectorWithPagination } from '../../redux/selectors/comments.selectors';
import titles from '../../configs/titles';
import tableHeadRowTitles from '../../configs/table-head-row-titles';
import labels from '../../configs/labels';
import messages from '../../configs/messages';
import routes from '../../configs/routes';

import { useCommonStyles } from '../common.styles';
import { useStyles } from './main-page.styles';
import { getEmailQuestionsPendingCount } from '../../redux/email-questions/email-questions.actions';
import { getTime } from '../../utils/comment';

const map = require('lodash/map');

const MainPage = () => {
  const { mainTitle, commentsTitle, ordersTitle } = titles.mainPageTitles;
  const ordersTableTitles = tableHeadRowTitles.mainPageOrders;
  const commentsTableTitles =
    tableHeadRowTitles.comments.recentCommentsPageTitle;
  const { guestUser } = labels.user;
  const { EMPTY_LIST } = messages;
  const { pathToOrders, pathToComments } = routes;
  const classes = useStyles();
  const commonClasses = useCommonStyles();
  const dispatch = useDispatch();
  const { recentComments: list, loading } = useSelector(selectComment);

  const { orderLoading, ordersList, sort } = useSelector(selectOrderList);
  const { rowsPerPage, currentPage } = useSelector(
    commentSelectorWithPagination
  );

  useEffect(() => {
    dispatch(
      getRecentComments({
        pagination: {
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage
        }
      })
    );
  }, [dispatch, rowsPerPage, currentPage]);

  useEffect(() => {
    dispatch(
      getOrderList({
        limit: rowsPerPage,
        skip: currentPage * rowsPerPage,
        sort
      })
    );
  }, [dispatch, rowsPerPage, currentPage, sort]);

  useEffect(() => {
    dispatch(getEmailQuestionsPendingCount());
  }, [dispatch]);

  if (orderLoading || loading) {
    return <LoadingBar />;
  }

  const comments = map(list, ({ date, text, user, _id }) => (
    <TableRow
      key={_id}
      onClick={() => dispatch(push(`${pathToComments}/${_id}`))}
      className={classes.comment}
      data-cy='comment'
    >
      <TableCell>{getTime(date)}</TableCell>
      <TableCell>{user?.firstName || guestUser}</TableCell>
      <TableCell>{text}</TableCell>
    </TableRow>
  ));

  const orders =
    ordersList && ordersList.length
      ? map(
          ordersList,
          ({
            dateOfCreation,
            totalItemsPrice,
            _id,
            orderNumber,
            fixedExchangeRate
          }) => (
            <TableRow
              key={_id}
              onClick={() => dispatch(push(`${pathToOrders}/edit/${_id}`))}
              className={classes.order}
              data-cy='order'
            >
              <TableCell>
                {moment.unix(dateOfCreation / 1000).format('DD.MM.YYYY')}
              </TableCell>
              <TableCell>
                {Math.round(totalItemsPrice * fixedExchangeRate)}
                {'UAH'} / {totalItemsPrice}
                {'USD'}
              </TableCell>
              <TableCell>{orderNumber}</TableCell>
            </TableRow>
          )
        )
      : null;

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
            {comments && comments.length ? (
              <TableContainerGenerator
                tableItems={comments}
                tableTitles={commentsTableTitles}
                data-cy='comments-table'
              />
            ) : (
              <div className={classes.emptyList} data-cy='empty-comments'>
                {EMPTY_LIST}
              </div>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
