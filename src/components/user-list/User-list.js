import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import wrapWithAdminService from '../wrappers';
import LoadingBar from '../loading-bar';

import { setUsers, userLoadingStatus } from '../../actions';
import { config } from '../../config';

import TableContainerRow from '../table-container-row';
import TableContainerGenerator from '../table-container-generator/Table-container-generator';

const tableTitles = config.tableHeadRowTitles.users;

const UserList = ({
  adminService,
  users,
  setUsers,
  userLoadingStatus,
  history,
  loading
}) => {
  const { usersService } = adminService;
  useEffect(() => {
    userLoadingStatus();
    usersService.getAllUsers().then((res) => setUsers(res));
  }, [usersService, setUsers, userLoadingStatus]);

  const userItems = users.map((user, index) => (
    <TableContainerRow
      key={index}
      id={user._id}
      email={user.email}
      firstName={user.firstName}
      lastName={user.lastName}
      role={user.role}
      editHandler={() => {
        history.push(`/user/${user._id}`);
      }}
      deleteHandler={() => {
        console.log(user._id);
      }}
    />
  ));

  if (loading) {
    return <LoadingBar />;
  }
  return (
    <TableContainerGenerator tableTitles={tableTitles} tableItems={userItems} />
  );
};

const mapStateToProps = ({ usersState: { users, loading } }) => ({
  users,
  loading
});

const mapDispatchToProps = { setUsers, userLoadingStatus };

export default wrapWithAdminService()(
  connect(mapStateToProps, mapDispatchToProps)(withRouter(UserList))
);
