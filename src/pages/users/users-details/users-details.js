import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { useStyles } from './users-details.styles';
import useUsersHandler from '../../../utils/use-users-handlers';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import { updateUserStatus } from '../../../redux/users/users.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import UserDetailsHeader from './containers/user-details-header';
import UserDetailsBody from './containers/user-details-body';
import UserDetailsSection from './containers/user-details-section';
import UserInput from './containers/user-details-input';

const {
  USER_ACTIVE_TITLE,
  USER_UNACTIVE_TITLE,
  SWITCH_USER_STATUS_TITLE
} = config.buttonTitles;
const { USER_ACTIVE_STATUS, USER_UNACTIVE_STATUS } = config.statuses;
const { SWITCH_USER_STATUS_MESSAGE } = config.messages;

const UsersDetails = (props) => {
  const { match } = props;

  const { openSuccessSnackbar } = useSuccessSnackbar();
  const styles = useStyles();
  const dispatch = useDispatch();

  const { loading } = useSelector(({ Users }) => ({
    loading: Users.usersLoading
  }));

  const { id } = match.params;

  const {
    firstName,
    lastName,
    country,
    city,
    adress,
    postCode,
    isBanned
  } = useUsersHandler(id);

  const status = isBanned ? USER_UNACTIVE_STATUS : USER_ACTIVE_STATUS;
  const buttonStatus = isBanned ? USER_ACTIVE_TITLE : USER_UNACTIVE_TITLE;

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

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <Grid className={styles.detailsContainer}>
      <Grid className={styles.userDetails}>
        <UserDetailsHeader
          title='Інформація про користувача'
          firstName={firstName}
          lastName={lastName}
          status={status}
        />
        <UserDetailsBody>
          <UserDetailsSection>
            <UserInput label={"Ім'я"} value={firstName} id='firstName' />
            <UserInput label='Прізвище' value={lastName} id='lastName' />
          </UserDetailsSection>
          <UserDetailsSection>
            <UserInput label='Країна' value={country} id='country' />
            <UserInput label='Місто' value={city} id='city' />
            <UserInput label='Адреса' value={adress} id='adress' />
            <UserInput
              label='Поштовий індекс'
              value={postCode}
              id='postalCode'
            />
          </UserDetailsSection>
          <UserDetailsSection withoutPaper size={2}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => userStatusHandler(id)}
            >
              {buttonStatus}
            </Button>
          </UserDetailsSection>
        </UserDetailsBody>
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
