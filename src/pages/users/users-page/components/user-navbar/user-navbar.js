import React from 'react'
import {Grid} from '@material-ui/core'
import NavFilters from './nav-filters';
import { useStyles } from './user-navbar.styles';
import NavSort from './nav-sort';

const UserNavbar = () => {

  const styles = useStyles();

  return (
    <Grid
      className={styles.container}
      container
      direction='row'
      justify='space-around'
      alignItems='center'
    >
      <Grid item>
        <NavSort />
      </Grid>
      <Grid item>
        <NavFilters />
      </Grid>
    </Grid>
  )
};

export default UserNavbar;
