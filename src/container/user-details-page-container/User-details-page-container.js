import React from 'react';
import { useStyles } from './User-details-page-container-styles';

import UserDetails from '../../components/user-details';

const UserDetailsPageContainer = ({ match }) => {
  const classes = useStyles();
  const { id } = match.params;
  return (
    <div className={classes.content}>
      <UserDetails userId={id} />
    </div>
  );
};

export default UserDetailsPageContainer;
