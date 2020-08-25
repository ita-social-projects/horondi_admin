import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper, Avatar } from '@material-ui/core';
import { useStyles } from './user-details-header.styles';

const UserDetailsHeader = ({ title, firstName, lastName, status }) => {
  const styles = useStyles();

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant='h1' className={styles.detailsTitle}>
          {title}
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
              <Typography className={styles.userStatus} id='status'>
                {status}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

UserDetailsHeader.propTypes = {
  title: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired
};

export default UserDetailsHeader;
