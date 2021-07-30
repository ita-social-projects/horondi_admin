import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button, AppBar, Tabs, Tab } from '@material-ui/core';

import { withRouter } from 'react-router';
import { useCommonStyles } from '../../common.styles';
import { useStyles } from './users-details.styles';
import { useUsersHandler } from '../../../hooks/user/use-users-handlers';
import useOrdersCommentsTabs from '../../../hooks/user/use-orders-comments-tabs';
import useOrderUserFilters from '../../../hooks/filters/use-order-user-filters';
import useCommentUserFilters from '../../../hooks/filters/use-comment-user-filters';
import LoadingBar from '../../../components/loading-bar';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import UserDetailsCard from './containers/user-details-card';
import TabPanel from '../../../components/tab-panel';
import CommentsSection from '../../../components/comments-section/comments-section';
import { GET_USER_COMMENTS } from '../../../redux/comments/comments.types';
import { config } from '../../../configs';
import { BackButton } from '../../../components/buttons';
import FilterNavbar from '../../../components/filter-search-sort';
import { UserBlockPeriod } from '../../../consts/user-block-status';
import {
  blockUserByAdmin,
  resendEmail,
  unlockUserByAdmin
} from '../../../redux/users/users.actions';
import { getUserBlockStatus } from '../../../utils/user';

const {
  USER_ACTIVE_TITLE,
  USER_INACTIVE_TITLE,
  SWITCH_USER_STATUS_TITLE,
  SHOW_COMMENTS_TITLE,
  HIDE_COMMENTS_TITLE,
  SEND_CONFIRM
} = config.buttonTitles;
const { SWITCH_USER_STATUS_MESSAGE } = config.messages;
const tabNames = config.tabNames.userOrdersComments;
const { pathToUsers } = config.routes;

const UsersDetails = (props) => {
  const { match } = props;
  const { id } = match.params;

  const dispatch = useDispatch();

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const common = useCommonStyles();
  const styles = useStyles();

  const orderUserFilters = useOrderUserFilters();
  const commentUserFilters = useCommentUserFilters();

  const {
    orderLoading,
    items: ordersList,
    filtersUser,
    sort
  } = useSelector(({ Orders }) => Orders);

  const { currentPage, rowsPerPage, itemsCount } = useSelector(({ Table }) => ({
    currentPage: Table.pagination.currentPage,
    rowsPerPage: Table.pagination.rowsPerPage,
    itemsCount: Table.itemsCount
  }));

  const { loading } = useSelector(({ Users }) => ({
    loading: Users.userLoading
  }));

  const [showComments, setShowComments] = useState(false);

  const {
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode,
    isBanned,
    confirmed,
    email
  } = useUsersHandler(id);

  // useEffect(() => {
  //   dispatch(
  //     getOrderList({
  //       limit: rowsPerPage,
  //       skip: currentPage * rowsPerPage,
  //       filter: {
  //         date: { dateFrom: filters.dateFrom, dateTo: filters.dateTo },
  //         status: filters.status,
  //         paymentStatus: filters.paymentStatus,
  //         search: filters.search
  //       },
  //       sort
  //     })
  //   );
  // }, [dispatch, rowsPerPage, currentPage, filters, sort]);

  // const ordersDeleteHandler = (id) => {
  //   const removeOrders = () => {
  //     dispatch(closeDialog());
  //     dispatch(deleteOrder(id));
  //   };
  //   openSuccessSnackbar(removeOrders, REMOVE_ORDER_MESSAGE);
  // };

  const { tab, handleTabChange } = useOrdersCommentsTabs();

  const tabs = tabNames.map((name) => <Tab key={name} label={name} />);

  if (loading) {
    return <LoadingBar />;
  }

  const avatar = `${firstName[0]}${lastName[0]}`;
  const name = `${firstName} ${lastName}`;

  const primaryData = { country, city };
  const secondaryData = { adress, postCode };

  const status = getUserBlockStatus(isBanned);

  const userStatusHandler = (userId) => {
    const updateStatus = () => {
      dispatch(closeDialog());
      isBanned?.blockPeriod !== UserBlockPeriod.UNLOCKED
        ? dispatch(unlockUserByAdmin(userId))
        : dispatch(blockUserByAdmin(userId));
    };
    openSuccessSnackbar(
      updateStatus,
      SWITCH_USER_STATUS_MESSAGE,
      SWITCH_USER_STATUS_TITLE
    );
  };

  const sendConfirmationHandler = () => {
    dispatch(resendEmail({ email }));
  };

  const showCommentsHandler = () => setShowComments(!showComments);

  return (
    <div className={common.container}>
      <Grid className={styles.detailsContainer}>
        <Grid className={styles.userDetails}>
          <UserDetailsCard
            avatar={avatar}
            name={name}
            status={status}
            primaryData={primaryData}
            secondaryData={secondaryData}
            buttonStatus={
              isBanned?.blockPeriod !== UserBlockPeriod.UNLOCKED
                ? USER_ACTIVE_TITLE
                : USER_INACTIVE_TITLE
            }
            buttonConfirmed={!confirmed ? SEND_CONFIRM : null}
            buttonConfirmationHandler={() => sendConfirmationHandler()}
            buttonHandler={() => userStatusHandler(id)}
          />
          <div className={styles.controlsBlock}>
            <BackButton pathBack={pathToUsers} />
          </div>
        </Grid>
        <Grid className={styles.showComments}>
          <Button
            variant='contained'
            color='primary'
            onClick={showCommentsHandler}
          >
            {showComments ? HIDE_COMMENTS_TITLE : SHOW_COMMENTS_TITLE}
          </Button>
          {showComments ? (
            <CommentsSection value={id} commentsType={GET_USER_COMMENTS} />
          ) : null}
        </Grid>
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
        <FilterNavbar options={orderUserFilters || {}} />
        <div>Orders</div>
        {/* <UserTab list={list} onDelete={userDeleteHandler} /> */}
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <FilterNavbar options={commentUserFilters || {}} />
        <div>Comments</div>
        {/* <AdminTab list={list} onDelete={userDeleteHandler} /> */}
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
// export default UsersDetails;
