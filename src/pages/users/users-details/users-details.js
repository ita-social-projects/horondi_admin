import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, AppBar, Tabs, Tab } from '@material-ui/core';
import { withRouter } from 'react-router';

import { useCommonStyles } from '../../common.styles';
import { useStyles } from './users-details.styles';
import { useUsersHandler } from '../../../hooks/user/use-users-handlers';
import useOrdersCommentsTabs from '../../../hooks/user/use-orders-comments-tabs';
import UserDetailsCard from './containers/user-details-card';
import TabPanel from '../../../components/tab-panel';
import { config } from '../../../configs';
import {
  getCommentsByUser,
  getRepliesCommentsByUser
} from '../../../redux/comments/comments.actions';
import { getOrderListUser } from '../../../redux/orders/orders.actions';
import { commentSelectorWithPagination } from '../../../redux/selectors/comments.selectors';
import { orderSelector } from '../../../redux/selectors/orders.selectors';
import labels from '../../../configs/labels';
import OrderTab from '../components/order-tab';
import CommentTab from '../components/comment-tab';
import CommentReplyTab from '../components/comment-reply-tab';
import LoadingBar from '../../../components/loading-bar';

const tabNames = config.tabNames.userOrdersComments;
const { pathToUsers } = config.routes;

const UsersDetails = (props) => {
  const {
    match: {
      params: { id }
    }
  } = props;
  const dispatch = useDispatch();

  const common = useCommonStyles();
  const styles = useStyles();

  const {
    sort: sortComment,
    replySort: sortReply,
    filtersUser: filtersComment,
    filtersReplyUser: filtersReply,
    listUser: listComment,
    listRepliesUser: listReplies,
    currentPage,
    rowsPerPage
  } = useSelector(commentSelectorWithPagination);

  const {
    sort: sortOrder,
    filtersUser: filtersOrder,
    listUser: listOrder
  } = useSelector(orderSelector);

  const { loading } = useSelector(({ Users }) => ({
    loading: Users.userLoading
  }));

  const {
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode,
    email,
    isBanned,
    confirmed,
    phone
  } = useUsersHandler(id);

  const { tab, handleTabChange } = useOrdersCommentsTabs();

  useEffect(() => {
    if (tab) {
      if (filtersComment.typeComment === labels.comments.select[0].value) {
        dispatch(
          getCommentsByUser({
            filter: {
              date: {
                dateFrom: filtersComment.dateFrom,
                dateTo: filtersComment.dateTo
              },
              show: filtersComment.show,
              search: filtersComment.search
            },
            pagination: {
              limit: rowsPerPage,
              skip: currentPage * rowsPerPage
            },
            sort: sortComment,
            userId: id
          })
        );
      } else {
        dispatch(
          getRepliesCommentsByUser({
            filter: {
              createdAt: {
                dateFrom: filtersReply.dateFrom,
                dateTo: filtersReply.dateTo
              },
              filters: true,
              showReplyComment: filtersReply.show,
              search: filtersReply.search
            },
            pagination: {
              limit: rowsPerPage,
              skip: currentPage * rowsPerPage
            },
            sort: sortReply,
            userId: id
          })
        );
      }
    } else {
      dispatch(
        getOrderListUser({
          limit: rowsPerPage,
          skip: currentPage * rowsPerPage,
          filter: {
            date: {
              dateFrom: filtersOrder.dateFrom,
              dateTo: filtersOrder.dateTo
            },
            status: filtersOrder.status,
            paymentStatus: filtersOrder.paymentStatus,
            search: filtersOrder.search
          },
          sort: sortOrder,
          userId: id
        })
      );
    }
  }, [
    dispatch,
    tab,
    filtersComment,
    filtersReply,
    filtersOrder,
    rowsPerPage,
    currentPage,
    sortComment,
    sortReply,
    sortOrder,
    id
  ]);

  const tabs = tabNames.map((name) => <Tab key={name} label={name} />);

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={common.container}>
      <Grid className={styles.detailsContainer}>
        <UserDetailsCard
          info={{
            id,
            sections: {
              phone,
              country,
              city,
              adress,
              postCode
            },
            firstName,
            lastName,
            isBanned,
            email,
            confirmed
          }}
          pathBack={pathToUsers}
        />
      </Grid>
      <AppBar position='static' color='primary'>
        <Tabs
          value={tab}
          className={common.tabs}
          onChange={(_, nextTab) => handleTabChange(nextTab)}
          variant='fullWidth'
        >
          {tabs}
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <OrderTab list={listOrder} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        {filtersComment.typeComment === labels.comments.select[0].value ? (
          <CommentTab list={listComment} />
        ) : (
          <CommentReplyTab list={listReplies} />
        )}
      </TabPanel>
    </div>
  );
};

UsersDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }).isRequired
};

export default withRouter(UsersDetails);
