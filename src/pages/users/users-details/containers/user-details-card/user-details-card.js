import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import InfoItem from './containers/info-item';
import { useStyles } from './user-details-card.styles';
import { config } from '../../../../../configs';

const userTitles = config.detailTitles.users;

const UserDetailsCard = ({
  avatar,
  name,
  status,
  primaryData,
  secondaryData,
  buttonStatus,
  buttonHandler
}) => {
  const styles = useStyles();

  const avatarSection = (
    <Avatar data-cy={userTitles.avatar.id} className={styles.avatar}>
      {avatar}
    </Avatar>
  );
  const nameSection = (
    <Typography data-cy={userTitles.name.id} variant='h3'>
      {name}
    </Typography>
  );
  const statusSection = (
    <Typography data-cy={userTitles.status.id} variant='h5'>
      {status}
    </Typography>
  );
  const primarySection = userTitles.primarySection.map((item, idx) => (
    <InfoItem
      label={item.label}
      id={item.id}
      data={primaryData[item.id]}
      key={idx}
    />
  ));
  const secondarySection = userTitles.secondarySection.map((item, idx) => (
    <InfoItem
      label={item.label}
      id={item.id}
      data={secondaryData[item.id]}
      key={idx}
    />
  ));

  return (
    <Card>
      <CardContent>
        <Grid alignItems='center' direction='column' spacing={2} container>
          <Grid item xs={12}>
            {avatarSection}
          </Grid>
          <Grid item xs={12}>
            {nameSection}
          </Grid>
          <Grid item xs={12} className={styles.status}>
            {statusSection}
          </Grid>
          <Grid xs={12} item container justify='space-around'>
            {primarySection}
          </Grid>
          <Grid item container xs={12} spacing={1} direction='column'>
            {secondarySection}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='primary'
              onClick={buttonHandler}
              data-cy='change-user-status-button'
            >
              {buttonStatus}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

UserDetailsCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  primaryData: PropTypes.objectOf(PropTypes.object).isRequired,
  secondaryData: PropTypes.objectOf(PropTypes.object).isRequired,
  buttonStatus: PropTypes.string.isRequired,
  buttonHandler: PropTypes.func.isRequired
};

export default UserDetailsCard;
