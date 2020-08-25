import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useStyles } from './user-details-section.styles';

const UserDetailsSection = ({ size, withoutPaper, children }) => {
  const styles = useStyles();

  if (withoutPaper) {
    return (
      <Grid item xs={size}>
        <Grid className={styles.userBlock}>{children}</Grid>
      </Grid>
    );
  }

  return (
    <Grid item xs={size}>
      <Paper className={styles.userBlock}>{children}</Paper>
    </Grid>
  );
};

UserDetailsSection.propTypes = {
  size: PropTypes.number,
  children: PropTypes.node.isRequired,
  withoutPaper: PropTypes.bool
};

UserDetailsSection.defaultProps = {
  size: 12,
  withoutPaper: false
};

export default UserDetailsSection;
