import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';

import { withRouter } from 'react-router';
import { useStyles } from './users-details.styles';
import useUsersHandler from '../../../hooks/user/use-users-handlers';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import { updateUserStatus } from '../../../redux/users/users.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import UserDetailsCard from './containers/user-details-card';
import CommentsSection from '../../../components/comments-section/comments-section';
import { GET_USER_COMMENTS } from '../../../redux/comments/comments.types';

const {
  USER_ACTIVE_TITLE,
  USER_INACTIVE_TITLE,
  SWITCH_USER_STATUS_TITLE,
  SHOW_COMMENTS_TITLE,
  HIDE_COMMENTS_TITLE
} = config.buttonTitles;
const { USER_ACTIVE_STATUS, USER_INACTIVE_STATUS } = config.statuses;
const { SWITCH_USER_STATUS_MESSAGE } = config.messages;

const UsersDetails = (props) => {
  const { match } = props;

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ Users }) => ({
    loading: Users.userLoading
  }));

  const { id } = match.params;

  const [showComments, setShowComments] = useState(false);

  const {
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode,
    email,
    isBanned
  } = useUsersHandler(id);

  if (loading) {
    return <LoadingBar />;
  }

  const avatar = `${firstName[0]}${lastName[0]}`;
  const name = `${firstName} ${lastName}`;

  const primaryData = { country, city };
  const secondaryData = { adress, postCode };

  const status = isBanned ? USER_INACTIVE_STATUS : USER_ACTIVE_STATUS;
  const buttonStatus = isBanned ? USER_ACTIVE_TITLE : USER_INACTIVE_TITLE;

  const userStatusHandler = (userId) => {
    const updateStatus = () => {
      dispatch(closeDialog());
      dispatch(updateUserStatus(userId));
    };
    openSuccessSnackbar(
      updateStatus,
      SWITCH_USER_STATUS_TITLE,
      SWITCH_USER_STATUS_MESSAGE,
      SWITCH_USER_STATUS_TITLE
    );
  };

  const showCommentsHandler = () => setShowComments(!showComments);

  return (
    <Grid className={styles.detailsContainer}>
      <Grid className={styles.userDetails}>
        <UserDetailsCard
          avatar={avatar}
          name={name}
          status={status}
          primaryData={primaryData}
          secondaryData={secondaryData}
          buttonStatus={buttonStatus}
          buttonHandler={() => userStatusHandler(id)}
        />
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
          <CommentsSection value={email} commentsType={GET_USER_COMMENTS} />
        ) : null}
      </Grid>
    </Grid>
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
