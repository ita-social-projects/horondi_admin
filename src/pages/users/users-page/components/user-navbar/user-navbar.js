import React from 'react';
import { Grid } from '@material-ui/core';
import NavFilters from './nav-filters';
import { useStyles } from './user-navbar.styles';
import NavSort from './nav-sort';
import NavSearch from './nav-search';
import NavClearFilters from './nav-clear-filters';

const UserNavbar = () => {
  const styles = useStyles();

  return (
    <Grid
      className={styles.container}
      container
      direction='row'
      justify='flex-start'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <NavSort />
      </Grid>
      <Grid item>
        <NavFilters />
      </Grid>
      <Grid item>
        <NavSearch />
      </Grid>
      <Grid item>
        <NavClearFilters />
      </Grid>
    </Grid>
  );
};

export default UserNavbar;
