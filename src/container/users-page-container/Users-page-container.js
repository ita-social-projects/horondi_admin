import React from 'react';
import { useStyles } from './Users-page-container-styles';

import UserList from '../../components/user-list';

const UsersPageContainer = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <UserList />
    </div>
  );
};

export default UsersPageContainer;
