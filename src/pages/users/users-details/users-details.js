import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  FormControl,
  Grid,
  Paper,
  TextField,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import { withRouter } from 'react-router';
import { useStyles } from './users-details.styles';
import useUsersHandler from '../../../utils/use-users-handlers';
import LoadingBar from '../../../components/loading-bar';
import { config } from '../../../configs';
import { updateUserStatus } from '../../../redux/users/users.actions';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';

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
    ban
  } = useUsersHandler(id);

  const status = ban ? USER_UNACTIVE_STATUS : USER_ACTIVE_STATUS;
  const buttonStatus = ban ? USER_ACTIVE_TITLE : USER_UNACTIVE_TITLE;

  const userStatusHandler = (id) => {
    const updateStatus = () => {
      dispatch(closeDialog());
      dispatch(updateUserStatus(id));
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
    <div className={styles.detailsContainer}>
      <form>
        <FormControl className={styles.userDetails}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant='h1' className={styles.detailsTitle}>
                Інформація про користувача
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.userBlock}>
                <Grid container spacing={1} className={styles.userHeader}>
                  <Grid item xs={1} className={styles.userAvatar}>
                    <Avatar>{`${firstName[0]}${lastName[0]}`}</Avatar>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography className={styles.userName}>
                      {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography className={styles.userStatus}>
                      {status}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.userBlock}>
                <TextField
                  id='firstName'
                  className={styles.textField}
                  variant='outlined'
                  label="Ім'я"
                  value={firstName}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='lastName'
                  className={styles.textField}
                  variant='outlined'
                  label='Прізвище'
                  value={lastName}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={styles.userBlock}>
                <TextField
                  id='country'
                  className={styles.textField}
                  variant='outlined'
                  label='Країна'
                  value={country}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='city'
                  className={styles.textField}
                  variant='outlined'
                  label='Місто'
                  value={city}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='adress'
                  className={styles.textField}
                  variant='outlined'
                  label='Адреса'
                  value={adress}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
                <TextField
                  id='postalCode'
                  className={styles.textField}
                  variant='outlined'
                  label='Поштовий код'
                  value={postCode}
                  InputLabelProps={{
                    classes: {
                      root: styles.inputLabel,
                      shrink: 'shrink'
                    }
                  }}
                  multiline
                  disabled
                />
              </Paper>
            </Grid>
            <Grid item xs={2}>
              <Button
                variant='contained'
                color='secondary'
                onClick={() => userStatusHandler(id)}
              >
                {buttonStatus}
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </form>
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
