import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { useStyles } from './users-page.styles';
import { deleteUser, getUsers } from '../../../redux/users/users.actions';
import TabPanel from '../../../components/tab-panel';
import { config } from '../../../configs';
import { closeDialog } from '../../../redux/dialog-window/dialog-window.actions';
import useSuccessSnackbar from '../../../utils/use-success-snackbar';
import AdminTab from './components/admin-tab';
import UserTab from './components/user-tab';
import useUsersTabs from '../../../hooks/user/use-users-tabs';

const { REMOVE_USER_TITLE } = config.buttonTitles;
const { REMOVE_USER_MESSAGE } = config.messages;
const userTabNames = config.tabNames.users;

const UsersPage = () => {
  const styles = useStyles();
  const { openSuccessSnackbar } = useSuccessSnackbar();
  const { list, filters, sort, currentPage, rowsPerPage } = useSelector(
    ({ Users, Table: { pagination } }) => ({
      list: Users.list,
      filters: Users.filters,
      sort: Users.sort,
      currentPage: pagination.currentPage,
      rowsPerPage: pagination.rowsPerPage
    })
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, filters, sort, currentPage, rowsPerPage]);

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

  const { tab, handleTabChange } = useUsersTabs();

  const userTabs = userTabNames.map((name) => <Tab key={name} label={name} />);

  return (
    <div className={styles.container}>
      <AppBar position='static' color='primary'>
        <Tabs
          value={tab}
          onChange={(_, nextTab) => handleTabChange(nextTab)}
          className={styles.tabs}
          variant='fullWidth'
        >
          {userTabs}
        </Tabs>
      </AppBar>
      <TabPanel value={tab} index={0}>
        <UserTab list={list} onDelete={userDeleteHandler} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AdminTab list={list} onDelete={userDeleteHandler} />
      </TabPanel>
    </div>
  );
};

export default UsersPage;
