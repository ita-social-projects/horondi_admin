import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { Grid, Typography } from '@material-ui/core';
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
  const { commentsList, commentsLoading } = useSelector(({ Comments }) => ({
    commentsList: Comments.list,
    commentsLoading: Comments.commentsLoading
  }));

  const { orderLoading, ordersList } = useSelector(({ Orders }) => ({
    orderLoading: Orders.orderLoading,
    ordersList: Orders.list.items
  }));
  console.log(ordersList);
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
          <div>
            {new Date(+date).toLocaleTimeString()}{' '}
            {new Date(+date).toLocaleDateString()}
          </div>
        </div>
      </div>
    ) : null
  );

  //   const orders1 = ordersList?.map(({})=>{
  //       return
  //   })

  //   const orders = orders1 || 'message'
  if (orderLoading || commentsLoading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.root}>
      <Typography variant='h3' className={classes.pageTitle}>
        {mainTitle}
      </Typography>
      <Grid
        container
        spacing={3}
        direction='row'
        justify='center'
        className={classes.gridContainer}
      >
        <Grid
          container
          item
          spacing={3}
          direction='column'
          justify='center'
          xs={12}
          sm={6}
        >
          <Grid item className={classes.ordersContainer}>
            <Paper className={classes.paper}>
              <Typography variant='h5' className={classes.blockTitle}>
                {ordersTitle}
              </Typography>
              {/* {ordersList &&orders} */}
            </Paper>
          </Grid>
          <Grid item className={classes.commentsContainer}>
            <Paper className={classes.paper}>
              <Typography variant='h5' className={classes.blockTitle}>
                {commentsTitle}
              </Typography>
              {comments}
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} className={classes.changesContainer}>
          <Paper className={classes.paper}>
            <Typography variant='h5' className={classes.blockTitle}>
              {changesTitle}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
