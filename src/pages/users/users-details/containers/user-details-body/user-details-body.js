import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const UserDetailsBody = ({ children }) => (
  <Grid container spacing={1}>
    {children}
  </Grid>
);

UserDetailsBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserDetailsBody;
