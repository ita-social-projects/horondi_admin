import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import InfoItem from './containers/info-item';
import { useStyles } from './user-details-card.styles';
import { config } from '../../../../../configs';
import { BackButton } from '../../../../../components/buttons';
import { getUserBlockStatus } from '../../../../../utils/user';
import { UserBlockPeriod } from '../../../../../consts/user-block-status';
import { closeDialog } from '../../../../../redux/dialog-window/dialog-window.actions';
import {
  blockUserByAdmin,
  resendEmail,
  unlockUserByAdmin
} from '../../../../../redux/users/users.actions';
import useSuccessSnackbar from '../../../../../utils/use-success-snackbar';

const userTitles = config.detailTitles.users;
const {
  materialUiConstants: { primary, contained }
} = config;
const {
  USER_ACTIVE_TITLE,
  USER_INACTIVE_TITLE,
  SWITCH_USER_STATUS_TITLE,
  SEND_CONFIRM,
  EDIT_TITLE
} = config.buttonTitles;
const { SWITCH_USER_STATUS_MESSAGE } = config.messages;

const UserDetailsCard = ({ info, pathBack }) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const { openSuccessSnackbar } = useSuccessSnackbar();

  const status = getUserBlockStatus(info.isBanned);

  const btnTitleStatus =
    info.isBanned?.blockPeriod !== UserBlockPeriod.UNLOCKED
      ? USER_ACTIVE_TITLE
      : USER_INACTIVE_TITLE;
  const btnTitleConfirm = !info.confirmed ? SEND_CONFIRM : null;

  const toggleUserStatus = (userId) => {
    const updateStatus = () => {
      dispatch(closeDialog());
      info.isBanned?.blockPeriod !== UserBlockPeriod.UNLOCKED
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
    dispatch(resendEmail({ email: info.email }));
  };

  const sections = userTitles.sections.map((section) => (
    <InfoItem
      label={section.label}
      id={section.id}
      data={info.sections[section.id]}
      key={section.id}
    />
  ));

  return (
    <Grid container direction='column' className={styles.container}>
      <div className={styles.controlsBlock}>
        <BackButton pathBack={pathBack} />
      </div>
      <Card>
        <CardContent className={styles.main}>
          <div className={styles.avatarSide}>
            <Grid item xs={12}>
              <Avatar data-cy={userTitles.avatar.id} className={styles.avatar}>
                {`${info.firstName[0]}${info.lastName[0]}`}
              </Avatar>
            </Grid>
            <Typography data-cy={userTitles.status.id} variant='h6'>
              {status}
            </Typography>
          </div>
          <div className={styles.infoSide}>
            <Typography
              data-cy={userTitles.name.id}
              className={styles.username}
              variant='h2'
            >
              {info.firstName} {info.lastName}
            </Typography>
            <Typography
              data-cy={userTitles.name.id}
              className={styles.email}
              variant='h5'
            >
              {info.email}
            </Typography>
            {sections}
          </div>
          <div className={styles.btnsSide}>
            <Button
              variant={contained}
              color={primary}
              onClick={() => toggleUserStatus(info.id)}
              data-cy='change-user-status-button'
            >
              {btnTitleStatus}
            </Button>
            {btnTitleConfirm && (
              <Button
                variant={contained}
                color={primary}
                onClick={sendConfirmationHandler}
                data-cy='send-user-confirmation-button'
              >
                {btnTitleConfirm}
              </Button>
            )}
            <Button
              variant={contained}
              color={primary}
              data-cy='edit-user-info-button'
            >
              {EDIT_TITLE}
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
};

UserDetailsCard.propTypes = {
  info: PropTypes.shape({
    confirmed: PropTypes.bool,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.string,
    lastName: PropTypes.string,
    isBanned: PropTypes.shape({
      blockPeriod: PropTypes.string,
      updatedAt: PropTypes.string,
      blockCount: PropTypes.number
    }),
    sections: PropTypes.shape({
      adress: PropTypes.string,
      city: PropTypes.string,
      country: PropTypes.string,
      phone: PropTypes.string,
      postCode: PropTypes.string
    })
  }).isRequired,
  pathBack: PropTypes.string.isRequired
};

export default UserDetailsCard;
