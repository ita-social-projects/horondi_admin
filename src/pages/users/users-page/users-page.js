import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Typography, Button } from '@material-ui/core';
import { useStyles } from './users-page.styles';
import { getUsers, deleteUser } from '../../../redux/users/users.actions';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import { config } from '../../../configs';
import LoadingBar from '../../../components/loading-bar';

import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import { formatPhoneNumber } from '../../../utils/format-phone-number';
import { userRoleTranslations } from '../../../translations/user.translations';

const { routes } = config.app;
const pathToRegisterAdminPage = routes.pathToRegisterAdmin;

const tableHeaders = config.tableHeadRowTitles.users;
const { REMOVE_USER_TITLE, CREATE_SPECIAL_USER } = config.buttonTitles;
const { REMOVE_USER_MESSAGE } = config.messages;

const UsersPage = () => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { loading, list } = useSelector(({ Users }) => ({
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

  if (loading) {
    return <LoadingBar />;
  }

  const usersItems = list.map((userItem, index) => (
    <TableContainerRow
      key={index}
      id={userItem._id}
      name={`${userItem.firstName} ${userItem.lastName}`}
      mobile={formatPhoneNumber(userItem.phoneNumber)}
      email={userItem.email}
      role={userRoleTranslations[userItem.role]}
      banned={userItem.banned ? 'Неактивний' : 'Активний'}
      deleteHandler={() => userDeleteHandler(userItem._id)}
      editHandler={() => dispatch(push(`/users/${userItem._id}`))}
    />
  ));

  return (
    <div className={styles.container}>
      <div className={styles.tableNav}>
        <Typography variant='h1' className={styles.usersTitle} data-cy='title'>
          Інформація про користувачів
        </Typography>
        <div className={styles.buttonsPanel}>
          <Button
            id='add-user-admin'
            data-cy='add-user-admin'
            onClick={() => dispatch(push(pathToRegisterAdminPage))}
            variant='contained'
            color='primary'
          >
            {CREATE_SPECIAL_USER}
          </Button>
        </div>
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
