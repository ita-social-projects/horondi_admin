import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useStyles } from './users-page.styles';
import { getUsers , deleteUser } from '../../../redux/users/users.actions';
import TableContainerRow from '../../../components/table-container-row';
import TableContainerGenerator from '../../../components/table-container-generator';
import { config } from '../../../configs';
import LoadingBar from '../../../components/loading-bar';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';

const tableHeaders = config.tableHeadRowTitles.users;
const { REMOVE_USER_TITLE } = config.buttonTitles;
const { REMOVE_USER_MESSAGE } = config.messages;

const UsersPage = (props) => {
  const classes = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, loading } = useSelector(({ Users }) => ({
    list: Users.list,
    loading: Users.userLoading
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const userDeleteHandler = (id) => {
    const removeUser = () => {
      dispatch(closeDialog());
      dispatch(deleteUser(id));
    };
    openSuccessSnackbar(
      removeUser,
      REMOVE_USER_TITLE,
      REMOVE_USER_MESSAGE,
      REMOVE_USER_TITLE
    );
  };

  const usersItems =
    list !== undefined
      ? list.map((userItem, index) => (
        <TableContainerRow
          key={index}
          id={userItem._id}
          name={`${userItem.firstName} ${userItem.lastName}`}
          mobile={userItem.phoneNumber}
          email={userItem.email}
          banned={userItem.banned ? 'Неактивний' : 'Активний'}
          deleteHandler={() => userDeleteHandler(userItem._id)}
          editHandler={() => dispatch(push(`/users/${userItem._id}`))}
        />
      ))
      : null;

  if (loading) {
    return <LoadingBar />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.tableNav}>
        <h1>Hek</h1>
      </div>
      <TableContainerGenerator
        id='usersTable'
        tableTitles={tableHeaders}
        tableItems={usersItems}
      />
    </div>
  );
};

export default UsersPage;
